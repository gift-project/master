import React, { useState,useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios';
import Image from 'next/image';
import { useContext } from 'react';
import { TeamC } from '../src/Context';
import styles from "./test.module.css";
import ProductList from '../src/component/productList';
import NavBar from '../src/component/NavBar';


const GiftTree = () => {
    // 상품 카테고리
    const [gift, setGift] = useState([{title:"상품권"}]);
    

    
    let abc = 15

    const [friendList, setFriendList] = useState();

    async function dataGet() {
        const res = await axios.get(`/api`)
        const data = res.data
        console.log(data, '데이터조회결과')
        setFriendList(data)
    }

    useEffect(() => {
        dataGet();
    }, [])

    console.log(friendList,'친구')

    let userNumber = 1;
    let userId = userNumber;
    


  return (
    <div style={{display:"flex",flexDirection:"column",position:"relative"}}>
        <div style={{width:"100%",maxWidth:"600px",minWidth:"300px", height:"90px",position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",zIndex:10,background:'#ddd'}}>
          {/* ,position:"fixed",top:0,left:"50%",transform:"translateX(-50%)" */}
          <div>친구리스트</div>
          <div style={{display:"flex",justifyContent:"space-around"}}>
          <ul style={{display:"flex", listStyle:"none"}}>
                {friendList?.map((obj,idx)=>{
                return <li key={idx} style={{width:60,height:30,border:"1px solid red", margin:"1%"}}><Link href={`/GiftTree/${obj.NickName}`}>{obj.NickName}</Link></li>
                })}
            </ul>

            <form onSubmit={(e)=>{e.preventDefault()}}>
                <input style={{width:50}} placeholder='친구 검색'/>
                <button type="submit">돋보기</button>
            </form>
          </div>
            
        </div>
      <ProductList />  
      
      <NavBar />  

    </div>
  )
}

export default GiftTree