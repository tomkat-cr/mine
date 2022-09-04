import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NavLink from '../nav-link';
import Wallet from '../wallet';
import Logo from '../../../assets/logo';
import { useWeb3React } from '@web3-react/core';
import { Link } from 'react-router-dom';




export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { active } = useWeb3React();

  const Links = active ? [
    {
        title: 'Inicio',
        path: '/'
    },
    {
        title: 'Bienes',
        path: '/bienes'
    },
    {
      title: 'Acerca de nosotros',
      path: '/acerca-de-nosotros'
    }
    
  ] : [
    {
      title: 'Inicio',
      path: '/'
    },
    {
      title: 'Acerca de nosotros',
      path: '/acerca-de-nosotros'
    }
  ]

  return (
    <>
      <Box bg={'whiteAlpha.400'} borderBottom={'1px'} borderColor='gray.200' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon boxSize={6} />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            bg={'transparent'}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Link to="/"><Logo /></Link></Box>
          </HStack>


          <HStack spacing={6}>

              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                  {Links.map((link) => (
                    <NavLink key={link.title} to={link.path}>{link.title}</NavLink>
                  ))}
                  
              </HStack>
            <Wallet/>
            </HStack>
          
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.title} to={link.path}>{link.title}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}