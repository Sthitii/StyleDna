import { Inter } from 'next/font/google';
import "@/styles/global.css";
import { AuthProvider } from "@/context/AuthContext";
import CartSidebar from '@/components/cart/cartSidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'STYLEDNA - Fashion Forward',
  description: 'Your premium fashion destination',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <CartSidebar />
        </AuthProvider>
      </body>
    </html>
  );
}