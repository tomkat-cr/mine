import {
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
    Icon
  } from '@chakra-ui/react';
import { AiFillTwitterCircle } from "react-icons/ai";
  
  export default function MemberCard({githubUser, name, description, linkedinUser, twitterUser, charge}) {
    return (
      <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: '100%', md: '540px' }}
          height={{ sm: '476px', md: '20rem' }}
          direction={{ base: 'column', md: 'row' }}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          padding={4}>
          <Flex flex={1} bg="blue.200">
            <Image
              objectFit="cover"
              boxSize="100%"
              src={`https://avatars.githubusercontent.com/${githubUser}`}
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}>
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {name}
            </Heading>
            <Badge colorScheme={'blue'}>
              {charge}
            </Badge>
            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3} mb={4}>
              {description}
            </Text>

            <Text as={'a'} target={'_blank'} rel={'nofollow'} href={`https://twitter.com/${twitterUser}`} fontWeight={600} color={'gray.500'} size="sm" mb={4}>
              <Icon as={AiFillTwitterCircle} boxSize={3}/> {twitterUser}
            </Text>
        
            <Stack
              width={'100%'}
              mt={'2rem'}
              direction={'row'}
              padding={2}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Button
                as={'a'}
                href={`https://github.com/${githubUser}/`}
                target={'_blank'}
                rel={'nofollow'}
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                _focus={{
                  bg: 'gray.200',
                }}>
                GitHub
              </Button>
              <Button
                as={'a'}
                href={`https://www.linkedin.com/in/${linkedinUser}/`}
                target={'_blank'}
                rel={'nofollow'}
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Linkedin
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    );
  }