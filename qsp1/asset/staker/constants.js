const contractAddress = "0x0000000000000000000000000000000000002000";

const constractAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "joinValidator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "validator",
        type: "address",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const validators = [
  {
    name: "A",
    operatorAddr: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    ownerKey:
      "0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd",
    ownerWallet: null,
  },
  {
    name: "B",
    operatorAddr: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    ownerKey:
      "0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0",
    ownerWallet: null,
  },
  {
    name: "C",
    operatorAddr: "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    ownerKey:
      "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
    ownerWallet: null,
  },
];

module.exports = {
  contractAddress,
  constractAbi,
  validators,
};
