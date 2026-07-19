"""The core module of the environment."""

from __future__ import annotations

from typing import Any

SUPPORTED_ENVIRONMENTS = ("PortSLAP-v0",)


def make(env_id: str = "PortSLAP-v0", **kwargs: Any):
    """Create a Port SLAP simulation environment."""
    if env_id not in SUPPORTED_ENVIRONMENTS:
        supported = ", ".join(SUPPORTED_ENVIRONMENTS)
        raise ValueError(f"Unknown environment {env_id!r}. Available: {supported}")

    from port_slap.simulation.environment import PortSim

    return PortSim(**kwargs)
