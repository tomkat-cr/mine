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
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import {ipfs, ipfsPublicURL} from "../../../config/ipfs";
import useMineFunctions from "../../../hooks/useMineFunctions";


export default function UserRegistration() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [file, setFile] = useState();
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [buttonMsg, setButtonMsg] = useState("Registrarme");
  const { getFee, registerAsUser } = useMineFunctions()
  const [fee, setFee] = useState(0);
  const toast = useToast();


  useEffect(() => {
    getFee(1).then(_fee => setFee(_fee)).catch(err => setFee(0))
  }, [getFee])

  const saveCertifierData = useCallback(async () => {
    const data = {
      name,
      tel,
      file,
      cedula,
      email
    }

    if (!name || !tel || !file || !cedula || !email) {
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
  }, [name, tel, file, cedula, email, toast])

  const onSubmit = () => {
    setButtonMsg('Guardando la información...')
    saveCertifierData()
      .then(cid => {
        setButtonMsg('Registrando usuario...')
        const url = `${ipfsPublicURL}/${cid}`
        return registerAsUser(url)
      })
      .then(() =>  {
        toast({
          title: 'Transaccion completada',
          description: "Ahora ya puedes comprar y vender bienes",
          status: 'success',
          duration: 3000
        })
        setButtonMsg('Registrado')
      })
      .catch(err => {
        setButtonMsg('Registrarme')
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

  return (
    <Flex
      minH={"calc(100vh - 130px)"}
      align={"center"}
      justify={"center"}
      bg={"gray.50"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Registrate como Usuario</Heading>
          <Text fontSize={"md"} textAlign={"center"} color={"gray.600"}>
            Compra y vende bienes
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
              <FormLabel>Nombre completo</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} required type="text" />
            </FormControl>
            <FormControl id="cedula">
              <FormLabel>Cedula</FormLabel>
              <Input value={cedula} onChange={(e) => setCedula(e.target.value)} required type="text" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Correo Electronico</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
            </FormControl>
            <FormControl id="tel">
              <FormLabel>Numero telefonico</FormLabel>
              <Input value={tel} onChange={(e) => setTel(e.target.value)} required type="tel" />
            </FormControl>
            <FormControl id="titulo">
              <FormLabel>PDF de documento de identidad</FormLabel>
              <Input onChange={(e) => pdfToBase64(e)} accept='application/pdf' border={"none"} type="file" required />
            </FormControl>
            <Stack spacing={10}>
              <Button
                onClick={onSubmit}
                bg={"blue.400"}
                color={"white"}
                disabled={buttonMsg !== 'Registrarme'}
                isDisabled={buttonMsg !== 'Registrarme'}
                _hover={{
                  bg: "blue.500",
                }}
              >
                {buttonMsg}
              </Button>
            </Stack>
            <Text color={'gray.500'} fontSize={'sm'} textAlign={'center'}>
              El coste de registro es {(fee / 1e9).toFixed(2)} GWEI
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
