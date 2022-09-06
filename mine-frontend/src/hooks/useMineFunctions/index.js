import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import useMine from "../useMine";
import axios from 'axios'
import { ipfsPublicURL } from "../../config/ipfs";

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
          return await mine.methods.hasRole("0x65cb1d8422cdf0328f26b49e42e9f4524474c431da623cbe0ea455f1b67c9f77", account).call()
        }
    }, [account, mine])

    const isAdmin = useCallback(async () => {
        if (mine) {
          return await mine.methods.hasRole(library.utils.asciiToHex(""), account).call()
        }
    }, [account, mine, library?.utils])

    const isUser = useCallback(async () => {
        if (mine) {
          return await mine.methods.hasRole("0x14823911f2da1b49f045a0929a60b8c1f2a7fc8c06c7284ca3e8ab4e193a08c8", account).call()
        }
    }, [account, mine])

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
          // TODO ELiminar replace de la metadata
          const data = await axios.get(`${ipfsPublicURL}/${new URL(metadataURL).pathname.split("/")[2]}`).then(response => response.data)
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

    const registerAsUser = useCallback(async (metadata) => {
        if (mine) {
          const fee = await getFee(FEE_TYPES.findIndex(type => type === 'User_Registration'))
          return await mine.methods.registerUser(metadata).send({
            from: account,
            value: fee
          })
        }
    }, [account, mine, getFee])

    const getUser = useCallback(async (account) => {
        if (mine) {
          const metadataURL = await mine.methods.users(account).call()
          // TODO ELiminar replace de la metadata
          const data = await axios.get(`${ipfsPublicURL}/${new URL(metadataURL).pathname.split("/")[2]}`).then(response => response.data)
          return data
        }
    }, [mine])

    const registerProduct = useCallback(async (metadata, price) => {
      if (mine) {
          const fee = await getFee(FEE_TYPES.findIndex(type => type === 'Product_Registration'))
          return await mine.methods.safeMint(account, metadata, price).send({
            from: account,
            value: fee
          })
        }
    }, [account, mine, getFee])

    const certifyProduct = useCallback(async (tokenId, metadata) => {
      if (mine) {
          return await mine.methods.certify(tokenId, metadata).send({
            from: account,
          })
        }
    }, [mine, account])

    const getProduct = useCallback(async (tokenId) => {
        if (mine) {
          const metadataURL = await mine.methods.tokenURI(tokenId).call()
          // TODO ELiminar replace de la metadata
          const data = await axios.get(`${ipfsPublicURL}/${new URL(metadataURL).pathname.split("/")[2]}`).then(response => response.data)
          return data
        }
    }, [mine])

    const getDataFromSeller = useCallback(async (tokenId) => {
        if (mine) {
          const sellerAddress = await mine.methods.ownerOf(tokenId).call()
          return await getUser(sellerAddress)
        }
    }, [mine, getUser])

    const isOwner = useCallback(async (tokenId) => {
        if (mine) {
          const isOwner = await mine.methods.ownerOf(tokenId).call()
          return isOwner === account
        }
    }, [mine, account])

    const buyProduct = useCallback(async (tokenId, price) => {
      if (mine) {
          const fee = await getFee(FEE_TYPES.findIndex(type => type === 'Product_Transfer'))
          return await mine.methods.buyProduct(tokenId, fee).send({
            from: account,
            value: library.utils.toWei(price)
          })
        }
    }, [mine, account, library?.utils, getFee])

    const getLatestToken = useCallback(async () => {
      if (mine) {
          return await mine.methods.getCurrentTokenId().call()
        }
    }, [mine])

    const getCertifiersAccepted = useCallback(async () => {
      if (mine) {
          return await mine.methods.getAllCertifiersAccounts().call()
        }
    }, [mine])
    
    const getCertifiersPending = useCallback(async () => {
      if (mine) {
          return await mine.methods.getAllUnCertifiersAccounts().call()
        }
    }, [mine])

  
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
      currentAccountIsCertifierAccepted,
      registerAsUser,
      getUser,
      registerProduct,
      getProduct,
      getDataFromSeller,
      certifyProduct,
      isOwner,
      buyProduct,
      getLatestToken,
      getCertifiersAccepted,
      getCertifiersPending
    };
};

export default useMineFunctions;