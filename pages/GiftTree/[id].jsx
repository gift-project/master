import React, { useState,useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios';
import Image from 'next/image';
import { useContext } from 'react';
import WishList from '../Give&Take/[id]';
import { TeamC } from '../src/Context';
import styles from "./test.module.css";



const GiftTree = () => {
    // 상품 카테고리
    const arr = ["생일", "상품권", "결혼", "어른선물", "응원", "합격", "명품", "가전", "영양제", "향수"]

    // 네이버 검색 api 호출
    const [thenApi, setThenApi] = useState();

    // 사러가기 클릭 -> 트리공간에 뿌려주기
    const [Give,SetGive] = useState([]);


    const [visible,setVisible] = useState();
  
    const {WishList} = useContext(TeamC);

    const [gift, setGift] = useState([{title:"상품권"}]);


    const [bottom, setBottom] = useState(null);
    const botObs = useRef(null);
    const numRef = useRef(10);
    const keyWo = useRef();
    
    const a = useRef(true);

    

    //console.log(gift)
    let userNumber = 1;
    let id = userNumber;
    
    let abc = 15
    let [qwe,SetQwe] = useState(0);

    const qweplus = ()=>{
      setGift([...gift,{title:"향수"}])
      SetQwe(qwe+1)
      if( qwe >=5 ){
        SetQwe(0);
      }
      console.log(qwe)
    }


    // 네이버 검색 api 호출
    const GetApi = (obj)=>{

      keyWo.current = obj;
      
      axios.get(`http://localhost:4000/search/shop?query=${obj}&display=${numRef.current}`)
      .then((res) => {
          setThenApi(res.data.items)
          // console.log(numRef.current, '넘숫자')
          // console.log(obj, '물건')
        });
      }

      const dragApi = (obj) => {

        axios.get(`http://localhost:4000/search/shop?query=${obj}&display=${numRef.current}`)
        .then((res) => {
          setThenApi(res.data.items)
          numRef.current++
          console.log(numRef.current, '넘숫자')
          console.log(obj, '물건')
          a.current = true; //3. 2번 완료후 다시 값을 받아온 뒤에 a.current를 true로 바꿔서 드래그 함수를 실행하게 만들어라
        });
      }

      useEffect( () => {
        if(thenApi) {
          const observer = new IntersectionObserver(
            entries => {
              if(entries[0].isIntersecting && a.current){ //1. a의 현재값이 트루이면 실행하라
                dragApi(keyWo.current);
                a.current = false; // 2. dragApi를 실행하면 false로 바꿔라
              }
            },
            {threshold: 1, rootMargin: '50px'}
          );
          botObs.current = observer;

          const observer2 = botObs.current;
          observer2.observe(bottom);
        }
      }, [thenApi]);

      useEffect( () => {GetApi()}, [] )

      useEffect((obj, idx) => {
        console.log(thenApi?.[0]?.category1)
        console.log(thenApi)
      }, [thenApi]);
  
  
      const searchCg = (e)=>{
        GetApi(e.target[0].value);
        e.preventDefault();
        console.log(e.target[0].value)
      }

      const giveTo = (obj)=>{
        let value = {image:obj.image,title:obj.title,lprice:obj.lprice}
  
        SetGive([...Give, value])
        setVisible(!visible)
        setThenApi();
        
        //console.log(obj, '111111111111')
      }
        //{console.log(Give,'확인ddddddd')}
      


  return (
    <div style={{display:"flex",flexDirection:"column", padding:"3%"}}>
        <div style={{width:"100%", height:150,border:"3px solid blue", margin:"2%",display:"flex",justifyContent:"space-around"}}>
            <ul style={{display:"flex", listStyle:"none"}}>
                <li style={{width:60,height:30,border:"1px solid red", margin:"1%"}}><Link href={`/GiftTree/${id}`}>친구 1</Link></li>
                <li style={{width:60,height:30,border:"1px solid red", margin:"1%"}}><Link href={`/GiftTree/${id}`}>친구 2</Link></li>
                <li style={{width:60,height:30,border:"1px solid red", margin:"1%"}}><Link href={`/GiftTree/${id}`}>친구 3</Link></li>
                <li style={{width:60,height:30,border:"1px solid red", margin:"1%"}}><Link href={`/GiftTree/${id}`}>친구 4</Link></li>

                {/* 마이페이지에 담은물건 쌓기 */}
                <button onClick={ ()=>{qweplus
                ()} }>111</button>
            </ul>

            {/* 마이페이지에 담은물건 쌓기 */}
            <div style={{position:"relative" }}>
            {gift.map((obj,idx)=>{
            return <div className={styles.Gift}
            style={ {
            position:"absolute",
            //bottom: (idx >=5 ? 20 : 0),
            left: ( idx%5 == 0 ?     ((idx)%2 == 0 ? +idx : -idx)-idx :    ((idx)%2 == 0 ? +idx : -idx)       )*abc, width:"50px", height:"50px", border:"2px solid black", background:`rgba(255,255,${10*idx},0.7)`}}>
            {obj.title}
            </div>})}
            </div>

            <form onSubmit={(e)=>{e.preventDefault()}}>
                <input placeholder='친구 검색'/>
                <button type="submit">돋보기</button>
            </form>

            <div style={{width:100,height:30,border:"1px solid red", margin:"1%"}}>
                <Link href={`/MyPage/${id}`}>마이페이지</Link>
            </div>
        </div>

        <div style={{width:"100%", height:350,border:"3px solid purple", margin:"2%", position:"relative"}}>선물 트리공간

        {/* 트리공간에 선물 뿌리기 */}
        {Give && Give.map((obj)=>{
          return(

          <article style={{width:"200px", height:"50px"}}>
          <img src={obj.image} style={{width:"200px", height:"200px"}}/>
          <strong> {obj.title}</strong>
          <span>{obj.lprice}</span>
          </article>

          )
        })}
        
        

        
        {/*
        // 위시리스트 모달창 이였던것..
        <div style={{border:"4px solid black",background:"#ddd",width:"85%",height:"60vh",position:"absolute",top:0,left:0,display:visible?"block":"none"}}>
         WishList 
         <img
            src="http://www.bestpen.kr/design/munku/be_new/new_side/1-head_img.jpg"
            alt="aaaa"
            width={200}
            height={200}
          />
           <img
            src="https://cdn.thescoop.co.kr/news/photo/201701/22475_28300_4735.jpg"
            alt="aaaa"
            width={200}
            height={200}
          />
         <button><Link href="/Give&Take/:id">물건 담으러가기</Link></button>
         </div>
         */}

        
         {/* 카테고리, 카테리고리 검색 보여주는곳 */}
      <div style={{position:"relative",margin:"4%"}}>
        <div style={{border:"4px solid black",background:"#ddd",width:"85%",height:"60vh",position:"absolute",top:0,left:0,display:visible?"block":"none"}}>

            <form onSubmit={ (e)=>{searchCg(e)} }>
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
                  자세히보기</button>
                
                <button onClick={ ()=>{giveTo(obj)} }>선물하기</button>

                <img src={obj.image} style={{ width:"200px",height:"200px"}} />
                {/* </Link> */}
                <span>{obj.title.replaceAll("<b>","").replaceAll("</b>","")}</span>
                </div>
              })
              }
              <div ref={setBottom}>바닥이다</div>

            </div>
        </div>
    </div>
  


        <button style={{position:"absolute",right:0,bottom:0}} onClick={()=>{setVisible(!visible)}}>내가 담은 WishList</button>


        </div>
    </div>
  )
}


// next말고 react에서 네이버 api 호출했던 방법인거같음

// <Gift></Gift> 
// function Gift() {
//     const [data, setData] = useState([]);
//     const shoppingData = async () => {
//       const URL = "/v1/search/shop.json"; //URL이 이상하다고 생각하실겁니다! 아래에 계속 됩니다!
//       const ClientID = "D4z2FcUbkf_ToGXADh0H";
//       const ClientSecret = "9LjNdS8bM2";
  
//       await axios
//         .get(URL, {
//           params: {
//             query: "모자",
//             display: 20,
//           },
//           headers: {
//             "X-Naver-Client-Id": ClientID,
//             "X-Naver-Client-Secret": ClientSecret,
//           },
//         })
//         .then((res) => setData(res.data.items))
//         .catch((e) => {});
//         {console.log(data)}
//     };
  
//     useEffect(() => {
//       shoppingData();
//     }, []);
//     {console.log(data)}
//     return (
//       <>
//       {/* <img src={data?.[0]?.image} /> */}
//       </>
//     );
//   }
//    // 쇼핑몰 api

export default GiftTree