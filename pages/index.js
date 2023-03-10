import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ border: "2px solid black", width: "40%", height: "60vh", margin: "5%" }}>사이트 소개말</div>
        <div style={{ border: "2px solid black", width: "40%", height: "60vh", margin: "5%" }}>카카오 로그인</div>
      </div>
    </>
  )
}
