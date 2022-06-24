const Web3 = require("web3");
const constants = require("./constants");

const main = async () => {
  const web3s = {};
  const addrToName = {};
  let header = "| block |";
  let highestBlock = 0;

  for (let validator of constants.validators) {
    // create web3
    web3s[validator.name] = new Web3(
      new Web3.providers.HttpProvider(`http://${validator.name}:8545/`)
    );

    // fetch latest block number
    const blockNumber = await web3s[validator.name].eth.getBlockNumber();
    if (blockNumber > highestBlock) {
      highestBlock = blockNumber;
    }

    // create table header
    header += ` ${validator.name}   |`;

    // create address -> name mapping
    addrToName[validator.operatorAddr.toLowerCase()] = validator.name;
  }

  // fetch block validator
  const blockValidators = [];
  for (let blockNumber = 1; blockNumber <= highestBlock; blockNumber++) {
    blockValidators.push([]);

    for (let validator of constants.validators) {
      const block = await web3s[validator.name].eth.getBlock(blockNumber);
      if (block) {
        blockValidators[blockNumber - 1].push(
          addrToName[block.miner.toLowerCase()]
        );
      } else {
        blockValidators[blockNumber - 1].push("N/A");
      }
    }
  }

  // output
  console.log(header);
  blockValidators.map((validators, blockNumber) => {
    const bn = (blockNumber + 1 + "").padEnd(5);
    console.log(
      `| ${bn} | ${validators.map((y) => y.padEnd(3)).join(" | ")} |`
    );
  });
};

main();
