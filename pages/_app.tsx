import { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useEffect } from 'react';
import { firebaseConfig } from '../firebaseConfig';

const theme = createTheme();

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    getAuth(app);
    getFirestore(app);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
