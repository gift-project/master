import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Form from 'react-bootstrap/Form';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  function formLogin(e){
    e.preventDefault();
    console.log(e.target.id.value, e.target.passwords.value)
  }


  return (
    <>
      <div style={{ width: "100%" }}>
        <div style={{ border: "2px solid black", width: "40%", height: "60vh", margin: "5%" }}>사이트 소개말</div>
        <form method="post" onSubmit={formLogin} style={{width: "100%", padding: "30px 0",minHeight: "10vh", boxSizing: "border-box" }}>
          
          <div style={{display:"flex", alignItems: "center", justifyContent: "center"}}>  
            <Form.Label htmlFor="">ID</Form.Label>
            <Form.Control name="id" type="text"/>
          </div>

          <div style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
            <Form.Label htmlFor="inputPassword5">PW</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock" 
              name="passwords"
              />
          </div>
          
          <button style={{display: "block", padding: "10px 80px", cursor:"pointer",border: "none", borderRadius: "30px" ,backgroundColor: "#b2d3e1"}} type="submit" >Login</button>
        </form>
      </div>
    </>
  )
}
