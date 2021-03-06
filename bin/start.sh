#!/bin/bash
#git clone https://github.com/ixofoundation/ixo-block-sync.git
#cd ixo-block-sync
#green=`tput setaf 2`
echo "***********************************"
echo "* IXO BLOCK SYNC                  *"
echo "***********************************"
echo ""
echo "Build IXO Block Sync"
CURRENT_DIR=`dirname $0`
ROOT_DIR=$CURRENT_DIR/..

$ROOT_DIR/node_modules/typescript/bin/tsc 
docker build -t trustlab/ixo-block-sync $ROOT_DIR

docker-compose up --no-start
# docker-compose create
docker-compose start block-sync-db

# attempting to wait for mongodb to be ready
$ROOT_DIR/bin/wait-for-service.sh block-sync-db 'waiting for connections on port' 10
docker-compose start ixo-block-sync

echo -n "Starting IXO Block Sync ..."
sleep 5
echo ${green} "done"
docker-compose logs --tail 13 ixo-block-sync
echo ""
echo "***********************************"
echo "* IXO BLOCK SYNC COMPLETE          *"
echo "***********************************"
docker-compose ps