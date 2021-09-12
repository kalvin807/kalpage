import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" lang="en" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            data-goatcounter="https://kalvin807.goatcounter.com/count"
            async
            src="//gc.zgo.at/count.js"
          ></script>
        </body>
      </Html>
    );
  }
}
