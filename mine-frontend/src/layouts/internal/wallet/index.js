import {
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    AvatarBadge,
    Text,
    Box
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Wallet() {
    return (
        <Flex alignItems={'center'}>
            <Menu>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                size={'sm'}
                src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
                >
                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                </Avatar>
            </MenuButton>
            <MenuList>
                <MenuItem as={Box} _hover={{ background: 'transparent' }} closeOnSelect={false} isFocusable={false}>
                    <Text as={'small'} color={'gray.600'}>
                        0xAEB...E251
                    </Text>
                </MenuItem>
                <MenuItem as={Box} _hover={{ background: 'transparent' }} closeOnSelect={false} isFocusable={false}>
                    <Text as={'small'} color={'gray.600'}>
                        Testnet
                    </Text>
                </MenuItem>
                <MenuItem as={Box} _hover={{ background: 'transparent' }} closeOnSelect={false} isFocusable={false}>
                    <Text as={'small'} color={'gray.600'}>
                        17 ETH
                    </Text>
                </MenuItem>
                <MenuDivider/>
                <MenuItem as={Link} to={'/profile'}>Mis bienes</MenuItem>
                <MenuItem as={Box} _hover={{ background: 'transparent' }}><Button w={'100%'} size={'xs'} colorScheme='red' variant='outline'>Desconectar wallet</Button></MenuItem>
            </MenuList>
            </Menu>
        </Flex>
    )
}
export default Wallet