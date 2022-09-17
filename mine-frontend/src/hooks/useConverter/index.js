import { useCallback, useMemo } from "react";
import { useContractGeneral } from "../useContractGeneral";

const useConverter = () => {
  const { contract } = useContractGeneral('Converter');
  const converter = useMemo(() => {
    return contract;
  }, [contract]);

  const getETHPrice = useCallback(async () => {
    if(converter) {
      return await converter.methods.getLatestPrice().call()
    }
  }, [converter])

  return {converter, getETHPrice};
};

export default useConverter;