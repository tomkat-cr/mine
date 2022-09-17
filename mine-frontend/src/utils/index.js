// https://besu.hyperledger.org/en/stable/public-networks/concepts/network-and-chain-id/
export const chains = {
    1:  "Mainnet",
    5:  "Goerli Network",
    11155111:  "Sepolia Network",
    4:  "Rinkeby (deprecated)",
    3:  "Ropsten (deprecated)",
    42: "Kovan (deprecated)",
    2:  "Morden (deprecated)",
}

export const supportedChains = {
    5: chains[5],
    1: chains[1]
}

export const getChainIdName = ((chainId) => {
    let networkName = (typeof chains[chainId] === 'undefined' ? 
        '-Unknown chainId "' + String(chainId) + '"-' : chains[chainId]
    );
    return {networkName: networkName};
});
