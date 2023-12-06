#!/bin/bash
DOCKER_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOCAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

source $DOCKER_PATH/common.sh

function local_volumes() {
    volumes="
            -v $HOME/.ssh:${DOCKER_HOME}/.ssh \
            -v $HOME/.zsh_history:${DOCKER_HOME}/.zsh_history \
            -v /tmp/core:/tmp/core \
            -v /proc/sys/kernel/core_pattern:/tmp/core_pattern:rw \
            -v /media:/media \
            -v /private:/private \
            -v /tmp/.ssh-agent-$USER:/tmp/.ssh-agent-$USER \
            -v /tmp/.X11-unix:/tmp/.X11-unix \
            -v /dev/input:/dev/input \
            -v ${LOCAL_DIR}:/Port_SLAP_Simulator"
    
    echo "${volumes}"
}

function local_envs() {
    envs="--runtime nvidia"
    echo "${envs}"
}

if [ "$(docker ps -a --format '{{.Names}}' | grep -w ${DOCKER_NAME})" ]; then  
    echo "${DOCKER_NAME} exists"
    docker stop ${DOCKER_NAME} 1>/dev/null
    docker rm -f ${DOCKER_NAME} 1>/dev/null
else  
    echo "${DOCKER_NAME} does not exist"  
fi

mkdir -p /tmp/.ssh-agent-$USER 2>&1 >/dev/null

USER_ID=$(id -u)
GRP=$(id -g -n) 
GRP_ID=$(id -g) 
LOCAL_HOST=$(hostname) 
DOCKER_HOME="/home/$USER" 
if [ "$USER" == "root" ]; then
  DOCKER_HOME="/root"
fi

eval docker create -it \
      --name ${DOCKER_NAME} \
      -e DOCKER_USER=$USER \
      -e USER=$USER \
      -e DOCKER_USER_ID=$USER_ID \
      -e DOCKER_GRP=$GRP \
      -e DOCKER_GRP_ID=$GRP_ID \
      -e DOCKER_HOME=$DOCKER_HOME \
      -e PYTHONPATH=. \
      -e ENV=DEV \
      --group-add=$(getent group docker | cut -d: -f3) \
      --gpus all \
      $(local_volumes) \
      --ulimit core=-1 \
      --dns=114.114.114.114 \
      --add-host port_simulation:127.0.0.1 \
      --add-host ${LOCAL_HOST}:127.0.0.1 \
      --hostname port_simulation_dev \
      -v ${DOCKER_PATH}/entrypoint.sh:/tmp/entrypoint.sh \
      --entrypoint /tmp/entrypoint.sh \
      -v /etc/localtime:/etc/localtime:ro \
      -v /var/run/docker.sock:/var/run/docker.sock \
      -v /usr/bin/docker:/usr/bin/docker \
      --device /dev/snd \
      -e PULSE_SERVER=unix:${XDG_RUNTIME_DIR}/pulse/native \
      -v ${XDG_RUNTIME_DIR}/pulse/native:${XDG_RUNTIME_DIR}/pulse/native \
      $(local_envs) \
      -e NVIDIA_VISIBLE_DEVICES=all \
      -e NVIDIA_DRIVER_CAPABILITIES=compute,utility \
      $IMG /bin/bash

echo "docker created"
docker cp -L ~/.gitconfig ${DOCKER_NAME}:${DOCKER_HOME}/.gitconfig
docker start ${DOCKER_NAME}
echo "docker started"
docker exec ${DOCKER_NAME} /bin/bash
docker exec ${DOCKER_NAME} chown ${USER_ID}:${GRP_ID} /Port_SLAP_Simulator