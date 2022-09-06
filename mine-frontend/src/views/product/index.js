import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    List,
    ListItem,
    Badge,
    Icon,
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
  import { FaEthereum } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useMineFunctions from '../../hooks/useMineFunctions';
  
function Product() {
    const [product, setProduct] = useState({});
    const [isCertifier, setIsCertifier] = useState(false);
    const { tokenId } = useParams()
    const {
      getProduct,
    } = useMineFunctions();

    useEffect(() => {
      getProduct(tokenId).then(rs => setProduct(rs));
    }, [getProduct, tokenId]);



    if (product === undefined || product === null || Object.keys(product).length === 0) {
      return null
    }

    

    return (
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 20 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={product.photo}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {product.name}
              </Heading>
              <Text
                color={'gray.900'}
                fontWeight={300}
                fontSize={'2xl'}>
                
                  <Icon as={FaEthereum} boxSize={4}/> {product.price} 
                  {!product.isCertified && <Badge ml={2} colorScheme={'green'} fontSize={'sm'}>Verificado</Badge>}
                  <Badge ml={2} colorScheme={'purple'} fontSize={'sm'}>{product.productType}</Badge>
              </Text>
            </Box>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={'gray.200'}
                />
              }>
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={'lg'} textAlign={'justify'} color={'gray.800'}>
                  {product.description}
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={'blue.300'}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Caracteristicas
                </Text>
  
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Chronograph</ListItem>
                    <ListItem>Master Chronometer Certified</ListItem>{' '}
                    <ListItem>Tachymeter</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>Anti‑magnetic</ListItem>
                    <ListItem>Chronometer</ListItem>
                    <ListItem>Small seconds</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={'blue.300'}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Caracteristicas
                </Text>
  
                <List spacing={2}>
                  {product.caracteristicas.map(c => 
                    <ListItem key={c['key']}>
                      <Text as={'span'} fontWeight={'bold'}>
                        {c['key']}:
                      </Text>{' '}
                      {c['value']}
                    </ListItem>
                  )}
                </List>
              </Box>
            </Stack>
  
            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              colorScheme={'blue'}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}>
              Comprar
            </Button>
  
            <Stack direction="row" alignItems="center" justifyContent={'center'}>
              <Text>Este producto tiene la validación de un perito</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    );
  }

  export default Product;