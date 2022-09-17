import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  Icon,
  Button,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaDollarSign, FaEthereum } from "react-icons/fa";
import { useState, useEffect } from "react";

import useMineFunctions from "../../../hooks/useMineFunctions";
import useTRM from "../../../hooks/useTRM";
import useConverter from "../../../hooks/useConverter";

function ProductAddToCart({ filter, tokenId }) {
  const [product, setProduct] = useState({});
  const { getProduct } = useMineFunctions();

  const {getETHPrice} = useConverter()
  const {getCopExchange} = useTRM()
  const [copExchange, setCopExchange] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [copPrice, setCopPrice] = useState(0);
  const [usdPrice, setUsdPrice] = useState(0);

  useEffect(() => {
    getProduct(tokenId).then((rs) => setProduct(rs));
  }, [getProduct, tokenId]);

  useEffect(() => {
    getETHPrice().then(rs => setEthPrice(rs / 1e8))
  }, [getETHPrice])

  useEffect(() => {
    getCopExchange().then(exchange => setCopExchange(exchange))
  }, [getCopExchange])

  useEffect(() => {
    if(product && typeof product.price !== 'undefined') {
      setUsdPrice((parseFloat(product.price) * parseFloat(ethPrice)).toFixed(4));
    }
  }, [product, ethPrice])

  useEffect(() => {
      setCopPrice((parseFloat(usdPrice) * parseFloat(copExchange)).toFixed(2));
  }, [copExchange, usdPrice])

  if (
    product === undefined ||
    product === null ||
    Object.keys(product).length === 0
  ) {
    return null;
  }

  const keyFilter = Object.keys(filter)[0];
  if (product[keyFilter] !== filter[keyFilter]) {
    return null;
  }

  return (
    <Flex
      display={"inline-flex"}
      p={2}
      pb={4}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg={"white"}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {product.isVerified && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="green.200"
          />
        )}

        <Image
          src={product.photo}
          alt={`Picture of ${product.name}`}
          roundedTop="lg"
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {product.isVerified && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                Verificado
              </Badge>
            )}
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="purple">
              {product.productType}
            </Badge>
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              mb={2}
            >
              {product.name}
            </Box>
          </Flex>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box fontSize="md" color={"gray.800"}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                <Icon as={FaEthereum} boxSize={4} />
              </Box>
              {parseFloat(product.price).toFixed(2)}
            </Box>
            <Box fontSize="md" color={"gray.800"}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                <Icon as={FaDollarSign} boxSize={4} />
              </Box>
              {(usdPrice*1).toLocaleString(undefined, {maximumFractionDigits:2})}
            </Box>
            <Box fontSize="md" color={"gray.800"}>
              <Box as="span" color={"gray.600"} fontSize="lg">
              <Badge ml={0} colorScheme={"white"} fontSize={"sm"}>COP</Badge>
              </Box>
              {(copPrice*1).toLocaleString(undefined, {maximumFractionDigits:2})}
            </Box>
          </Flex>
          <Box>
            <Text color={"gray.400"} as={"p"} mb={4}>
              {product.description.substring(0, 100) + "..."}
            </Text>

            <Button
              as={Link}
              to={`/product/${tokenId}`}
              w={"100%"}
              rounded={"none"}
              colorScheme={"blue"}
              size={"sm"}
            >
              Ver más
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductAddToCart;
