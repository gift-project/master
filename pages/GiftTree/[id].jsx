import React, { useState,useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useContext } from 'react';
import { TeamC } from '../src/Context';
import styles from "./test.module.css";
import ProductList from '../src/component/productList';
import NavBar from '../src/component/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';

const GiftTree = () => {
  
  const {userLogin,setUserLogin} = useContext(TeamC)
  const router = useRouter();
  if(userLogin === false){
    router?.push("/")
  }

  
  const [visible,setVisible] = useState(false);

  const [friendList, setFriendList] = useState();
  const searchInput = useRef(null)

    async function dataGet() {        
        axios.get('/api/friends',{params:{userLogin:router.query.id}})
        .then(
          res=>setFriendList(res.data))        
    }

    useEffect(() => {
        dataGet();        
    }, [])

  return (
    <div style={{display:"flex",flexDirection:"column",position:"relative"}}>
      <div style={{
        position:"fixed",
        top:"48%",
        left:"50%",
        transform:"translate(-50%,-50%)",
        zIndex:0,
        background:"rgba(255,255,255,0.6)",
        width:"550px",
        height:"90vh",
        borderRadius:"24px",
   
        }}>
      <div style={{maxWidth:"600px",minWidth:"300px", height:"auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <ul style={{display:"flex",margin: "0 0 0 20px", padding:"2% 0", listStyle:"none"}}>
                  {friendList?.map((obj,idx)=>{
                  return <li onClick={()=>{
                  }} key={idx} style={{width:55,margin:"2px 8px 0"}}><Link href={`/GiftTree/${obj.UserID}`}><figure><img style={{width:55,borderRadius:"50%",border:`5px solid rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},0.8)`}}  src={`/img/Profile${(Math.floor(Math.random()*5)+1)}.jpg`}/><figcaption style={{textAlign:"center"}}><strong style={{fontSize:"13px"}}>{obj.NickName}</strong></figcaption></figure></Link></li>
                  })}

              </ul>

              <div style={{margin: 0, position:"relative"}}>
                <form onSubmit={(e)=>{
                e.preventDefault()
                console.log(searchInput.current.value)
                axios.get('/api').then((res)=>{
                  let newValue = res.data.filter(obj => obj.NickName == searchInput.current.value)
                  console.log(newValue[0]?.NickName,'서치결과')
                  alert(newValue[0]?.NickName + "님이 검색되었습니다.")
                })
                }} style={{margin: "0 20px 0 0", position:"absolute",right:0,top: "-30px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <input ref={searchInput} style={{transform:"scale(0)"}} placeholder='친구 검색'/>
                  <button onClick={()=>{console.log(searchInput.current.style={transform:"scale(1)"})}} style={{width:30,height:30, border: "none", backgroundColor: "transparent"}} type="submit">
                    {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                    <FontAwesomeIcon icon={faUserPlus}  style={{width: "25px"}} />
                  </button>
                </form>
              </div>
            
            </div>
            {/* <button onClick={()=>{setUserLogin(false)}}>로그아웃버튼(임시)</button> */}
          
        <hr/>
        </div>
        
      {/* 위시리스트 -> 선물하기 클릭시 담기는곳 */}
      <ProductList visible={visible} setVisible={setVisible} />  
      </div>

      
      <NavBar />  

    </div>
  )
}

export default GiftTree






