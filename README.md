# Parent-Diary

Parent Diary is a website to help parents keep track of their family life.

## Pre-requisites

- Node v20
- Docker

## Running the project

▶️ Youtube demo video

[![Watch the video](https://img.youtube.com/vi/8K7TqBZTL-w/maxresdefault.jpg)](https://youtu.be/8K7TqBZTL-w)

First clone the project from github. 

Then open the project in your IDE and open a terminal at the root of the repository.
Set up your .env files from the examples. (Please note that you must provide real email credentials to be able to send emails, since the credentials shall not be stored in a git repository)

We need to install the dependencies and build the Next project outside the docker runtime with `cd parent-diary-nextjs-web-app && npm i && npm run build`

Then at the root of the repository (`.../Parent-Diary/.`) you can quickly start the project by running `docker-compose up`. Once all three services are running you can access the UI at http://localhost:3000 

## Example credentials

email: example@example.com
password: Password1234
recovery code: 12f552ceac29732fea6d716538c68719ec9afbfe63e86ceab6e59824c2e77fad *(When using a recovery code you can leave the otp field blank)