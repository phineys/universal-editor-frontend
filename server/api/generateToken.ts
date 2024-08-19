import { H3Event } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event: H3Event) => {
  console.log('GENERATE TOKEN EVENT');
  const clientId = useRuntimeConfig().public.aemClientId;
  const imsEndpoint = useRuntimeConfig().public.aemImsEndpoint;
  const privateKey = useRuntimeConfig().public.aemPrivateKey;

  //format string
  let formatedKey = privateKey.replace(/\\n/g, '\n');

  formatedKey = formatedKey.replace(/\\r/g, '');
  // console.log('PrivateKeye: ', privateKeye);

  // Define the payload
  const payload = {
    iss: clientId,
    sub: clientId,
    aud: `https://${imsEndpoint}/c/${clientId}`,
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours expiration
  };

  // Define options for JWT
  const options = {
    algorithm: 'RS256',
    //   expiresIn: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
  };

  // const token = jwt.sign(payload, formatedKey, options);

  return {
    token: 'token',
    clientId: clientId,
    imsEndpoint: imsEndpoint,
  };
});
