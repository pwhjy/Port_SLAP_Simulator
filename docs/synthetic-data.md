# Example data generation

`scripts/generate_synthetic_data.py` reproduces structural properties needed to
exercise the simulator: two yards, bounded bays/stacks/tiers, mixed 20/40-foot
containers, weight classes, ordered arrivals, berth relationships, and valid
Viewer positions.

It intentionally does not read private terminal exports. All identifiers,
timestamps, labels, locations, and geometry are created from constants and
deterministic loops in `scripts/generate_synthetic_data.py`. This makes the
output reproducible while preventing record linkage to operational data. The
corresponding small Viewer protobuf files live under `viewer/data/minimal`.

For the full `viewer/data/sample` demonstration, we retain the spatial layout
and event frame structure of our Viewer reference example.
`scripts/sanitize_viewer_protobuf.py` replaces every container identifier and
business attribute with deterministic random data while preserving only the
approved geometry/structure fields. We keep the source protobuf files and
identifier mapping private and never write them to the public output.
