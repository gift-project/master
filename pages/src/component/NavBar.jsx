import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { TeamC } from '../Context';

const NavBar = () => {
  

  const router = useRouter();
  const {userLogin,setUserLogin} = useContext(TeamC);

  
  return (
    <div style={{width:"100%",maxWidth:"600px",minWidth:"300px",height:"60px",padding:"1%",position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",zIndex:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>      
      <Link style={{borderRadius:"8px", width:55, height:55,display:"flex",justifyContent:"center",alignItems:"center", margin:"1.5%",background:router.route == "/MyPage/[id]"?"#b2d3e1":"none"}} href={`/MyPage/${userLogin.UserID}`}><FontAwesomeIcon style={{width:30}} icon={faUser} /></Link>
      <Link style={{borderRadius:"8px", width:55, height:55,display:"flex",justifyContent:"center",alignItems:"center", margin:"1.5%",background:router.route == "/GiftTree/[id]"?"#b2d3e1":"none"}} href={`/GiftTree/${userLogin.UserID}`}><FontAwesomeIcon style={{width:35}} icon={faHouse} /></Link>
      <span style={{margin: 0}}>50,000coin</span>
      <button style={{display: "block",  margin: 0, border: "none", backgroundColor: "transparent"}} onClick={()=>{setUserLogin(false)}}><FontAwesomeIcon icon={faPowerOff} style={{width: "35px"}} /></button>
    </div>
  )
}

export default NavBar