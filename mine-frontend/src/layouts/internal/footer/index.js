import {
    Box,
    Container,
    Stack,
    Text,
  } from '@chakra-ui/react';
import Logo from '../../../assets/logo';

  export default function Footer() {
    return (
      <Box
        bg={'gray.100'}
        borderTop={'1px'} borderColor='gray.200'>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Logo />
          <Text>© {new Date().getFullYear()} Mine by GOF. All rights reserved</Text>
          
        </Container>
      </Box>
    );
  }