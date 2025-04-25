import React, { useEffect, useState } from 'react';
import '@/css/WeddingIntro.css'; // 스타일 따로 빼서 가독성 좋게 관리
import loveIntro from '@/images/love_intro.png'

const WeddingIntro = ({ onFinished }) => {
    const message = '윤석,예지 결혼합니다.';
    const [text, setText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < message.length) {
                setText(message.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);

                let blinkCount = 0;
                const cursorInterval = setInterval(() => {
                    setShowCursor((prev) => !prev);
                    blinkCount++;
                    if (blinkCount >= 6) {
                        clearInterval(cursorInterval);
                        setFadeOut(true); // 페이드아웃 시작
                        setTimeout(() => {
                            onFinished(); // 서서히 사라진 후 메인 전환
                        }, 1000); // 페이드 아웃 시간과 동일하게
                    }
                }, 300);
            }
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`wedding-intro-overlay ${fadeOut ? 'fade-out' : ''}`}>
            <div className="intro-background-blur" />
            <div className="intro-content">
                <div className="intro-heart"><img src={loveIntro} /></div>
                <div className="intro-text">
                    {text}
                    <span className="cursor-box" style={{ opacity: showCursor ? 1 : 0 }} />
                </div>
            </div>
        </div>
    );
};

export default WeddingIntro;