import { useMemo } from "react";
import { useContractGeneral } from "../useContractGeneral";

const useMine = () => {
  const { contract } = useContractGeneral('Mine');
  const mine = useMemo(() => {
      return contract;
  }, [contract]);

  return mine;
};

export default useMine;