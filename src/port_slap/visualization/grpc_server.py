"""Serve exported simulation data to the separately distributed Unity viewer."""

from __future__ import annotations

import argparse
import configparser
import logging
import threading
from concurrent import futures
from pathlib import Path
from typing import Iterable, Optional, Tuple

import grpc

from port_slap.visualization.generated import model_pb2, viewer_service_pb2_grpc
from port_slap.visualization.offline_export import load_exported_messages


LOGGER = logging.getLogger("port_slap.viewer")


class ViewerDataService(viewer_service_pb2_grpc.PortServiceServicer):
    """Thread-safe in-memory implementation of our Viewer protocol."""

    def __init__(self, data_dir: Path) -> None:
        messages = load_exported_messages(data_dir)
        self._port = messages["load_port_req.pb"]
        self._containers = messages["load_containers_req.pb"]
        self._schedule = messages["schedule_containers_req.pb"]
        self._schedule_served = False
        self._lock = threading.Lock()
        LOGGER.info(
            "Loaded Viewer dataset: yards=%d initial=%d steps=%d",
            len(self._port.port_info.yards),
            len(self._containers.containers_info),
            len(self._schedule.schedule_steps),
        )

    def LoadMap(self, request, context):  # noqa: N802 - gRPC API name
        LOGGER.info("LoadMap")
        return model_pb2.LoadMapRequest()

    def LoadPort(self, request, context):  # noqa: N802 - gRPC API name
        LOGGER.info("LoadPort: yards=%d", len(self._port.port_info.yards))
        response = model_pb2.LoadPortRequest()
        response.CopyFrom(self._port)
        return response

    def LoadContainers(self, request, context):  # noqa: N802 - gRPC API name
        with self._lock:
            self._schedule_served = False
        LOGGER.info("LoadContainers: count=%d", len(self._containers.containers_info))
        response = model_pb2.LoadContainersRequest()
        response.CopyFrom(self._containers)
        return response

    def ScheduleContainers(self, request, context):  # noqa: N802 - gRPC API name
        response = model_pb2.ScheduleContainersRequest()
        with self._lock:
            if not self._schedule_served:
                response.CopyFrom(self._schedule)
                self._schedule_served = True
                LOGGER.info("ScheduleContainers: steps=%d", len(response.schedule_steps))
            else:
                response.schedule_steps.add().frame_id = -2
                LOGGER.info("ScheduleContainers: no additional steps")
        return response

    def CheckRender(self, request, context):  # noqa: N802 - gRPC API name
        response = model_pb2.ScheduleContainersResponse()
        response.header.success = True
        return response

    def FinishRender(self, request, context):  # noqa: N802 - gRPC API name
        response = model_pb2.ScheduleContainersResponse()
        response.header.success = True
        LOGGER.info("FinishRender: success=true")
        return response


def read_config(path: Optional[Path]) -> Tuple[str, int, int, Optional[Path]]:
    if path is None:
        return "127.0.0.1", 9007, 10, None
    parser = configparser.ConfigParser()
    if not parser.read(path, encoding="utf-8"):
        raise FileNotFoundError(f"Viewer server configuration not found: {path}")
    section = parser["viewer-server"]
    configured_data = section.get("data_dir", fallback="").strip()
    data_dir = None if not configured_data else (path.parent / configured_data).resolve()
    return (
        section.get("host", fallback="127.0.0.1"),
        section.getint("port", fallback=9007),
        section.getint("max_workers", fallback=10),
        data_dir,
    )


def create_server(data_dir: Path, host: str, port: int, max_workers: int = 10):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=max_workers))
    viewer_service_pb2_grpc.add_PortServiceServicer_to_server(
        ViewerDataService(data_dir), server
    )
    address = f"{host}:{port}"
    if server.add_insecure_port(address) == 0:
        raise RuntimeError(f"Unable to bind Viewer gRPC server to {address}")
    return server, address


def parse_args(argv: Optional[Iterable[str]] = None) -> argparse.Namespace:
    repo_root = Path.cwd()
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", type=Path, help="Optional INI configuration file")
    parser.add_argument("--data-dir", type=Path, help="Exported Viewer protobuf directory")
    parser.add_argument("--host", help="Listen host; use 0.0.0.0 for Docker")
    parser.add_argument("--port", type=int, help="Listen port")
    parser.add_argument("--max-workers", type=int, help="gRPC worker count")
    parser.set_defaults(default_data_dir=repo_root / "viewer" / "data" / "sample")
    return parser.parse_args(argv)


def main(argv: Optional[Iterable[str]] = None) -> None:
    args = parse_args(argv)
    config_host, config_port, config_workers, config_data = read_config(args.config)
    data_dir = (args.data_dir or config_data or args.default_data_dir).resolve()
    host = args.host or config_host
    port = args.port or config_port
    max_workers = args.max_workers or config_workers

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )
    server, address = create_server(data_dir, host, port, max_workers)
    server.start()
    LOGGER.info("Viewer gRPC server listening on %s", address)
    try:
        server.wait_for_termination()
    except KeyboardInterrupt:
        LOGGER.info("Stopping Viewer gRPC server")
        server.stop(grace=2).wait()


if __name__ == "__main__":
    main()
