import { ExternalLinkIcon } from "@chakra-ui/icons";
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
  List,
  ListItem,
  Badge,
  Icon,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Modal,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Divider,
  useToast
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaDollarSign, FaEthereum } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ipfs, ipfsPublicURL } from "../../config/ipfs";
import useMineFunctions from "../../hooks/useMineFunctions";
import { useNavigate } from 'react-router-dom';
import useTRM from "../../hooks/useTRM";
import useConverter from "../../hooks/useConverter";

const openFileBase64 = base64String => {
  let pdfWindow = window.open("");
  pdfWindow.document.write(
    "<iframe width='100%' height='100%' src='" + base64String + "'></iframe>"
  );
};
function Product() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const disclosure = useDisclosure();
  
  const finalRef = useRef(null);  const [product, setProduct] = useState({});
  const [userisOwner, setUserIsOwner] = useState(false);
  const [user, setUser] = useState();
  const { tokenId } = useParams();
  const [userIsCertifier, setUserIsCertifier] = useState(false);
  const [userIsUser, setUserIsUser] = useState(false);
  const { getProduct, getDataFromSeller, isCertifier, isOwner, isUser } = useMineFunctions();
  const navigate = useNavigate();

  const {getETHPrice} = useConverter()
  const {getCopExchange} = useTRM()
  const [copExchange, setCopExchange] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [copPrice, setCopPrice] = useState(0);
  const [usdPrice, setUsdPrice] = useState(0);

  useEffect(() => {
    getProduct(tokenId).then(rs => setProduct(rs));
  }, [getProduct, tokenId]);

  useEffect(() => {
    isOwner(tokenId).then(rs => setUserIsOwner(rs));
  }, [isOwner, tokenId]);

  useEffect(() => {
    getDataFromSeller(tokenId).then(rs => setUser(rs));
  }, [getDataFromSeller, tokenId]);

  useEffect(() => {
    isCertifier().then(rs => setUserIsCertifier(rs));
  }, [isCertifier, tokenId]);

  useEffect(() => {
    isUser().then(rs => setUserIsUser(rs));
  }, [tokenId, isUser]);

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

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 20 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={product.photo}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {product.name}
            </Heading>
            <Text color={"gray.900"} fontWeight={300} fontSize={"2xl"}>
              <Icon as={FaEthereum} boxSize={4} /> {parseFloat(product.price).toFixed(4)}&nbsp;|&nbsp; 
              <Icon as={FaDollarSign} boxSize={4} /> {(usdPrice*1).toLocaleString(undefined, {maximumFractionDigits:2})}&nbsp;|&nbsp; 
              <Badge ml={0} colorScheme={"white"} fontSize={"sm"}>COP</Badge> {(copPrice*1).toLocaleString(undefined, {maximumFractionDigits:2})}<br/>
              {product.isVerified && (
                <Badge ml={2} colorScheme={"green"} fontSize={"sm"}>
                  Verificado
                </Badge>
              )}
              <Badge ml={2} colorScheme={"purple"} fontSize={"sm"}>
                {product.productType}
              </Badge>
            </Text>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={"gray.200"} />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"} textAlign={"justify"} color={"gray.800"}>
                {product.description}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"blue.300"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Detalles del vendedor
              </Text>
              {user !== undefined && (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>{user.name}</ListItem>
                    <ListItem>{user.tel}</ListItem>
                    <ListItem>{user.email}</ListItem>
                    {userIsCertifier && (
                      <>
                        <ListItem>{user.cedula}</ListItem>
                        <ListItem>
                          <Button
                            colorScheme={"blue"}
                            variant={"link"}
                            onClick={() => openFileBase64(encodeURI(user.file))}
                          >
                            Certificado de Identidad{" "}
                            <ExternalLinkIcon color={"blue.700"} mx="2px" />
                          </Button>
                        </ListItem>
                      </>
                    )}
                  </List>
                </SimpleGrid>
              )}
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"blue.300"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Detalles del verificador
              </Text>
              {product.isVerified !== undefined && (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>{`${product.accountVerifier?.substr(0, 6)}...${product.accountVerifier?.substr(-4)}`}</ListItem>
                    <ListItem>
                      <Button
                        colorScheme={"blue"}
                        variant={"link"}
                        onClick={() => openFileBase64(encodeURI(product.verificationProofs))}
                      >
                        Pruebas de peritaje{" "}
                        <ExternalLinkIcon color={"blue.700"} mx="2px" />
                      </Button>
                    </ListItem>
                    <ListItem>{product.descriptionVerifier}</ListItem>
                  </List>
                </SimpleGrid>
              )}
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"blue.300"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Caracteristicas
              </Text>

              <List spacing={2}>
                {product.caracteristicas.map(c => (
                  <ListItem key={c["key"]}>
                    <Text as={"span"} fontWeight={"bold"}>
                      {c["key"]}:
                    </Text>{" "}
                    {c["value"]}
                  </ListItem>
                ))}
                {userIsCertifier && 
                  <ListItem>
                    <Button
                      colorScheme={"blue"}
                      variant={"link"}
                      onClick={() => openFileBase64(encodeURI(product.file))}
                    >
                      Certificado de propiedad del producto{" "}
                      <ExternalLinkIcon color={"blue.700"} mx="2px" />
                    </Button>
                  </ListItem>
                }
              </List>
            </Box>
          </Stack>
          {userIsCertifier ? (
            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              colorScheme={"blue"}
              textTransform={"uppercase"}
              disabled={product.isVerified || userisOwner}
              isDisabled={product.isVerified || userisOwner}
              onClick={onOpen}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Verificar
            </Button>
          ) : (
            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              onClick={() => userIsUser ? disclosure.onOpen() : navigate('/user')}
              disabled={userisOwner}
              isDisabled={userisOwner}
              colorScheme={"blue"}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              { (userIsUser ? "Comprar" : (userisOwner ? "Compra Inhabilitada" : "Registrate para poder Comprar")) }
            </Button>
          )}

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            {product.isVerified && (
              <Text>Este producto tiene la validación de un perito</Text>
            )}
          </Stack>
        </Stack>
      </SimpleGrid>
      <ModalVerify {...{finalRef, isOpen, onOpen, onClose, tokenId, product}}/>
      <ModalBuy finalRef={disclosure.finalRef} isOpen={disclosure.isOpen} onOpen={disclosure.onOpen} onClose={disclosure.onClose} tokenId={tokenId} product={product}/>
    </Container>
  );
}

