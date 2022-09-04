import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { connector } from "../../config/web3";
import useNetwork from "../useNetwork";
import useTruncatedAddress from "../useTruncatedAddress";

const useWalletData = () => {
    const [balance, setBalance] = useState(0)
    const {activate, active, account, error, deactivate, chainId, library } = useWeb3React()
    const address = useTruncatedAddress(account)
    const network = useNetwork(chainId)
    const unsupportedChain = error instanceof UnsupportedChainIdError

    // Balance handling
    const getBalance = useCallback(async () => {
        const weiBalance = await library.eth.getBalance(account)
        setBalance((weiBalance/1e18).toFixed(2))
    }, [library?.eth, account])

    useEffect(() => {
        if (active) getBalance()
    }, [active, getBalance])

    // Connection handling
    const connect = useCallback(() => {
        activate(connector)
        localStorage.setItem("prevConn", "true")
    }, [activate])

    const disconnect = () => {
        deactivate()
        localStorage.removeItem("prevConn")
    }

    useEffect(() => {
        if (localStorage.getItem("prevConn") === "true") connect()
    }, [connect])

  return {address, network, error, unsupportedChain, connect, disconnect, active, balance};
};

export default useWalletData;