import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Translate } from '@mui/icons-material';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [modalOpen, setModalOpen] = useState(false);

  function formLogin(e){
    e.preventDefault();
    console.log(e.target.id.value, e.target.passwords.value)
  }

  function formSignUp(e){
    e.preventDefault();
    console.log(e.target.signpasswords.value, e.target.nickname.value, e.target.birthday.value)
  }

  return (
    <>
      <div style={{display: "flex",flexWrap: "wrap", alignItems: "center" , position: "relative", width: "100%", height: "100%" }}>
        <form method="post" onSubmit={formLogin} style={{width: "70%", minHeight: "10vh",transform: "translateY(-50%)" , boxSizing: "border-box" }}>
          
          <div style={{display:"flex", alignItems: "center", justifyContent: "center"}}>  
            {/* <Form.Label htmlFor="">ID</Form.Label> */}
            <Form.Control name="id" placeholder="ID" type="text"/>
          </div>

          <div style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
            {/* <Form.Label htmlFor="inputPassword5">PW</Form.Label> */}
            <Form.Control
              type="password"
              placeholder="Password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock" 
              name="passwords"
              />
          </div>
          
          <button style={{display: "block",width: "100%", padding: "10px 0", cursor:"pointer",border: "none", borderRadius: "7px", color: "#fff", backgroundColor: "#219bc3"}} type="submit" >Sign In</button>
        </form>

        <div style={{width: "100%", position: "absolute", left: "0", bottom: "30%", textAlign: "center"}}>
          <span style={{fontFamily: "Neo3", fontSize: "14px"}}>Don't have an account?</span> <button style={{border: "none",color: "#219bc3" ,backgroundColor: "transparent"}} onClick={() => {setModalOpen(!modalOpen) }}>Sign Up</button>
        </div>


        <div style={{display:modalOpen ? "flex" : "none", width: "100%", height: "100%", position: "absolute", left: "0", top: "0", backgroundColor: "#C7E5F2"}}>
        <button style={{width: "30px", height: "30px",position: "absolute" , right: "20px", top: "20px", border: "none", backgroundColor: "transparent"}} onClick={() => {setModalOpen(false) }}>X</button>

          <form onSubmit={formSignUp} style={{display: "flex", alignItems: "center",flexWrap: "wrap", width: "70%", height: "25vh",transform: "translateY(100%)"}}>
            <div style={{display:"flex", alignItems: "center", justifyContent: "center", width: "100%", border: "none"}}>  
              {/* <Form.Label htmlFor="">BirthDay</Form.Label> */}
              <Form.Control placeholder="BirthDay" name="birthday" type="text"/>
            </div>

            <div style={{display:"flex", alignItems: "center", justifyContent: "center", width: "100%" , border: "none"}}>  
              {/* <Form.Label htmlFor="">nickname</Form.Label> */}
              <Form.Control placeholder="Nickname" name="nickname" type="text"/>
            </div>

            <div style={{display:"flex", alignItems: "center", justifyContent: "center", width: "100%", border: "none"}}>  
              {/* <Form.Label htmlFor="">password</Form.Label> */}
              <Form.Control placeholder="Password" name="signpasswords" type="password"/>
            </div>

            <button style={{display: "block",width: "100%" ,padding: "10px 0", cursor:"pointer",border: "none", borderRadius: "7px", color: "#fff", backgroundColor: "#219bc3"}} type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  )
}
