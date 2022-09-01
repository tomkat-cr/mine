import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
const NavLink = ({ children, ...props }) => (
    <Link
      as={RouterLink}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'gray.200'
      }}
      {...props}
      >
      {children}
    </Link>
);
  
export default NavLink;