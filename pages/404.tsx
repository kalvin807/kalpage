import Link from "next/link"
import Image from "next/image"
import Layout from "~/layouts/default"

export default function NotFound() {
  return (
    <Layout title="Not Found – Kalpage">
      <div className="flex flex-col justify-center items-center max-w-3xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 ">404</h1>
        <div className="p-8">
          <Image alt="doggo guard" src="/doggo-full.png" width="256" height="256" />
        </div>
        <p className=" mb-8">Greater Dog is waiting for your command. </p>

        <Link href="/">
          <a className="btn btn-lg no-underline">Return Home</a>
        </Link>
      </div>
    </Layout>
  )
}
