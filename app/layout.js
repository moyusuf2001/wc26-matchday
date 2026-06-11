import './globals.css';
import { Space_Grotesk, Inter } from 'next/font/google';

// Space Grotesk for headlines + big numbers; Inter for all body, UI, and labels.
const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

// metadataBase lets Next resolve the OG image to an absolute URL.
// Set NEXT_PUBLIC_SITE_URL to your Vercel URL in production (see .env.local.example).
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'WC26 · Matchday Intelligence',
  description: 'Every 2026 FIFA World Cup match, read before kickoff: projected results, the tale of the tape, full squads, starting lineups on the pitch, and a profile for every player. Live and free.',
  openGraph: {
    title: 'WC26 · Matchday Intelligence',
    description: 'Projected results, full squads, starting lineups and player profiles for the 2026 FIFA World Cup.',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
