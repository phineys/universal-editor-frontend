export default defineEventHandler(async (event) => {
  console.log(event);
  const body = await readBody(event);
  const { url, isUE } = body;

  console.log('SERVER #URL: ', url);
  console.log('SERVER #isUE: ', isUE);

  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing "path" parameter',
    });
  }

  const fetchOptions = {};

  if (isUE === true) {
    const token = await $fetch('/api/generateToken').catch((error) => {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed get token from ${url}: ${error.message}`,
      });
    });
    console.log('TOKEN: ', token);

    fetchOptions.headers = {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
      'Surrogate-Control': 'no-store',
    };
  }

  const response = await $fetch(url, fetchOptions).catch((error) => {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch data from ${url}: ${error.message}`,
    });
  });

  // event.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  // event.headers.set('Pragma', 'no-cache');
  // event.headers.set('Expires', '0');
  // event.headers.set('Surrogate-Control', 'no-store');

  return response;
});
