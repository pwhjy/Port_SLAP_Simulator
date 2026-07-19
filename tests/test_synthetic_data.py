import csv
import json
import math
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = REPO_ROOT / "examples" / "synthetic_data"


def test_simulator_data_uses_only_synthetic_identifiers() -> None:
    with (DATA_DIR / "initial_containers.csv").open(encoding="utf-8") as handle:
        initial = list(csv.DictReader(handle))
    with (DATA_DIR / "outbound" / "demo1.csv").open(encoding="utf-8") as handle:
        outbound = list(csv.DictReader(handle))

    assert len(initial) == 8
    assert len(outbound) == 12
    assert all(row["ctn_no"].startswith("SYN-") for row in initial + outbound)
    assert {row["actual_position_block"] for row in initial} == {"21", "22"}
    assert {row["vessel_reference"] for row in outbound} == {"SYNV01"}


def test_viewer_dataset_terminates_online_playback() -> None:
    dataset = json.loads((DATA_DIR / "viewer_dataset.json").read_text(encoding="utf-8"))
    scheduled_names = [
        container["name"]
        for step in dataset["schedule"]
        for container in step["load"]
    ]
    assert scheduled_names[-1] == "finalcon"
    assert all(name == "finalcon" or name.startswith("SYN-") for name in scheduled_names)


def test_viewer_yards_use_parallel_calibrated_axes() -> None:
    dataset = json.loads((DATA_DIR / "viewer_dataset.json").read_text(encoding="utf-8"))
    first, second = dataset["port"]["yards"]

    assert first["angle_radians"] == second["angle_radians"]
    assert first["angle_radians"] != 0
    assert all(
        yard["start_row"] <= yard["calibration_row"] <= yard["end_row"]
        for yard in (first, second)
    )

    angle = first["angle_radians"]
    forward = (math.cos(angle), math.sin(angle))
    delta = (
        second["position"]["x"] - first["position"]["x"],
        second["position"]["y"] - first["position"]["y"],
    )
    along_axis = delta[0] * forward[0] + delta[1] * forward[1]
    across_axis = delta[0] * forward[1] - delta[1] * forward[0]

    assert abs(along_axis) < 0.5
    assert abs(across_axis) > 30
