#!/usr/bin/env bash
set -eu

IMAGE_NAME="ehms/json-server"
CONTAINER_NAME="json-server"

usage()
{
cat <<EOF

usage: $0 options

This script starts at first a local REST API Mock Server and then the current Angular Project

EOF
}

build() {
  if [[ -z $(docker ps -a | grep "${CONTAINER_NAME}") ]]; then
    echo "Build docker image"
    docker build -t "$IMAGE_NAME" .
    echo "Create docker container"
    docker create -p 80:80 -v $(pwd)/db.json:/data/db.json --name "${CONTAINER_NAME}" "${IMAGE_NAME}"
  else
    echo "Docker container already created"
  fi
}

start() {
  docker start "${CONTAINER_NAME}"
  ng serve --open
}

cleanup() {
  if [[ ! -z $(docker ps | grep "${CONTAINER_NAME}") ]]; then
    echo "Stop docker container"
    docker stop -t 5 "${CONTAINER_NAME}"
  fi
}


trap cleanup EXIT

build

start
