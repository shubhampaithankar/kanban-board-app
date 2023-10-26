import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container } from '@mui/material';

import Routes from './routes/Routes';

import { Loading, Modal, Navbar, Error } from './components/';

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (<Error didCatch={!!error} error={error} resetErrorBoundary={resetErrorBoundary}/>)}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Modal />
            <Navbar />
            <Suspense fallback={<Loading />}>
              <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
                <Routes />
              </Container>
            </Suspense>
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;