#!/usr/bin/env python3
"""Regenerate Python protobuf modules with grpcio-tools."""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
PROTO_DIR = REPO_ROOT / "proto" / "port_slap" / "v1"
OUTPUT_DIR = REPO_ROOT / "src" / "port_slap" / "visualization" / "generated"


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    python_command = [
        sys.executable,
        "-m",
        "grpc_tools.protoc",
        "--experimental_allow_proto3_optional",
        f"--proto_path={PROTO_DIR}",
        f"--python_out={OUTPUT_DIR}",
        str(PROTO_DIR / "model.proto"),
        str(PROTO_DIR / "viewer_service.proto"),
    ]
    grpc_command = [
        sys.executable,
        "-m",
        "grpc_tools.protoc",
        f"--proto_path={PROTO_DIR}",
        f"--grpc_python_out={OUTPUT_DIR}",
        str(PROTO_DIR / "viewer_service.proto"),
    ]
    subprocess.run(python_command, check=True)
    subprocess.run(grpc_command, check=True)

    for generated in OUTPUT_DIR.glob("*.py"):
        if generated.name == "__init__.py":
            continue
        source = generated.read_text(encoding="utf-8")
        source = re.sub(r"^import model_pb2 as model__pb2$", "from . import model_pb2 as model__pb2", source, flags=re.MULTILINE)
        source = re.sub(
            r"^import viewer_service_pb2 as viewer__service__pb2$",
            "from . import viewer_service_pb2 as viewer__service__pb2",
            source,
            flags=re.MULTILINE,
        )
        with generated.open("w", encoding="utf-8", newline="\n") as handle:
            handle.write(source)
    print(f"Generated protobuf modules in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
