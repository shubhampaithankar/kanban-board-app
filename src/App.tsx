import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container } from '@mui/material';

import Routes from './routes/Routes';

import { Loading, Modal, Navbar, Error } from './components/';
import { ModalContext, useModalProvider } from './hooks/useModal';
import { AuthContext, useAuthProvider } from './hooks/useAuth';

function App() {
  const queryClient = new QueryClient()
  const modal = useModalProvider()
  const auth = useAuthProvider()
  return (
    <>
      <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (<Error didCatch={!!error} error={error} resetErrorBoundary={resetErrorBoundary}/>)}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <ModalContext.Provider value={modal}>
                <AuthContext.Provider value={auth}>
                  <Modal />
                  <Navbar />
                    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
                      <Routes />
                    </Container>
                </AuthContext.Provider>
              </ModalContext.Provider>
            </Suspense>
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;