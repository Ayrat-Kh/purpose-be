### Linkedin configuration

1. Go to https://www.linkedin.com/developers/apps and create a new app.
2. Go to the created app and open Products tab and Request access for: `Sign In with LinkedIn using OpenID Connect`
3. Go to the created app and open Auth tab, copy `Client ID` and `Client Secret`, and configure `Authorized redirect URLs for your app` - tt should direct to `<BACKEND DOMAIN>/sso/linkedin/callback`.
4. Configure env:

`LINKEDIN_CLIENT_ID`=`Client ID`
`LINKEDIN_CLIENT_SECRET`=`Client Secret`
`LINKEDIN_CLIENT_CALLBACK_URL`=`Authorized redirect URLs for your app`

### Google configuration

1. Go to https://console.cloud.google.com/apis/credentials/oauthclient and create a new oauth credential.
2. Go to the created app and open Products tab and Request access for: `Sign In with LinkedIn using OpenID Connect`
3. Copy `Client ID` and `Client Secret`, and configure `Authorized redirect URLs for your app` - tt should direct to `<BACKEND DOMAIN>/sso/google/callback`.
4. Configure env:

`GOOGLE_CLIENT_ID`=`Client ID`
`GOOGLE_CLIENT_SECRET`=`Client Secret`
`GOOGLE_CLIENT_CALLBACK_URL`=`Authorized redirect URLs for your app`

Facebook Google configuration

1. Go to https://developers.facebook.com/apps/ and create a new oauth credential.
2. Go to Use cases and add email,public_profile as an permission
3. Go to Products, click Configure and set `Valid OAuth Redirect URIs`
4. Go to basic settings and copy `App Id` and `App secret`
5. Copy `Client ID` and `Client Secret`, and configure `Authorized redirect URLs for your app` - tt should direct to `<BACKEND DOMAIN>/sso/google/callback`.
6. Configure env:

`FACEBOOK_CLIENT_ID`=`App Id`
`FACEBOOK_CLIENT_SECRET`=`App secret`
`FACEBOOK_CLIENT_CALLBACK_URL`=`Valid OAuth Redirect URIs`
