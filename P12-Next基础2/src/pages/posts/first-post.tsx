import Link from "next/link";
import {useCallback} from "react";
import styles from './first-post.module.css'

console.log('FirstPost 组件渲染了')
export default function FirstPost() {

  const handleClick = useCallback(() => {
    console.log('点击了按钮')
  }, [])

  return (
      <>

        <div>
          <h1>我是第一篇文章</h1>
          <button onClick={handleClick} className={styles.btn}> 我是按钮</button>

          <Link href={"/"}>
            <span className={"text-blue-500 hover:text-blue-700"}>返回首页</span>
          </Link>
        </div>

        <style jsx>{`
          h1 {
            color: red;
          }
        `}</style>
      </>
  )
}