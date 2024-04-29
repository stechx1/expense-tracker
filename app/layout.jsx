'use client'
import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import theme from '../theme/themeConfig';
import { ConfigProvider } from 'antd';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';


const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({ children }) {

      
  return (
    <html lang='en' >
      <body className={inter.className} style={{overflowX:'hidden'}}>
        <Provider store={store}>
           <ConfigProvider theme={theme}>
          <AntdRegistry>
           
           <div >{children}</div> 
            <ToastContainer />
          </AntdRegistry>
        </ConfigProvider>
        </Provider>
       
      </body>
    </html>
  );
}
