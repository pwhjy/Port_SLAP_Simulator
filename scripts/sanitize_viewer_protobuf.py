#!/usr/bin/env python3
"""Create a public Viewer demo while preserving reference spatial geometry.

We supply the source protobuf directory from a private local copy and never
copy it into the repository. We replace container identifiers and business
attributes with deterministic random values while keeping container sizes,
positions, yard calibration, and schedule frame structure unchanged.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import random
from collections import Counter
from pathlib import Path
from typing import Dict, Iterable, Optional, Tuple

from port_slap.visualization.generated import model_pb2


DEFAULT_SEED = 20260720
FILENAMES = (
    "load_port_req.pb",
    "load_containers_req.pb",
    "schedule_containers_req.pb",
)


def _read_message(path: Path, message_type):
    message = message_type()
    message.ParseFromString(path.read_bytes())
    return message


def _geometry_signature(container: model_pb2.ContainerInfo) -> Tuple[object, ...]:
    return (
        container.HasField("size"),
        int(container.size),
        container.HasField("yard_pos"),
        container.yard_pos.SerializeToString(),
        container.HasField("ship_pos"),
        container.ship_pos.SerializeToString(),
    )


def _file_metadata(path: Path) -> Dict[str, object]:
    payload = path.read_bytes()
    return {
        "bytes": len(payload),
        "sha256": hashlib.sha256(payload).hexdigest(),
    }


def _position_preview(position) -> Dict[str, object]:
    return {
        "block": position.block,
        "row": position.row,
        "column": position.column,
        "tier": position.tier,
    }


def _container_preview(container: model_pb2.ContainerInfo) -> Dict[str, object]:
    value: Dict[str, object] = {
        "name": container.name,
        "size": model_pb2.ContainerInfo.ContainerSize.Name(container.size),
        "attributes": {
            "category": container.attrs.category,
            "service": container.attrs.service,
            "vessel": container.attrs.vessel,
            "destination_port": container.attrs.des_port,
            "weight": container.attrs.weight,
            "status": container.attrs.status,
            "allocation": container.attrs.allocation,
            "flag": container.attrs.flag,
        },
    }
    if container.HasField("yard_pos"):
        value["yard_position"] = _position_preview(container.yard_pos)
    if container.HasField("ship_pos"):
        value["ship_position"] = _position_preview(container.ship_pos)
    return value


def sanitize_dataset(source_dir: Path, output_dir: Path, seed: int) -> Dict[str, object]:
    """Sanitize three Viewer protobuf files and return the public manifest."""
    source_dir = source_dir.resolve()
    output_dir = output_dir.resolve()
    if source_dir == output_dir:
        raise ValueError("source and output directories must be different")
    for filename in FILENAMES:
        if not (source_dir / filename).is_file():
            raise FileNotFoundError(f"missing source Viewer file: {source_dir / filename}")

    port_payload = (source_dir / "load_port_req.pb").read_bytes()
    port = model_pb2.LoadPortRequest()
    port.ParseFromString(port_payload)
    initial = _read_message(
        source_dir / "load_containers_req.pb", model_pb2.LoadContainersRequest
    )
    schedule = _read_message(
        source_dir / "schedule_containers_req.pb",
        model_pb2.ScheduleContainersRequest,
    )

    schedule_loads = [
        container
        for step in schedule.schedule_steps
        for container in step.load_containers
    ]
    if not schedule_loads:
        raise ValueError("reference schedule must contain at least one load container")
    terminal_source_name = schedule_loads[-1].name
    source_name_counts = Counter(
        container.name
        for container in list(initial.containers_info)
        + schedule_loads
        + [
            container
            for step in schedule.schedule_steps
            for container in step.unload_containers
        ]
    )
    if source_name_counts[terminal_source_name] != 1:
        raise ValueError("the final load container must have a unique source identifier")

    rng = random.Random(seed)
    replacement_names: Dict[str, str] = {}
    replacement_attributes: Dict[str, Tuple[int, str, str, str, int, int, str, int]] = {}

    def public_name(source_name: str) -> str:
        if source_name not in replacement_names:
            replacement_names[source_name] = f"SYN-C-{len(replacement_names) + 1:06d}"
        return replacement_names[source_name]

    def public_attributes(source_name: str) -> Tuple[int, str, str, str, int, int, str, int]:
        if source_name not in replacement_attributes:
            replacement_attributes[source_name] = (
                rng.randint(1, 3),
                f"SYN-SVC-{rng.randint(1, 24):02d}",
                f"SYN-VSL-{rng.randint(1, 64):03d}",
                f"SYN-PORT-{rng.randint(1, 32):02d}",
                rng.randint(1, 20),
                rng.randint(0, 1),
                f"SYN-ALLOC-{rng.randint(1, 8):02d}",
                0,
            )
        return replacement_attributes[source_name]

    def sanitize_container(
        source: model_pb2.ContainerInfo,
        *,
        terminal: bool = False,
    ) -> model_pb2.ContainerInfo:
        result = model_pb2.ContainerInfo()
        if source.HasField("size"):
            result.size = source.size
        if source.HasField("yard_pos"):
            result.yard_pos.CopyFrom(source.yard_pos)
        if source.HasField("ship_pos"):
            result.ship_pos.CopyFrom(source.ship_pos)
        result.name = "finalcon" if terminal else public_name(source.name)
        (
            result.attrs.category,
            result.attrs.service,
            result.attrs.vessel,
            result.attrs.des_port,
            result.attrs.weight,
            result.attrs.status,
            result.attrs.allocation,
            result.attrs.flag,
        ) = public_attributes(source.name)
        if _geometry_signature(result) != _geometry_signature(source):
            raise AssertionError("container geometry changed during sanitization")
        return result

    sanitized_initial = model_pb2.LoadContainersRequest()
    for container in initial.containers_info:
        sanitized_initial.containers_info.add().CopyFrom(sanitize_container(container))

    sanitized_schedule = model_pb2.ScheduleContainersRequest()
    final_step_index = len(schedule.schedule_steps) - 1
    final_load_index = len(schedule.schedule_steps[-1].load_containers) - 1
    for step_index, source_step in enumerate(schedule.schedule_steps):
        target_step = sanitized_schedule.schedule_steps.add()
        target_step.frame_id = source_step.frame_id
        for load_index, container in enumerate(source_step.load_containers):
            target_step.load_containers.add().CopyFrom(
                sanitize_container(
                    container,
                    terminal=(
                        step_index == final_step_index
                        and load_index == final_load_index
                    ),
                )
            )
        for container in source_step.unload_containers:
            target_step.unload_containers.add().CopyFrom(sanitize_container(container))

    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "load_port_req.pb").write_bytes(port_payload)
    (output_dir / "load_containers_req.pb").write_bytes(
        sanitized_initial.SerializeToString()
    )
    (output_dir / "schedule_containers_req.pb").write_bytes(
        sanitized_schedule.SerializeToString()
    )

    preview_initial = list(sanitized_initial.containers_info[:12])
    final_step = sanitized_schedule.schedule_steps[-1]
    preview = {
        "format_version": 1,
        "description": (
            "Small readable preview of the deterministic random container "
            "metadata in the full reference-layout protobuf sample."
        ),
        "total_initial_containers": len(sanitized_initial.containers_info),
        "total_schedule_steps": len(sanitized_schedule.schedule_steps),
        "initial_containers": [
            _container_preview(container) for container in preview_initial
        ],
        "final_schedule_step": {
            "frame_id": final_step.frame_id,
            "load": [
                _container_preview(container) for container in final_step.load_containers
            ],
            "unload": [
                _container_preview(container)
                for container in final_step.unload_containers
            ],
        },
    }
    with (output_dir / "preview.json").open("w", encoding="utf-8", newline="\n") as handle:
        json.dump(preview, handle, ensure_ascii=False, indent=2)
        handle.write("\n")

    all_public_containers = list(sanitized_initial.containers_info) + [
        container
        for step in sanitized_schedule.schedule_steps
        for container in list(step.load_containers) + list(step.unload_containers)
    ]
    for container in all_public_containers:
        if container.name != "finalcon" and not container.name.startswith("SYN-C-"):
            raise AssertionError("non-synthetic container identifier in output")
        if not container.attrs.service.startswith("SYN-SVC-"):
            raise AssertionError("non-synthetic service label in output")
        if not container.attrs.vessel.startswith("SYN-VSL-"):
            raise AssertionError("non-synthetic vessel label in output")
        if not container.attrs.des_port.startswith("SYN-PORT-"):
            raise AssertionError("non-synthetic destination label in output")
        if not container.attrs.allocation.startswith("SYN-ALLOC-"):
            raise AssertionError("non-synthetic allocation label in output")

    manifest: Dict[str, object] = {
        "format_version": 1,
        "sample_kind": "reference-layout-demo",
        "deterministic_seed": seed,
        "synthetic_container_metadata": True,
        "preserved_reference_layout": True,
        "source_data_included": False,
        "preserved_fields": [
            "port_info",
            "container.size",
            "container.yard_pos",
            "container.ship_pos",
            "schedule.frame_id",
        ],
        "generated_fields": [
            "container.name",
            "container.attrs.category",
            "container.attrs.service",
            "container.attrs.vessel",
            "container.attrs.des_port",
            "container.attrs.weight",
            "container.attrs.status",
            "container.attrs.allocation",
            "container.attrs.flag",
        ],
        "yards": len(port.port_info.yards),
        "initial_containers": len(sanitized_initial.containers_info),
        "schedule_steps": len(sanitized_schedule.schedule_steps),
        "scheduled_loads": sum(
            len(step.load_containers) for step in sanitized_schedule.schedule_steps
        ),
        "scheduled_unloads": sum(
            len(step.unload_containers) for step in sanitized_schedule.schedule_steps
        ),
        "files": {
            filename: _file_metadata(output_dir / filename)
            for filename in FILENAMES + ("preview.json",)
        },
    }
    with (output_dir / "manifest.json").open("w", encoding="utf-8", newline="\n") as handle:
        json.dump(manifest, handle, ensure_ascii=False, indent=2)
        handle.write("\n")
    return manifest


def parse_args(argv: Optional[Iterable[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source-dir",
        type=Path,
        required=True,
        help="Private directory containing the three reference protobuf files",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path.cwd() / "viewer" / "data" / "sample",
        help="Public output directory",
    )
    parser.add_argument("--seed", type=int, default=DEFAULT_SEED)
    return parser.parse_args(argv)


def main(argv: Optional[Iterable[str]] = None) -> None:
    args = parse_args(argv)
    manifest = sanitize_dataset(args.source_dir, args.output_dir, args.seed)
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
