if [ -z $DOCKER_NAME ]; then
  DOCKER_NAME="${USER}_port_simulation"
fi
export DOCKER_NAME
export IMG=port/port_simulation:latest
