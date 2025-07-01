# Parent-Diary

Parent Diary is a website to help parents keep track of their family life.

## Pre-requisites

- Node v20
- Docker

## Running the project

First clone the project from github. 

We need to build the Next project outside the docker runtime with `cd parent-diary-nextjs-web-app && npm run build`

Then at the root of the repository (`.../Parent-Diary/.`) you can quickly start the project by running `docker-compose up`. Once all three services are running you can access the UI at http://localhost:3000 