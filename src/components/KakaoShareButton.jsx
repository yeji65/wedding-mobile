import React from 'react';

const KakaoShareButton = () => {
  const handleClick = () => {
    if (!window.kakao) return;

    window.kakao.Link.sendCustom({
      templateId: 120646, // 만든 템플릿 ID
      templateArgs: {
        title: '최신랑 ♥ 이신부',
        description: '2026-03-28 (토) 오전 11시',
        imageUrl: 'https://0328withyou.netlify.app/images/photo.png',
      },
    });
  };

  return (
    <button onClick={handleClick} id="kakao-link-btn">
      카카오톡으로 청첩장 공유하기
    </button>
  );
};

export default KakaoShareButton;
