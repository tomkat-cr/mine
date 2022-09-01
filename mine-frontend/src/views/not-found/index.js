import { Box, Heading, Text, Button } from '@chakra-ui/react';

function NotFound() {
    return (
      <Box textAlign="center" py={10} minH={'calc(100vh - 130px)'} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, blue.400, blue.600)"
          backgroundClip="text">
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Esta pagina no existe
        </Text>
        <Text color={'gray.500'} mb={6}>
          La pagina que buscas al parecer no existe
        </Text>
  
        <Button
          colorScheme="blue"
          bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
          color="white"
          variant="solid">
          Vuelve al inicio
        </Button>
      </Box>
    );
  }

export default NotFound;



