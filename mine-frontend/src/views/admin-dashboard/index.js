import { Box, HStack } from '@chakra-ui/react';
import { FEE_TYPES } from '../../hooks/useMineFunctions';
import CertifiersTable from './certifiers-table';
import Fee from './fee';

function AdminDashboard() {
    return (
        <Box p={30} minH={'calc(100vh - 130px)'}>
            <CertifiersTable/>
            <HStack justifyContent={{base: 'space-around', lg: 'space-between'}} wrap={'wrap'} spacing={0}>
                {FEE_TYPES.map((type, idx) => <Fee key={type} feeTypeVerbose={type} feeType={idx}/>)}
            </HStack>
        </Box>
  );
}

export default AdminDashboard;
