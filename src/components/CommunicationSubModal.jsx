import React from 'react'
import '@/css/CommunicationModal.css'
import '@/css/CommunicationSubModal.css'

const CommunicationSubModal = ({ setIsCommunicationSubModal, setIsCommunicationModal, user }) => {
    return (
        <div className="modal-overlay"  onClick={() => setIsCommunicationSubModal(false)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()} >
                <h3>참석 의사 전달</h3>
                <p className='underline-text '>축하의 마음으로 참석해주시는<br />
                    모든 분들을 귀하게 모실 수 있도록 <br />
                    참석 의사를 전달 부탁드립니다.</p>
                <p> {user[0]?.name + " & " + user[3]?.name}</p>
                <p>2026년 3월 28일 토요일 오전 11시 00분</p>
                <p>WI컨벤션 W홀</p>

                <button className="submit-button" onClick={() => { setIsCommunicationModal(true); setIsCommunicationSubModal(false) }}>
                    참석 의사 전달하기
                </button>
            </div>

        </div>
    )
}

export default CommunicationSubModal