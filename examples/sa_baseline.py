#!/usr/bin/env python3
"""Run the simulated-annealing baseline on a deterministic toy instance."""

from __future__ import annotations

from pathlib import Path

from port_slap.algorithms.baseline.merged_SA import gen_solution_SA
from port_slap.algorithms.baseline.toy_instance import (
    build_toy_instance,
    validate_toy_solution,
)


REPO_ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    solution = gen_solution_SA(
        build_toy_instance(),
        str(REPO_ROOT / "configs" / "example.ini"),
        one_times=10,
        all_times=40,
        seed=20260720,
    )
    validate_toy_solution(solution)
    print("simulated-annealing solution")
    for container_id, slot in sorted(solution.items()):
        print(f"  {container_id}: {slot}")


if __name__ == "__main__":
    main()
