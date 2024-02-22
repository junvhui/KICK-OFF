import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './MainPage/App';
import Header from './Common/Header';
import Footer from './Common/Footer';
import GlobalStyle from './GlobalStyle';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient(); // 생성

root.render(
  <BrowserRouter>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <Header />
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
      <Footer />
    </QueryClientProvider>
  </BrowserRouter>,
);
