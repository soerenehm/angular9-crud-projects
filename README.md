# CRUD Application for Project Administration.

Angular 9 Project to create, read, update and delete IT projects.

## 1. Project Installation

Download and install [Node.js](https://nodejs.org/en/download/) including `npm` as package manager.

Run `npm install` inside project folder to install all dependencies.

## 2. Project Start 

Executing script `./start.sh` starts following: 

1. JSON Server docker image, REST API mocking based on plain JSON (https://github.com/clue/docker-json-server). 
Changes beside of given projects written in projects.json are only temporarily.  

2. Starts Angular Project

## 3. Project Stop

Type `ctrl-c` removes automatically docker container and stops angular project serving.
