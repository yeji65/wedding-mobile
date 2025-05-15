import { useState } from 'react';
import { Main } from './view/Main'
import WeddingIntro from './view/WeddingIntro ';
import KakaoShareButton from './components/KakaoShareButton';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroFinished = () => {
    setShowIntro(false);
  };

  if (window.kakao && !window.kakao.isInitialized()) {
  window.kakao.init(import.meta.env.VITE_APP_JAVASCRIPT); // 환경변수에서 키 불러오기
}


  return (
    <div>
      {showIntro && <WeddingIntro onFinished={handleIntroFinished} />}
      <Main showIntro={showIntro}/>
      <KakaoShareButton /> 
    </div>
  )
}

export default App
