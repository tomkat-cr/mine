import {
    Heading,
    Avatar,
    Box,
    Center,
    Icon,
    Flex,
    Text,
    Stack,
    useColorModeValue,
    Divider,
  } from '@chakra-ui/react';
  import { FaEthereum } from 'react-icons/fa';
import useWalletData from '../../hooks/useWalletData';
import ProductAddToCart from '../../layouts/internal/card';
import { ButtonConnection } from '../../layouts/internal/wallet';
  
  export default function Profile() {
    const {address, network, unsupportedChain, connect, disconnect, active, balance} = useWalletData()
    return (
    <Box minH={'100vh'}>

    
      <Center py={6} bg={'gray.50'}>
        <Box
          maxW={'270px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'md'}
          rounded={'md'}
          mt={12}>

          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={
                'https://cdn-icons-png.flaticon.com/512/149/149071.png'
              }
              alt={'Author'}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
  
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {address}
              </Heading>
              <Text color={'gray.500'}>{network}</Text>
            </Stack>
  
            <Stack direction={'row'} justify={'center'} mb={4} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>10</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Productos
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}><Icon as={FaEthereum} boxSize={3}/>{balance}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Saldo
                </Text>
              </Stack>
            </Stack>
            { active ?
                  <ButtonConnection connect={disconnect} active={active} unsupportedChain={unsupportedChain}/>
                  : <ButtonConnection connect={connect} active={active} unsupportedChain={unsupportedChain}/>
              }
          </Box>
        </Box>
      </Center>
      <Divider/>
      <Flex maxW={'100%'} wrap={'wrap'} alignItems='center'justifyContent={'center'} mt={4} mb={4} gap='2'>
            {[1,2,3,4,5,6,7,8,9,10].map((el, i) => <ProductAddToCart key={i}/>)}
        </Flex>
    </Box>
    );
  }