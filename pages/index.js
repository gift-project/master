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
        }}
      >
        <h1 style={{ marginBottom: "100px", fontSize: "3rem" }}>
          소중한 사람에게
          <br />
          마음을 전하세요.
        </h1>

        <div
          style={{
            marginBottom: "40%",
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
              <Form.Control name="id" placeholder="아이디" type="text" />
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
              />
            </div>

            <button
              style={{
                display: "block",
                width: "100%",
                height: "50px",
                padding: "10px 0",
                cursor: "pointer",
                border: "none",
                borderRadius: "7px",
                color: "#fff",
                backgroundColor: "#219bc3",
              }}
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
            width: "100%",
            height: "100%",
            left: "0",
            top: "0",
            backgroundColor: "#C7E5F2",
          }}
        >
          <button
            style={{
              width: "30px",
              height: "30px",
              right: "20px",
              top: "20px",
              border: "none",
              backgroundColor: "transparent",
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
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
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
                display: "block",
                width: "100%",
                padding: "10px 0",
                cursor: "pointer",
                border: "none",
                borderRadius: "7px",
                color: "#fff",
                backgroundColor: "#219bc3",
              }}
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
