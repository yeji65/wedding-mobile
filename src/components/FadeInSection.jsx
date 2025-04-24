import React, { useEffect, useRef, useState } from "react";
import "@/css/FadeInSection.css";

const FadeInSection = ({ children }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect(); // 한 번만 작동하게
                }
            },
            {
                root: null,
                threshold: 0, // 요소가 아주 조금이라도 보일 때
                rootMargin: "0px 0px -30% 0px", // 하단에서 30% 위로 올라와야 발동
            }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`fade-in ${visible ? "show" : ""}`}>
            {children}
        </div>
    );
};

export default FadeInSection;
