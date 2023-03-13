import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faUser } from '@fortawesome/free-solid-svg-icons'
import { TeamC } from '../Context';


const NavBar = () => {
  
const {userLogin} = useContext(TeamC)

  const router = useRouter();
  
  return (
    <div style={{width:"100%",maxWidth:"600px",minWidth:"300px",height:"60px",padding:"1%",position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",zIndex:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>      
      <Link style={{borderRadius:"8px",border:"3px solid #219bc3",width:45, height:45,display:"flex",justifyContent:"center",alignItems:"center", margin:"1.5%",background:router.route == "/GiftTree/[id]"?"#b2d3e1":"none"}} href={`/GiftTree/${userLogin.UserID}`}><FontAwesomeIcon style={{width:35}} icon={faHouse} /></Link>
      <h2>그린쇼핑몰</h2>
      <Link style={{borderRadius:"8px",border:"3px solid #219bc3",width:45, height:45,display:"flex",justifyContent:"center",alignItems:"center", margin:"1.5%",background:router.route == "/MyPage/[id]"?"#b2d3e1":"none"}} href={`/MyPage/${userLogin.UserID}`}><FontAwesomeIcon style={{width:30}} icon={faUser} /></Link>
    </div>
  )
}

export default NavBar