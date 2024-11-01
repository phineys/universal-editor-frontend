import { H3Event } from 'h3';
import * as jose from 'jose';
  const auth = require('@adobe/jwt-auth');
  const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event: H3Event) => {


  try {
       let tokenResponse = await auth({
         clientId: runtimeConfig?.public?.aem?.clientId, // Client Id
         technicalAccountId: runtimeConfig?.public?.aem?.technicalAccountId, // Technical Account Id
         orgId: runtimeConfig?.public?.aem.originId, // Organization Id
         clientSecret: runtimeConfig?.public?.aem.clientSecret, // Client Secret
         privateKey: runtimeConfig?.public?.aem.privateKey, // Private Key
         metaScopes: runtimeConfig?.public?.aem.metaScopes, // Scopes for the token
         ims: runtimeConfig?.public?.aem.ims, // IMS
       });

    return tokenResponse.access_token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Token generation failed');
  }
});
