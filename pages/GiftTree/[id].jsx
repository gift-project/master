import React, { useState,useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios';
import Image from 'next/image';
import { useContext } from 'react';
import { TeamC } from '../src/Context';
import styles from "./test.module.css";
import ProductList from '../src/component/productList';
import NavBar from '../src/component/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';


const GiftTree = () => {

  
  const {userLogin,setUserLogin} = useContext(TeamC)
  console.log(userLogin,'유저정보')
  const router = useRouter();
  if(userLogin === false){
    router?.push("/")
  }

  const [friendList, setFriendList] = useState();
  const searchInput = useRef(null)

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
    // console.log(Math.floor(Math.random()*5)+1)
    ///wwwwwwwwwwwwww

  return (
    <div style={{display:"flex",flexDirection:"column",position:"relative"}}>
        <div style={{width:"100%",maxWidth:"600px",minWidth:"300px", height:"90px",position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",zIndex:10,background:'#ddd'}}>
          {/* ,position:"fixed",top:0,left:"50%",transform:"translateX(-50%)" */}
          <div>친구리스트</div>
          <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
          <ul style={{display:"flex", listStyle:"none"}}>
                {friendList?.map((obj,idx)=>{
                return <li key={idx} style={{width:60}}><Link href={`/GiftTree/${obj.NickName}`}><figure><img style={{width:40,borderRadius:"50%",border:`3px solid rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},0.8)`}}  src={`/img/Profile${(Math.floor(Math.random()*5)+1)}.jpg`}/><figcaption><strong>{obj.NickName}</strong></figcaption></figure></Link></li>
                })}
            </ul>
            <div style={{position:"relative"}}>
            <form onSubmit={(e)=>{e.preventDefault()}} style={{position:"absolute",right:0,top:0,display:"flex",justifyContent:"center",alignItems:"center"}}>
                <input ref={searchInput} style={{width:10}} placeholder='친구 검색'/>
                <button onClick={()=>{console.log(searchInput.current.style={transform:"scale:1"})}} style={{width:30,height:30}} type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>
            </div>
          </div>
            <button onClick={()=>{setUserLogin(false)}}>로그아웃버튼(임시)</button>
        </div>
      <ProductList />  
      
      <NavBar />  

    </div>
  )
}

export default GiftTree






