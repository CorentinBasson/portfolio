import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24}}>
      <div style={{textAlign: 'center'}}>
        <h1 style={{fontSize: 32, fontWeight: 700}}>Page introuvable</h1>
        <p style={{marginTop: 8}}>La page demandée n&rsquo;existe pas.</p>
        <Link href="/" style={{color: 'var(--primary, #111)', textDecoration: 'underline', marginTop: 16, display: 'inline-block'}}>Retour à l’accueil</Link>
      </div>
    </main>
  );
}

