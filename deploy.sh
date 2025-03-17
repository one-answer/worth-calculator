#!/bin/bash
VERSION=${1:-v2}
docker build  .  -t aolifu/niuma:$VERSION
docker push aolifu/niuma:$VERSION
docker stop niuma
docker rm niuma
docker run -d --name niuma -p 11013:3000 aolifu/niuma:$VERSION