import React from 'react'
import '@/css/Main.css'
import gifImage from '@/images/img.gif';
import loveImage from '@/images/love.png';

export const Main = () => {
  return (
    <div className="app-container">
      <div className="invitation-container">
        <div className="title">
          <div className="title-name">홍길동</div>
          <div className="title-div">|</div>
          <div className="title-name">이몽룡</div>
        </div>
        <img className="main-img" src={gifImage} />
        <p>2026년 3월 28일 (토) 오전 11시</p>
        <h3>홍길동 & 이몽룡</h3>
        <p>Wi웨딩홀 W홀</p>
        <div><img style={{ width: "25px", padding: "100px 0px 20px" }} src={loveImage} /></div>
        <p>어떤 이유로 만나 나와 사랑을 하고</p>
        <p>어떤 이유로 내게와 함께 있어 준 당신</p>
        <p>부디 행복한 날도 살다 지치는 날도</p>
        <p>모두 그대의 곁에 내가 있어 줄 수 있길</p>
        <p>아이유 -마음을 드려요- </p>
        {/* <button className="btn-primary">위치 보기</button>
        <button className="btn-outline">연락하기</button> */}
      </div>
    </div>
  )
}
