// // import i18n from 'i18next';
// import {initReactI18next} from 'react-i18next';
// import * as Localization from 'react-native'
// import en from './Locales/en.json';
// import hi from './Locales/hi.json';
// import bn from './Locales/bn.json';
// import te from './Locales/te.json';
// import mr from './Locales/mr.json';
// import ta from './Locales/ta.json';
// import rj from './Locales/rj.json';
// import gu from './Locales/gu.json';
// import ur from './Locales/ur.json';
// import pn from './Locales/pn.json';
// import kn from './Locales/kn.json';
// import or from './Locales/or.json';
// import ml from './Locales/ml.json';
// import i18next from 'i18next';

// const resources = {
//   en: {translation: en},
//   hi: {translation: hi},
//   bn: {translation: bn},
//   te: {translation: te},
//   mr: {translation: mr},
//   ta: {translation: ta},
//   rj: {translation: rj},
//   gu: {translation: gu},
//   ur: {translation: ur},
//   pn: {translation: pn},
//   kn: {translation: kn},
//   or: {translation: or},
//   ml: {translation: ml},
// };

// const languageDectector={
//     tyle:'languageDetector',
//     async: true,
//     detect: (callback)=> {

//         const bestLanguage= Localization.findBestLanguageTag(
//             Object.keys(resources)
//         )
//         callback(bestLanguage?.languageTag || 'en')
//     },
//     init: ()=> {},
//     cacheUserLanguage: () => {},
// }

// i18next.use(languageDectector).use(initReactI18next).init({
//     compatibilityJSON: 'v3',
//     fallbackLng:'en',
//     resources,
//     interpolation: {
//         escapeValue: false,
//     },
// });
// export default i18next;
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'react-native-localize';
import bn from './Locales/bn.json';
import en from './Locales/en.json';
import gu from './Locales/gu.json';
import hi from './Locales/hi.json';
import kn from './Locales/kn.json';
import ml from './Locales/ml.json';
import mr from './Locales/mr.json';
import or from './Locales/or.json';
import pn from './Locales/pn.json';
import rj from './Locales/rj.json';
import ta from './Locales/ta.json';
import te from './Locales/te.json';
import ur from './Locales/ur.json';

const resources = {
  bn: {translation: bn},
  en: {translation: en},
  gu: {translation: gu},
  hi: {translation: hi},
  kn: {translation: kn},
  ml: {translation: ml},
  mr: {translation: mr},
  or: {translation: or},
  pn: {translation: pn},
  rj: {translation: rj},
  ta: {translation: ta},
  te: {translation: te},
  ur: {translation: ur},
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    const bestLanguage = Localization.findBestLanguageTag(
      Object.keys(resources),
    );
    callback(bestLanguage?.languageTag || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
