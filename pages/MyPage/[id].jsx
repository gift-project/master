import axios from 'axios';
import React,{useContext, useEffect, useRef, useState} from 'react'
import NavBar from '../src/component/NavBar'
import { TeamC } from '../src/Context';
import { useRouter } from 'next/router';

const MyPage = () => {
    const [giftVisible,setGiftVisible] = useState(false);
    const [giveData,setGiveData] = useState();
    const [takeData,setTakeData] = useState();
    const {userLogin} = useContext(TeamC)
    const router = useRouter();
    if(userLogin === false){
      router?.push("/")
    }

    useEffect(()=>{
      axios.get('/api/gift',{params:{userLogin:userLogin.UserID}}).then(res=>setTakeData(res.data))
      ///////////////////
      axios.get('/api/givepost',{params:{userLogin:userLogin.UserID}}).then(res=>setGiveData(res.data))
    },[])

    return (
    <div style={{paddingTop:"10%"}}>
      <div style={{position:"fixed",top:"48%",left:"50%",transform:"translate(-50%,-50%)",zIndex:0,background:"rgba(255,255,255,0.6)",width:"550px",height:"90vh",borderRadius:"24px",boxShadow:"0 2px 2px"}}>
        <div style={{width:250, marginBottom: "50px"}}>
          <p style={{display: "block", width:150, height:150, margin: "0 auto"}}>
            <img style={{width: "100%", height: "100%", borderRadius: "50%"}} src="/img/profile_picture04.jpg"/>
          </p>
          <p style={{marginTop: "20px", textAlign: "center"}}>유저이름</p>
        </div>
        
        <div style={{display: "flex", justifyContent: "center", marginBottom: "20px"}}>
          <button onClick={()=>{setGiftVisible(false)}} style={{ backgroundColor: (giftVisible == false)? "#219bc3" : "#b2d3e1", display: "block", width: "30%", border: "none", margin: 0, padding: "14px 0", borderRadius: "15px 0 0 15px", borderRight: "1px solid #219bc3"}} >받은 선물</button>
          <button onClick={()=>{setGiftVisible(true)}} style={{ backgroundColor: (giftVisible == true)? "#219bc3" : "#b2d3e1", display: "block", width: "30%", border: "none", margin: 0, padding: "14px 0", borderRadius: "0 15px 15px 0"}} >보낸 선물</button>
        </div>

        <div style={{display:giftVisible?"none":"block",width:"100%"}}>
          <p style={{padding: "20px 0", textAlign: "center"}}>내가 받은 선물</p>
          <ul style={{display: "flex", flexWrap: "wrap", width: "90%", borderRadius: "20px", backgroundColor: "#fff",listStyle: "none",height:"30vh", overflow: "auto"}}>

            {
              takeData && takeData.map((obj,idx )=>{
                
                return <li key={idx} style={{width: "50%", borderBottom : (idx == takeData.length - 2 || idx == takeData.length - 1) ? "none" : "1px solid #ccc"  }}> 
                        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center" , padding: " 15px 10%"}}>
                          <img src={obj.image} alt="gift" style={{display: "block", width: "70px", height: "70px", margin: 0, borderRadius: "50%", backgroundColor: "orange"}}/>
                          <div style={{margin: 0, paddingLeft: "20px"}}>
                            <p style={{fontSize: "14px"}}>{obj.title}</p>
                            <p style={{margin: "3px 0", fontSize: "12px"}}>{obj.price}</p>
                            <p style={{fontSize: "12px"}}>{obj.GiverName}에게 받음</p>
                          </div>
                        </div>
                      </li>
              })
            }

          </ul>
        </div>
        {/* 받은 선물 */}

        <div style={{display:giftVisible?"block":"none", width:"100%"}}>
          <p style={{padding: "20px 0", textAlign: "center"}}>내가 보낸 선물</p>
          <ul style={{display: "flex", flexWrap: "wrap", width: "90%", borderRadius: "20px", backgroundColor: "#fff",listStyle: "none",height:"30vh", overflow: "auto"}}>

            {
              takeData && takeData.map((obj,idx )=>{
                return <li key={idx} style={{width: "50%", borderBottom : (idx == takeData.length - 2 || idx == takeData.length - 1) ? "none" : "1px solid #ccc"  }}> 
                      <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center" , padding: " 15px 10%"}}>
                        <img src={obj.image} alt="gift" style={{display: "block", width: "70px", height: "70px", margin: 0, borderRadius: "50%", backgroundColor: "orange"}}/>
                        <div style={{margin: 0, paddingLeft: "20px"}}>
                        <p style={{fontSize: "14px"}}>{obj.title}</p>
                            <p style={{margin: "3px 0", fontSize: "12px"}}>{obj.price}</p>
                            <p style={{fontSize: "12px"}}>{obj.UserName}에게 보냄</p>
                        </div>
                      </div>
                    </li>
              })
            }

          </ul>
        </div>

        {/* 보낸 선물 */}
        </div>
        <NavBar />
    </div>
  )
}

export default MyPage