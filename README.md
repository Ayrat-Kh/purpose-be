### Linkedin configuration

1. Go to https://www.linkedin.com/developers/apps and create a new app.
2. Go to the created app and open Products tab and Request access for: `Sign In with LinkedIn using OpenID Connect`
3. Go to the created app and open Auth tab, copy `Client ID` and `Client Secret`, and configure `Authorized redirect URLs for your app` - tt should direct to `<BACKEND DOMAIN>/sso/linkedin/callback`.
4. Configure env:

`LINKEDIN_CLIENT_ID`=`Client ID`
`LINKEDIN_CLIENT_SECRET`=`Client Secret`
`LINKEDIN_CLIENT_CALLBACK_URL`=`Authorized redirect URLs for your app`

### Google configuration

1. Go to https://console.cloud.google.com/apis/credentials/oauthclient?previousPage=%2Fapis%2Fcredentials%3Fproject%3Dquickstart-1572553153248&project=quickstart-1572553153248 and create a new oauth credential.
2. Go to the created app and open Products tab and Request access for: `Sign In with LinkedIn using OpenID Connect`
3. Copy `Client ID` and `Client Secret`, and configure `Authorized redirect URLs for your app` - tt should direct to `<BACKEND DOMAIN>/sso/google/callback`.
4. Configure env:

`GOOGLE_CLIENT_ID`=`Client ID`
`GOOGLE_CLIENT_SECRET`=`Client Secret`
`GOOGLE_CLIENT_CALLBACK_URL`=`Authorized redirect URLs for your app`

Facebook Google configuration

1. Go to https://console.cloud.google.com/apis/credentials/oauthclient?previousPage=%2Fapis%2Fcredentials%3Fproject%3Dquickstart-1572553153248&project=quickstart-1572553153248 and create a new oauth credential.
2. Go to the created app and open Products tab and Request access for: `Sign In with LinkedIn using OpenID Connect`
3. Copy `Client ID` and `Client Secret`, and configure `Authorized redirect URLs for your app` - tt should direct to `<BACKEND DOMAIN>/sso/google/callback`.
4. Configure env:

`FACEBOOK_CLIENT_ID`=`Client ID`
`FACEBOOK_CLIENT_SECRET`=`Client Secret`
`FACEBOOK_CLIENT_CALLBACK_URL`=`Authorized redirect URLs for your app`
