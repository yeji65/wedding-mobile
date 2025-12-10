import React, { useEffect, useRef, useState } from 'react'
import '@/css/Main.css'
import '@/css/Calendar.css'
import ContactModal from '@/components/ContactModal';
import profileImg1 from '@/images/profileImg1.jpg';
import profileImg2 from '@/images/profileImg2.jpg';
import Calendar from 'react-calendar';
import Gallery from '@/components/Gallery';
import Map from '@/components/Map';
import naverMap from '@/images/naverMap.png';
import kakaoNavi from '@/images/kakaoNavi.png';
import tMap from '@/images/tMap.png';
import CommunicationModal from '@/components/CommunicationModal';
import AccordionSection from '@/components/AccordionSection';
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import FadeInSection from '@/components/FadeInSection';
import GuestBook from '@/components/GuestBook';
import CommunicationSubModal from '@/components/CommunicationSubModal';
import PasswordModal from '@/components/PasswordModal';
import Image1 from '@/images/Image1.jpg';
import Image2 from '@/images/Image2.jpg';
import Image3 from '@/images/Image3.jpg';
import Image4 from '@/images/Image4.jpg';
import Image5 from '@/images/Image5.jpg';
import sample6 from '@/images/sample6.jpg';
import sample7 from '@/images/sample7.jpg';
import Image8 from '@/images/Image8.jpg';
import Image9 from '@/images/Image9.jpg';
import main from '@/images/main.jpg';
import mainSb from '@/images/mainSb.jpg';
import footer from '@/images/footer.jpg';
import flower from '@/images/flower.png';
import heart from '@/images/heart.png';
import lock from '@/images/lock.png';
import unlock from '@/images/unlock.png';
import KakaoShareButton from '@/components/KakaoShareButton';

