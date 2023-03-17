import axios from 'axios';
import React, { useState, useEffect } from 'react';


const Present = () => {

  const [friendBday, setFriendBday] = useState([]);

  async function friendsBirth() {
    const res = await axios.get(`/api`)
    const data = res.data
    setFriendBday(data)
  }

  useEffect(() => {
    friendsBirth()
  }, [])





  // const ddd = (friendBday[0].Birth);
  if (friendBday.length > 0) {
    // console.log(friendBday[0].Birth, "생일")
    const datee = new Date(friendBday[0].Birth);
    const datee2 = new Date();
    if (datee2 > datee) {
      console.log('가깝다')
    } else {
      console.log('멀다')
    }
  }

  console.log(friendBday)

  console.log(24 * 60 * 60 * 1000)


  // if(ddd > datee){
  //   console.log('생일이 가까워져')
  // }else{
  //   console.log('생일이 멀어져')
  // }

  // console.log(datee)


  return (
    <div>
      {/* {
        friendBday.map((obj, idx) => {
          return <div key={}></div>
        })
      } */}
    </div>
  );
};

export default Present;