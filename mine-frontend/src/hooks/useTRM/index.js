import { useCallback, useMemo } from "react";
import axios from "axios";

const useTRM = () => {
  const trmApiUrl = "https://www.datos.gov.co/api/id/32sa-8pi3.json?$query=select%20*%2C%20%3Aid%20order%20by%20%60vigenciadesde%60%20desc%20limit%201";
  const trmConverter = useMemo(() => {
    return axios.get(trmApiUrl);
  }, [trmApiUrl]);

  const getCopExchange = useCallback(async () => {
    return trmConverter.then(rs => parseFloat(rs.data[0].valor))
  }, [trmConverter])

  return {trmConverter, getCopExchange};
};

export default useTRM;