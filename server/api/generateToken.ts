import { H3Event } from 'h3';
import auth from '@adobe/jwt-auth';
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event: H3Event) => {
  console.log('Generating token');
  console.log('runtimeConfig: ', runtimeConfig.public.aem);

  const credentials = {
    clientId: runtimeConfig.public.aem.clientId,
    technicalAccountId: runtimeConfig.public.aem.technicalAccountId,
    orgId: runtimeConfig.public.aem.originId,
    clientSecret: runtimeConfig.public.aem.clientSecret,
    privateKey: runtimeConfig.public.aem.privateKey,
    metaScopes: runtimeConfig.public.aem.metaScopes,
    ims: runtimeConfig.public.aem.ims,
  };

  for (const [key, value] of Object.entries(credentials)) {
    if (!value) {
      console.error(`Missing required credential: ${key}`);
      throw new Error(`Missing required credential: ${key}`);
    }
  }

    let tokenResponse = await auth(credentials);
    console.log('Token generated:', tokenResponse.access_token);

  // try {
  //   let tokenResponse = await auth(credentials);
  //   return tokenResponse.access_token;
  // } catch (error) {
  //   console.error('Error generating token:', error);

  //   if ((error as any).response) {
  //     console.error('Response data:', (error as any).response.data);
  //     console.error('Response status:', (error as any).response.status);
  //     console.error('Response headers:', (error as any).response.headers);
  //   } else if ((error as any).request) {
  //     console.error('Request data:', (error as any).request);
  //   } else {
  //     console.error('Error message:', (error as any).message);
  //   }

  //   throw new Error('Token generation failed');
  // }
});
