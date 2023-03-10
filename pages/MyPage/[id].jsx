import React,{useRef, useState} from 'react'
import NavBar from '../src/component/NavBar'

const MyPage = () => {
    const [giftVisible,setGiftVisible] = useState(false);
    const arr = ["a","b","a","b","a","b"]

    console.log(giftVisible)

    return (
    <div style={{paddingTop:"10%"}}>
        <div style={{width:250,height:250}}><img style={{width:150,height:150,border:"2px solid skyblue",background:"yellowgreen"}} src="wefjiowejiowfej"/>
        유저얼굴</div>
        <button onClick={()=>{setGiftVisible(false)}}>받은 선물</button>
        <button onClick={()=>{setGiftVisible(true)}}>보낸 선물</button>
        <ul style={{display:"flex",listStyle:"none",padding:"2%",border:"2px solid red"}}>
            <li style={{display:giftVisible?"none":"block",width:"35%",height:"40vh",border:"1px solid blue",background:"skyblue", margin:"2%"}}>내가 받은 선물</li>
            <li style={{display:giftVisible?"block":"none",width:"35%",height:"40vh",border:"1px solid blue",background:"skyblue", margin:"2%"}}>내가 보낸 선물</li>
        </ul>
        
        <NavBar />
    </div>
  )
}

export default MyPage