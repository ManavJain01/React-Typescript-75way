import { Box, Button, Typography } from "@mui/material";
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

// Lazy load your component
const LazyComponent = React.lazy(() => import('../components/LazyComponent'));

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language); // Change the current language
  };
  
  return <Box>
    <Typography variant="h6">Homepage</Typography>

    <Button color="primary" variant="contained">
      Primary Button
    </Button>

    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>

    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Español</button>
      <button onClick={() => changeLanguage('fr')}>Français</button>
    </div>
  </Box>;
};

export default Home;
