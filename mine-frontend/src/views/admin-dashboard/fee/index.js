import { Box, Text, Heading, Input, FormControl, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useMineFunctions from '../../../hooks/useMineFunctions';


function Fee({feeTypeVerbose, feeType}) {
    const [value, setValue] = useState(0);
    const {getFee, setFee} = useMineFunctions();
    
    useEffect(() => {
        getFee(feeType).then(feeAmount => setValue(parseInt(feeAmount / 1e9)))
    }, [getFee, feeType])

    return (
        <Box>        
            <Box bg={'white'} p={5} my={5} shadow='sm' borderWidth='1px'>
                <Heading fontSize='xl' textAlign={'center'}>{feeTypeVerbose.replaceAll('_', " ")}</Heading>
                <Text fontSize={12} textAlign={'center'} mb={4} color={'gray.600'}>(Value in Gwei)</Text>
                <FormControl mb={4}>
                    <Input value={value} onChange={e => setValue(e.target.value)} type={'number'}/>
                </FormControl>
                <Button w={'100%'} type='button' colorScheme={'orange'} onClick={() => setFee(feeType, value * 1e9)}>
                    Change
                </Button>
            </Box>
        </Box>
  );
}

export default Fee;
