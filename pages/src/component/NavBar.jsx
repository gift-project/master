import React from 'react'
import Link from 'next/link'
import NaverApi from './NaverApi';
import axios from 'axios';

const NavBar = () => {

  let userNumber = 1;
  let id = userNumber;

  // axios.get('http://localhost:4000/search/shop?query=환갑').then(res=>console.log(res.data.items))
  
  
  return (
    <div style={{width:"100%",height:50,border:"2px solid red",padding:"1%"}}>
      <Link style={{border:"2px solid green", margin:"1.5%"}} href='/'>로그인화면</Link>
      <Link style={{border:"2px solid green", margin:"1.5%"}} href={`/GiftTree/${id}`}>선물트리화면</Link>
      <Link style={{border:"2px solid green", margin:"1.5%"}} href={`/Give&Take/${id}`}>선물보내기, 상품리스트</Link>
      <Link style={{border:"2px solid green", margin:"1.5%"}} href={`/MyPage/${id}`}>마이페이지</Link>
      <Link style={{border:"2px solid green", margin:"1.5%"}} href={`/WishList/${id}`}>위시리스트</Link>
      <div style={{border:"5px solid red",width:100,height:100}}><NaverApi/></div>
    </div>
  )
}

export default NavBar