export default Product;

function ModalVerify({finalRef, isOpen, onClose, product, tokenId}) {
    const [buttonMsg, setButtonMsg] = useState("Verificar");
    const [descriptionVerifier, setDescriptionVerifier] = useState("");
    const [file, setFile] = useState("");
    const {account} = useWeb3React()
    const toast = useToast();
    const {certifyProduct} = useMineFunctions()

    const pdfToBase64 = (e) => {
        if (e.target.files.length > 0) {
            const reader = new FileReader()
            reader.onload = function(event) {
                setFile(event.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
          setFile("")
        }
    }

    const saveCertifierData = useCallback(async () => {
      const data = {
        descriptionVerifier,
        verificationProofs: file,
        isVerified: true,
        accountVerifier: account,
        ...product
      }
  
      if (!descriptionVerifier || !file ) {
        toast({
          title: 'Formulario invalido',
          description: "Hay campos faltantes",
          status: 'error',
          duration: 3000
        })
        throw Error('Invalid Form');
      }
      const { cid } = await ipfs.add(JSON.stringify(data))
      return cid
    }, [descriptionVerifier, file, product, account, toast])
  
    const onSubmit = () => {
      setButtonMsg('Guardando la información...')
      saveCertifierData()
        .then(cid => {
          setButtonMsg('Registrando verificación...')
          const url = `${ipfsPublicURL}/${cid}`
          return certifyProduct(tokenId, url)
        })
        .then(() =>  {
          toast({
            title: 'Transaccion completada',
            description: "El bien ya fue verificado!",
            status: 'success',
            duration: 3000
          })
          setButtonMsg('Verificado')
        })
        .catch(err => {
          setButtonMsg('Verificar')
        })
    }
    
    return (
    <>  
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded={'none'} >
          <ModalHeader>Verifica este producto</ModalHeader>
          <ModalCloseButton />
          <Divider/>
          <ModalBody>
            <FormControl mb={4} id="description">
              <FormLabel>Descripción del peritaje</FormLabel>
              <Textarea value={descriptionVerifier} onChange={(e) => setDescriptionVerifier(e.target.value)} required />
            </FormControl>

            <FormControl id="titulo">
              <FormLabel>Certificado de peritaje</FormLabel>
              <Input onChange={(e) => pdfToBase64(e)} accept='application/pdf' border={"none"} type="file" required />
            </FormControl>

          </ModalBody>
          
          <ModalFooter borderTop={'1px'} color={'gray.100'}>
            <Button rounded={'none'} colorScheme="blue" mr={3} onClick={onClose}>
              cerrar
            </Button>
            <Button
              onClick={onSubmit}
              colorScheme={'blue'}
              variant={'ghost'}
              disabled={buttonMsg !== 'Verificar'}
              isDisabled={buttonMsg !== 'Verificar'}
            >
              {buttonMsg}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function ModalBuy({finalRef, isOpen, onClose, product, tokenId}) {
  const [buttonMsg, setButtonMsg] = useState("Comprar");
  const {buyProduct} = useMineFunctions()


  const onSubmit = () => {
      setButtonMsg('Transfiriendo bien a tu cuenta...')
      buyProduct(tokenId, product.price)
        .then(() => setButtonMsg('Transferido'))
        .catch(err => {
          setButtonMsg('Comprar')
        })
  }
  
  return (
  <>  
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent rounded={'none'} >
        <ModalHeader>¿Estas seguro de comprar este producto?</ModalHeader>
        <ModalCloseButton />
        <Divider/>
        <ModalBody>

          Esta transacción no podrá ser revertida una vez sea agregada en
          la blockchain

        </ModalBody>
        
        <ModalFooter borderTop={'1px'} color={'gray.100'}>
          <Button rounded={'none'} colorScheme="blue" mr={3} onClick={onClose}>
            cerrar
          </Button>
          <Button
            onClick={onSubmit}
            colorScheme={'blue'}
            variant={'ghost'}
            disabled={buttonMsg !== 'Comprar'}
            isDisabled={buttonMsg !== 'Comprar'}
          >
            {buttonMsg}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);
}
