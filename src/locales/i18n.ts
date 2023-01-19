import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// TODO: multi language
import ko from '@/locales/ko';

i18n.use(initReactI18next).init({
	resources: {
    ko: { translation: ko, },
  },
	// 초기 설정 언어
	lng: 'ko',
	fallbackLng: {
		default: ['ko'],
	},
	debug: false,
	defaultNS: 'translation',
	ns: 'translation',
	keySeparator: false,
	interpolation: {
		escapeValue: false,
	},
	react: {
		useSuspense: false,
	},
});

export default i18n;
