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

  // Überprüfen, ob alle erforderlichen Felder vorhanden sind
  for (const [key, value] of Object.entries(credentials)) {
    if (!value) {
      console.error(`Missing required credential: ${key}`);
      throw new Error(`Missing required credential: ${key}`);
    }
  }

  try {
    let tokenResponse = await auth(credentials);
    return tokenResponse.access_token;
  } catch (error) {
    console.error('Error generating token:', error);

    // Detaillierte Fehlerbehandlung basierend auf dem Fehlerobjekt
    if ((error as any).response) {
      // Server antwortete mit einem Statuscode, der außerhalb des Bereichs von 2xx liegt
      console.error('Response data:', (error as any).response.data);
      console.error('Response status:', (error as any).response.status);
      console.error('Response headers:', (error as any).response.headers);
    } else if ((error as any).request) {
      // Anfrage wurde gemacht, aber keine Antwort erhalten
      console.error('Request data:', (error as any).request);
    } else {
      // Fehler beim Einrichten der Anfrage
      console.error('Error message:', (error as any).message);
    }

    throw new Error('Token generation failed');
  }
});
