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
import { InfoIcon } from '@chakra-ui/icons';


export default function CertifierRegistration() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [file, setFile] = useState();
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [buttonMsg, setButtonMsg] = useState("Registrarme");
  const { getFee, registerAsCertifier, currentAccountIsCertifierAccepted } = useMineFunctions()
  const [fee, setFee] = useState(0);
  const toast = useToast();
  const [waiting, setWaiting] = useState(true); 

  useEffect(() => {
    getFee(0).then(_fee => setFee(_fee)).catch(err => setFee(0))
    currentAccountIsCertifierAccepted().then(isAccepted => setWaiting(!isAccepted))
  }, [getFee, currentAccountIsCertifierAccepted])

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
      return;
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
        return registerAsCertifier(url)
      })
      .then(() =>  setButtonMsg('Registrado'))
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

  if (waiting) {
    return <Info/>
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
          <Heading fontSize={"4xl"}>Registrate como Perito</Heading>
          <Text fontSize={"md"} textAlign={"center"} color={"gray.600"}>
            Debes estar certificado por los organismos correspondientes {JSON.stringify(waiting)}
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
              <FormLabel>Certificado de peritaje</FormLabel>
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



function Info() {
  return (
    <Box textAlign="center" minH={'calc(100vh - 130px)'} py={10} px={6}>
      <InfoIcon boxSize={'50px'} color={'blue.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Estas a la espera de ser aprobado
      </Heading>
      <Text color={'gray.500'}>
        Nuestro equipo está corroborando la veracidad de tu información. Esto puede tardar unos dias
      </Text>
    </Box>
  );
}