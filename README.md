### Linkedin configuration

1. Go to https://www.linkedin.com/developers/apps and create a new app.
2. Go to the created app and open Products tab and Request access for: `Sign In with LinkedIn using OpenID Connect`
3. Go to the created app and open Auth tab, copy `Client ID` and `Client Secret`, and configure `Authorized redirect URLs for your app` - tt should direct to `<BACKEND DOMAIN>/sso/linkedin/callback`.
4. Configure env:

`LINKEDIN_CLIENT_ID`=`Client ID`
`LINKEDIN_CLIENT_SECRET`=`Client Secret`
`LINKEDIN_CLIENT_REDIRECT_URL``=`Authorized redirect URLs for your app`

### Google configuration
