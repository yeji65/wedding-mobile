import React, { useEffect } from 'react';
import kakao from '@/images/kakao.png';

const KakaoShareButton = () => {

  useEffect(() => {
    const { Kakao } = window;

    if (!Kakao) return; // SDK가 로드되지 않았으면 종료

    // Kakao 객체가 초기화되지 않았다면 초기화
    if (!Kakao.isInitialized?.()) {
      Kakao.init(import.meta.env.VITE_KAKAOMAP_KEY); // Vite 환경변수 사용
      console.log('Kakao 초기화 완료:', Kakao.isInitialized());
    }
  }, []);

  const shareToKakao = () => {
    const { Kakao } = window;

    if (!Kakao || !Kakao.Link) {
      alert('Kakao SDK가 아직 로드되지 않았습니다.');
      return;
    }

  }
  return (
    <div className='kakao-box'>
      <img className="map-icon" src={kakao} />
      <button onClick={shareToKakao} className="kakao-link-btn">
        카카오톡으로 초대장 보내기
      </button>
    </div>
  );
};

export default KakaoShareButton;
