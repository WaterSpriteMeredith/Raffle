// app/layout.tsx
import './globals.css'; // Ensure this path matches your global CSS file
import { ReactNode } from 'react';

export const metadata = {
  title: 'Fae-Do-Do Raffle',
  description: 'Support and win prizes!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
