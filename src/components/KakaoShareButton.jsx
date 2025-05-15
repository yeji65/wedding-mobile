import React, { useEffect } from 'react';

const KakaoShareButton = () => {
  useEffect(() => {
    // Kakao 객체가 존재하고 초기화되지 않았으면 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_APP_JAVASCRIPT);
    }
  }, []);

  const shareToKakao = () => {
    if (!window.Kakao || !window.Kakao.Link) {
      alert('Kakao SDK가 아직 로드되지 않았습니다.');
      return;
    }

    window.Kakao.Link.sendCustom({
      templateId: 120646, // 실제 템플릿 ID
    });
  };

  return (
    <button onClick={shareToKakao} id="kakao-link-btn">
      카카오톡으로 공유
    </button>
  );
};

export default KakaoShareButton;
