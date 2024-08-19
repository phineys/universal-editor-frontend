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

  // Define the payload
  const payload = {
    iss: clientId,
    sub: clientId,
    aud: `https://${imsEndpoint}/c/${clientId}`,
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours expiration
  };

  // Define options for JWT
  const options = {
    algorithm: 'RS256' as const,
  };

  try {
    // const token = jwt.sign(payload, formatedKey, options);
    // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    return {
      token: 'tokken',
    };
  } catch (error) {
    console.error('Error generating JWT:', error);
    throw new Error('Failed to generate token');
  }
});
