import React, { useEffect, useRef, useState } from 'react'
import '@/css/AccountAccordion.css'

const AccordionSection = ({ title, list }) => {
    const [open, setOpen] = useState(true);
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);
  
    useEffect(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    }, []);
  
    const handleCopy = (text) => {
      navigator.clipboard.writeText(text);
      alert('계좌번호가 복사되었습니다.');
    };
  
    return (
      <div className="accordion-box">
        <button className="accordion-header" onClick={() => setOpen(!open)}>
          {title}
          <span>{open ? '▲' : '▼'}</span>
        </button>
        <div
          className="accordion-slide-wrapper"
          style={{
            maxHeight: open ? `${height}px` : '0px',
          }}
        >
          <div className="accordion-inner" ref={contentRef}>
            {list.map((acc, i) => (
              <div className="account-row" key={i}>
                <div className="account-info">
                  {acc.bank} | {acc.number}
                  <br />
                  {acc.name}
                </div>
                <button className="copy-btn" onClick={() => handleCopy(acc.number)}>복사</button>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default AccordionSection