import React, { useState } from 'react'
import '@/css/Main.css'
import gifImage from '@/images/img.gif';
import loveImage from '@/images/love.png';
import ContactModal from '@/components/contactModal';

export const Main = () => {

  const [isModal, setIsModal] = useState(false)


  return (
    <div className="app-container">
      <div className="invitation-container">
        <p style={{fontWeight:100}}>WEDDING INVITATION</p>
        <div className="title">
          <div className="title-name">홍길동</div>
          <div className="title-div">&</div>
          <div className="title-name">이몽룡</div>
        </div>
        <img className="main-img" src={gifImage} />
        <p>2026년 3월 28일 (토) 오전 11시</p>
        <h3>홍길동 & 이몽룡</h3>
        <p>Wi웨딩홀 W홀</p>

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

        <div className='content-gallery'>
          <h3>갤러리</h3>

        </div>
      </div>

      {isModal && <ContactModal setIsModal={setIsModal} />}
    </div>
  )
}
