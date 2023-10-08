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
  email: z.object({
    refreshToken: z.string().describe('user for gmail'),
    clientId: z.string(),
    clientSecret: z.string(),
    redirectUrl: z.string(),
    email: z.string(),
    from: z.string(),
  }),
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
    email: {
      refreshToken: process.env.EMAIL_GOOGLE_REFRESH_TOKEN as string,
      clientId: process.env.EMAIL_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.EMAIL_GOOGLE_CLIENT_SECRET as string,
      redirectUrl: process.env.EMAIL_GOOGLE_CLIENT_REDIRECT_URL as string,
      email: process.env.EMAIL_GOOGLE_EMAIL as string,
      from: process.env.EMAIL_FROM as string,
    },
  };

  return ConfigurationSchema.parse(configuration);
};
