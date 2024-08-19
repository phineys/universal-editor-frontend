import { H3Event } from 'h3';
import * as jose from 'jose';

export default defineEventHandler(async (event: H3Event) => {
  console.log('GENERATE TOKEN EVENT');
  const clientId = useRuntimeConfig().public.aemClientId;
  const imsEndpoint = useRuntimeConfig().public.aemImsEndpoint;
  const aemPrivateKey = useRuntimeConfig().public.aemPrivateKey;

  if (!clientId || !imsEndpoint || !aemPrivateKey) {
    throw new Error('Missing configuration values');
  }

  const formattedKey = aemPrivateKey.replace(/\\n/g, '\n').replace(/\\r/g, '');

  if (!formattedKey) {
    throw new Error('Private key is not defined or formatted incorrectly');
  }

  const payload = {
    iss: clientId,
    sub: clientId,
    aud: `https://${imsEndpoint}/c/${clientId}`,
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  };
  const alg = 'RS256';
  const privateKey = await jose.importPKCS8(formattedKey, alg);

  try {
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt(new Date())
      .setIssuer(clientId)
      .setExpirationTime('24h')
      .sign(privateKey);

    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Token generation failed');
  }
});
