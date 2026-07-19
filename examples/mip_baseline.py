#!/usr/bin/env python3
"""Run the open-source OR-Tools MIP baseline on a toy instance."""

from __future__ import annotations

import numpy as np

from port_slap.algorithms.baseline.MIP_agent import gen_solution_MIP
from port_slap.algorithms.baseline.toy_instance import (
    build_toy_instance,
    validate_toy_solution,
)


def main() -> None:
    np.random.seed(20260720)
    solution = gen_solution_MIP(
        build_toy_instance(),
        weight={
            "final_block_Equilibrium": 0.5,
            "final_weights_diff": 0.5,
        },
        ratio=1.0,
        decay_rate=0.5,
        Solver="ortools",
    )
    validate_toy_solution(solution)
    print("OR-Tools MIP solution")
    for container_id, slot in sorted(solution.items()):
        print(f"  {container_id}: {slot}")


if __name__ == "__main__":
    main()
