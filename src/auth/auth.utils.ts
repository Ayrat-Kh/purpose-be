export const normalizeIssuerUrl = (issuerUrl: string): string => {
  if (!issuerUrl) return issuerUrl;
  return issuerUrl.endsWith('/') ? issuerUrl : `${issuerUrl}/`;
};
