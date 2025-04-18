import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Fae-Do-Do Raffle',
  description: 'A night circus inspired masquerade raffle experience',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Playfair+Display&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
