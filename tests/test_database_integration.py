"""Manual integration smoke test for a running MySQL service."""

import logging
import math
import os
import time
from pathlib import Path

import pytest

from port_slap.simulation.database import DB, Containers, Containers_outyard, Yard_slot
from port_slap.simulation.utils.logger import config_logging


@pytest.mark.integration
@pytest.mark.skipif(
    os.getenv("PORT_SLAP_RUN_INTEGRATION") != "1",
    reason="set PORT_SLAP_RUN_INTEGRATION=1 to use the MySQL service",
)
def test_complete_episode(tmp_path: Path) -> None:
    repo_root = Path(__file__).resolve().parents[1]
    config_path = str(repo_root / "configs" / "example.ini")
    logname = str(tmp_path / ("test_database_" + time.strftime("%Y_%m_%d_%H_%M_%S") + ".log"))
    config_logging(logname, logging.INFO, logging.INFO)
    db = DB(config_path)
    try:
        db.Initall(dump=False)
        assert db.session.query(Containers).count() == 8
    finally:
        db.close()

    from port_slap import make

    env = make("PortSLAP-v0", config_path=config_path, reInit=True, dump_on_init=False)
    allocated = 0
    total_reward = 0.0
    final_counts = None
    try:
        state = env.reset()
        done = state["cur_container"] is None
        while not done:
            action = env.sample_random_action(state["cur_container"])
            state, reward_high, reward_low, done, _ = env.step(action)
            total_reward += reward_high + reward_low
            allocated += 1
        final_counts = (
            env.DataCore.session.query(Containers).count(),
            env.DataCore.session.query(Containers_outyard).count(),
            env.DataCore.session.query(Yard_slot).count(),
        )
    finally:
        env.close()
    assert allocated == 12
    assert math.isfinite(total_reward)
    assert final_counts == (20, 0, 20)
