# Requesting the compiled Viewer

We distribute our Unity Viewer separately from this source repository and do
not publish its source project.

To request a compiled package, email us at
[panweihang@zju.edu.cn](mailto:panweihang@zju.edu.cn) and include:

- your name and affiliation;
- a short description of the intended noncommercial use;
- the target operating system;
- offline playback, online playback, or both.

If we approve the request, we will provide a download link. Our response will
identify the package version, SHA-256 checksum, compatible repository tag or
commit, and supported protocol version.

## Package compatibility

The current integration contract is `port_slap/v1`. A compatible package must
retain the legacy protobuf package name
`fabupilot.simulation_v2.simulation_port` and the reversed RPC directions used
by our Viewer build.

A complete Windows archive contains at least:

```text
PortSLAPViewer-Windows-x64/
├── Simulator.exe
├── Simulator_Data/
├── UnityPlayer.dll
├── MonoBleedingEdge/
└── PersistentData/
```

Do not move the executable away from the other runtime files. Any licenses or
attributions supplied in the archive must remain with the package.

## Information handling

We use request information only to evaluate and fulfill Viewer access requests.
Do not send operational port datasets or confidential material in the initial
email.
