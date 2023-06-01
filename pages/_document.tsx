import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Generate the next Game Changer."
          />
          <meta property="og:site_name" content="gmechanger.naumenko.ca" />
          <meta
            property="og:description"
            content="Generate your next LLM game changer in seconds."
          />
          <meta property="og:title" content="Game Changer AI Generator" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Game Changer AI Generator" />
          <meta
            name="twitter:description"
            content="Generate your next LLM Game Changer in seconds."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
