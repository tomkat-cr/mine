import { Center, HStack } from '@chakra-ui/react';
import Benefit from '../beneficio';
import ethereumPayments from "../../../assets/hero-illustration/ethereum_payments.png";
import tracing from "../../../assets/hero-illustration/tracing.png";
import speedness from "../../../assets/hero-illustration/speedness.png";


export default function Benefits() {
  return (
    <Center p={4}>
      <HStack justifyContent={'center'} spacing={10} wrap={'wrap'}>
        <Benefit benefit={'Pagos en ETH'} engage={'Pagos seguros en la red de Ethereum'} image={ethereumPayments}/>
        <Benefit benefit={'Trazabilidad'} engage={'Mira quienes han tenido tu nueva propiedad'} image={tracing}/>
        <Benefit benefit={'Velocidad'} engage={'Compra y vende tus vienes a tiempo record'} image={speedness}/>
      </HStack>
    </Center>
  );
}