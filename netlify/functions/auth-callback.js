exports.handler = async (event, context) => {
  const { code, state } = event.queryStringParameters || {};
  
  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No authorization code provided' })
    };
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GitHub OAuth not configured' })
    };
  }

  try {
    // Échanger le code contre un token d'accès
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: tokenData.error_description || tokenData.error })
      };
    }

    // Script pour envoyer le token au CMS
    const allowedOrigin = process.env.URL || (event.headers && (event.headers.referer || '').split('/').slice(0,3).join('/')) || '';
    const script = `
      <script>
        (function() {
          var allowedOrigin = ${JSON.stringify(allowedOrigin)};
          function receiveMessage(e) {
            try {
              if (!allowedOrigin || (e.origin !== allowedOrigin)) {
                return;
              }
              e.source.postMessage(
                'authorization:github:success:${JSON.stringify({
                  token: tokenData.access_token,
                  provider: 'github'
                })}',
                e.origin
              );
            } catch (err) {
              // ignore
            }
          }
          window.addEventListener('message', receiveMessage, false);
          if (window.opener && allowedOrigin) {
            window.opener.postMessage('authorizing:github', allowedOrigin);
          }
        })();
      </script>
    `;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Authentification réussie</title>
          </head>
          <body>
            <h1>Authentification réussie !</h1>
            <p>Vous pouvez fermer cette fenêtre.</p>
            ${script}
          </body>
        </html>
      `
    };

  } catch (error) {
    console.error('OAuth callback error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 