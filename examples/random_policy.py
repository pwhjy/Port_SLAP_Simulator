#!/usr/bin/env python3
"""Run one complete episode with the bundled synthetic data."""

from __future__ import annotations

import argparse
from pathlib import Path

from dotenv import load_dotenv

from port_slap import make


REPO_ROOT = Path(__file__).resolve().parents[1]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--config",
        type=Path,
        default=REPO_ROOT / "configs" / "example.ini",
        help="Path to the simulator configuration file.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    load_dotenv(REPO_ROOT / ".env")

    env = make(
        "PortSLAP-v0",
        config_path=str(args.config.resolve()),
        reInit=True,
        dump_on_init=False,
    )

    episode_reward = 0.0
    allocated = 0
    try:
        state = env.reset()
        done = state["cur_container"] is None
        while not done:
            action = env.sample_random_action(state["cur_container"])
            state, reward_high, reward_low, done, metrics = env.step(action)
            episode_reward += reward_high + reward_low
            allocated += 1
            print(
                f"step={allocated:02d} "
                f"container={action['cur_container'].ctn_no} "
                f"slot={action['candidate_slot_action']} "
                f"reward={reward_high + reward_low:.4f}"
            )
    finally:
        env.close()

    print(f"episode finished: allocated={allocated}, total_reward={episode_reward:.4f}")


if __name__ == "__main__":
    main()
