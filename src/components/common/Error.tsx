import { Container, CssBaseline, Typography, Button } from "@mui/material";
import { ErrorBoundaryContextType } from "react-error-boundary";

export default function Error({ error, resetErrorBoundary, didCatch }: ErrorBoundaryContextType) {
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Typography variant="h4" gutterBottom>
        Something went wrong!
      </Typography>
      <Typography variant="body1" paragraph>
        We apologize for the inconvenience. An error occurred while rendering this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
        Try Again
      </Button>
    </Container>
  )
}