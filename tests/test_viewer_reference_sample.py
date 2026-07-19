import hashlib
import json
import re
from pathlib import Path

from port_slap.visualization.offline_export import load_exported_messages


REPO_ROOT = Path(__file__).resolve().parents[1]
SAMPLE_DIR = REPO_ROOT / "viewer" / "data" / "sample"


def test_reference_layout_sample_contains_only_synthetic_container_metadata() -> None:
    manifest = json.loads((SAMPLE_DIR / "manifest.json").read_text(encoding="utf-8"))
    preview = json.loads((SAMPLE_DIR / "preview.json").read_text(encoding="utf-8"))
    messages = load_exported_messages(SAMPLE_DIR)
    initial = messages["load_containers_req.pb"].containers_info
    schedule = messages["schedule_containers_req.pb"].schedule_steps
    scheduled = [
        container
        for step in schedule
        for container in list(step.load_containers) + list(step.unload_containers)
    ]
    containers = list(initial) + scheduled

    assert manifest["sample_kind"] == "reference-layout-demo"
    assert manifest["synthetic_container_metadata"] is True
    assert manifest["preserved_reference_layout"] is True
    assert manifest["source_data_included"] is False
    assert len(messages["load_port_req.pb"].port_info.yards) == manifest["yards"]
    assert len(initial) == manifest["initial_containers"]
    assert len(schedule) == manifest["schedule_steps"]
    assert schedule[-1].load_containers[-1].name == "finalcon"
    assert preview["total_initial_containers"] == len(initial)
    assert preview["total_schedule_steps"] == len(schedule)
    assert [item["name"] for item in preview["initial_containers"]] == [
        container.name for container in initial[:12]
    ]
    assert preview["final_schedule_step"]["load"][-1]["name"] == "finalcon"

    names = [container.name for container in containers]
    assert len(names) == len(set(names))
    assert all(
        name == "finalcon" or re.fullmatch(r"SYN-C-\d{6}", name)
        for name in names
    )
    assert all(re.fullmatch(r"SYN-SVC-\d{2}", c.attrs.service) for c in containers)
    assert all(re.fullmatch(r"SYN-VSL-\d{3}", c.attrs.vessel) for c in containers)
    assert all(re.fullmatch(r"SYN-PORT-\d{2}", c.attrs.des_port) for c in containers)
    assert all(re.fullmatch(r"SYN-ALLOC-\d{2}", c.attrs.allocation) for c in containers)

    for filename, metadata in manifest["files"].items():
        payload = (SAMPLE_DIR / filename).read_bytes()
        assert len(payload) == metadata["bytes"]
        assert hashlib.sha256(payload).hexdigest() == metadata["sha256"]
