import { CheckCircleIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Heading,
  Avatar,
  Box,
  Icon,
  Flex,
  Text,
  Stack,
  HStack,
  Button,
  Divider,
  VStack
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { Link } from "react-router-dom";
import useMineFunctions from "../../../hooks/useMineFunctions";
import useWalletData from "../../../hooks/useWalletData";
import { ButtonConnection } from "../../../layouts/internal/wallet";
import { openFileBase64 } from "../../admin-dashboard/certifiers-table-row";

export default function ProfileUser() {
  const {
    address,
    network,
    unsupportedChain,
    connect,
    disconnect,
    active,
    balance,
  } = useWalletData();

  const {account} = useWeb3React()
  const {getUser} = useMineFunctions()

  const [certifier, setCertifier] = useState({
    name: '',
    cedula: '',
    email: '',
    tel: '',
    file: '',
  });

  useEffect(() => {
    getUser(account).then(rs => setCertifier(rs))
  }, [getUser, account])

  const [isApproved, setIsApproved] = useState(false);
  const {
    currentAccountIsCertifierAccepted
  } = useMineFunctions()

  useEffect(() => {
    currentAccountIsCertifierAccepted().then(
      isApproved => setIsApproved(isApproved)
    )
  }, [currentAccountIsCertifierAccepted])

  return (
    <Box minH={"calc(100vh - 130px)"}>
      
      <HStack wrap={'wrap'} justifyContent={'center'} py={6} bg={"gray.50"}>
        <Box
          maxW={"270px"}
          w={"full"}
          bg={"white"}
          boxShadow={"md"}
          rounded={"md"}
          mt={12}
          mb={6}
        >
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt={"Author"}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>

          <Box p={6}>
        
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {address}
              </Heading>
              {isApproved ? 
                <HStack spacing={2} pt={2}><Text color={"gray.500"}>Perito Verificado</Text><CheckCircleIcon color={'blue.500'}/></HStack>
                : <Text color={"gray.500"}>{network}</Text>
              }
            </Stack>

            <Stack direction={"row"} justify={"center"} mb={4} spacing={6}>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>10</Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Bienes
                </Text>
              </Stack>
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>
                  <Icon as={FaEthereum} boxSize={3} />
                  {balance}
                </Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Saldo
                </Text>
              </Stack>
            </Stack>
            
            {active ? (
              <ButtonConnection
                connect={disconnect}
                active={active}
                unsupportedChain={unsupportedChain}
              />
            ) : (
              <ButtonConnection
                connect={connect}
                active={active}
                unsupportedChain={unsupportedChain}
              />
            )}
            <Divider my={2}/>
            <Button w={'100%'} size={'xs'} as={Link} to={'/bienes/registrar/'} disabled={unsupportedChain} colorScheme={'blue'}>Registrar un nuevo bien</Button>
          </Box>
        </Box>
        {certifier?.name && <Information {...certifier} />}
      </HStack>
      
    </Box>
  );
}

const Information = ({name, cedula, email, tel, file}) => {

  return (
    <VStack  bg={'white'} w={"270px"} p={5} my={5} shadow={'lg'} alignItems={'start'} spacing={4} rounded={'md'} wrap={'wrap'}>
      <Box>
          <Heading fontSize='md' textAlign={'left'}>Nombre:</Heading>
          <Text ml={2}>{name}</Text>
      </Box>
      <Box>
          <Heading fontSize='md' textAlign={'left'}>ID:</Heading>
          <Text ml={2}>{cedula}</Text>
      </Box>
      <Box>
          <Heading fontSize='md' textAlign={'left'}>Correo Electronico:</Heading>
          <Text ml={2}>{email}</Text>
      </Box>
      <Box>
          <Heading fontSize='md' textAlign={'left'}>Numero Telefonico:</Heading>
          <Text ml={2}>{tel}</Text>
      </Box>
      <Box>
          <Heading fontSize='md' textAlign={'left'}>Certificado de identidad:</Heading>
          <Button
            colorScheme={"blue"}
            variant={"ghost"}
            size={"xs"}
            onClick={() => openFileBase64(encodeURI(file))}
          >
            <ExternalLinkIcon color={"blue.700"} mx="2px" />
          </Button>
      </Box>
    </VStack>
  )
  }