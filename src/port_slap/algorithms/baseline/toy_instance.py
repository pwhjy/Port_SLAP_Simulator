"""Small deterministic input shared by the public baseline examples."""

from __future__ import annotations

from typing import Any, Dict, Tuple

import numpy as np


TOY_CONTAINER_IDS = ("SYN-BASE-0001", "SYN-BASE-0002")


def build_toy_instance() -> Tuple[Any, ...]:
    """Return a two-container instance accepted by the SA and MIP baselines.

    The structure matches :meth:`DB.init_instance_for_baseline` but does not
    require MySQL. It is intentionally small enough for documentation, CI, and
    solver-installation smoke tests.
    """
    vessel = "SYNV01"
    blocks = ("SYN-A", "SYN-B")
    containers_in_buffer = {
        TOY_CONTAINER_IDS[0]: [vessel, 4, 1],
        TOY_CONTAINER_IDS[1]: [vessel, 8, 1],
    }

    available_slots: Dict[str, Dict[str, Dict[str, np.ndarray]]] = {vessel: {}}
    lower_stack_info: Dict[str, Dict[str, Dict[str, np.ndarray]]] = {vessel: {}}
    for block in blocks:
        available_slots[vessel][block] = {
            "20teu": np.array(
                [
                    [block, 1, 1, 0],
                    [block, 1, 2, 0],
                ],
                dtype=object,
            )
        }
        lower_stack_info[vessel][block] = {
            "20teu": np.full((2, 6), -1, dtype=int)
        }

    containers_per_block = {vessel: {block: 0 for block in blocks}}
    current_rehandles = {vessel: 0}
    bay_capacity = {block: {1: 2} for block in blocks}
    size_conflicts: Dict[str, Any] = {}

    return (
        containers_in_buffer,
        available_slots,
        lower_stack_info,
        containers_per_block,
        current_rehandles,
        bay_capacity,
        size_conflicts,
    )


def validate_toy_solution(solution: Dict[str, Tuple[str, int, int, int]]) -> None:
    """Raise ``ValueError`` if a baseline result is incomplete or conflicting."""
    if solution is None or set(solution) != set(TOY_CONTAINER_IDS):
        raise ValueError("the baseline did not assign every toy container")
    if len(set(solution.values())) != len(solution):
        raise ValueError("the baseline assigned multiple containers to one slot")
