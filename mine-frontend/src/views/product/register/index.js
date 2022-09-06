import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
  Textarea,
  Radio,
  RadioGroup,
  InputRightAddon,
  InputLeftAddon,
  InputGroup,
  VStack,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Badge,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import {ipfs, ipfsPublicURL} from "../../../config/ipfs";
import useMineFunctions from "../../../hooks/useMineFunctions";

import useConverter from "../../../hooks/useConverter";
import { useWeb3React } from "@web3-react/core";

export default function ProductRegistration() {
  const {library} = useWeb3React()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [photo, setPhoto] = useState();
  const [productType, setProductType] = useState();
  const [buttonMsg, setButtonMsg] = useState("Registrar Bien");
  const { getFee, registerProduct } = useMineFunctions()
  const [fee, setFee] = useState(0);
  const toast = useToast();
  const [caracteristicainput, setCaracteristicainput] = useState('');
  const [caracteristicakey, setCaracteristicakey] = useState('');
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [price, setPrice] = useState(0);
  const format = (val) => `$` + val.toString()
  const [ethPrice, setEthPrice] = useState(1);
  const {getETHPrice} = useConverter()

  useEffect(() => {
      getETHPrice().then(rs => setEthPrice(rs / 1e8))
  }, [getETHPrice])

  const addCaracteristica = (key, val) => {
    setCaracteristicas([...caracteristicas, {key: key, value: val}])
    setCaracteristicakey('')
    setCaracteristicainput('')
  }

  const deleteCaracteristica = (key) => {
    setCaracteristicas(caracteristicas.filter(c => c['key'] !== key))
  }


  useEffect(() => {
    getFee(2).then(_fee => setFee(_fee)).catch(err => setFee(0))
  }, [getFee])

  const saveProductData = useCallback(async () => {
    const data = {
      name,
      file,
      description,
      productType,
      photo,
      price: (price / ethPrice).toString(),
      caracteristicas
    }

    if (!name || !file || !description || !photo || !productType || !price || caracteristicas.length === 0) {
      toast({
        title: 'Formulario invalido',
        description: "Hay campos faltantes",
        status: 'error',
        duration: 3000
      })
      throw Error('Invalid Form')
    }
    
    const { cid } = await ipfs.add(JSON.stringify(data))

    return cid
  }, [name, file, description, productType, photo, toast, caracteristicas, price, ethPrice])

  const onSubmit = () => {
    setButtonMsg('Guardando la información...')
    saveProductData()
      .then(cid => {
        if (!cid) return;
        setButtonMsg('Registrando producto...')
        const url = `${ipfsPublicURL}/${cid}`
        return registerProduct(url, library.utils.toWei((price / ethPrice).toString()))
      })
      .then(() =>  {
        toast({
          title: 'Transaccion completada',
          description: "Tu bien ya fue registrado!",
          status: 'success',
          duration: 3000
        })
        setButtonMsg('Registrado')
      })
      .catch(err => {
        setButtonMsg('Registrar Bien')
      })
  }
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
  const imgToBase64 = (e) => {
    if (e.target.files.length > 0) {
        const reader = new FileReader()
        reader.onload = function(event) {
          setPhoto(event.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
    } else {
      setPhoto("")
    }
}

  return (
    <Flex
      minH={"calc(100vh - 130px)"}
      align={"center"}
      wrap={'wrap'}
      justify={"center"}
      bg={"gray.50"}
    >
      <Stack spacing={8} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Registra un bien</Heading>
          <Text fontSize={"md"} textAlign={"center"} color={"gray.600"}>
            Verifica bien la información antes de subirla 
          </Text>
        </Stack>
        <Box

          rounded={"lg"}
          bg={"white"}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Titulo del producto</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} required type="text" />
            </FormControl>

            <FormControl id="description">
              <FormLabel>Descripción</FormLabel>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </FormControl>

            <FormControl id="description">
              <FormLabel>Tipo de bien</FormLabel>
              <RadioGroup value={productType} onChange={value => setProductType(value)}>
                <Stack spacing={5} direction='row'>
                  <Radio colorScheme='blue' value='carro'>
                    Carro
                  </Radio>
                  <Radio colorScheme='blue' value='moto'>
                    Moto
                  </Radio>
                  <Radio colorScheme='blue' value='otro'>
                    Otro
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>


            <FormControl id="caracteristicas">
              <FormLabel>Caracteristicas</FormLabel>
              <InputGroup size='mds'>
                <InputLeftAddon maxW={'150px'} children={<Input rounded={'none'} border={'none'} bg={'white'} value={caracteristicakey} onChange={(e) => setCaracteristicakey(e.target.value)} placeholder='Caracteristica' />} />
                <Input value={caracteristicainput} px={3} onChange={(e) => setCaracteristicainput(e.target.value)} placeholder='Descripción' />
                <InputRightAddon children={<Button bg={'blue.500'} rounded={'none'} color={'white'} onClick={() => addCaracteristica(caracteristicakey, caracteristicainput)}><AddIcon/></Button>} />
              </InputGroup>
            </FormControl>

            <FormControl id="caracteristicas">
              <FormLabel>Precio (USD)</FormLabel>
              <NumberInput min={0}
                onChange={(valueString) => setPrice(valueString)}
                value={format(price)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text as={'small'} color={'gray.500'} lineHeight={0} >Todos los precios serán convertidos a ETH y todos los bienes serán vendidos en ETH</Text>
            </FormControl> 

            <FormControl id="foto">
              <FormLabel>Foto del producto</FormLabel>
              <Input onChange={(e) => imgToBase64(e)} accept='image/jpeg' border={"none"} type="file" required />
            </FormControl>

            <FormControl id="titulo">
              <FormLabel>PDF de certificado de propiedad</FormLabel>
              <Input onChange={(e) => pdfToBase64(e)} accept='application/pdf' border={"none"} type="file" required />
            </FormControl>
           
            <Text color={'gray.500'} fontSize={'sm'} textAlign={'center'}>
              El coste de registro es {(fee / 1e9).toFixed(2)} GWEI
              
            </Text>
          </Stack>
        </Box>
      </Stack>
      <VStack mb={10} maxW={{base: 'auto', md: '40%' }} mx={6} spacing={4} alignItems={'stretch'} justifyContent={'start'} background={'white'} shadow={'md'} py={10} px={6}>
                <Heading>
                  {name ? name : 'Titulo de tu propiedad'}
                </Heading>
                <Divider/>
                <Text mb={10} align={'justify'}>
                  {description ? description : 'Aqui debes describir tu producto lo mejor posible'}
                </Text>
                {caracteristicas.length > 0 && 
                  <Table size={'sm'}>
                    <Thead>
                      <Tr>
                        <Th>Caracteristica</Th>
                        <Th>Descripcion</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {caracteristicas.map(c => <Tr key={c['key']}>
                        <Td>{c['key']}</Td>
                        <Td>{c['value']}</Td>
                        <Td><Button size={'xs'} colorScheme={'red'} variant={'ghost'} onClick={() => deleteCaracteristica(c['key'])}>
                          <DeleteIcon/>  
                        </Button></Td>
                      </Tr>)}
                    </Tbody>
                  </Table>
                }
                <Box>

                  <HStack my={10} alignItems={'center'} justifyContent={'space-around'}>
                      <Text>
                        <Badge colorScheme={'purple'}>
                          {productType ? productType : 'Unknown'}
                        </Badge>
                      </Text>
                      <Text>
                        {(price / ethPrice).toFixed(4)} ETH
                      </Text>
                  </HStack>
                </Box>

                <Stack spacing={10}>
                  <Button
                    onClick={onSubmit}
                    minW={'100%'}
                    bg={"blue.400"}
                    rounded={'none'}
                    color={"white"}
                    disabled={buttonMsg !== 'Registrar Bien'}
                    isDisabled={buttonMsg !== 'Registrar Bien'}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    {buttonMsg}
                  </Button>
                </Stack>
      </VStack>
    </Flex>
  );
}
