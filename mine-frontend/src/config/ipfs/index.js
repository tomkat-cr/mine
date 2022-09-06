import * as ipfsClient from 'ipfs-http-client'
import { Buffer } from 'buffer'

const projectId = "2EGwJkUiWqirwBb0KU9DJcKqiE4"
const projectSecret = "486ca5c02edf0db6dabb3c811055c3f2"
const REACT_APP_IPFS_HOST = "infura-ipfs.io"
const REACT_APP_IPFS_PORT = 5001
const REACT_APP_IPFS_PROTOCOL = "https"
const REACT_APP_IPFS_PUBLIC_URL = "https://infura-ipfs.io/ipfs"
const REACT_APP_DEBUG = false

const auth =
    'Basic ' + Buffer.from(`${projectId}:${projectSecret}`).toString('base64')

export const ipfs = ipfsClient.create({
    host: REACT_APP_IPFS_HOST,
    port: REACT_APP_IPFS_PORT,
    protocol: REACT_APP_IPFS_PROTOCOL,
    headers: {
        authorization: auth
    }
})

if (REACT_APP_DEBUG) {
    console.log('>>--> projectId', projectId)
    console.log('>>--> projectSecret', projectSecret)
    console.log(
        '>>--> REACT_APP_IPFS_HOST',
        REACT_APP_IPFS_HOST
    )
    console.log(
        '>>--> REACT_APP_IPFS_PORT',
        REACT_APP_IPFS_PORT
    )
    console.log(
        '>>--> REACT_APP_IPFS_PROTOCOL',
        REACT_APP_IPFS_PROTOCOL
    )
    console.log(
        '>>--> REACT_APP_IPFS_PUBLIC_URL',
        REACT_APP_IPFS_PUBLIC_URL
    )
}

export const ipfsPublicURL = REACT_APP_IPFS_PUBLIC_URL