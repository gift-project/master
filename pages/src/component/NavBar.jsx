import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faPowerOff, faGift } from '@fortawesome/free-solid-svg-icons'
import { TeamC } from '../Context';

import styles from '@/styles/navbar.module.css';

const NavBar = () => {


  const router = useRouter();
  const { userLogin } = useContext(TeamC);
  console.log(router.pathname);


  return (
    <div className={`${styles.navbar} ${(router.pathname === '/') ? styles.displayNone : ''}`}>
      <div className={styles.innerWrapper}>
        <Link
          className={`${styles.linkStyle} ${router.route == '/MyPage/[id]' ? styles.activeLink : ''}`}
          href={`/MyPage/${userLogin.UserID}`}
        >
          <div className={styles.linkContent}>
            <FontAwesomeIcon style={{ width: 20, display:"block" }} icon={faUser} />
            <p style={{paddingTop: "7px"}}>내정보</p>
          </div>
        </Link>

        <Link
          className={`${styles.linkStyle} ${router.route == '/GiftTree/[id]' ? styles.activeLink : ''}`}
          href={`/GiftTree/${userLogin.UserID}`}
        >
          <div className={styles.linkContent}>
            <FontAwesomeIcon style={{ width: 25, display:"block" }} icon={faGift} />
            <p style={{paddingTop: "7px"}}>마이홈</p>
          </div>
        </Link>
      </div>
      <span className={styles.coin}>50,000coin</span>
      {/* <button style={{display: "block",  margin: 0, border: "none", backgroundColor: "transparent"}} onClick={()=>{setUserLogin(false)}}><FontAwesomeIcon icon={faPowerOff} style={{width: "30px"}} /></button> */}
    </div>
  );
}

export default NavBar
//wefewfew222