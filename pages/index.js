import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { TeamC } from "./src/Context";
import { useState } from "react";
import { Translate } from "@mui/icons-material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { setUserLogin } = useContext(TeamC);
  const router = useRouter();

  function formLogin(e) {}
  const [modalOpen, setModalOpen] = useState(false);

  function formLogin(e) {
    e.preventDefault();
    if (e.target.id.value == "") {
      return alert("ID를 입력해주세요.");
    } else if (e.target.passwords.value == "") {
      return alert("PW를 입력해주세요.");
    }

    axios.get("/api", { LoginID: e.target.id.value }).then((res) => {
      let newValue = res.data?.filter(
        (obj) => obj.LoginID == e.target.id.value
      );
      if (newValue.length === 0) {
        return alert("등록되지 않은 ID입니다.");
      } else if (newValue[0].LoginPW != e.target.passwords.value) {
        return alert("비밀번호를 확인해주세요.");
      } else if (newValue[0].LoginPW == e.target.passwords.value) {
        setUserLogin(newValue[0]);
        router.push(`/GiftTree/${newValue[0].UserID}`);
      }
    });
  }

  function formSignUp(e) {
    e.preventDefault();
    console.log(e);
    console.log(
      e.target.signid.value,
      e.target.signpasswords.value,
      e.target.nickname.value,
      e.target.birthday.value
    );
    axios.post("/api", {
      LoginID: e.target.signid.value,
      LoginPW: e.target.signpasswords.value,
      NickName: e.target.nickname.value,
      Birth: e.target.birthday.value,
    });
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          zIndex:2,
          position:"relative"
        }}
      > 

<img
    src="./img/Balloon-removebg-preview.png"
    alt="image1"
    style={{
      position: "absolute",
      bottom: "63%",
      left: "45%",
      transform: "translateX(-83%)",
      maxWidth: "500px",
      maxHeight: "500px",
      zIndex: 1,
        // width:"320px",
      // height:"320px",
      // outline: "5px solid rgba(255, 255, 255, 0.5)",
    }}
  />
  <img
    src="/img/pinkSun-removebg-preview.png"
    alt="image2"
    style={{
      position: "absolute",
      bottom: "63%",
      left: "50%",
      transform: "translateX(-4%)",
      maxWidth: "100%",
      maxHeight: "100%",
      zIndex: 1,
    }}
  />
  <img
    src="/img/pinkCart-removebg-preview.png"
    alt="image3"
    style={{
      position: "absolute",
      bottom: "27%",
      left: "50%",
      transform: "translateX(-50%)",
      maxWidth: "280px",
      maxHeight: "250px",
      zIndex: 1,
    }}
  />

      <div style={{marginBottom: "35%", textShadow: '0 2px 2px rgba(0, 0, 0, 0.3)'}}>
        <h1 style={{ marginBottom: "25px", fontSize: "3rem", letterSpacing: "-1px", fontFamily:"Neo4",  textAlign: "center"}}>
          소중한 사람에게
          <br />
          마음을 전해보세요 !
        </h1>
         <p style={{ fontSize: "1.5rem", textAlign: "center", alignSelf: "center", color:"rgb(94 92 92)", zIndex:2, position:"relative"}}>
          내가 받고싶은 선물을 위시리스트에 담아보세요<br />
          위시리스트를 공유하고, 선물을 주고받아보세요
         </p>
      </div>


        <div
          style={{
            marginBottom: "15%",
            width: "70%",
          }}
        >
          <form
            method="post"
            onSubmit={formLogin}
            style={{
              minHeight: "10vh",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Form.Label htmlFor="">ID</Form.Label> */}
              <Form.Control name="id" placeholder="아이디" type="text"
              style={{
                width:"100%",
                height: "50px",
                border: "none",
                borderRadius: "10px",
                // padding: "10px 0",
                cursor: "pointer",
                margin: "5px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // 그림자 효과
                background:"rgba(255, 255, 255, 0.5)",
                outline: "none", // 클릭 시 파란색 아웃라인 제거
               }}/>

            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Form.Control
                type="password"
                placeholder="비밀번호"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                name="passwords"
                style={{
                  width:"100%",
                  height: "50px",
                  border: "none",
                  borderRadius: "10px",
                  // padding: "10px 0",
                  cursor: "pointer",
                  margin: "5px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // 그림자 효과
                  background:"rgba(255, 255, 255, 0.5)",
                  outline: "none", // 클릭 시 파란색 아웃라인 제거
  
                  
                 }}/>
            </div>

            <button
                    style={{
                      width:"98%",
                      height: "34px",
                      background: "#b2d3e1",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                      padding: "10px 0",
                      cursor: "pointer",
                      margin: "5px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // 그림자 효과
                      
                     }}
              // style={{
              //   display: "block",
              //   width: "100%",
              //   height: "50px",
              //   padding: "10px 0",
              //   cursor: "pointer",
              //   border: "none",
              //   borderRadius: "7px",
              //   color: "#fff",
              //   backgroundColor: "#219bc3",
              // }}
              type="submit"
            >
              로그인
            </button>
          </form>

          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <span
              style={{
                fontFamily: "Neo3",
                fontSize: "1rem",
              }}
            >
              계정이 없으신가요?
            </span>
            <button
              style={{
                border: "none",
                color: "#219bc3",
                backgroundColor: "transparent",
                fontSize: "1rem",
                marginLeft: "10px",
              }}
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            >
              회원가입
            </button>
          </div>
        </div>

        <div
          style={{
            display: modalOpen ? "flex" : "none",
            position: "absolute",
            width: "85%",
            height: "88%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex:3,

            position:"absolute",
            overflow:"auto", 
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "10px", 
            backdropFilter:"blur(10px)"


            // width:"100%",height:"90vh",paddingTop:"85px",  position:"relative"

          }}
        >
          <button
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "30px",
              height: "30px",
              backgroundColor: "b2d3e1",
              borderRadius:"10px"
            }}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </button>

          <form
            onSubmit={formSignUp}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "70%",
              height: "25vh",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                border: "none",
              }}
            >
              {/* <Form.Label htmlFor="">password</Form.Label> */}
              <Form.Control placeholder="Id" name="signid" type="text" />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                border: "none",
              }}
            >
              {/* <Form.Label htmlFor="">password</Form.Label> */}
              <Form.Control
                placeholder="Password"
                name="signpasswords"
                type="password"
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                border: "none",
              }}
            >
              {/* <Form.Label htmlFor="">BirthDay</Form.Label> */}
              <Form.Control
                placeholder="BirthDay"
                name="birthday"
                type="text"
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                border: "none",
              }}
            >
              {/* <Form.Label htmlFor="">nickname</Form.Label> */}
              <Form.Control
                placeholder="Nickname"
                name="nickname"
                type="text"
              />
            </div>

            <button
              style={{
                width:"98%",
                height: "50px",
                background: "#b2d3e1",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "10px 0",
                cursor: "pointer",
                margin: "5px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.7)", // 그림자 효과

              }}
              type="submit"
            >
              Sign Up

{/* width:"98%",
        height: "50px",
        background: "#b2d3e1",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        padding: "10px 0",
        cursor: "pointer",
        margin: "5px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // 그림자 효과
         */}
{/* 
                width:"100%",
                height: "50px",
                border: "none",
                borderRadius: "10px",
                // padding: "10px 0",
                cursor: "pointer",
                margin: "5px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // 그림자 효과
                background:"rgba(255, 255, 255, 0.5)",
                outline: "none", // 클릭 시 파란색 아웃라인 제거 */}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
