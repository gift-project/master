import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>

      <main className={styles.main}>
        <div style={{ display: "flex" }}>
          <div style={{ border: "2px solid black", width: "40%", height: "60vh", margin: "5%" }}>사이트 소개말</div>
          <div style={{ border: "2px solid black", width: "40%", height: "60vh", margin: "5%" }}>카카오 로그인</div>
        </div>
      </main>
    </>
  )
}
