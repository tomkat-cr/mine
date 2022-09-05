import { Tr, Td, HStack, Button, Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useMineFunctions from "../../../hooks/useMineFunctions";
import useTruncatedAddress from "../../../hooks/useTruncatedAddress";
import { CheckIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export const openFileBase64 = base64String => {
  let pdfWindow = window.open("");
  pdfWindow.document.write(
    "<iframe width='100%' height='100%' src='" + base64String + "'></iframe>"
  );
};

function CertifiersRow({ address }) {
  const [certifier, setCertifier] = useState({
    name: "",
    cedula: "",
    email: "",
    tel: "",
    file: "",
  });
  const [status, setStatus] = useState("-");
  const {
    getCertifier,
    acceptCertifier,
    removeCertifier,
    isCertifierAccepted,
  } = useMineFunctions();

  useEffect(() => {
    getCertifier(address).then(rs => setCertifier(rs));
    isCertifierAccepted(address).then(rs =>
      setStatus(rs ? "Approved" : "Pending")
    );
  }, [getCertifier, isCertifierAccepted, address]);

  const truncatedAddress = useTruncatedAddress(address);
  return (
    <Tr>
      <Td>{truncatedAddress}</Td>
      <Td>{certifier.name}</Td>
      <Td isNumeric>{certifier.cedula}</Td>
      <Td>{certifier.email}</Td>
      <Td>{certifier.tel}</Td>
      <Td><Badge colorScheme={status === "Approved" ? "green" : "orange"}>{status}</Badge></Td>
      <Td>
        <Button
          colorScheme={"blue"}
          variant={"ghost"}
          size={"xs"}
          onClick={() => openFileBase64(encodeURI(certifier.file))}
        >
          <ExternalLinkIcon color={"blue.700"} mx="2px" /> PDF
        </Button>
      </Td>
      <Td>
        <HStack spacing={3}>
          <Button
            display={status === "Approved" ? "none" : "inline"}
            onClick={() => acceptCertifier(address)}
            size={"xs"}
            variant={"ghost"}
            colorScheme={"green"}
          >
            <CheckIcon />
          </Button>
          <Button
            onClick={() => removeCertifier(address)}
            size={"xs"}
            variant={"ghost"}
            colorScheme={"red"}
          >
            <DeleteIcon />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default CertifiersRow;
