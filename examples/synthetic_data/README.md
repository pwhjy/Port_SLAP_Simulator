# Synthetic example data

This directory is a deterministic, non-operational port-yard example. It is
generated from constraints and field relationships required by the simulator;
it is not produced by masking, shuffling, or perturbing real terminal records.

Regenerate all files from the repository root:

```bash
python scripts/generate_synthetic_data.py
```

Files:

- `yard_capacity.csv`: maximum bay, stack, and tier for synthetic blocks `21`
  and `22`;
- `berth_block_distance.csv`: synthetic berth-to-block relationships;
- `initial_containers.csv`: eight containers initially stored in the yard;
- `outbound/demo1.csv`: twelve containers arriving during the episode;
- `viewer_dataset.json`: the same example expressed in the public Viewer JSON
  model, with two 24-row parallel synthetic visual yards and a terminating
  `finalcon` event. The episode occupies only a small subset of those rows so
  the yard axes and gantry alignment remain easy to inspect. Exported protobuf
  files for this small authoring example are stored under `viewer/data/minimal`;
  the full ready-to-run Viewer demonstration is stored separately under
  `viewer/data/sample`.

Runtime SQL snapshots, caches, logs, and private input data belong under ignored
local paths such as `.runtime/`; they must not be committed.
