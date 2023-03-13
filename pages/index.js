import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { TeamC } from './src/Context';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { setUserLogin } = useContext(TeamC)
  const router = useRouter();
  console.log(router)


  function formLogin(e) {
    e.preventDefault();
    console.log(e.target.id.value, e.target.passwords.value)
    console.log(e.target.id.value == "")
    if (e.target.id.value == "") {
      return alert("ID를 입력해주세요.")
    } else if (e.target.passwords.value == "") {
      return alert("PW를 입력해주세요.")
    }

    axios.get('/api', { LoginID: e.target.id.value }).then((res) => {
      let newValue = res.data.filter(obj => obj.LoginID == e.target.id.value)
      console.log(newValue, '아디의 존재여부')
      if (newValue.length === 0) {
        return alert("등록되지 않은 ID입니다.")
      } else if (newValue[0].LoginPW != e.target.passwords.value) {
        return alert("비밀번호를 확인해주세요.")
      } else if (newValue[0].LoginPW == e.target.passwords.value) {
        setUserLogin(newValue[0].UserID)
        router.push(`/GiftTree/${newValue[0].UserID}`)

        // return alert("로그인 되었습니다.")
      }

      // console.log(res.data, '로그인수락')
      // console.log(res.data.map(obj => console.log(obj.LoginID)))
      // // console.log(newValue, '검증')
      // // console.log(newValue[0].LoginPW, '검증 1')
      // // console.log(e.target.passwords.value, '검증 2')
      // console.log(newValue[0].LoginPW == e.target.passwords.value, '비멀번호 확인')

      console.log("-=------------------------------")
    }
    )
    // admin100

  }


  return (
    <>
      <div style={{ width: "100%" }}>
        <div style={{ border: "2px solid black", width: "40%", height: "60vh", margin: "5%" }}>사이트 소개말</div>
        <form method="post" onSubmit={formLogin} style={{ width: "100%", padding: "30px 0", minHeight: "10vh", boxSizing: "border-box" }}>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Form.Label htmlFor="">ID</Form.Label>
            <Form.Control name="id" type="text" />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Form.Label htmlFor="inputPassword5">PW</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              name="passwords"
            />
          </div>

          <button style={{ display: "block", padding: "10px 80px", cursor: "pointer", border: "none", borderRadius: "30px", backgroundColor: "#b2d3e1" }} type="submit" >Login</button>
        </form>
      </div>
    </>
  )
}
