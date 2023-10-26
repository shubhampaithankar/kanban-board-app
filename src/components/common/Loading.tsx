import { CircularProgress } from '@mui/material';
import React from 'react'

export default function Loading() {
    return (
        <div>
          <h2>Loading Data...</h2>
          <CircularProgress />
        </div>
      );
}
