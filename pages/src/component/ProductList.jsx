import React,{useState,useContext,useEffect,useRef} from 'react'
import axios from 'axios';

import { TeamC } from '../Context';
import { MyLocationRounded } from '@mui/icons-material';


// 카테고리 페이지


const ProductList = () => {

    const [visible,setVisible] = useState(false);

    const maxLength = 10; // 문자열 길이 설정 (title)

    const arr = ["생일", "결혼", "환갑", "응원", "합격"]

    // 네이버 검색 api 호출
    const [thenApi, setThenApi] = useState();

    // 사러가기 클릭 -> 트리공간에 뿌려주기
    const [Give,SetGive] = useState([
      {image:"https://shopping-phinf.pstatic.net/main_3752711/37527114044.20230130140516.jpg",
        title:"생일선물ㅇㅇㅇㅇㅇㅇㅇ",
        lprice:"12500원"}
    ]);
    {console.log(Give ,"기브기브기브")}

    //ver222<-push
    //wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
    //wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
    //wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww


  
    const {MyID} = useContext(TeamC);
    console.log(MyID,'??')

    const [bottom, setBottom] = useState(null);
    const botObs = useRef(null);
    const numRef = useRef(10);
    const keyWo = useRef();
    
    const a = useRef(true);

    

    //console.log(gift)

    
    // 네이버 검색 api 호출
    const GetApi = (obj)=>{

        keyWo.current = obj;
        
        axios.get(`http://localhost:4000/search/shop?query=${obj}&display=${numRef.current}`)
        .then((res) => {
            setThenApi(res.data.items)
          });
        }
  
        const dragApi = (obj) => {
  
          axios.get(`http://localhost:4000/search/shop?query=${obj}&display=${numRef.current}`)
          .then((res) => {
            setThenApi(res.data.items)
            numRef.current+=10
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
        

        // 카테고리 아이템 처음부터 보여주는 코드
        useEffect( () => {
            if(visible)
            {GetApi()}},
             [visible] )
  
        useEffect(() => {
          console.log(thenApi?.[0]?.category1)
          console.log(thenApi)
        }, [thenApi]);

        console.log(visible,'비져블')
    
    
        const searchCg = (e)=>{
          GetApi(e.target[0].value);
          e.preventDefault();
          console.log(e.target[0].value)
        }
  
        const addToGift = (obj)=>{

          axios.post('/api/gift',{UserID:MyID
            ,title:obj.title
            ,image:obj.image
            ,price:obj.lprice
            ,state:0})

          let value = {image:obj.image,title:obj.title,lprice:obj.lprice}
    
          SetGive([...Give, value])
          setVisible(!visible)
          setThenApi();          
        }

        const [sqlGift, setSqlGift] = useState();
  const [sqlFriends, setFriendList] = useState();
  console.log(sqlGift, sqlFriends, '???')


  return (
    <div style={{width:"100%",height:"100vh",padding:"120px 0 100px",  position:"relative"}}>
    
     {/* 카테고리, 카테리고리 검색 보여주는곳 */}
  <div style={{position:"relative",margin:"4%"}}>
  선물 트리공간

  <button onClick={() => {
          axios.get('/api/gift')
            .then(res => setSqlGift(res.data))
        }}>Sql.GiftList 접근</button>

        <button onClick={() => {
          axios.get('/api/friends')
            .then(res => setFriendList(res.data))
        }}>Sql.FriendsList 접근</button>

        {/* sql데이터 기반 화면에 뿌려보기 */}
        {sqlGift?.map((obj, idx) => {
          return <article key={"TestA"+idx}>
            <img src={obj.image} style={{ width: "100px", height: "100px" }} />
            <strong> {obj.title}</strong>
            <span>{obj.price}</span>
          </article>
        })}
        <hr />
        {sqlFriends?.map((obj, idx) => { return <div key={"TestB"+idx}>{obj.NickName}</div> })}

    {/* 트리공간에 선물 뿌리기 */}
    {Give && Give?.map((obj,idx)=>{
      return(
        
      <article key={"Tree"+idx} style={{width:"50%", height:"50px"}}>
      <img src={obj.image} style={{width:"100%", height:"200px"}}/>
      <strong> {obj.title}</strong>
      <span>{obj.lprice}</span>
      </article>
      
      )
    })}
      {/* 
          카테고리 라디우스이미지 + 카테고리 이름 

          카테고리 5개 이미지 구하샘 O

          아이템들 물품제목, 가격  간결하게 보이게 ex 욕실 화장실 ... 
                                             10,000                     
          
          타이틀 텍스트 한줄로 줄이기 
          
      */}
    <div style={{ 
      background:"#fff", width:"100%",height:"70vh",position:"absolute",top:0,left:0,display:visible?"block":"none",overflow:"auto", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)", borderRadius: "10px", padding: "20px"
      }}>
      <article style={{display:"flex",justifyContent:"space-around"}}>
      {/* <h3>쇼핑카트</h3> */}
        <form onSubmit={ (e)=>{searchCg(e)} } style={{transform:"translateY(-11px)"}}>
        <input 

          color='#000'
          type="text" 
          placeholder='원하는 품목을 찾아보세요.'

          style={{ 
            height: "50px", 
            margin: "20px",
            borderRadius: "10px", // 라디우스 조정
            fontSize: "14px", // 폰트 크기 조정
            width: "265px", // 너비 조정
            border: "none", // 검은색 보더 제거
            outline: "none", // 클릭 시 파란색 아웃라인 제거
            padding: "10px", // 내부 여백 조정

            background: "rgba(255, 255, 255, 0.5)", // 투명도 조정
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // 그림자 효과
            }}
        
        />
        <button type='submit'
           style={{
            backgroundColor: "#b2d3e1",
            border: "none",
            color: "white",
            padding: "15px 20px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            borderRadius: "10px",
            cursor: "pointer",
            width: "71px",
            height: "50px",

            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // 그림자 효과
            }}
        
        >검색</button>
        </form>
      </article>

        <ul style={{
           display: "flex",
           listStyle: "none",
           paddingBottom:"5%",
           justifyContent: "space-around",
           alignItems: "center",
           background: "rgba(255, 255, 255, 0.5)", // 투명도 조정
           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // 그림자 효과
           borderRadius: "16px", // 라운드 처리
          // display:"flex", listStyle:"none", padding:"2%", justifyContent:"space-around", alignItems:"center"
          }}>
        
        {/* 배열에 넣어둔 카테고리 목록 노출 */}
        {arr.map((obj,idx)=>{
            return <li onClick={ ()=>{GetApi(obj)} } 
            style={{
              fontFamily: "Neo3, sans-serif",backgroundColor:"#b2d3e1",width:58,height:58,margin:"1.5%", textAlign:"center",alignItems:"center", borderRadius:"50%",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
            }} 
            key={"categoryList"+idx}> 
            <figure style={{overflow:"hidden"}}>
            <img src={`/img/${obj}.jpg`}
            style={{
              width: "58px",
              height: "58px",
              objectFit:"cover",
              borderRadius: "50%"
            }}/>  </figure> <span>{obj}</span> </li>
        })}
        </ul>

        
        {/* 카테고리 클릭시 나오는 아이템목록22222 */}
        <div style={{width:"100%", display:"flex", flexWrap:"wrap",padding:"10%"}}>

          {thenApi && thenApi.map((obj, idx)=>{
            return <div key={"shopping" + idx}
              style={{
                width: "calc(50% - 1%)",
                background: "#fff",
                boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.16), 0px 4px 16px rgba(0, 0, 0, 0.08)",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                margin: "0.5%"
              }}>

              <img src={obj.image} style={{ width:"100%"}} alt="product" />
        <figcaption
        style={{
          width: "100%",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          flexGrow: "1",
          }}>
        <span style={{fontFamily: "Neo3, sans-serif"}}>{obj.title.replaceAll("<b>","").replaceAll("</b>","").substr(0, maxLength) + (obj.title.length > maxLength ? "..." : "") }</span>
        <p>{obj.lprice}원</p>
        <div
        style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        }}
        >
        <button onClick={()=>{window.open(`${obj.link}`, 'window_name', 'width=430, height=500, location=no, status=no,  scrollbars=yes')}}
        style={{
          background: "#007AFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px",
          cursor: "pointer",
          margin: "5px",
        }}>
        자세히보기</button>
         <button onClick={ ()=>{addToGift(obj)} }
         style={{
          background: "#9DC88D",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px",
          cursor: "pointer",
          margin: "5px",
         }}
         >선물하기</button>
        </div>
      </figcaption> 
 
             </div>})}

        </div>

    <div ref={setBottom} style={{opacity:0}}>바닥</div>
              

    </div>
    </div>
    <button style={{ position: "absolute", right: "2%", bottom: "10%" }} onClick={() => { setVisible(!visible); } }>내가 담은 WishList</button>
    </div>
  )
}

export default ProductList