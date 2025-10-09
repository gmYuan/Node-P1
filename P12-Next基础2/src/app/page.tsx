
import Head from "next/head";
import Link from "next/link";


export default function Home() {
  return (
      <>
        <Head>
          <title>我是首页title</title>
        </Head>

        <Link href="/posts/first-post">
          <button>去posts页面</button>
        </Link>

        <div>
          <p>我是默认首页</p>
        </div>
      </>
  );
}
