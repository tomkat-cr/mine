import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import useMine from "../useMine";
import axios from 'axios'

const USERS_TYPES = ['admin', 'certifier', 'user']

export const FEE_TYPES = [
  "Certifier_Registration",     // 0
  "User_Registration",          // 1 
  "Product_Registration",       // 2
  "Product_Transfer"            // 3
]

const useMineFunctions = () => {
    const {account, library } = useWeb3React()
    const mine = useMine()

    const getFee = useCallback(async (feeNumber) => {
        if (mine) {
          return await mine.methods.fees(feeNumber).call()
        }
    }, [mine])

    const setFee = useCallback(async (feeNumber, feeAmount) => {
        if (mine) {
          return await mine.methods.setFee(feeNumber, feeAmount).send({from: account})
        }
    }, [mine, account])


    const isCertifier = useCallback(async () => {
        if (mine) {
          return await mine.methods.hasRole(library.utils.asciiToHex("USER_ROLE"), account).call()
        }
    }, [account, mine, library?.utils])

    const isAdmin = useCallback(async () => {
        if (mine) {
          return await mine.methods.hasRole(library.utils.asciiToHex(""), account).call()
        }
    }, [account, mine, library?.utils])

    const isUser = useCallback(async () => {
        if (mine) {
          return await mine.methods.hasRole(library.utils.asciiToHex("USER_ROLE"), account).call()
        }
    }, [account, mine, library?.utils])

    const guessUserType = useCallback(async () => {
        if (mine) {
            const userType = await Promise.all([isAdmin(), isCertifier(), isUser()])
            const index = userType.findIndex(isType => isType === true)
            return index >= 0 ? USERS_TYPES[index] : ''
        }
    }, [mine, isAdmin, isCertifier, isUser])


    const getCertifier = useCallback(async (account) => {
      if (mine) {
        const metadataURL = await mine.methods.certifiers(account).call()
        const data = await axios.get(metadataURL).then(response => response.data)
        return data
      }
  }, [mine])

    const registerAsCertifier = useCallback(async (metadata) => {
        if (mine) {
          const fee = await getFee(FEE_TYPES.findIndex(type => type === 'Certifier_Registration'))
          return await mine.methods.registerAsCertifier(metadata).send({
            from: account,
            value: fee
          })
        }
    }, [account, mine, getFee])

    const acceptCertifier = useCallback(async (certifierAddress) => {
        if (mine) {
          return await mine.methods.acceptCertifier(certifierAddress).send({from: account})
        }
    }, [account, mine])

    const removeCertifier = useCallback(async (certifierAddress) => {
        if (mine) {
          return await mine.methods.removeCertifier(certifierAddress).send({from: account})
        }
    }, [account, mine])

    const isCertifierAccepted = useCallback(async (account) => {
        if (mine) {
          return await mine.methods.reviewedCertifiers(account).call()
        }
    }, [mine])

    const currentAccountIsCertifierAccepted = useCallback(async () => {
      return isCertifierAccepted(account)
    }, [isCertifierAccepted, account])
  
    return {
      getFee,
      setFee,
      isAdmin,
      isCertifier,
      isUser,
      guessUserType,
      getCertifier,
      registerAsCertifier,
      acceptCertifier,
      removeCertifier,
      isCertifierAccepted,
      currentAccountIsCertifierAccepted
    };
};

export default useMineFunctions;