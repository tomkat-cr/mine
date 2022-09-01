import { Search2Icon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Input, InputRightElement, InputGroup, Button, ButtonGroup } from "@chakra-ui/react";
import ProductAddToCart from "../../layouts/internal/card";

function Products() {
    return (
        <Box minH={'100vh'} >
            <HStack spacing={3} justifyContent={'center'} px={3} py={2} borderBottom={'1px'} borderColor={'gray.200'}>
                <ButtonGroup size='md' isAttached variant='outline'>
                    <Button bg={'blue.400'} color={'white'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>Todos</Button>
                    <Button color={'gray.600'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>Verificado</Button>
                    <Button color={'gray.600'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>No Verificado</Button>
                </ButtonGroup>
                <InputGroup size='md' maxW={'600px'}>
                    <Input
                        pr='4.5rem'
                        type='text'
                        placeholder='Busca una wallet o un producto'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button bg={'transparent'} h='1.75rem' size='sm'>
                            <Search2Icon color={'blue.400'} />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </HStack>
            <Flex maxW={'100%'} wrap={'wrap'} alignItems='center'justifyContent={'center'} mb={4} gap='2'>
                {[1,2,3,4,5,6,7,8,9,10].map((el, i) => <ProductAddToCart key={i}/>)}
            </Flex>
            
        </Box>
    )
}

export default Products