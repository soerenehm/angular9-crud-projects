#!/usr/bin/env bash
set -eu

IMAGE_NAME="clue/json-server"
CONTAINER_NAME="json-server"

usage()
{
cat <<EOF

usage: $0 options

This script starts at first a local REST API Mock Server and then the current Angular Project

EOF
}

start() {
  local args=$@
  docker run -d -p 80:80 -v $(pwd)/projects.json:/data/db.json --name "${CONTAINER_NAME}" "${IMAGE_NAME}" $args

  ng serve --open
}

cleanup() {
  if [[ ! -z $(docker ps | grep "${CONTAINER_NAME}") ]]; then
    echo "Stop docker container"
    docker stop -t 5 "${CONTAINER_NAME}"

    echo "Remove docker container"
    docker rm "${CONTAINER_NAME}"
  fi
}


trap cleanup EXIT

start
