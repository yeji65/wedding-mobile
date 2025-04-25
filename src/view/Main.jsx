import React, { useEffect, useRef, useState } from 'react'
import '@/css/Main.css'
import '@/css/Calendar.css'
import gifImage from '@/images/img.gif';
import loveImage from '@/images/love.png';
import ContactModal from '@/components/contactModal';
import profileImg1 from '@/images/profileImg1.jpg';
import profileImg2 from '@/images/profileImg2.jpg';
import Calendar from 'react-calendar';
import Gallery from '@/components/Gallery';
import Map from '@/components/Map';
import naverMap from '@/images/naverMap.png';
import kakaoNavi from '@/images/kakaoNavi.png';
import tMap from '@/images/tMap.png';
import car from '@/images/car.png';
import bus from '@/images/bus.png';
import subway from '@/images/subway.png';
import parking from '@/images/parking.png';
import CommunicationModal from '@/components/CommunicationModal';
import AccordionSection from '@/components/AccordionSection';
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import FadeInSection from '@/components/FadeInSection';
import GuestBook from '@/components/GuestBook';

export const Main = () => {

  //데이터
  const [user, setUser] = useState([])

  //연락처 모달
  const [isModal, setIsModal] = useState(false)

  //참석여부 모달
  const [isCommunicationModal, setIsCommunicationModal] = useState(false)

  //선택한 이미지 
  const [selectedIndex, setSelectedIndex] = useState(null);

  /**********************  캘린더  ********************/
  /****************************************************/
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const isCircleDay =
        date.getFullYear() === 2026 &&
        date.getMonth() === 2 && // 3월
        date.getDate() === 28;
      if (isCircleDay) {
        return (
          <div className="custom-day-wrapper">
            <div className="custom-day-circle">{date.getDate()}</div>
            {/* <div className="custom-day-label">오전 11시</div> */}
          </div>
        );
      }

      return <div className="custom-day"
        style={date.getDate() == 1 ||
          date.getDate() == 8 ||
          date.getDate() == 15 ||
          date.getDate() == 22 ||
          date.getDate() == 29 ? { color: "rgba(255, 0, 0, 0.5)" } : null}
      >
        {date.getDate()}</div>;
    }
    return null;
  };

  /****************************************************/

  /**********************  갤러리  ********************/
  /****************************************************/
  const images = [
    gifImage, profileImg1, gifImage, profileImg1, gifImage, profileImg1, gifImage, profileImg1, gifImage, profileImg1
  ];

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  const nextImage = (idx) => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  /****************************************************/

  /***********************  지도  *********************/
  /****************************************************/
  const openMapLink = (appUrl, webUrl) => {
    // 모바일인지 확인
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = appUrl;

      // 앱이 없을 경우 대비: 2초 후 웹으로 fallback
      setTimeout(() => {
        window.location.href = webUrl;
      }, 2000);
    } else {
      window.open(webUrl, "_blank");
    }
  };
  /****************************************************/


  //임시
  const accounts = {
    groom: [
      { bank: '신한', number: '110-123-456789', name: '최재만' },
      { bank: '신한', number: '110-123-456789', name: '최도현' },
    ],
    bride: [
      { bank: '국민', number: '123-4567-8901', name: '김지은' },
      { bank: '카카오', number: '3333-12-3456789', name: '박지현' },
    ],
  };

  const fetchUsers = async () => {
    // ... try, catch 생략
    const usersCollectionRef = collection(db, 'users'); // 
    const userSnap = await getDocs(usersCollectionRef); // 
    const data = userSnap.docs?.map(doc => ({
      ...doc.data(),
    }));
    setUser(data)
  }
  //데이터 불러오기
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="app-container">
      <div className="invitation-container">
        <p style={{ fontWeight: 100 }}>WEDDING INVITATION</p>
        <div className="title">
          <div className="title-name">홍길동</div>
          <div className="title-div">&</div>
          <div className="title-name">이몽룡</div>
        </div>
        <img className="main-img" src={gifImage} />
        <p>2026년 3월 28일 (토) 오전 11시</p>
        <h3>홍길동 & 이몽룡</h3>
        <p>Wi컨벤션 W홀</p>
        <FadeInSection>
          <div>
            <img style={{ width: "25px", padding: "100px 0px 20px" }} src={loveImage} />
            <p>어떤 이유로 만나 나와 사랑을 하고</p>
            <p>어떤 이유로 내게와 함께 있어 준 당신</p>
            <p>부디 행복한 날도 살다 지치는 날도</p>
            <p>모두 그대의 곁에 내가 있어 줄 수 있길</p>
            <p>아이유 -마음을 드려요- </p>
          </div>
        </FadeInSection>
        <FadeInSection>
          <img className="main-img" src={gifImage} style={{ padding: "100px 0px 20px" }} />
        </FadeInSection>
        <FadeInSection>
          <div className='content-invite'>
            <h3>초대합니다</h3>
            <p>서로가 마주보며 다져온 사랑을</p>
            <p>이제 함께 한 곳을 바라보며</p>
            <p>걸어갈 수 있는 큰 사랑으로 키우고자 합니다</p>
            <p>저희 두사람이 사랑의 이름으로</p>
            <p>지켜나갈 수 있게 앞날을</p>
            <p>출복해 주시면 감사하겠습니다.</p>
          </div>

          <div style={{ padding: 20 }}>
            <p style={{ fontWeight: 600 }}>OOO ⦁ OOO의 아들 OO</p>
            <p style={{ fontWeight: 600 }}>OOO ⦁ OOO의 딸 OO</p>
          </div>

          <button className="btn-outline" onClick={() => setIsModal(isModal => !isModal)}>연락하기</button>
        </FadeInSection>
        <FadeInSection>
          <div className="profile">
            <img className="profile-img" src={profileImg2} />
            <img style={{ width: "5%", height: "5%", paddingTop: 60 }} src={loveImage} />
            <img className="profile-img" src={profileImg1} />
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className="calendar-wrapper">
            <h3>일정</h3>
            <p>2026년 3월 28일 (토) 오전 11시 <br />
              Wi웨딩홀 W홀
            </p>
            <Calendar
              calendarType="gregory"
              showNavigation={false}     // ← 좌우 화살표 숨기기
              showNeighboringMonth={false}
              value={new Date(2026, 2, 28)}
              tileContent={tileContent} />
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className='content-gallery'>
            <h3>갤러리</h3>
            <Gallery
              images={images}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          </div>
        </FadeInSection>

        <div className='content-directions'>
          <FadeInSection>
            <h3>오시는길</h3>
            <p>경기 수원시 팔달구 월드컵로 310 <br />
              WI컨벤션 W홀<br />
              031-241-6000
            </p>
            {/* <Map /> */}
            <div className="map-links">
              <div className="map-item"
                onClick={() => openMapLink(
                  "nmap://place?id=37590335",
                  "https://map.naver.com/p/entry/place/37590335?c=15.00,0,0,0,dh"
                )}>
                <img className="map-icon" src={naverMap} />
                <span className="map-label">네이버 지도</span>
              </div>
              <div className="map-item"
                onClick={() => openMapLink(
                  "kakaonavi://navigate?name=WI컨벤션&x=127.0358725&y=37.2871678",
                  "https://kko.kakao.com/IbXR0A78YC"
                )} >
                <img className="map-icon" src={kakaoNavi} />
                <span className="map-label">카카오 내비</span>
              </div>
              <div className="map-item"
                onClick={() => openMapLink(
                  "tmap://route?goalname=WI컨벤션&goalx=127.0358725&goaly=37.2871678",
                  "https://www.tmap.co.kr/tmap2/mobile/retrievePoiDetail.do?searchKeyword=WI컨벤션"
                )}>
                <img className="map-icon" src={tMap} />
                <span className="map-label">티맵</span>
              </div>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className='content-directions-text'>
              <div className='content-directions-box'>
                {/* <img className="map-icon" src={car} /> */}
                <span>WI컨벤션</span>
                <p>경기도 수원시 팔달구 월드컵로 310 (우만동 258) 수원월드컵 경기장 내 </p>
                <p>* 수원월드컵경기장 P7주차장 입력</p>
                <p>* P6주차장은 혼주전용 주차장입니다.</p>
              </div>
              <div className='content-directions-box'>
                {/* <img className="map-icon" src={parking} /> */}
                <span> 주차</span>
                <p>웨딩홀 P7 또는 P8주차장 이용</p>
                <p>* P6주차장은 혼주전용 주차장입니다.</p>
                <p>2시간 무료주차, 로비 태블릿 차량번호 입력</p>
              </div>
              <div className='content-directions-box'>
                {/* <img className="map-icon" src={subway} /> */}
                <span>지하철</span>
                <p>[1호선] 수원역 하차 후 택시로 15-20분 이동</p>
                <p>[수인분당선] 수원시청역 하차 후 택시로 10분 이동</p>
              </div>
              <div className='content-directions-box'>
                {/* <img className="map-icon" src={bus} /> */}
                <span>버스</span>
                <p>[수원월드컵경기장, 동성중학교 하차]</p>
                <p>80,99-2, 720-1, 1007-1, 3007, 3008, 4000, 4500,<br />
                  7000, 7001, 8800</p>
                <p>[수원월드컵경기장, 아름학교 하차] </p>
                <p> 13-4</p>
                <p>* 셔틀버스 : 수인분단선 수원시청역 9번출구 앞 <br />
                  (정시기준 약 20분간격 운행)</p>
              </div>
            </div>
          </FadeInSection>
        </div>
        <FadeInSection>
          <div className='content-Communication' >
            <h3>참석 의사 전달</h3>
            <p>축하의 마음으로 참석해주시는 <br />
              모든 분들을 귀하게 모실 수 있도록 <br />
              참석 의사를 전달 부탁드립니다.</p>
            <button className="btn-outline" onClick={() => setIsCommunicationModal(isCommunicationModal => !isCommunicationModal)}>참석 의사 전달하기</button>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className="content-account">
            <h3>마음 전하실 곳</h3>
            <p>참석이 어려워 직접 축하를 전하지 못하는<br />
              분들을 위해 계좌번호를 기재하였습니다.<br />
              넓은 마음으로 양해 부탁드립니다. <br />
              전해주시는 진심은 소중하게 간직하여 <br />
              좋은 부부의 모습으로 보답하겠습니다.
            </p>
            <AccordionSection title="신랑측 계좌번호" list={accounts.groom} />
            <AccordionSection title="신부측 계좌번호" list={accounts.bride} />
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className="content-guestbook">
            <h3>방명록</h3>
            <GuestBook />
          </div>
        </FadeInSection>
      </div >

      {isModal && <ContactModal setIsModal={setIsModal} />}
      {isCommunicationModal && <CommunicationModal setIsCommunicationModal={setIsCommunicationModal} />}

      {
        selectedIndex !== null && (
          <div className="modal" >
            <button className="arrow left" onClick={prevImage} disabled={selectedIndex == 0 ? true : false}>{'<'}</button>
            <img src={images[selectedIndex]} onClick={(e) => e.stopPropagation()} alt="확대 이미지" />
            <button className="arrow right" onClick={nextImage} disabled={selectedIndex == images.length - 1 ? true : false}>{'>'}</button>
            <button className="modal-close" onClick={() => setSelectedIndex(null)}>✕</button>
          </div>
        )
      }
    </div >
  )
}
