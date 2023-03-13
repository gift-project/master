import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { TeamC } from './src/Context';
import { useState } from 'react';
import { Translate } from '@mui/icons-material';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const { setUserLogin } = useContext(TeamC)
  const router = useRouter();
  console.log(router)


  function formLogin(e) {

  }
  const [modalOpen, setModalOpen] = useState(false);

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

  function formSignUp(e) {
    e.preventDefault();
    console.log(e.target.signpasswords.value, e.target.nickname.value, e.target.birthday.value)
  }

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", position: "relative", width: "100%", height: "100%" }}>
        <form method="post" onSubmit={formLogin} style={{ width: "70%", minHeight: "10vh", transform: "translateY(-50%)", boxSizing: "border-box" }}>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* <Form.Label htmlFor="">ID</Form.Label> */}
            <Form.Control name="id" placeholder="ID" type="text" />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* <Form.Label htmlFor="inputPassword5">PW</Form.Label> */}

            <Form.Control
              type="password"
              placeholder="Password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              name="passwords"
            />
          </div>

          <button style={{ display: "block", width: "100%", padding: "10px 0", cursor: "pointer", border: "none", borderRadius: "7px", color: "#fff", backgroundColor: "#219bc3" }} type="submit" >Sign In</button>

        </form>

        <div style={{ width: "100%", position: "absolute", left: "0", bottom: "30%", textAlign: "center" }}>
          <span style={{ fontFamily: "Neo3", fontSize: "14px" }}>Dont have an account?</span> <button style={{ border: "none", color: "#219bc3", backgroundColor: "transparent" }} onClick={() => { setModalOpen(!modalOpen) }}>Sign Up</button>
        </div>


        <div style={{ display: modalOpen ? "flex" : "none", width: "100%", height: "100%", position: "absolute", left: "0", top: "0", backgroundColor: "#C7E5F2" }}>
          <button style={{ width: "30px", height: "30px", position: "absolute", right: "20px", top: "20px", border: "none", backgroundColor: "transparent" }} onClick={() => { setModalOpen(false) }}>X</button>

          <form onSubmit={formSignUp} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", width: "70%", height: "25vh", transform: "translateY(100%)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", border: "none" }}>
              {/* <Form.Label htmlFor="">BirthDay</Form.Label> */}
              <Form.Control placeholder="BirthDay" name="birthday" type="text" />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", border: "none" }}>
              {/* <Form.Label htmlFor="">nickname</Form.Label> */}
              <Form.Control placeholder="Nickname" name="nickname" type="text" />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", border: "none" }}>
              {/* <Form.Label htmlFor="">password</Form.Label> */}
              <Form.Control placeholder="Password" name="signpasswords" type="password" />
            </div>

            <button style={{ display: "block", width: "100%", padding: "10px 0", cursor: "pointer", border: "none", borderRadius: "7px", color: "#fff", backgroundColor: "#219bc3" }} type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  )
}
