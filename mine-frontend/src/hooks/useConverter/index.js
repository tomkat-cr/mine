import { useCallback, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { Converter } from "../../config/web3/artifacts/Converter";

const { address, abi } = Converter;

const useConverter = () => {
  const { active, library, chainId } = useWeb3React();

  const converter = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  const getETHPrice = useCallback(async () => {
    return await converter.methods.getLatestPrice().call()
  }, [converter])

  return {converter, getETHPrice};
};

export default useConverter;