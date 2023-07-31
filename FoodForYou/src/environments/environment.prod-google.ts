export const environmentGoogle = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '622687646351-2us02pog9j0tnjcflfmrd9fgj40808p5.apps.googleusercontent.com',
  scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',
  production: false,
  authorize_uri: 'http://localhost:4200/oauth2/authorize?',
  redirect_uri: 'http://localhost:4200/authorized',  
  response_type: 'code',
  response_mode: 'form_post',
  token_url: 'http://localhost:4200/oauth2/token',
  grant_type: 'authorization_code'
};
