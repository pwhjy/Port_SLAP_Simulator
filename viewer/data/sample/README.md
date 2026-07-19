# Reference-layout Viewer demo

This ready-to-run sample preserves the yard calibration, container sizes,
container positions, and schedule frame structure of our Viewer reference
demonstration.

Every container identifier and business attribute was replaced by
deterministic random data. The private source protobuf files and the mapping
from source identifiers to public identifiers are not included.

See `manifest.json` for the preserved/generated field lists and file hashes.
`preview.json` exposes a small readable subset of the randomized records without
duplicating the complete 19,331-container dataset as JSON.
The smaller, fully synthetic, human-editable JSON example remains under
`examples/synthetic_data/viewer_dataset.json`.

The reference layout contains a small number of legacy positions outside the
strict JSON authoring limits. They are retained to keep the protobuf playback
structure identical; our Viewer handles them in the same way as our reference
demonstration.
