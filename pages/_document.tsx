import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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
    )
  }
}
