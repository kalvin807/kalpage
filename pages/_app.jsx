import useDarkMode from 'use-dark-mode';
import { useEffect } from 'react';

import '../styles/index.css';
import '../styles/timeline.css';
import '../styles/app.css';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    document.body.className = (document.body.className ?? '').replace(
      'no-js',
      'js'
    );
  }, []);

  useDarkMode();

  return <Component {...pageProps} />;
};

export default App;
