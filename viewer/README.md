# Port SLAP Viewer integration

We distribute our closed-source Unity Viewer separately. In this repository,
we publish everything needed to create and serve its input data, but we do not
publish Unity project files or executable binaries.

## Request and extract

Request a complete build by emailing us at
[panweihang@zju.edu.cn](mailto:panweihang@zju.edu.cn). Include your name,
affiliation, intended noncommercial use, platform, and whether you need offline
or online playback. See [ACCESS.md](ACCESS.md) for the access and compatibility
policy.

A Windows package is expected to contain at least:

```text
PortSLAPViewer-Windows-x64/
├── Simulator.exe
├── Simulator_Data/
├── UnityPlayer.dll
├── MonoBleedingEdge/
└── PersistentData/
```

Do not move `Simulator.exe` away from the other runtime files.

## Offline mode

The offline Viewer reads three binary protobuf messages from its
`PersistentData` directory:

1. `load_port_req.pb` creates yards and their calibration geometry;
2. `load_containers_req.pb` creates the initial container state;
3. `schedule_containers_req.pb` contains ordered load/unload frames.

The files under `viewer/data/sample` are the full ready-to-use demonstration.
They preserve the reference spatial layout but contain deterministic random
container identifiers and business attributes. Copy them to the downloaded
build's `PersistentData` folder, start `Simulator.exe`, set a higher playback
rate if desired, and click **Play**.

The smaller `viewer/data/minimal` dataset is generated from the human-editable
JSON under `examples/synthetic_data` and is useful when developing integrations.

To export a different dataset:

```bash
port-slap-viewer-export --dataset path/to/viewer_dataset.json --output output-dir
```

Validate custom JSON against `viewer/data/schema/viewer_dataset.schema.json`.

We rebuild the full sample with `scripts/sanitize_viewer_protobuf.py`. The
sanitizer preserves `port_info`, container size/position, and frame IDs while
replacing every container identifier and attribute. It never writes an
identifier mapping.

## Online mode

Start the Python service before opening the online Viewer:

```bash
port-slap-viewer-server --data-dir viewer/data/sample
```

Our online Viewer connects to `127.0.0.1:9007` by default and acts as the gRPC
client. The Python process returns the initial state and schedule messages when
the Viewer pulls them. The final scheduled container must be named `finalcon`
because that sentinel terminates our current Viewer loop.

The optional configuration file is `viewer/config/server.example.ini`:

```bash
port-slap-viewer-server --config viewer/config/server.example.ini
```

## Coordinate limits imposed by the current binary

Our current Viewer accepts rows within each yard's `start_row`/`end_row` range,
columns 1–6, and tiers 1–5. Column 0 is reserved internally as the truck/transfer
lane. Yard names in every container position must match a yard in
`load_port_req.pb` exactly.

`position`, `calibration_row`, and `angle_radians` form a single yard
calibration. In particular, `angle_radians` is not a screen rotation: the
Viewer maps it to Unity yaw as `90 degrees - angle`. See
`viewer/data/README.md` before authoring a custom yard layout.

These limits are enforced for new JSON-authored datasets. The preserved
reference-layout protobuf sample also retains a small number of legacy
out-of-range records for record-structure parity with our reference demo.

## Version compatibility

The protocol retains the package name
`fabupilot.simulation_v2.simulation_port`, original field numbers, and reversed
RPC directions required by our Viewer. In each access response, we state the
repository tag or commit and protocol version used to build the binary.
