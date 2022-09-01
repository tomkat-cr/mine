import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    Icon,
    Button,
    Text
  } from '@chakra-ui/react';
import { GiPayMoney } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { FaEthereum } from 'react-icons/fa';

  const data = {
    isNew: true,
    imageURL:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
  };

  
  function ProductAddToCart() {
    return (
      <Flex display={'inline-flex'} p={2} pb={4} alignItems="center" justifyContent="center">
        <Box
          bg={'white'}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative">
          {data.isNew && (
            <Circle
              size="10px"
              position="absolute"
              top={2}
              right={2}
              bg="green.200"
            />
          )}
  
          <Image
            src={data.imageURL}
            alt={`Picture of ${data.name}`}
            roundedTop="lg"
          />
  
          <Box p="6">
                <Box d="flex" alignItems="baseline">
                {data.isNew && (
                    <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                    Verificado
                    </Badge>
                )}
                </Box>
                <Flex mt="1" justifyContent="space-between" alignContent="center">
                <Box
                    fontSize="2xl"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    mb={2}
                    isTruncated>
                    {data.name}
                </Box>
                <Box fontSize="2xl" color={'gray.800'}>
                    <Box as="span" color={'gray.600'} fontSize="lg">
                    <Icon as={FaEthereum} boxSize={4}/>
                    </Box>
                    {data.price.toFixed(2)}
                </Box>
                </Flex>
            <Box>

                <Text color={'gray.400'} as={'p'} mb={4}>
                    {"Esto es una descripcion del producto que viene en la metadata y me dice todo lo que necesito saber acerca de el y sirve como un gancho para entrar y comprar".substring(0,100)+"..."}
                </Text>
            
                <Button colorScheme={'green'} size={'sm'} rightIcon={<Icon as={GiPayMoney} size={'10'} alignSelf={'center'} />}>
                    Comprar
                </Button>
                <Button as={Link} to={"/product"} variant={'ghost'} ml={2} colorScheme={'blue'} size={'sm'} >
                    Ver más
                </Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    );
  }
  
  export default ProductAddToCart;