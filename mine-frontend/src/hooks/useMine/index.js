import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { MineArtifact } from "../../config/web3/artifacts/Mine";

const { address, abi } = MineArtifact;

const useMine = () => {
  const { active, library, chainId } = useWeb3React();

  const mine = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return mine;
};

export default useMine;