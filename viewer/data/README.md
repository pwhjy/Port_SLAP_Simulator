# Viewer data contract

The preferred authoring format is JSON. `port-slap-viewer-export` validates it
and writes the binary protobuf files consumed by the Viewer.

Two committed datasets serve different purposes:

- `minimal/` is generated from the fully synthetic, human-editable JSON under
  `examples/synthetic_data`;
- `sample/` is the full ready-to-run reference-layout demonstration. Its
  spatial fields are preserved for compatibility with the compiled Viewer,
  while all container identifiers and business attributes are deterministic
  random replacements.

## Source JSON

`viewer_dataset.json` contains:

- `port.yards`: yard identifier, calibration row, synthetic 2D position,
  rotation, direction, and valid row range;
- `initial_containers`: the state shown before scheduling begins;
- `schedule`: strictly increasing frames with `load` container records and
  `unload` container names;
- `format_version`: currently `1`.

Container records include a synthetic identifier, 20/40/45-foot size, yard
position, category, service/vessel label, destination, weight class, status,
allocation label, and flag.

## Yard coordinate system

Our current Viewer interprets yard calibration fields as follows:

- `position.x` and `position.y` become the Unity world `x` and `z` coordinates
  of `calibration_row`;
- `angle_radians` is the yard axis heading in radians; the Viewer converts it
  to a Unity yaw of `90 degrees - angle`;
- rows advance along the yard's forward axis at one bay per step;
- columns 1–6 extend to the left or right of that axis according to
  `direction`;
- tiers advance vertically from 1–5.

Position and angle must be treated as one calibration. Changing only the
position or setting the angle to zero can leave valid protobuf data visibly
misaligned with the yard lanes. The minimal JSON uses two parallel,
deterministically generated yard calibrations. The full reference-layout sample
retains its calibration so it remains aligned with the compiled Viewer's scene.

## Binary output

- `load_port_req.pb`: `LoadPortRequest`;
- `load_containers_req.pb`: `LoadContainersRequest`;
- `schedule_containers_req.pb`: `ScheduleContainersRequest`;
- `manifest.json`: counts, sizes, and SHA-256 hashes for reproducibility.

The schemas are versioned under `proto/port_slap/v1`. Protobuf files are not a
stable authoring format; keep the JSON source and regenerate after protocol
changes.

## Publication rule

We do not publish source database exports, raw reference protobuf files,
operational logs, or identifier mapping tables. In the full sample, we retain
only the explicitly approved spatial/structural fields listed in its manifest.
We require container identifiers and business attributes to match the `SYN-*`
formats enforced by the tests.
