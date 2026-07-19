"""Export a JSON viewer dataset to Unity-compatible protobuf files."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
from typing import Any, Dict, Iterable, Mapping, MutableSet, Optional, Tuple

from port_slap.visualization.generated import model_pb2


FILE_TYPES = {
    "load_port_req.pb": model_pb2.LoadPortRequest,
    "load_containers_req.pb": model_pb2.LoadContainersRequest,
    "schedule_containers_req.pb": model_pb2.ScheduleContainersRequest,
}


def _container_size(size: int) -> int:
    values = {
        20: model_pb2.ContainerInfo.SIZE_20_FEET,
        40: model_pb2.ContainerInfo.SIZE_40_FEET,
        45: model_pb2.ContainerInfo.SIZE_45_FEET,
    }
    try:
        return values[int(size)]
    except (KeyError, TypeError, ValueError) as exc:
        raise ValueError("container size must be one of 20, 40, or 45 feet") from exc


def _container_message(raw: Mapping[str, Any]) -> model_pb2.ContainerInfo:
    position = raw["position"]
    attributes = raw.get("attributes", {})
    message = model_pb2.ContainerInfo()
    message.name = str(raw["name"])
    message.size = _container_size(int(raw["size"]))
    message.yard_pos.block = str(position["block"])
    message.yard_pos.row = int(position["row"])
    message.yard_pos.column = int(position["column"])
    message.yard_pos.tier = int(position["tier"])
    message.attrs.category = int(attributes.get("category", 0))
    message.attrs.service = str(attributes.get("service", ""))
    message.attrs.vessel = str(attributes.get("vessel", ""))
    message.attrs.des_port = str(attributes.get("destination_port", ""))
    message.attrs.weight = int(attributes.get("weight", 0))
    message.attrs.status = int(attributes.get("status", 0))
    message.attrs.allocation = str(attributes.get("allocation", ""))
    message.attrs.flag = int(attributes.get("flag", 0))
    return message


def _validate_position(
    raw: Mapping[str, Any],
    yards: Mapping[str, Tuple[int, int]],
    context: str,
) -> Tuple[str, int, int, int]:
    position = raw["position"]
    block = str(position["block"])
    row = int(position["row"])
    column = int(position["column"])
    tier = int(position["tier"])
    if block not in yards:
        raise ValueError(f"{context}: unknown yard {block!r}")
    start_row, end_row = yards[block]
    if not start_row <= row <= end_row:
        raise ValueError(f"{context}: row {row} is outside yard {block} [{start_row}, {end_row}]")
    if not 1 <= column <= 6:
        raise ValueError(f"{context}: viewer column must be between 1 and 6")
    if not 1 <= tier <= 5:
        raise ValueError(f"{context}: viewer tier must be between 1 and 5")
    return block, row, column, tier


def _validate_dataset(dataset: Mapping[str, Any]) -> None:
    if int(dataset.get("format_version", 0)) != 1:
        raise ValueError("viewer dataset format_version must be 1")

    yard_ranges: Dict[str, Tuple[int, int]] = {}
    for index, yard in enumerate(dataset["port"]["yards"]):
        name = str(yard["name"])
        if not name or name in yard_ranges:
            raise ValueError(f"port.yards[{index}]: yard names must be non-empty and unique")
        start_row = int(yard["start_row"])
        end_row = int(yard["end_row"])
        if start_row > end_row:
            raise ValueError(f"port.yards[{index}]: start_row must not exceed end_row")
        calibration_row = int(yard["calibration_row"])
        if not start_row <= calibration_row <= end_row:
            raise ValueError(
                f"port.yards[{index}]: calibration_row must be within "
                f"[{start_row}, {end_row}]"
            )
        yard_ranges[name] = (start_row, end_row)

    names: MutableSet[str] = set()
    positions_by_name: Dict[str, Tuple[str, int, int, int]] = {}
    occupied: MutableSet[Tuple[str, int, int, int]] = set()
    for index, container in enumerate(dataset["initial_containers"]):
        name = str(container["name"])
        if name in names:
            raise ValueError(f"initial_containers[{index}]: duplicate container name {name!r}")
        position = _validate_position(container, yard_ranges, f"initial_containers[{index}]")
        if position in occupied:
            raise ValueError(f"initial_containers[{index}]: duplicate occupied slot {position!r}")
        _container_size(int(container["size"]))
        names.add(name)
        positions_by_name[name] = position
        occupied.add(position)

    previous_frame = -1
    scheduled_load_names = []
    for index, step in enumerate(dataset["schedule"]):
        frame_id = int(step["frame_id"])
        if frame_id <= previous_frame:
            raise ValueError("schedule frame_id values must be strictly increasing")
        previous_frame = frame_id
        for name in step.get("unload", []):
            if not isinstance(name, str) or not name:
                raise ValueError(f"schedule[{index}].unload entries must be container names")
            if name not in positions_by_name:
                raise ValueError(f"schedule[{index}].unload references unknown container {name!r}")
            occupied.remove(positions_by_name.pop(name))
            names.remove(name)
        for container in step.get("load", []):
            name = str(container["name"])
            if name in names:
                raise ValueError(f"schedule[{index}].load duplicates active container {name!r}")
            position = _validate_position(container, yard_ranges, f"schedule[{index}].load")
            if position in occupied:
                raise ValueError(f"schedule[{index}].load targets occupied slot {position!r}")
            _container_size(int(container["size"]))
            names.add(name)
            positions_by_name[name] = position
            occupied.add(position)
            scheduled_load_names.append(name)
    if not scheduled_load_names or scheduled_load_names[-1] != "finalcon":
        raise ValueError("schedule must load a final container named 'finalcon' for online viewer termination")


def build_messages(dataset: Mapping[str, Any]) -> Dict[str, Any]:
    """Build the three messages consumed by the offline Unity viewer."""
    _validate_dataset(dataset)

    port_request = model_pb2.LoadPortRequest()
    for raw in dataset["port"]["yards"]:
        yard = port_request.port_info.yards.add()
        yard.name = str(raw["name"])
        yard.calib.row = int(raw["calibration_row"])
        yard.calib.position.x = float(raw["position"]["x"])
        yard.calib.position.y = float(raw["position"]["y"])
        yard.calib.angle = float(raw.get("angle_radians", 0.0))
        direction = str(raw.get("direction", "left")).lower()
        if direction not in {"left", "right"}:
            raise ValueError(f"yard {yard.name!r}: direction must be 'left' or 'right'")
        yard.direction = (
            model_pb2.YardInfo.DIR_LEFT
            if direction == "left"
            else model_pb2.YardInfo.DIR_RIGHT
        )
        yard.start_row = int(raw["start_row"])
        yard.end_row = int(raw["end_row"])

    containers_request = model_pb2.LoadContainersRequest()
    for raw in dataset["initial_containers"]:
        containers_request.containers_info.add().CopyFrom(_container_message(raw))

    schedule_request = model_pb2.ScheduleContainersRequest()
    for raw_step in dataset["schedule"]:
        step = schedule_request.schedule_steps.add()
        step.frame_id = int(raw_step["frame_id"])
        for raw_container in raw_step.get("load", []):
            step.load_containers.add().CopyFrom(_container_message(raw_container))
        for container_name in raw_step.get("unload", []):
            step.unload_containers.add().name = str(container_name)

    return {
        "load_port_req.pb": port_request,
        "load_containers_req.pb": containers_request,
        "schedule_containers_req.pb": schedule_request,
    }


def export_dataset(dataset_path: Path, output_dir: Path) -> Dict[str, Any]:
    """Validate and export a viewer dataset, returning its manifest."""
    dataset_path = dataset_path.resolve()
    output_dir = output_dir.resolve()
    with dataset_path.open("r", encoding="utf-8") as handle:
        dataset = json.load(handle)

    messages = build_messages(dataset)
    output_dir.mkdir(parents=True, exist_ok=True)
    files: Dict[str, Dict[str, Any]] = {}
    for filename, message in messages.items():
        payload = message.SerializeToString()
        (output_dir / filename).write_bytes(payload)
        files[filename] = {
            "bytes": len(payload),
            "sha256": hashlib.sha256(payload).hexdigest(),
        }

    schedule = messages["schedule_containers_req.pb"]
    manifest = {
        "format_version": 1,
        "synthetic": True,
        "source": dataset_path.name,
        "yards": len(messages["load_port_req.pb"].port_info.yards),
        "initial_containers": len(messages["load_containers_req.pb"].containers_info),
        "schedule_steps": len(schedule.schedule_steps),
        "scheduled_loads": sum(len(step.load_containers) for step in schedule.schedule_steps),
        "scheduled_unloads": sum(len(step.unload_containers) for step in schedule.schedule_steps),
        "files": files,
    }
    with (output_dir / "manifest.json").open("w", encoding="utf-8", newline="\n") as handle:
        json.dump(manifest, handle, ensure_ascii=False, indent=2)
        handle.write("\n")
    return manifest


def load_exported_messages(data_dir: Path) -> Dict[str, Any]:
    """Load and parse a previously exported Viewer data directory."""
    result: Dict[str, Any] = {}
    for filename, message_type in FILE_TYPES.items():
        path = data_dir / filename
        message = message_type()
        message.ParseFromString(path.read_bytes())
        result[filename] = message
    return result


def parse_args(argv: Optional[Iterable[str]] = None) -> argparse.Namespace:
    repo_root = Path.cwd()
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--dataset",
        type=Path,
        default=repo_root / "examples" / "synthetic_data" / "viewer_dataset.json",
        help="JSON dataset following viewer/data/schema/viewer_dataset.schema.json",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=repo_root / "viewer" / "data" / "minimal",
        help="Directory in which to write the three protobuf files",
    )
    return parser.parse_args(argv)


def main(argv: Optional[Iterable[str]] = None) -> None:
    args = parse_args(argv)
    manifest = export_dataset(args.dataset, args.output)
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
