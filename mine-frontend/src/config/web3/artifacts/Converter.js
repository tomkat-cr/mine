export const ConverterArtifact = {
    "address": {
        1: process.env.REACT_APP_SC_CONVERTER_ETHEREUM,
        5: process.env.REACT_APP_SC_CONVERTER_GOERLI
    },
    "abi": [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [],
			"name": "getLatestPrice",
			"outputs": [
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
}