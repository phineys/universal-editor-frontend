import { H3Event } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event: H3Event) => {
  console.log('GENERATE TOKEN EVENT');
  const clientId = useRuntimeConfig().public.aemClientId;
  const imsEndpoint = formatKey(useRuntimeConfig().public.aemImsEndpoint);
  const privateKey = formatKey(useRuntimeConfig().public.aemPrivateKey);

  // // Define the payload
  // const payload = {
  //   iss: clientId,
  //   sub: clientId,
  //   aud: `https://${imsEndpoint}/c/${clientId}`,
  //   exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours expiration
  // };

  // // Define options for JWT
  // const options = {
  //   algorithm: 'RS256',
  //   //   expiresIn: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
  // };

  // const token = jwt.sign(payload, privateKey, options);

  // return {
  //   token,
  // };
  return {
    imsEndpoint: imsEndpoint,
    privateKey: privateKey,
  };
});

function formatKey(input: string) {
  // Ersetze \r\n mit einem tatsächlichen Zeilenumbruch
  let formattedKey = input.replace(/\\r\\n/g, '\n');

  // Ersetze \r und \n einzeln, falls sie noch vorhanden sind
  formattedKey = formattedKey.replace(/\\r/g, '\n').replace(/\\n/g, '\n');

  return formattedKey;
}
