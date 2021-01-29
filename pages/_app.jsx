import useDarkMode from 'use-dark-mode';

import '../styles/index.css';
import '../styles/timeline.css';
import '../styles/app.css';

const App = ({ Component, pageProps }) => {
  useDarkMode();
  return <Component {...pageProps} />;
};

export default App;
