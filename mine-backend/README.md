# MINE

Mine is a MarketPlace of NFT of property titles of physical personal property (vehicles, motorcycles, boats, among others).
Characteristic:
- Users (buyers, sellers) must connect their Wallet to:
- Check in.
- Login.
- Register new Goods for sale.
- Carry out payment transactions.

There will be a public display of the goods, so observers do not need a wallet to consult and view.

The Goods will be displayed by categories.
The currency to display the prices of the Goods will be US Dollars and the official exchange currency will be ETH.

## Prerequisites
Because this is a Hardhat project it's mandatory next tools.

- Node.js  
[Download Node.js](https://nodejs.org/en/download/)

- Yarn
```shell
npm i -g corepack
```

- Visual Studio Code  
[Download Visual Studio Code](https://code.visualstudio.com/)


- Solidity Extension for Visual Studi Code  
[Download Solidity Extension](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)


## Setting up environment
Install dependencies:
```shell
yarn install
``` 

Compile smart contracts:
```shell
npx hardhat compile
```

Run tests:
```shell
npx hardhat test
```

## Deploy smart contracts using script:  
Local environment:
```shell
npx hardhat run scripts/deploy.js
```

Furthermore it's possible deploy the smart contrats in any of testnets below:
- Rinkeby
- Ropsten
- Goerli
- Kovan
- Sepolia

To deploy in one of testnets above it's possible through next command:
```shell
npx hardhat run scripts/deploy.js --network <testnet>
```
For example:
- Rinkeby testnet:
    ```shell
    npx hardhat run scripts/deploy.js --network rinkeby
    ```
- Ropsten testnet:    
    ```shell
    npx hardhat run scripts/deploy.js --network rinkeby
    ```
- Goerli testnet:    
    ```shell
    npx hardhat run scripts/deploy.js --network rinkeby
    ```
- Kovan testnet:    
    ```shell
    npx hardhat run scripts/deploy.js --network rinkeby
    ```
- Sepolia testnet:    
    ```shell
    npx hardhat run scripts/deploy.js --network rinkeby
    ```

Also in `package.json` file there are some scripts which allow run commands in a shorter way.
- Compile:
    ```shell
    yarn compile
    ```
- Test:
    ```shell
    yarn test
    ```
- Deploy:  
    - Local:
        ```shell
        yarn deploy
        ```
    - Rinkeby testnet:
        ```shell
        yarn deploy:rinkeby
        ```
    - Ropsten testnet:
        ```shell
        yarn deploy:ropsten
        ```
    - Goerli testnet:
        ```shell
        yarn deploy:goerli
        ```
    - Kovan testnet:
        ```shell
        yarn deploy:kovan
        ```
    - Sepolia testnet:
        ```shell
        yarn deploy:sepolia
        ```

## Other useful commands
Help:
```shell
npx hardhat help
```

Gas report running tests:
```shell
GAS_REPORT=true npx hardhat test
```

interact with smart contracts from terminal:
```shell
npx hardhat node
```


## References
[Yarn](https://yarnpkg.com/getting-started/usage)


Made with ❤️ by GOF.