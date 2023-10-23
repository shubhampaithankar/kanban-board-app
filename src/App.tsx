import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary'

import Navbar from './components/Navbar';
import Routes from './routes/Routes';

function App() {
  return (
    <>
      <ErrorBoundary fallback={<>There was an error. {}. Please try again later</>}>
        <Suspense fallback={<>Loading...</>}>
          <Navbar />
          <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </Container>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
