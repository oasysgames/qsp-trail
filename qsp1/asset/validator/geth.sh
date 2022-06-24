#!/bin/sh

set -eu

DATA_DIR=/data/$HOSTNAME
CMD="/usr/local/bin/geth --datadir $DATA_DIR"
KEY_FILE=$(mktemp)

if [ ! -d $DATA_DIR/geth ]; then
  echo $PRIVATE_KEY | cut -c 3-99 > $KEY_FILE
  $CMD account import --password /dev/null $KEY_FILE
  $CMD init $GENESIS_JSON
fi

exec $CMD \
  --syncmode full --gcmode archive \
  --bootnodes $BOOTNODE --networkid $CHAIN_ID \
  --mine --miner.etherbase $ETHERBASE --miner.gaslimit 30000000 \
  --unlock $ETHERBASE --password /dev/null --allow-insecure-unlock \
  --http --http.addr 0.0.0.0 --http.port 8545 --http.vhosts '*' --http.api net,eth,shh,web3
