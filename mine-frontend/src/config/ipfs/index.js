import * as ipfsClient from 'ipfs-http-client'
import { Buffer } from 'buffer'

const auth =
    'Basic ' + Buffer.from(
        `${process.env.REACT_APP_IPFS_PROJECT_ID}:${process.env.REACT_APP_IPFS_PROJECT_SECRET}`
    ).toString('base64')

export const ipfs = ipfsClient.create({
    host: process.env.REACT_APP_IPFS_HOST,
    port: process.env.REACT_APP_IPFS_PORT,
    protocol: process.env.REACT_APP_IPFS_PROTOCOL,
    headers: {
        authorization: auth
    }
})

if (process.env.REACT_APP_DEBUG === '1') {
    console.log('>>--> REACT_APP_SC_CONVERTER_GOERLI', process.env.REACT_APP_SC_CONVERTER_GOERLI)
    console.log('>>--> REACT_APP_SC_CONVERTER_ETHEREUM', process.env.REACT_APP_SC_CONVERTER_ETHEREUM)
    console.log('>>--> REACT_APP_SC_MINE_GOERLI', process.env.REACT_APP_SC_MINE_GOERLI)
    console.log('>>--> REACT_APP_SC_MINE_ETHEREUM', process.env.REACT_APP_SC_MINE_ETHEREUM)
    console.log('>>--> REACT_APP_IPFS_PROJECT_ID', process.env.REACT_APP_IPFS_PROJECT_ID)
    console.log('>>--> REACT_APP_IPFS_PROJECT_SECRET', process.env.REACT_APP_IPFS_PROJECT_SECRET)
    console.log('>>--> REACT_APP_IPFS_HOST', process.env.REACT_APP_IPFS_HOST)
    console.log('>>--> REACT_APP_IPFS_PORT', process.env.REACT_APP_IPFS_PORT)
    console.log('>>--> REACT_APP_IPFS_PROTOCOL', process.env.REACT_APP_IPFS_PROTOCOL)
    console.log('>>--> REACT_APP_IPFS_PUBLIC_URL', process.env.REACT_APP_IPFS_PUBLIC_URL)
}

export const ipfsPublicURL = process.env.REACT_APP_IPFS_PUBLIC_URL