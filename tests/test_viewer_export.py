import hashlib
import json
from pathlib import Path

import pytest

from port_slap.visualization.generated import model_pb2, viewer_service_pb2
from port_slap.visualization.offline_export import export_dataset, load_exported_messages
from port_slap.simulation.database.core import DB


REPO_ROOT = Path(__file__).resolve().parents[1]
DATASET = REPO_ROOT / "examples" / "synthetic_data" / "viewer_dataset.json"


def test_protocol_keeps_legacy_package_and_rpc_directions() -> None:
    assert model_pb2.DESCRIPTOR.package == "fabupilot.simulation_v2.simulation_port"
    service = viewer_service_pb2.DESCRIPTOR.services_by_name["PortService"]
    load_containers = service.methods_by_name["LoadContainers"]
    schedule = service.methods_by_name["ScheduleContainers"]
    assert load_containers.input_type.name == "LoadContainersResponse"
    assert load_containers.output_type.name == "LoadContainersRequest"
    assert schedule.input_type.name == "ScheduleContainersResponse"
    assert schedule.output_type.name == "ScheduleContainersRequest"


def test_exported_sample_round_trips(tmp_path: Path) -> None:
    manifest = export_dataset(DATASET, tmp_path)
    messages = load_exported_messages(tmp_path)

    assert manifest["yards"] == 2
    assert manifest["initial_containers"] == 8
    assert manifest["schedule_steps"] == 13
    assert messages["schedule_containers_req.pb"].schedule_steps[-1].load_containers[0].name == "finalcon"

    disk_manifest = json.loads((tmp_path / "manifest.json").read_text(encoding="utf-8"))
    for filename, metadata in disk_manifest["files"].items():
        assert hashlib.sha256((tmp_path / filename).read_bytes()).hexdigest() == metadata["sha256"]


def test_legacy_database_export_wrapper_uses_public_exporter(tmp_path: Path) -> None:
    with pytest.deprecated_call():
        manifest = DB.generate_renderpb_offline(tmp_path, DATASET)
    assert manifest["yards"] == 2
    assert (tmp_path / "load_port_req.pb").is_file()


def test_export_rejects_calibration_row_outside_yard(tmp_path: Path) -> None:
    dataset = json.loads(DATASET.read_text(encoding="utf-8"))
    dataset["port"]["yards"][0]["calibration_row"] = 25
    invalid_dataset = tmp_path / "invalid.json"
    invalid_dataset.write_text(json.dumps(dataset), encoding="utf-8")

    with pytest.raises(ValueError, match="calibration_row must be within"):
        export_dataset(invalid_dataset, tmp_path / "output")
