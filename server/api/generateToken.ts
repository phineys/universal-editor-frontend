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
  }
  try {
    let tokenResponse = await auth(credentials);

    return tokenResponse.access_token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Token generation failed');
  }
});
