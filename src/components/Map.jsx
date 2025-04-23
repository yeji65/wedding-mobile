import React, {useEffect} from 'react'

const Map = () => {

    const lat = 33.45070
    const lon = 126.570667

    const { kakao } = window;

    useEffect(() => {
        let container = document.getElementById('map');

        let option = {
            center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
            level: 1 // 지도의 확대 레벨
        };

        let map = new kakao.maps.Map(container, option); // 지도 생성

        // // 마커가 표시될 위치
        var markerPosition  = new kakao.maps.LatLng(lat, lon); 

        // // 마커 생성
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // // 마커가 지도 위에 표시되도록 설정
        marker.setMap(map);

    },[ lat, lon])

    return (
        <>
            <div 
                style={{
                marginTop: '60px',
                width: '100%',
                height: '60vh',
                backgroundColor: '#c8c8c8'
      			//사이즈나 MAP에 대한 사이즈나 위치값은
      			//css로 조정해주면 된다.
            }} 
                id='map'
            >
            </div>
        </>
    )
}

export default Map