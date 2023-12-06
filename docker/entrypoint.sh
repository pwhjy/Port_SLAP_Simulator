#!/bin/bash
addgroup --gid "$DOCKER_GRP_ID" "$DOCKER_GRP"
adduser --disabled-password --gecos '' "$DOCKER_USER" \
    --uid "$DOCKER_USER_ID" --gid "$DOCKER_GRP_ID" 2>/dev/null
usermod -aG sudo,video,audio "$DOCKER_USER"
sudo rsync -lrKog --chown=${DOCKER_USER_ID}:${DOCKER_GRP_ID} /etc/skel/. /home/${DOCKER_USER}
chsh -s /usr/bin/zsh $DOCKER_USER
su $DOCKER_USER
sudo -EHu ${DOCKER_USER} "$@"