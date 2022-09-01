import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image
  } from '@chakra-ui/react';


export default function Benefit(props) {
    return (
      <Center>
        <Box
          mb={20}
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={props.image}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              {props.benefit}
            </Text>
            <Heading fontSize={'xl'} textAlign={'center'} fontFamily={'body'} fontWeight={500}>
              {props.engage}
            </Heading>
          </Stack>
        </Box>
      </Center>
    );
  }

