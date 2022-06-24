# QSP-1

## 1. Build containers
```shell
$ docker-compose build
```

## 2. Start validators
```shell
$ docker-compose up validator-a
$ docker-compose up validator-b
$ docker-compose up validator-c
```

## 3. Stake tokens
```shell
$ docker-compose run --rm staker node /asset/staker/stake.js

A joined.
B joined.
C joined.
A staked.
B staked.
C staked.
```

## 4. Check consensus
### validator-a (Evil validator)
Illegal update of environment in block 30.
```
qsp1-validator-a-1  | INFO [06-24|03:48:40.022] Commit new sealing work                  number=30 sealhash=0d11cd..1e9467 uncles=0 txs=0 gas=230,818   elapsed=2.813ms
qsp1-validator-a-1  | INFO [06-24|03:48:40.024] EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL 
qsp1-validator-a-1  | INFO [06-24|03:48:40.024] EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL 
qsp1-validator-a-1  | INFO [06-24|03:48:40.024] EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL 
qsp1-validator-a-1  | INFO [06-24|03:48:40.025] EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL EVIL 
```

### validator-b
Detecting illegal updates.
```
qsp1-validator-b-1  | WARN [06-24|03:48:43.033] Failed to load old bad blocks            error="leveldb: not found"
qsp1-validator-b-1  | ERROR[06-24|03:48:43.035] 
qsp1-validator-b-1  | ########## BAD BLOCK #########
qsp1-validator-b-1  | Chain config: {ChainID: 12345 Homestead: 0 DAO: <nil> DAOSupport: false EIP150: 0 EIP155: 0 EIP158: 0 Byzantium: 0 Constantinople: 0 Petersburg: 0 Istanbul: 0, Muir Glacier: 0, Berlin: 0, London: 0, Arrow Glacier: <nil>, MergeFork: <nil>, Engine: oasys}
qsp1-validator-b-1  | 
qsp1-validator-b-1  | Number: 30
qsp1-validator-b-1  | Hash: 0x291e846e8d82a15973d517be73dfbad90f6a412c7d6af8a51b9389818151a09f
qsp1-validator-b-1  | 
qsp1-validator-b-1  | 
qsp1-validator-b-1  | Error: must not contain system transactions
qsp1-validator-b-1  | ##############################
```

### validator-c
Detecting illegal updates.
```
qsp1-validator-c-1  | WARN [06-24|03:48:43.034] Failed to load old bad blocks            error="leveldb: not found"
qsp1-validator-c-1  | ERROR[06-24|03:48:43.036] 
qsp1-validator-c-1  | ########## BAD BLOCK #########
qsp1-validator-c-1  | Chain config: {ChainID: 12345 Homestead: 0 DAO: <nil> DAOSupport: false EIP150: 0 EIP155: 0 EIP158: 0 Byzantium: 0 Constantinople: 0 Petersburg: 0 Istanbul: 0, Muir Glacier: 0, Berlin: 0, London: 0, Arrow Glacier: <nil>, MergeFork: <nil>, Engine: oasys}
qsp1-validator-c-1  | 
qsp1-validator-c-1  | Number: 30
qsp1-validator-c-1  | Hash: 0x291e846e8d82a15973d517be73dfbad90f6a412c7d6af8a51b9389818151a09f
qsp1-validator-c-1  | 
qsp1-validator-c-1  | 
qsp1-validator-c-1  | Error: must not contain system transactions
qsp1-validator-c-1  | ##############################
```

### Check validators for each block
Show the block validators (miner field in the header) recognized by each validator.
```shell
$ docker-compose run --rm staker node /asset/staker/stake.js

| block | A   | B   | C   |
| 1     | A   | A   | A   |
| 2     | A   | A   | A   |
| 3     | A   | A   | A   |
| 4     | A   | A   | A   |
| 5     | A   | A   | A   |
| 6     | A   | A   | A   |
| 7     | A   | A   | A   |
| 8     | A   | A   | A   |
| 9     | A   | A   | A   |
| 10    | A   | A   | A   |
| 11    | A   | A   | A   |
| 12    | A   | A   | A   |
| 13    | A   | A   | A   |
| 14    | A   | A   | A   |
| 15    | A   | A   | A   |
| 16    | A   | A   | A   |
| 17    | A   | A   | A   |
| 18    | A   | A   | A   |
| 19    | A   | A   | A   |
| 20    | A   | A   | A   |
| 21    | A   | A   | A   |
| 22    | C   | C   | C   |
| 23    | B   | B   | B   |
| 24    | A   | A   | A   |
| 25    | A   | A   | A   |
| 26    | A   | A   | A   |
| 27    | C   | C   | C   |
| 28    | A   | A   | A   |
| 29    | A   | A   | A   |
| 30    | A   | B   | B   |  <- do evil
| 31    | A   | B   | B   |
| 32    | A   | B   | B   |
| 33    | A   | C   | C   |
| 34    | A   | C   | C   |
| 35    | A   | B   | B   |
| 36    | A   | B   | B   |
| 37    | N/A | B   | B   |
| 38    | N/A | C   | C   |
| 39    | N/A | B   | B   |
| 40    | N/A | C   | C   |
```
