import { useMemo } from "react";
import { supportedChains, getChainIdName } from "../../utils";

const useNetwork = (chainId) => {
  const network = useMemo(
    () => {
        let errorMsg = '';
        const { networkName } = getChainIdName();
        if(!chainId) {
          errorMsg = 'Chain ID "' + String(chainId) + '"';
        } else if(typeof supportedChains[chainId] === 'undefined') {
          errorMsg = networkName;
        }
        if(errorMsg !== '') {
          return errorMsg
        }
        return supportedChains[parseInt(chainId)]
    },
    [chainId]
  );

  return network;
};

export default useNetwork;