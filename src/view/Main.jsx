import React, { useState } from 'react'
import '@/css/Main.css'
import '@/css/Calendar.css'
import gifImage from '@/images/img.gif';
import loveImage from '@/images/love.png';
import ContactModal from '@/components/contactModal';
import profileImg1 from '@/images/profileImg1.jpg';
import profileImg2 from '@/images/profileImg2.jpg';
import Calendar from 'react-calendar';
import Gallery from '@/components/Gallery';

export const Main = () => {

  const [isModal, setIsModal] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null);

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


  // 갤러리 
  const images = [
    gifImage, profileImg1, gifImage, profileImg1, gifImage, profileImg1, gifImage, profileImg1, gifImage, profileImg1
  ];

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  const nextImage = (idx) => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

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

        <div>
          <img style={{ width: "25px", padding: "100px 0px 20px" }} src={loveImage} />
          <p>어떤 이유로 만나 나와 사랑을 하고</p>
          <p>어떤 이유로 내게와 함께 있어 준 당신</p>
          <p>부디 행복한 날도 살다 지치는 날도</p>
          <p>모두 그대의 곁에 내가 있어 줄 수 있길</p>
          <p>아이유 -마음을 드려요- </p>
        </div>

        <img className="main-img" src={gifImage} style={{ padding: "100px 0px 20px" }} />

        <div className='content-invite'>
          <h3>Invite you</h3>
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

        <div className="profile">
          <img className="profile-img" src={profileImg2} />
          <img style={{ width: "5%", height: "5%", paddingTop: 60 }} src={loveImage} />
          <img className="profile-img" src={profileImg1} />
        </div>


        <div className="calendar-wrapper">
          <h3>Calendar</h3>
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

        <div className='content-gallery'>
          <h3>갤러리</h3>
          <Gallery
            images={images}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </div>

        <div className='content-directions'>
          <h3>오시는길</h3>
          <p>경기 수원시 팔달구 월드컵로 310 <br />
            WI컨벤션 W홀<br />
            031-241-6000
          </p>

          
        </div>

      </div>

      {isModal && <ContactModal setIsModal={setIsModal} />}

      {selectedIndex !== null && (
        <div className="modal" >
          <button className="arrow left" onClick={prevImage} disabled={selectedIndex == 0 ? true : false}>{'<'}</button>
          <img src={images[selectedIndex]} onClick={(e) => e.stopPropagation()} alt="확대 이미지" />
          <button className="arrow right" onClick={nextImage} disabled={selectedIndex == images.length - 1 ? true : false}>{'>'}</button>
          <button className="modal-close" onClick={() => setSelectedIndex(null)}>✕</button>
        </div>
      )}
    </div>
  )
}
