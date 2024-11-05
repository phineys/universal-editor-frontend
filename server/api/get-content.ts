import auth from '@adobe/jwt-auth';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { url, isUE } = body;
  const runtimeConfig = useRuntimeConfig();

  console.log('SERVER #URL: ', url);
  console.log('SERVER #isUE: ', isUE);
  console.log('runtimeConfig: ', runtimeConfig.public.aem);

  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing "path" parameter',
    });
  }

  const fetchOptions = {};

  if (isUE === true) {
    let tokenResponse;
    try {
      tokenResponse = await auth({
        clientId: runtimeConfig?.public?.aem?.clientId, // Client Id
        technicalAccountId: runtimeConfig?.public?.aem?.technicalAccountId, // Technical Account Id
        orgId: runtimeConfig?.public?.aem.originId, // Organization Id
        clientSecret: runtimeConfig?.public?.aem.clientSecret, // Client Secret
        privateKey: runtimeConfig?.public?.aem.privateKey, // Private Key
        metaScopes: runtimeConfig?.public?.aem.metaScopes, // Scopes for the token
        ims: runtimeConfig?.public?.aem.ims, // IMS
      });
    } catch (error) {
      console.error('Error generating token:', error);
      throw new Error('Token generation failed');
    }
    console.log('TOKEN: ', tokenResponse);

    fetchOptions.headers = {
      Authorization: `Bearer ${tokenResponse.access_token}`,
      'Cache-Control': 'no-store, no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    };
    console.log('FETCH OPTIONS: ', fetchOptions);
  }

  let response;
  try {
    response = await $fetch(url, fetchOptions);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch data from ${url}: ${error.message}`,
    });
  }

  console.log('RESPONSE: ', response);

  // event.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  // event.headers.set('Pragma', 'no-cache');
  // event.headers.set('Expires', '0');
  // event.headers.set('Surrogate-Control', 'no-store');

  return response;
});