export const Main = ({ showIntro }) => {

  //데이터 
  const [user, setUser] = useState([])

  //연락처 모달
  const [isModal, setIsModal] = useState(false)

  //참석여부 모달
  const [isCommunicationModal, setIsCommunicationModal] = useState(false)

  const [isCommunicationSubModal, setIsCommunicationSubModal] = useState(false)

  //선택한 이미지 
  const [selectedIndex, setSelectedIndex] = useState(null);

  //방명록
  const [showPasswordModal, setShowPasswordModal] = useState({ mode: "", state: false });
  const [mode, setMode] = useState('R')
  const [selectedData, setSelectedData] = useState({})

  //지도 자물쇠
  const [islock, setIsLock] = useState(false);

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
    Image1, Image2, Image3, Image4, sample6, sample7, Image5, Image8, Image9, profileImg1
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

  //팝업 true일경우 스크롤 금지
  const isGalleryModalOpen = selectedIndex !== null;

    useEffect(() => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      const preventScroll = (e) => {
        e.preventDefault();
      };

      if (isMobile) {
        if (isCommunicationSubModal || isModal || isCommunicationModal || showPasswordModal.state || showIntro || isGalleryModalOpen) {
          document.body.style.overflow = 'hidden';
          // 모바일 터치 스크롤 완전 방지
          document.body.addEventListener('touchmove', preventScroll, { passive: false });
        } else {
          document.body.style.overflow = '';
          document.body.removeEventListener('touchmove', preventScroll);
        }
      }

      // cleanup
      return () => {
        document.body.removeEventListener('touchmove', preventScroll);
      };
  }, [isCommunicationSubModal, isModal, isCommunicationModal, showPasswordModal.state, showIntro, isGalleryModalOpen]);



  const mapRef = useRef(null);
  const mapInstance = useRef(null);

    useEffect(() => {
      if (!window.kakao) return;

  window.kakao.maps.load(() => {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(37.2864882, 127.035815), // 지도 중심좌표
        level: 3,
        draggable: islock,    // 지도 드래그 금지
        scrollwheel: islock,
      };
      const map = new window.kakao.maps.Map(container, options);
      mapInstance.current = map;

      // 마커 위치
      const markerPosition = new window.kakao.maps.LatLng(37.2864882, 127.035865);


      const imageSrc = "https://map.pstatic.net/resource/api/v2/image/maps/selected-marker/229169@2x.png?version=18&mapping=marker-155";
      const imageSize = new window.kakao.maps.Size(45, 55); // 이미지 크기
      const imageOption = { offset: new window.kakao.maps.Point(22, 55) }; // 기준점

      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      // 마커 지도에 표시
      marker.setMap(map);
    });
    }, []);

    const toggleLock = () => {
    if (!mapInstance.current) return;
    mapInstance.current.setDraggable(!islock);    // 현재 잠금이면 드래그 허용
    mapInstance.current.setZoomable(!islock);     // 현재 잠금이면 줌 허용
    setIsLock(islock => !islock);
    setShowOverlay(false);
  };

  const [showOverlay, setShowOverlay] = useState(false);

  const handleMapTouch = () => {
  if (!islock) {
    setShowOverlay(true); // 
  }
};

  const [isPlaying, setIsPlaying] = useState(false);
      const audioRef = useRef(null);  

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();   // 🔇 정지
    } else {
      audioRef.current.play().catch(err => {
        console.log("재생 실패(모바일은 사용자 터치 필요):", err);
      });                       
    }

    setIsPlaying(prev => !prev);
  };

  return (
    <div className="app-container">
      <div className="invitation-container">
        <div className="header-row">
          <div class="left-space"></div>
          <p className="subject">WEDDING INVITATION</p>
          <div className="music-toggle" onClick={togglePlay}>
              {isPlaying ? (
                  // 🔊 ON 아이콘
                  <svg viewBox="0 0 24 24" fill="black">
                    <path
                      d="M5 10.5V13.5H7.8L11.3 17C11.7 17.4 12 17.2 12 16.7V7.3C12 6.8 11.7 6.6 11.3 7L7.8 10.5H5Z"
                      fill="black"
                      stroke="black"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M14 10.5V13.5C14.8 13.2 15.3 12.6 15.3 12C15.3 11.4 14.8 10.8 14 10.5Z"/>
                    <path
                      d="M16.2 9C17.6 10.1 18.3 11 18.3 12C18.3 13 17.6 13.9 16.2 15"
                      stroke="black"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
              ) : (
                  // 🔇 OFF 아이콘
                  <svg viewBox="0 0 24 24" fill="black">
                    <path
                      d="M5 10.5V13.5H7.8L11.3 17C11.7 17.4 12 17.2 12 16.7V7.3C12 6.8 11.7 6.6 11.3 7L7.8 10.5H5Z"
                      fill="black"
                      stroke="black"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M14 10.5V13.5C14.8 13.2 15.3 12.6 15.3 12C15.3 11.4 14.8 10.8 14 10.5Z"/>
                    <path
                      d="M16.2 9C17.6 10.1 18.3 11 18.3 12C18.3 13 17.6 13.9 16.2 15"
                      stroke="black"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <line
                      x1="5.5"
                      y1="17.5"
                      x2="18.5"
                      y2="6.5"
                      stroke="black"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
              )}
          </div>
          {/* <audio ref={audioRef} src="/music/bgm.mp3" loop preload="auto" /> */}
      </div>

        <div className="title">
          <div className="title-name">2026 | 03 | 28</div>
          <span className="title-sub">토요일</span>
        </div>
        <img className="main-img" src={main} />
        <h3>{user[0]?.name + " & " + user[3]?.name}</h3>
        <p>2026년 3월 28일 (토) 오전 11시</p>
        <p>WI컨벤션 W홀</p>
        <FadeInSection>
          <div >
            <img style={{ width: "30px", padding: "80px 0px 0px" }} src={flower} />
            <p>어떤 이유로 만나 나와 사랑을 하고</p>
            <p>어떤 이유로 내게와 함께 있어 준 당신</p>
            <p>부디 행복한 날도 살다 지치는 날도</p>
            <p>모두 그대의 곁에 내가 있어 줄 수 있길</p>
            <p>아이유 -마음을 드려요- </p>
          </div>
        </FadeInSection>
        <FadeInSection>
          <img className="main-img" src={mainSb} />

        </FadeInSection>
        <FadeInSection>
          <div className='content-invite'>
            <h3>초대합니다</h3>
            <p>첫만남은 친구였고,</p>
            <p>사랑에 빠져 연인이 되었고,</p>
            <p>이제는 가족이 되려고 합니다.</p>
            <p>꽃이 피어나는 봄,</p>
            <p>부부로서 저희의 새로운 시작을 </p>
            <p>함께 해주세요</p>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div style={{ paddingTop: 50,paddingBottom:20, fontWeight: 600 }}>
            <p>{user[1]?.name + " ⦁ " + user[2]?.name + " 의 장남 " + user[0]?.name}</p>
            <p>{user[4]?.name + " ⦁ " + user[5]?.name + " 의 차녀 " + user[3]?.name}</p>
          </div>

          <button className="btn-outline" onClick={() => setIsModal(isModal => !isModal)}>연락하기</button>
        </FadeInSection>
        <FadeInSection>
          <div className="profile">
            <img className="profile-img" src={profileImg2} />
            <img style={{ width: "5%", height: "5%", paddingTop: 60, color: "#444547" }} src={heart} />
            <img className="profile-img" src={profileImg1} />
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className="calendar-wrapper">
            <h3>일정</h3>
            <p>2026년 3월 28일 (토) 오전 11시 <br />
              WI웨딩홀 W홀
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
     
        <div style={{ position: 'relative', width: '100%', height: '280px' }}>
        <div 
          ref={mapRef} 
          style={{ width: '100%', height: '100%' }}
          onMouseDown={handleMapTouch}     // PC
          onTouchStart={handleMapTouch} 
        >
        </div>

        {/* 지도 잠금/해제 버튼 */}
          <div
            onClick={toggleLock}
            className='map-lock'
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 40,
              height: 40,
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: 6,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: 10,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
          {/* 자물쇠 이미지 */}
            <img
              src={islock ? unlock : lock}
              alt="lock"
              style={{ width: 20, height: 20 }}
            />
          </div>

           {!islock && showOverlay && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: '80px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 15,
                fontSize: '14px',
                color: '#333',
              }}
            >
            <img src={lock} alt="lock" style={{ width: 16, height: 16, marginRight: 6 }} />
            지도를 움직이려면 위 자물쇠 버튼을 눌러주세요.
            </div>
          )}
          </div>
          </FadeInSection>
          <FadeInSection>
          <div className="map-links">
            <button
              className="map-item"
              onClick={() =>
                openMapLink(
                  "nmap://place?id=37590335",
                  "https://map.naver.com/p/entry/place/37590335?c=15.00,0,0,0,dh"
                )
              }
            >
              <img className="map-icon" src={naverMap} alt="네이버 지도" />
              <span className="map-label">네이버 지도</span>
            </button>

            <button
              className="map-item"
              onClick={() =>
                openMapLink(
                  "kakaonavi://navigate?name=WI컨벤션&x=127.0358725&y=37.2871678",
                  "https://kko.kakao.com/IbXR0A78YC"
                )
              }
            >
              <img className="map-icon" src={kakaoNavi} alt="카카오 내비" />
              <span className="map-label">카카오 내비</span>
            </button>

            <button
              className="map-item"
              onClick={() =>
                openMapLink(
                  "tmap://route?goalname=WI컨벤션&goalx=127.0358725&goaly=37.2871678",
                  "https://www.tmap.co.kr/tmap2/mobile/retrievePoiDetail.do?searchKeyword=WI컨벤션"
                )
              }
            >
              <img className="map-icon" src={tMap} alt="티맵" />
              <span className="map-label">티맵</span>
            </button>
          </div>
          </FadeInSection>
          
            <div className='content-directions-text'>
               <FadeInSection>
              <div className='content-directions-box'>
                {/* <img className="map-icon" src={car} /> */}
                <span>WI컨벤션</span>
                <p>경기도 수원시 팔달구 월드컵로 310 (우만동 258) <br />수원월드컵 경기장 내 </p>
                <p>* 수원월드컵경기장 P7주차장 입력</p>
                <p>* P6주차장은 혼주전용 주차장입니다.</p>
              </div>
              </FadeInSection>
              <FadeInSection>
              <div className='content-directions-box'>
                {/* <img className="map-icon" src={parking} /> */}
                <span> 주차</span>
                <p>웨딩홀 P7 또는 P8주차장 이용</p>
                <p>* P6주차장은 혼주전용 주차장입니다.</p>
                <p>2시간 무료주차, 로비 태블릿 차량번호 입력</p>
              </div>
              </FadeInSection>
              <FadeInSection>
              <div className='content-directions-box'>
                {/* <img className="map-icon" src={bus} /> */}
                <span>버스</span>
                <p>* 셔틀버스 : 수인분단선 수원시청역 9번출구 앞 <br />
                  (정시기준 약 20분간격 운행)</p>
                <p>[수원월드컵경기장, 동성중학교 하차]</p>
                <p>80,99-2, 720-1, 1007-1, 3007, 3008, 4000, 4500,<br />
                  7000, 7001, 8800</p>
                <p>[수원월드컵경기장, 아름학교 하차] </p>
                <p> 13-4</p>
              </div>
               </FadeInSection>
              <FadeInSection>
              <div className='content-directions-box'>
                {/* <img className="map-icon" src={subway} /> */}
                <span>지하철</span>
                <p>[1호선] 수원역 하차 후 택시로 15-20분 이동</p>
                <p>[수인분당선] 수원시청역 하차 후 택시로 10분 이동</p>
              </div>
            </FadeInSection>
            </div>
        </div>
        {/* <FadeInSection>
          <div className='content-Communication' >
            <h3>참석 의사 전달</h3>
            <p>축하의 마음으로 참석해주시는 <br />
              모든 분들을 귀하게 모실 수 있도록 <br />
              참석 의사를 전달 부탁드립니다.</p>
            <button className="btn-outline" onClick={() => setIsCommunicationModal(isCommunicationModal => !isCommunicationModal)}>참석 의사 전달하기</button>
          </div>
        </FadeInSection> */}
        <FadeInSection>
          <div className="content-account">
            <h3>마음 전하실 곳</h3>
            <p>참석이 어려워 직접 축하를 전하지 못하는<br />
              분들을 위해 계좌번호를 기재하였습니다.<br />
              넓은 마음으로 양해 부탁드립니다. <br />
              전해주시는 진심은 소중하게 간직하여 <br />
              좋은 부부의 모습으로 보답하겠습니다.
            </p>
            <AccordionSection title="신랑측 계좌번호" list={user?.filter(d=>d.type == "groom")} />
            <AccordionSection title="신부측 계좌번호" list={user?.filter(d=>d.type == "bride")} />
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className="content-guestbook">
            <h3>방명록</h3>
            <GuestBook setShowPasswordModal={setShowPasswordModal}
              mode={mode}
              setMode={setMode}
              setSelectedData={setSelectedData}
              selectedData={selectedData}
            />
          </div>
        </FadeInSection>
        <div className="footer">
          <img src={footer} className="footer-image" alt="footer" />
          <h1 className="footer-image-text">글씨 테스트</h1>
        </div>
        <KakaoShareButton />

        <div className="footer-text">

          <span><strong>FROM yeji</strong>. All rights reserved.</span>
        </div>
      </div >
      {isModal && <ContactModal setIsModal={setIsModal} user={user} />}
      {isCommunicationModal && <CommunicationModal setIsCommunicationModal={setIsCommunicationModal} />}
      {isCommunicationSubModal && <CommunicationSubModal
        setIsCommunicationSubModal={setIsCommunicationSubModal}
        setIsCommunicationModal={setIsCommunicationModal}
        user={user} />}

      {
        selectedIndex !== null && (
              <div className="modal"
                  onClick={() => setSelectedIndex(null)} 
                  onTouchStart={(e) => {window.touchStartX = e.touches[0].clientX;}}
                  onTouchMove={(e) => { e.preventDefault(); }}
                  onTouchEnd={(e) => {
                                        const endX = e.changedTouches[0].clientX;
                                        const diff = endX - window.touchStartX;

                                        // 50px 이상 스와이프일 때만 동작
                                        if (Math.abs(diff) > 50) {
                                          if (diff > 0 && selectedIndex > 0) {
                                            prevImage(); // 오른쪽 → 이전 이미지
                                          } else if (diff < 0 && selectedIndex < images.length - 1) {
                                            nextImage(); // 왼쪽 → 다음 이미지
                                          }
                                        }
                                      }}
                                    >
            <button className="arrow left" onClick={(e) => { e.stopPropagation(); prevImage()}} disabled={selectedIndex == 0 ? true : false}>{'<'}</button>
            <img src={images[selectedIndex]} onClick={(e) => e.stopPropagation()} alt="확대 이미지" />
            <button className="arrow right" onClick={(e) => { e.stopPropagation(); nextImage()}} disabled={selectedIndex == images.length - 1 ? true : false}>{'>'}</button>
            <button className="modal-close" onClick={(e) => {setSelectedIndex(null); e.stopPropagation();}}>✕</button>
          </div>
        )
      }

      {/* 비밀번호 모달 */}
      {showPasswordModal.state && <PasswordModal
        setShowPasswordModal={setShowPasswordModal}
        showPasswordModal={showPasswordModal}
        setMode={setMode}
        mode={mode}
        selectedData={selectedData} />}
    </div >
  )
}
