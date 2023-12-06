#!/bin/bash

#####################################################################  
# 文件名: build.sh  
#   
# 描述: 该脚本用于构建 Docker 镜像，并使用指定的 Dockerfile 进行构建。  
#  
# 用法:   
#   - 使用命令行运行：bash build_docker_image.sh   
#  
# 注意事项:  
#   - 请确保已安装 Docker，并具备构建镜像的权限  
#  
##################################################################### 

DOCKER_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

docker build -t port/port_simulation --build-arg -f "${DOCKER_PATH}/dev"