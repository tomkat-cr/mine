import {
    Heading,
    Avatar,
    Box,
    Center,
    Icon,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    Divider,
  } from '@chakra-ui/react';
  import { FaEthereum } from 'react-icons/fa';
import ProductAddToCart from '../../layouts/internal/card';
  
  export default function Profile() {
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
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
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
                0xAEB...E251
              </Heading>
              <Text color={'gray.500'}>Tesnet Network</Text>
            </Stack>
  
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>10</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Productos
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}><Icon as={FaEthereum} boxSize={3}/>17</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Saldo
                </Text>
              </Stack>
            </Stack>
  
            <Button w={'100%'} size={'md'} mt={8} colorScheme='red' variant='outline'>Desconectar wallet</Button>
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