import React,{useState,useContext,useEffect,useRef} from 'react'
import axios from 'axios';

import { TeamC } from '../Context';

const ProductList = () => {

    const [visible,setVisible] = useState(false);

    const maxLength = 10; // 문자열 길이 설정

    const arr = ["생일", "결혼", "환갑", "응원", "합격"]

    // 네이버 검색 api 호출
    const [thenApi, setThenApi] = useState();

    // 사러가기 클릭 -> 트리공간에 뿌려주기
    const [Give,SetGive] = useState([]);


  
    const {WishList} = useContext(TeamC);

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
  
        const giveTo = (obj)=>{
          let value = {image:obj.image,title:obj.title,lprice:obj.lprice}
    
          SetGive([...Give, value])
          setVisible(!visible)
          setThenApi();          
        }


  return (
    <div style={{width:"100%",height:"100vh",padding:"120px 0 100px",  position:"relative"}}>
    
     {/* 카테고리, 카테리고리 검색 보여주는곳 */}
  <div style={{position:"relative",margin:"4%"}}>
  선물 트리공간
    {/* 트리공간에 선물 뿌리기 */}
    {Give && Give.map((obj)=>{
      return(
      <article style={{width:"50%", height:"50px"}}>
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
    <div style={{border:"4px solid black", borderRadius:"5px",background:"#F2F2F2",width:"100%",height:"70vh",position:"absolute",top:0,left:0,display:visible?"block":"none",overflow:"auto"}}>
      <article style={{display:"flex",justifyContent:"space-around"}}>
      {/* <h3>쇼핑카트</h3> */}
        <form onSubmit={ (e)=>{searchCg(e)} }>
        <input 
          type="text" 
          style={{ 
          borderRadius: "10px", // 라디우스 조정
          padding: "10px", // 내부 여백 조정
          fontSize: "16px", // 폰트 크기 조정
          width: "400px", // 너비 조정
          height: "50px", // 높이 조정
          margin: "20px" 
          }} 
        />
        <button type='submit'
           style={{
            backgroundColor: "#219bc3",
            border: "none",
            color: "white",
            padding: "15px 20px;",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        
        >검색</button>
        </form>
      </article>

        <ul style={{display:"flex", listStyle:"none", padding:"2%", justifyContent:"space-around", alignItems:"center"}}>

        {arr.map((obj,idx)=>{
            return <li onClick={ ()=>{GetApi(obj)} } style={{border:"1px solid coral", width:60,height:60,margin:"1.5%", textAlign:"center",alignItems:"center", borderRadius:"50%" }} 
            key={idx}> <figure> <img src={`/img/${obj}.jpg`} style={{width:45}}/> <figcaption>{obj}</figcaption> </figure> </li>
        })}
        </ul>

        <div style={{width:"100%", display:"flex", flexWrap:"wrap",padding:"10%"}}>
          {thenApi && thenApi.map((obj, idx)=>{
            return <figure key={idx} style={{width:"50%"}}>
            <img src={obj.image} style={{ width:"50%"}} />
                <figcaption style={{width:"100%"}}>
                <span>{obj.title.replaceAll("<b>","").replaceAll("</b>","").substr(0, maxLength) + (obj.title.length > maxLength ? "..." : "")}</span>
                <span>{obj.lprice}</span>
                <button onClick={()=>{window.open(`${obj.link}`, 'window_name', 'width=430, height=500, location=no, status=no,  scrollbars=yes')}}>
              자세히보기</button>                
            <button onClick={ ()=>{giveTo(obj)} }>선물하기</button>
                    </figcaption>            
            </figure>
          })
          }
          <div ref={setBottom} style={{opacity:0}}>바닥</div>
        </div>
    </div>
</div><button style={{position:"absolute",right:"2%",bottom:"10%"}} onClick={()=>{setVisible(!visible)}}>내가 담은 WishList</button>
    </div>
  )
}

export default ProductList