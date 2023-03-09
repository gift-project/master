import React from 'react'
import Link from 'next/link'
import NaverApi from './NaverApi';
import axios from 'axios';
import { useRouter } from 'next/router';

const NavBar = () => {

  let userNumber = 1;
  let id = userNumber;
  console.log(id)
  const router = useRouter();
  console.log(router.route)
  console.log(router.route == "/GiftTree")
  console.log(router.route == "/GiftTree/[id]")


  // axios.get('http://localhost:4000/search/shop?query=환갑').then(res=>console.log(res.data.items))

  
  
  return ( //display:router.route == "/GiftTree/[id]"?"none":"flex"
    <div style={{width:"100%",maxWidth:"600px",minWidth:"300px",height:"60px",padding:"1%",position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",zIndex:10,background:'#ddd',display:"flex",justifyContent:"space-between"}}>
      {/* <Link style={{border:"2px solid green", margin:"1.5%"}} href='/'>로그인화면</Link> */}
      <Link style={{border:"2px solid green", margin:"1.5%",background:router.route == "/GiftTree/[id]"?"#f2cfda":"none"}} href={`/GiftTree/${id}`}>선물</Link>
      <h2>사이트이름~~~</h2>
      <Link style={{border:"2px solid green", margin:"1.5%",background:router.route == "/MyPage/[id]"?"#f2cfda":"none"}} href={`/MyPage/${id}`}>마이</Link>
    </div>
  )
}

export default NavBar