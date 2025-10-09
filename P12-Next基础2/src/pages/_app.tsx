import Head from "next/head";
import '../styles/global.css'
import type { AppProps } from "next/app";

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>我是公共的title</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}