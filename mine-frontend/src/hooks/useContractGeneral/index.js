// import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { useToast } from "@chakra-ui/react";

import { MineArtifact } from "../../config/web3/artifacts/Mine";
import { ConverterArtifact } from "../../config/web3/artifacts/Converter";
import { genDebug } from "../../config";
import { chains } from "../../utils";

export let loadedContracts = [];

export function resetContractGeneral() {
    loadedContracts = [];
}

export function useContractGeneral(contractName) {
    const { active, library, chainId } = useWeb3React();
    const toast = useToast();
    let contractItem = {
        'contract': null,
        'error': true,
        'errorMsg': "",
        'errorDetail': "",
    };

    if (typeof loadedContracts[contractName] !== "undefined") {
        if (!library) {
            delete loadedContracts[contractName];
            if (genDebug) {
                console.log("ERROR [UCG-070] Contract reload needed, library not ready");
            }
        } else {
            if (genDebug) {
                console.log(contractName, " already loaded...");
            }
            return loadedContracts[contractName];
        }
    }

    let ContractArtifact;
    switch (contractName) {
        case "Converter":
            ContractArtifact = ConverterArtifact;
            break;
        case "Mine":
            ContractArtifact = MineArtifact;
            break;
        default:
            contractItem["errorMsg"] = "ERROR [UCG-050] Contract name not specified";
    }

    if (contractItem["errorMsg"] !== "") {
        toast({
            title: contractItem["errorMsg"],
            description: contractItem["errorDetail"],
            status: "error",
            duration: 5000,
            isClosable: true,
        });
        return contractItem;
    }

    const { address, abi } = ContractArtifact;

    if (!active) {
        contractItem["errorMsg"] = "ERROR [UCG-060] Web3 connection not active";
        if (genDebug) {
            console.log(contractItem["errorMsg"]);
        }
        return contractItem;
    }

    if (typeof address[chainId] == "undefined") {
        contractItem["errorMsg"] =
            "ERROR [UCG-030] Contract for ChainID: " +
            chains[chainId] +
            " not defined";
    }
    if (contractItem["errorMsg"] === "" && address[chainId] === "") {
        contractItem["errorMsg"] =
            "ERROR [UCG-040] Contract for ChainID: " +
            chains[chainId] +
            " is empty";
    }
    if (contractItem["errorMsg"] === "") {
        try {
        if (genDebug) {
            console.log("Loading ", contractName, " contract:", address[chainId]);
        }
        contractItem["contract"] = new library.eth.Contract(
            abi,
            address[chainId]
        );
        if (genDebug) {
            console.log(contractName, " contract ", address[chainId], " loaded...");
        }
        if (contractItem["contract"]) {
            contractItem["error"] = false;
        } else {
            contractItem["errorMsg"] =
                "ERROR [UCG-010] Could not load " + contractName + " contract...";
        }
        } catch (e) {
            contractItem["errorMsg"] =
                "ERROR [UCG-020] Cannot load " + contractName + " contract";
            if (genDebug) {
                contractItem["errorDetail"] = String(e);
            }
        }
    }
    if (contractItem["errorMsg"] !== "") {
        toast({
            title: contractItem["errorMsg"],
            description: contractItem["errorDetail"],
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    }
    if (genDebug) {
        console.log(contractName, " is being catalogued...");
    }
    loadedContracts[contractName] = contractItem;
    return loadedContracts[contractName];
};
