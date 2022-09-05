import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import CertifiersRow from '../certifiers-table-row';

function CertifiersTable() {

    const address = "0x38a2740Dc8d87039709b1B9983d2B2FeF4c825D0"
    const filler = [address,address,address,address,address,address,address,address]
    console.log(filler)
    const Titles = () => (
        <Tr>
            <Th>Account</Th>
            <Th>Name</Th>
            <Th isNumeric>Country ID</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Certification</Th>
            <Th>Actions</Th>
        </Tr>
    )
    
    return (
        <TableContainer bg={'white'} shadow={'sm'} border={'1px'} borderColor={'gray.200'}>
            <Table variant='simple'>
                <TableCaption>Accept or Decline new Certifiers</TableCaption>
                <Thead>
                    <Titles/>
                </Thead>
                <Tbody>
                    {filler.map(_address => <CertifiersRow key={_address} address={_address} />)}
                </Tbody>
                <Tfoot>
                    <Titles/>
                </Tfoot>
            </Table>
        </TableContainer>
  );
}

export default CertifiersTable;
