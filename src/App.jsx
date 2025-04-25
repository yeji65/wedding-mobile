import { useState } from 'react';
import { Main } from './view/Main'
import WeddingIntro from './view/WeddingIntro ';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroFinished = () => {
    setShowIntro(false);
  };

  return (
    <div>
      {showIntro && <WeddingIntro onFinished={handleIntroFinished} />}
      <Main />
    </div>
  )
}

export default App
