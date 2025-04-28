import React, { useState } from 'react'

const PasswordModal = ({ selectedData, showPasswordModal, setShowPasswordModal, setMode }) => {

    const [inputPassword, setInputPassword] = useState('');

    const handlePasswordConfirm = () => {
        if (inputPassword === selectedData.password) {
            setMode(showPasswordModal.mode)
            setShowPasswordModal({ mode: "", state: false })
            setInputPassword('');
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    };
    return (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
            <div className="pwCheck-box" onClick={(e) => e.stopPropagation()} >
                <h4>비밀번호 확인</h4>
                <input
                    type="password"
                    placeholder="비밀번호 입력"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                />
                <div className="button-row">
                    <button onClick={handlePasswordConfirm}>확인</button>
                    <button onClick={() => { setShowPasswordModal(false); setInputPassword('') }}>취소</button>
                </div>
            </div>

        </div>
    )
}

export default PasswordModal