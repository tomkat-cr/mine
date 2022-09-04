import { useMemo } from "react";

export const supportedChains = {
    5:  "Goerli Network",
    1:  "Mainnet"
}

const useNetwork = (chainId) => {
  const network = useMemo(
    () => {
        if(!chainId) return "----"
        return supportedChains[parseInt(chainId)]
    },
    [chainId]
  );

  return network;
};

export default useNetwork;