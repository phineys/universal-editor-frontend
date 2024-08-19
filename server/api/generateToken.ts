import { H3Event } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event: H3Event) => {
  console.log('GENERATE TOKEN EVENT');
  const clientId = useRuntimeConfig().public.aemClientId;
  const imsEndpoint = useRuntimeConfig().public.aemImsEndpoint;
  const privateKey = useRuntimeConfig().public.aemPrivateKey;


  if (!clientId || !imsEndpoint || !privateKey) {
    throw new Error('Missing configuration values');
  }

  const formatedKey = privateKey.replace(/\\n/g, '\n').replace(/\\r/g, '');

  if (!formatedKey) {
    throw new Error('Private key is not defined or formatted incorrectly');
  }

  console.log('BEFOREPAYLOAD');

  // Define the payload
  const payload = {
    iss: clientId,
    sub: clientId,
    aud: `https://${imsEndpoint}/c/${clientId}`,
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  };

  console.log('PAYLOAD: ', payload);

  // Define options for JWT
  const options = {
    algorithm: 'RS256' as const,
  };

  console.log('OPTIONS: ', options);

  try {
    console.log('BEFORESIGN');
    const token = jwt.sign(JSON.stringify(payload), formatedKey, options);
    // var token = jwt.sign();
    console.log('TOKENROUTE: ', token);

    return token;
  } catch (error) {
    console.error('Error generating JWT:', error);
    throw new Error('Failed to generate token');
  }
});
