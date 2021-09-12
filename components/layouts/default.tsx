import Head from "next/head"
import { useRouter } from "next/router"

import Footer from "~/components/Footer"
import Header from "../Header"

export default function DefaultLayout(props) {
  const { children, ...customMeta } = props
  const router = useRouter()
  const meta = {
    title: "Kalpage",
    description: "Blog of Kal.L. A developer",
    type: "website",
    ...customMeta,
  }

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta lang="en" />
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://kalvin.io${router.asPath}`} />
        <link rel="canonical" href={`https://kalvin.io${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Kal.L" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        {meta.date && <meta property="article:published_time" content={meta.date} />}
      </Head>
      {/* TODO: Until I have my blog */}
      <Header />
      <main className="mt-8 flex flex-col justify-center px-8">{children}</main>
      <Footer />
    </div>
  )
}
