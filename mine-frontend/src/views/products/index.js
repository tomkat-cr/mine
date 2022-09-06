// import { Search2Icon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Button, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductAddToCart from "../../layouts/internal/card";
import useMineFunctions from "../../hooks/useMineFunctions";
import { Link } from "react-router-dom";

function Products() {
    const [user, setUser] = useState(false);
    const [filter, setFilter] = useState({});
    const { isUser, getLatestToken } = useMineFunctions()
    const [buttonActive, setButtonActive] = useState('all');
    const [latest, setLatest] = useState([]);

    useEffect(() => {
        isUser().then(rs => setUser(rs))
    }, [isUser])


    useEffect(() => {
        getLatestToken().then(rs => setLatest([...Array(rs).keys()]))
    }, [getLatestToken])


    const handleFilters = (f, keyword) => {
        setFilter(f)
        setButtonActive(keyword)
    }

    return (
        <Box minH={'100vh'} >
            <HStack spacing={3} justifyContent={'center'} px={3} py={2} borderBottom={'1px'} borderColor={'gray.200'}>
                <ButtonGroup size='md' isAttached variant='outline'>
                    {buttonActive === 'all' ?
                        <Button onClick={() => handleFilters({}, 'all')} bg={'blue.400'} color={'white'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>Todos</Button>
                        : <Button onClick={() => handleFilters({}, 'all')} color={'gray.600'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>Todos</Button>
                    }
                    {buttonActive === 'verified' ?
                        <Button onClick={() => handleFilters({isVerified: true}, 'verified')} bg={'blue.400'} color={'white'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>Verificados</Button>
                        : <Button onClick={() => handleFilters({isVerified: true}, 'verified')} color={'gray.600'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>Verificados</Button>
                    } 
                    {buttonActive === 'notverified' ?
                        <Button onClick={() => handleFilters({isVerified: (false || undefined)}, 'notverified')} bg={'blue.400'} color={'white'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>No Verificados</Button>
                        : <Button onClick={() => handleFilters({isVerified: (false || undefined)}, 'notverified')} color={'gray.600'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>No Verificados</Button>
                    } 
                    {buttonActive === 'carro' ?
                        <Button onClick={() => handleFilters({productType: "carro"}, 'carro')} bg={'blue.400'} color={'white'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>Carros</Button>
                        : <Button onClick={() => handleFilters({productType: "carro"}, 'carro')} color={'gray.600'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>Carros</Button>
                    } 
                    {buttonActive === 'moto' ?
                        <Button onClick={() => handleFilters({productType: "moto"}, 'moto')} bg={'blue.400'} color={'white'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>Motos</Button>
                        : <Button onClick={() => handleFilters({productType: "moto"}, 'moto')} color={'gray.600'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>Motos</Button>
                    } 
                    {buttonActive === 'otro' ?
                        <Button onClick={() => handleFilters({productType: "otro"}, 'otro')} bg={'blue.400'} color={'white'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>Otro</Button>
                        : <Button onClick={() => handleFilters({productType: "otro"}, 'otro')} color={'gray.600'} _focus={{ color: 'white', bg: 'blue.600', borderColor: 'blue.600'}}>Otro</Button>
                    } 
                </ButtonGroup>
                {user &&
                    <Button as={Link} to={'/bienes/registrar/'} colorScheme={'blue'}>Crear una nueva propiedad</Button>
                }
                {/* <InputGroup size='md' maxW={'600px'}>
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
                </InputGroup> */}
            </HStack>
            <Flex maxW={'100%'} wrap={'wrap'} alignItems='start'justifyContent={'center'} mb={4} gap='2'>
                {latest.map((el, i) => <ProductAddToCart filter={filter} tokenId={i} key={i}/>)}
            </Flex>
            
        </Box>
    )
}

export default Products