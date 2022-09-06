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
import { useEffect, useState } from 'react';
import useMineFunctions from '../../../hooks/useMineFunctions';
import CertifiersRow from '../certifiers-table-row';

function CertifiersTable() {
    const [certifiersAccepted, setCertifiersAccepted] = useState([]);
    const [certifiersPending, setCertifiersPending] = useState([]);
    const {getCertifiersAccepted, getCertifiersPending} = useMineFunctions();

    useEffect(() => {
        getCertifiersAccepted().then(rs => setCertifiersAccepted(rs))
    }, [getCertifiersAccepted])
    useEffect(() => {
        getCertifiersPending().then(rs => setCertifiersPending(rs))    
    }, [getCertifiersPending])

    const Titles = () => (
        <Tr>
            <Th>Account</Th>
            <Th>Name</Th>
            <Th isNumeric>Country ID</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Status</Th>
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
                    {certifiersPending.map(address => <CertifiersRow key={address} address={address} />)}
                    {certifiersAccepted.map(address => <CertifiersRow key={address} address={address} />)}
                </Tbody>
                <Tfoot>
                    <Titles/>
                </Tfoot>
            </Table>
        </TableContainer>
  );
}

export default CertifiersTable;
