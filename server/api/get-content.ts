export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { url, isUE } = body;

  console.log('ROUTE');
  console.log('PATH: ', url);
  console.log('ISUE: ', isUE);

  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing "path" parameter',
    });
  }

  const fetchOptions = {};

  if (isUE === 'true') {
    const { data, error } = await useFetch('/api/generateToken');

    if (error || !data || !data.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to retrieve authentication token',
      });
    }

    fetchOptions.headers = {
      Authorization: `Bearer ${data.value}`,
    };
  }

  const response = await $fetch(url, fetchOptions).catch((error) => {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch data from ${url}: ${error.message}`,
    });
  });

  return response;
});
