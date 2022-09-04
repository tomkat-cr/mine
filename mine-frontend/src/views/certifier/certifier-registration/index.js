import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function CertifierRegistration() {
    return (
      <Flex
        minH={'calc(100vh - 130px)'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Registrate como Perito</Heading>
            <Text fontSize={'md'} textAlign={'center'} color={'gray.600'}>
              Debes estar certificado por los organismos correspondientes
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="name">
                <FormLabel>Nombre completo</FormLabel>
                <Input required type="text" />
              </FormControl>
              <FormControl id="cedula">
                <FormLabel>Cedula</FormLabel>
                <Input required type="text" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Correo Electronico</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="tel">
                <FormLabel>Numero telefonico</FormLabel>
                <Input type="tel" />
              </FormControl>
              <FormControl id="titulo">
                <FormLabel>Certificado de perito</FormLabel>
                <Input border={'none'} type="file" />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Registrarme
                </Button>
              </Stack>
              <Text as={'small'}>La verificación puede tardar un par de horas</Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
}