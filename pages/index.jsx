// pages/index.jsx
import Head from 'next/head';
import Header from '../components/Header';
import Timeline from '../components/Timeline/Timeline';
import { light, dark, animation } from '../styles/theme';

const Home = () => {
  const [isLight, setIsLight] = React.useState(true);
  const [theme, setTheme] = React.useState(isLight ? light : dark);
  const themeToggle = () => {
    setIsLight(!isLight);
    localStorage.setItem('isLight', isLight ? '0' : '1');
  };

  React.useEffect(() => {
    const savedPref = localStorage.getItem('isLight');
    if (savedPref) setIsLight(savedPref === '1');
  }, []);

  React.useEffect(() => {
    setTheme(isLight ? light : dark);
  }, [isLight]);

  return (
    <div
      style={{
        backgroundColor: theme.bg.primary,
        color: theme.text.primary,
        ...animation.transition,
      }}
    >
      <Head>
        <title>Home | Kal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header themeToggle={themeToggle} theme={theme} />
      <div className="container mx-auto max-w-screen-lg p-8">
        <div className="py-16">
          <h1 className="text-2xl md:text-5xl font-bold ">
            Hey, I'm Calvin Leung
          </h1>
          <p>
            Welcome to my page. Here is small intro of my life as a dev,
            student, and geek.
          </p>
        </div>
        <div className="py-8">
          <h2 className="text-xl md:text-3xl font-bold">About me</h2>
          <p>
            I'm a final year computer science student in Hong Kong. During
            school, I learnt a lot of computer theory, algorithm etc. At night,
            when I am free, I also do coding for fun. Trying out new things, new
            language to make my life easier. When I don't code, I like
            boardgames, tabletop rpg and video games. Occasionally, I am scout
            and outdoor sports, like hiking and camping.
          </p>
        </div>
        <div className="py-8">
          <h2 className="text-xl md:text-3xl font-bold">Timeline</h2>
          <Timeline theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default Home;
