export const normalizeIssuerUrl = (issuerUrl: string): string => {
  return issuerUrl.endsWith('/') ? issuerUrl : `${issuerUrl}/`;
};
