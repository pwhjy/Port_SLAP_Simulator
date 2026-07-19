# Architecture

Port SLAP Simulator has three boundaries:

1. `port_slap.simulation` owns yard state, MySQL persistence, observations,
   candidate masks, actions, and rewards.
2. `port_slap.algorithms` consumes the simulator API and chooses storage
   locations. Baseline optimization packages are optional.
3. `port_slap.visualization` converts a portable episode model into protobuf or
   serves those messages over gRPC to a separately distributed Viewer.

The Unity binary is a presentation client, not the simulator runtime. Keeping
the protocol and authoring data model public allows new algorithms and data
generators to integrate without exposing the Unity project.

Our current Viewer acts as the gRPC client and pulls `*Request` messages from
the Python server. Although that naming direction is unusual, we retain it in
v1 for binary compatibility.
