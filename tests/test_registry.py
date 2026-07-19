import pytest

from port_slap.simulation.registry import SUPPORTED_ENVIRONMENTS, make


def test_supported_environment_name_is_stable() -> None:
    assert SUPPORTED_ENVIRONMENTS == ("PortSLAP-v0",)


def test_unknown_environment_is_rejected_before_database_access() -> None:
    with pytest.raises(ValueError, match="Unknown environment"):
        make("not-a-real-environment")
