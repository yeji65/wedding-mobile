import React, { useState } from 'react'
import '@/css/Gallery.css'
import { useSwipeable } from 'react-swipeable';

const Gallery = ({ images, setSelectedIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const SLIDE_WIDTH = 240; // 슬라이드 1장의 폭
    const SLIDE_MARGIN = 10;
    const TOTAL_SLIDE_WIDTH = SLIDE_WIDTH + SLIDE_MARGIN * 2;

    const total = images.length;

    const changeSlide = (dir) => {
        const next = (currentIndex + dir + total) % total;
        setCurrentIndex(next);
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => changeSlide(1),
        onSwipedRight: () => changeSlide(-1),
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    // 가운데로 정렬하려면 전체 너비 절반만큼 빼줌
    const offsetX = `calc(50% - ${TOTAL_SLIDE_WIDTH / 2}px - ${currentIndex * TOTAL_SLIDE_WIDTH}px)`;

    return (
        <div className="gallery-container">
            <div className="carousel-wrapper" {...swipeHandlers}>
                <div
                    className="carousel-track"
                    style={{
                        transform: `translateX(${offsetX})`,
                    }}
                >
                    {images.map((img, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <div
                                key={index}
                                className={`carousel-slide ${isActive ? 'active' : 'blurred'}`}
                            >
                                <img src={img} alt={img.alt} />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="dot-indicator">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>

    )
}

export default Gallery






// import React from 'react'
// import '@/css/Gallery.css'

// const Gallery = ({ images, setSelectedIndex }) => {

//     // 이미지를 3개씩 잘라서 세로 column 배열로 만듦
//     const columns = [];
//     for (let i = 0; i < images.length; i += 3) {
//         columns.push(images.slice(i, i + 3));
//     }

//     return (
//         <div className="scroll-wrapper-horizontal">
//             <div className="horizontal-gallery">
//                 {columns.map((group, colIdx) => (
//                     <div className="gallery-column" key={colIdx}>
//                         {group.map((src, idx) => {
//                             const globalIndex = colIdx * 3 + idx;
//                             return (
//                                 <div
//                                     className="gallery-item"
//                                     key={globalIndex}
//                                     onClick={() => setSelectedIndex(globalIndex)}
//                                 >
//                                     <img src={src} alt={`img-${idx}`} />
//                                     <div className="overlay">
//                                         <span>클릭해서 확대</span>
//                                     </div>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Gallery