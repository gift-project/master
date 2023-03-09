import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';

const WishList = () => {

    const arr = ["생일", "상품권", "결혼", "어른선물", "응원", "합격", "명품", "가전", "영양제", "향수"]
    const [visible,setVisible] = useState();
    const [thenApi, setThenApi] = useState();

    const [Give,SetGive] = useState();

   

        

    const GetApi = (obj)=>{
    console.log(obj)
    axios.get(`http://localhost:4000/search/shop?query=${obj}`).then(res=>setThenApi(res.data.items));
        }

    useEffect((obj, idx) => {
      console.log(thenApi?.[0]?.category1)
      console.log(thenApi)
    }, [thenApi]);

    // 카테고리 검색 인풋창
    const searchCg = (e)=>{
      GetApi(e.target[0].value);
      e.preventDefault();
      console.log(e.target[0].value)
    }
    
    const giveTo = (obj)=>{
      let value = {image:obj.image,name:obj.title,price:obj.lprice}

      SetGive(value)
          }


  return (
    <div style={{position:"relative",margin:"4%"}}>
        <div style={{border:"4px solid black",background:"#ddd",width:"85%",height:"60vh",position:"absolute",top:0,left:0,display:visible?"block":"none"}}>

            <form onSubmit={ (e)=>{searchCg(e)}  }>
            <input />
            <button type='submit'>검색</button>
            </form>

            <ul style={{display:"flex", listStyle:"none", padding:"2%"}}>

            {arr.map((obj,idx)=>{
                return <li onClick={ ()=>{GetApi(obj)} } style={{border:"1px solid coral", width:60,height:40,margin:"1.5%"}} 
                key={idx}>{obj}</li>
            })}

            

            </ul>
            <div style={{width:"1000px",height:"200px", display:"flex", flexWrap:"wrap"}}>
              {thenApi && thenApi.map((obj, idx)=>{
                return <div key={idx} style={{width:"200px"}}>
                {/* <Link href={obj.link}> */}

                <button onClick={()=>{window.open(`${obj.link}`, 'window_name', 'width=430, height=500, location=no, status=no,  scrollbars=yes')}}>
                  사러가기</button>

                <button onClick={ ()=>{giveTo(obj)} }>담기</button>

                <img src={obj.image} style={{ width:"200px",height:"200px"}} />
                {/* </Link> */}
                <span>{obj.title.replaceAll("<b>","").replaceAll("</b>","")}</span>
                </div>
              })
              }

            </div>
        </div>
        <div style={{width:"100%", height:350,border:"3px solid purple", margin:"2%"}}>선물 보내기, 상품리스트 
        <button style={{position:"absolute",right:0,bottom:0}} onClick={()=>{setVisible(!visible)}}>상품찾아보기</button>
        </div>
    </div>
  )
}
// 1. li 온클릭안에 axios 연결 
// 2. 데이터 왔는지 확인 , state 만들어서 데이터 담기
// 3. state 배열에 맵굴려서 

export default WishList