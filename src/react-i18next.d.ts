import 'react-i18next';
import en from '../public/locales/en/translation.json';

declare module 'react-i18next' {
  interface Resources {
    translation: typeof en;
  }
}