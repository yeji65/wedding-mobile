import React, { useEffect, useRef } from 'react';
import '@/css/Gallery.css';

const Gallery = ({ images, setSelectedIndex }) => {
  const wrapperRef = useRef(null);

  // 이미지를 3개씩 잘라서 세로 column 배열로 만듦
  const columns = [];
  for (let i = 0; i < images.length; i += 3) {
    columns.push(images.slice(i, i + 3));
  }
  
  return (
    <div className="scroll-wrapper-horizontal" ref={wrapperRef}>
      <div className="horizontal-gallery">
        {columns.map((group, colIdx) => (
          <div className="gallery-column" key={colIdx}>
            {group.map((src, idx) => {
              const globalIndex = colIdx * 3 + idx;
              return (
                <div
                  className="gallery-item"
                  key={globalIndex}
                  onClick={() => setSelectedIndex(globalIndex)}
                >
                  <img src={src} alt={`img-${colIdx}-${idx}`} />
                  <div className="overlay">
                    <span>클릭해서 확대</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
