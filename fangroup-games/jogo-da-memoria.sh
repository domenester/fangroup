#!/bin/bash
cd C:\\Users\\Note Dell 2\\Desktop\\jogo-da-memoria\\fangroup-main\\fangroup-main\\fangroup-games
docker rm $(docker stop $(docker ps -a -q --filter ancestor=fangroup --format=\"{{.ID}}\"))
docker build --tag "fangroup" .
docker run -p 3000:3000 --restart=unless-stopped --detach fangroup