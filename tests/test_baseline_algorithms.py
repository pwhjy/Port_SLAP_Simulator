from pathlib import Path

import numpy as np
import pytest

from port_slap.algorithms.baseline.MIP_agent import gen_solution_MIP
from port_slap.algorithms.baseline.merged_SA import gen_solution_SA
from port_slap.algorithms.baseline.toy_instance import (
    build_toy_instance,
    validate_toy_solution,
)


REPO_ROOT = Path(__file__).resolve().parents[1]


def test_simulated_annealing_baseline_smoke() -> None:
    solution = gen_solution_SA(
        build_toy_instance(),
        str(REPO_ROOT / "configs" / "example.ini"),
        one_times=6,
        all_times=18,
        seed=20260720,
    )
    validate_toy_solution(solution)


@pytest.mark.ortools
def test_ortools_mip_baseline_smoke() -> None:
    pytest.importorskip("ortools.linear_solver.pywraplp")
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
