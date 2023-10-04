import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

import { OpenAiClient } from './open-ai-client';

export type OpenAiClientMockContext = {
  openAiClientMock: DeepMockProxy<OpenAiClient>;
  openAiClient: OpenAiClient;
};

export const createOpenAiClientMockContext = (): OpenAiClientMockContext => {
  const openAiClientMock = mockDeep<OpenAiClient>();

  return {
    openAiClientMock,
    openAiClient: openAiClientMock as unknown as OpenAiClient,
  };
};
