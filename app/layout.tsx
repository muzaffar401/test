import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ConvexProvider } from './ConvexProvider';
import { ThemeProvider } from './ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Save Ur Kids - Securing Future Through Education',
  description: 'A revolutionary platform where students learn for free and get rewarded for their progress. Join thousands of students building their future today.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
                <WhatsAppWidget />
              </div>
            </ConvexProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}