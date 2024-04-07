import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import theme from '../theme/themeConfig';
import { ConfigProvider } from 'antd';
import { Navbar } from './components/Navbar';
import { GoogleButton } from './components/GoogleButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Expense Tracker',
  description: 'Created in Next JS',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ConfigProvider theme={theme}>
          <AntdRegistry>
            <Navbar />
            {children}
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
