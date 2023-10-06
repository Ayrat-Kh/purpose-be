import { createZodDto } from 'nestjs-zod';
import { z, type TypeOf } from 'nestjs-zod/z';

const ConfigurationSchema = z.object({
  auth0: z.object({
    issuerUrl: z.string().nonempty(),
    audience: z.string().nonempty(),
    callbackUrl: z.string().nonempty(),
    clientId: z.string().nonempty(),
    cookieSignKey: z.string(),
  }),
  frontendAuthCallback: z.string().optional(),
  databaseUrl: z.string().nonempty(),
  openAiApiKey: z.string().optional(),
});

export type Configuration = TypeOf<typeof ConfigurationSchema>;

export class ConfigurationDto extends createZodDto(ConfigurationSchema) {}

export const getConfiguration = async (): Promise<Configuration> => {
  const configuration: Configuration = {
    auth0: {
      issuerUrl: process.env.AUTH0_ISSUER_URL as string,
      audience: process.env.AUTH0_AUDIENCE as string,
      callbackUrl: process.env.AUTH0_CALLBACK_URL as string,
      clientId: process.env.AUTH0_CLIENT_ID as string,
      cookieSignKey: process.env.AUTH0_COOKIE_SIGN_KEY as string,
    },
    frontendAuthCallback: process.env.FRONTEND_AUTH_CALLBACK as string,
    databaseUrl: process.env.DATABASE_URL as string,
    openAiApiKey: process.env.OPENAI_API_KEY as string,
  };

  return ConfigurationSchema.parse(configuration);
};
