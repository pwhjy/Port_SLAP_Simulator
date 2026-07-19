#!/usr/bin/env python3
"""Generate deterministic, non-operational data for the public examples."""

from __future__ import annotations

import csv
import json
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List


REPO_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = REPO_ROOT / "examples" / "synthetic_data"


def write_csv(path: Path, fieldnames: List[str], rows: List[Dict[str, object]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)


def write_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as handle:
        json.dump(value, handle, ensure_ascii=False, indent=2)
        handle.write("\n")


def viewer_container(
    name: str,
    block: str,
    row: int,
    column: int,
    tier: int,
    size: int,
    weight: int,
) -> Dict[str, object]:
    return {
        "name": name,
        "size": size,
        "position": {
            "block": block,
            "row": row,
            "column": column,
            "tier": tier,
        },
        "attributes": {
            "category": 1,
            "service": "SYN-SVC",
            "vessel": "SYNV01",
            "destination_port": "SYN-P02",
            "weight": weight,
            "status": 1,
            "allocation": "synthetic",
            "flag": 0,
        },
    }


def main() -> None:
    yard_rows = [
        {"block": "21", "maxbay": 6, "maxstack": 3, "maxtier": 3},
        {"block": "22", "maxbay": 6, "maxstack": 3, "maxtier": 3},
    ]
    write_csv(
        OUTPUT_DIR / "yard_capacity.csv",
        ["block", "maxbay", "maxstack", "maxtier"],
        yard_rows,
    )

    write_csv(
        OUTPUT_DIR / "berth_block_distance.csv",
        ["O", "berth", "LR", "berthLR", "block", "distance"],
        [
            {"O": "SYN-21-L", "berth": 1, "LR": "L", "berthLR": "1L", "block": "21", "distance": 1},
            {"O": "SYN-22-L", "berth": 1, "LR": "L", "berthLR": "1L", "block": "22", "distance": 1},
        ],
    )

    initial_fields = [
        "ctn_no",
        "actual_position_block",
        "bay",
        "stack",
        "tier",
        "first_inyard_time",
        "last_outyard_time",
        "outbound_carrier",
        "inbound_carrier",
        "vessel_reference",
        "service_code_tos_in",
        "destination_port_code",
        "category",
        "ctn_size",
        "ctn_status",
        "ctn_weight",
        "flag",
    ]
    initial_layout = [
        ("21", 1, 1, 1, 1.0),
        ("21", 1, 1, 2, 1.0),
        ("21", 4, 1, 1, 2.0),
        ("21", 4, 2, 1, 2.0),
        ("22", 1, 1, 1, 1.0),
        ("22", 3, 2, 1, 1.0),
        ("22", 6, 1, 1, 2.0),
        ("22", 6, 3, 1, 2.0),
    ]
    start = datetime(2030, 1, 1, 8, 0)
    initial_rows: List[Dict[str, object]] = []
    for index, (block, bay, stack, tier, size) in enumerate(initial_layout, start=1):
        initial_rows.append(
            {
                "ctn_no": f"SYN-I-{index:04d}",
                "actual_position_block": block,
                "bay": bay,
                "stack": stack,
                "tier": tier,
                "first_inyard_time": (start + timedelta(minutes=15 * index)).strftime("%Y/%m/%d %H:%M"),
                "last_outyard_time": "",
                "outbound_carrier": "SYNTHETIC",
                "inbound_carrier": "SYNTHETIC",
                "vessel_reference": "SYNV00",
                "service_code_tos_in": "SYNV00",
                "destination_port_code": "SYN-P01",
                "category": 1,
                "ctn_size": size,
                "ctn_status": 1,
                "ctn_weight": (index % 9) + 1,
                "flag": 0,
            }
        )
    write_csv(OUTPUT_DIR / "initial_containers.csv", initial_fields, initial_rows)

    outbound_fields = [
        "ctn_no",
        "category",
        "actual_position_block",
        "bay",
        "stack",
        "tier",
        "first_inyard_time",
        "last_outyard_time",
        "order",
        "vessel_reference",
        "destination_port_code",
        "ctn_status",
        "ctn_size",
        "weight",
        "ctn_weight",
        "flag",
    ]
    outbound_rows: List[Dict[str, object]] = []
    for index in range(1, 13):
        outbound_rows.append(
            {
                "ctn_no": f"SYN-O-{index:04d}",
                "category": 1,
                "actual_position_block": "",
                "bay": "",
                "stack": "",
                "tier": "",
                "first_inyard_time": (start + timedelta(hours=index)).strftime("%Y/%m/%d %H:%M"),
                "last_outyard_time": "",
                "order": index,
                "vessel_reference": "SYNV01",
                "destination_port_code": "SYN-P02" if index % 2 else "SYN-P03",
                "ctn_status": 1,
                "ctn_size": 1.0 if index % 3 == 0 else 2.0,
                "weight": 10000 + index * 500,
                "ctn_weight": (index % 9) + 1,
                "flag": 0,
            }
        )
    write_csv(OUTPUT_DIR / "outbound" / "demo1.csv", outbound_fields, outbound_rows)

    block_map = {"21": "S1", "22": "S2"}
    initial_viewer = [
        viewer_container(
            str(row["ctn_no"]),
            block_map[str(row["actual_position_block"])],
            int(row["bay"]),
            int(row["stack"]),
            int(row["tier"]),
            20 if float(row["ctn_size"]) <= 1.0 else 40,
            int(row["ctn_weight"]),
        )
        for row in initial_rows
    ]
    destination_slots = [
        ("S1", 2, 1, 1),
        ("S1", 2, 2, 1),
        ("S1", 2, 3, 1),
        ("S1", 3, 1, 1),
        ("S1", 3, 2, 1),
        ("S1", 3, 3, 1),
        ("S2", 2, 1, 1),
        ("S2", 2, 2, 1),
        ("S2", 2, 3, 1),
        ("S2", 4, 1, 1),
        ("S2", 4, 2, 1),
        ("S2", 4, 3, 1),
    ]
    schedule = []
    for index, (row, slot) in enumerate(zip(outbound_rows, destination_slots), start=1):
        block, bay, stack, tier = slot
        schedule.append(
            {
                "frame_id": index,
                "load": [
                    viewer_container(
                        str(row["ctn_no"]),
                        block,
                        bay,
                        stack,
                        tier,
                        20 if float(row["ctn_size"]) <= 1.0 else 40,
                        int(row["ctn_weight"]),
                    )
                ],
                "unload": [],
            }
        )
    schedule.append(
        {
            "frame_id": len(schedule) + 1,
            "load": [viewer_container("finalcon", "S1", 5, 1, 1, 20, 1)],
            "unload": [],
        }
    )

    write_json(
        OUTPUT_DIR / "viewer_dataset.json",
        {
            "format_version": 1,
            "description": "Deterministic synthetic episode; not derived by anonymizing operational records.",
            "port": {
                "yards": [
                    {
                        "name": "S1",
                        "calibration_row": 12,
                        "position": {"x": 19.0, "y": -20.5},
                        "angle_radians": 0.76,
                        "direction": "left",
                        "start_row": 1,
                        "end_row": 24,
                    },
                    {
                        "name": "S2",
                        "calibration_row": 12,
                        "position": {"x": 44.5, "y": -47.0},
                        "angle_radians": 0.76,
                        "direction": "right",
                        "start_row": 1,
                        "end_row": 24,
                    },
                ]
            },
            "initial_containers": initial_viewer,
            "schedule": schedule,
        },
    )

    print(f"Synthetic data written to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
