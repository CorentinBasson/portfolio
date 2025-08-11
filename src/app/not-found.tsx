export default function NotFound() {
  return (
    <html lang="fr">
      <body>
        <main style={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24}}>
          <div style={{textAlign: 'center'}}>
            <h1 style={{fontSize: 32, fontWeight: 700}}>Page introuvable</h1>
            <p style={{marginTop: 8}}>La page demandée n'existe pas.</p>
            <a href="/" style={{color: 'var(--primary, #111)', textDecoration: 'underline', marginTop: 16, display: 'inline-block'}}>Retour à l’accueil</a>
          </div>
        </main>
      </body>
    </html>
  );
}

