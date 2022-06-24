const Web3 = require("web3");
const constants = require("./constants");

const logger = (s) => process.stdout.write(s + "\n");

const joinValidator = async (contract, validator) => {
  const method = contract.methods.joinValidator(validator.operatorAddr);
  const params = {
    from: validator.ownerWallet.address,
  };
  params.gas = await method.estimateGas(params);
  return await method.send(params);
};

const stake = async (contract, validator) => {
  const method = contract.methods.stake(validator.ownerWallet.address);
  const params = {
    from: validator.ownerWallet.address,
    value: Web3.utils.toWei("10000000", "ether"),
  };
  params.gas = await method.estimateGas(params);
  return await method.send(params);
};

const main = async () => {
  // create web3
  const web3 = new Web3(
    new Web3.providers.HttpProvider(`http://${constants.validators[0].name}:8545/`)
  );

  // register wallet
  for (let x of constants.validators) {
    x.ownerWallet = web3.eth.accounts.privateKeyToAccount(x.ownerKey);
    web3.eth.accounts.wallet.add(x.ownerWallet);
  }

  // create contract
  const contract = new web3.eth.Contract(
    constants.constractAbi,
    constants.contractAddress
  );

  // join
  const joins = await Promise.all(constants.validators.map(x => joinValidator(contract, x)))
  joins.forEach((_, i) => logger(`${constants.validators[i].name} joined.`))

  // stake
  const stakes = await Promise.all(constants.validators.map(x => stake(contract, x)))
  stakes.forEach((_, i) => logger(`${constants.validators[i].name} staked.`))
};

main();
