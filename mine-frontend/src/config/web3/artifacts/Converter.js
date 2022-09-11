export const Converter = {
    "address": {
        // 5: "0x734345330B47B556a936021bd440C39b26fC3A1A"
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