import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useContext } from 'react';
import { TeamC } from '../src/Context';
import ProductList from '../src/component/productList';
import NavBar from '../src/component/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';

import styles from "./id.module.css";
import { padding } from '@mui/system';

const GiftTree = () => {

  const { userLogin, setUserLogin } = useContext(TeamC)
  const router = useRouter();
  if (userLogin === false) {
    router?.push("/")
  }

  const [inputVisible, setInputVisible] = useState(false);
  const searchInput = useRef();

  // 인풋창 표시 상태를 변경하는 함수를 작성하세요.////////////////
  const toggleInput = () => {
    setInputVisible(!inputVisible);
  };


  const [visible, setVisible] = useState(false);

  const [friendList, setFriendList] = useState();

  async function dataGet() {
    axios.get('/api/friends', { params: { userLogin: router.query.id } })
      .then(
        res => setFriendList(res.data))
  }

  useEffect(() => {
    dataGet();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.fixedWrapper}>
        <div className={styles.contentWrapper}>
          <div className={styles.flexContainer}>
            <ul className={styles.ulStyle}>
              {friendList?.map((obj, idx) => {
                return (
                  <li
                    onClick={() => {
                      // your onClick event
                    }}
                    key={idx}
                    className={styles.liStyle}
                  >
                    <Link href={`/GiftTree/${obj.UserID}`}>
                      <figure>
                        <img
                          className={styles.imgStyle}
                          src={`/img/Profile${(Math.floor(Math.random() * 5) + 1)}.jpg`}
                        />
                        <figcaption
                          style={{
                            textAlign: 'center',
                            fontFamily: 'Neo3',
                          }}
                        >
                          <strong style={{ fontSize: '13px' }}>{obj.NickName}</strong>
                        </figcaption>
                      </figure>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(searchInput.current.value);
                  axios.get('/api').then((res) => {
                    let newValue = res.data.filter((obj) => obj.NickName == searchInput.current.value);
                    console.log(newValue[0]?.NickName, '서치결과');
                    alert(newValue[0]?.NickName + '님이 검색되었습니다.');
                  });
                }}
                className={styles.searchForm}
              >
                <input
                  ref={searchInput}
                  className={`${styles.searchInput} ${inputVisible ? styles.showInput : styles.hideInput}`}
                  placeholder='친구 검색'
                  style={{
                    width: "98%",
                    height: "34px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    margin: "5px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    background: "rgba(255, 255, 255, 0.5)",
                    outline: "none",
                    padding:"10px"
                  }}
                />
                <button onClick={toggleInput} className={styles.buttonStyle} type='button'>
                  <FontAwesomeIcon icon={faUserPlus} style={{ width: '25px' }} />
                </button>
              </form>
            </div>
          </div>

          <ProductList visible={visible} setVisible={setVisible} />

        </div>
      </div>


    </div>
  );
}

export default GiftTree






