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
import useWalletData from '../../../hooks/useWalletData';

const AvatarWallet = ({active}) => {
    const activeColor = active ? 'green' : 'gray'

    return (<Avatar
    size={'sm'}
    src={
        'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    }
    >
        <AvatarBadge boxSize='1.25em' bg={`${activeColor}.500`} />
    </Avatar>)
}

export const ButtonConnection = ({active, connect, unsupportedChain}) => {
    if (unsupportedChain) {
        const title = 'Red no soportada'
        const scheme = 'orange'
        return <Button w={'100%'} size={'xs'} onClick={connect} disabled={unsupportedChain} colorScheme={scheme} variant='outline'>{title}</Button>
    }
    const title = active ? 'Desconectar wallet' : 'Conectar wallet'
    const scheme = active ? 'red' : 'green'
    return <Button w={'100%'} size={'xs'} onClick={connect} colorScheme={scheme} variant='outline'>{title}</Button>
}

function Wallet() {
    const {address, network, unsupportedChain, connect, disconnect, active, balance} = useWalletData()

    return (
        <Flex alignItems={'center'}>
            <Menu>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <AvatarWallet active={active}/>
            </MenuButton>
            <MenuList>
                {active && (
                    <>
                    <MenuItem as={Box} _hover={{ background: 'transparent' }} closeOnSelect={false} isFocusable={false}>
                        <Text as={'small'} color={'gray.600'}>
                            {address}
                        </Text>
                    </MenuItem>
                    <MenuItem as={Box} _hover={{ background: 'transparent' }} closeOnSelect={false} isFocusable={false}>
                        <Text as={'small'} color={'gray.600'}>
                            {network}
                        </Text>
                    </MenuItem>
                    <MenuItem as={Box} _hover={{ background: 'transparent' }} closeOnSelect={false} isFocusable={false}>
                        <Text as={'small'} color={'gray.600'}>
                             ∼{balance} ETH
                        </Text>
                    </MenuItem>
                    <MenuDivider/>
                    <MenuItem as={Link} to={'/profile'}>Mis bienes</MenuItem>
                    </>
                )}
                
                
                <MenuItem closeOnSelect={false} as={Box} _hover={{ background: 'transparent' }}>
                    { active ?
                        <ButtonConnection connect={disconnect} active={active} unsupportedChain={unsupportedChain}/>
                        : <ButtonConnection connect={connect} active={active} unsupportedChain={unsupportedChain}/>
                    }
                    
                </MenuItem>
            </MenuList>
            </Menu>
        </Flex>
    )
}
export default Wallet