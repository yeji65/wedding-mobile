import React from 'react'
import '@/css/ContactModal.css'
import call from '@/images/call.png';
import msg from '@/images/msg.png';

const ContactModal = ({ setIsModal,user }) => {

    const msgButton = (idx) => {
        switch (idx) {
            case 1:
                window.location.href = "sms://전화번호";
                break;
            case 2:
                window.location.href = "sms://전화번호";
                break;
            case 3:
                window.location.href = "sms://전화번호";
                break;
            case 4:
                window.location.href = "sms://전화번호";
                break;
            case 5:
                window.location.href = "sms://전화번호";
                break;
            case 6:
                window.location.href = "sms://전화번호";
                break;
            default:
                window.location.href = "sms://전화번호";;
        }
    }


    return (
        <div className="modal-overlay">
            <button className="modal-close" onClick={() => setIsModal(false)}>×</button>
            <div onClick={(e) => e.stopPropagation()} className="contact-modal">
                <div className='contactDiv'>
                    <div>
                        <div>신랑</div>
                        <div>{user[0]?.name}</div>
                        <img src={call} style={{ width: "20%", marginRight: "7px" }} onClick={() => window.location.href = `tel:전화번호`} />
                        <img src={msg} style={{ width: "20%" }} onClick={() => window.location.href = `sms:전화번호`} />
                    </div>
                    <div>
                        <div>신부</div>
                        <div>{user[3]?.name}</div>
                        <img src={call} style={{ width: "20%", marginRight: "7px" }} onClick={() => window.location.href = `tel:전화번호`} />
                        <img src={msg} style={{ width: "20%" }} onClick={() => window.location.href = `sms:전화번호`} />
                    </div>
                </div>
                <div className='contactDiv'>
                    <div>
                        <div>신랑 아버지</div>
                        <div>{user[1]?.name}</div>
                        <img src={call} style={{ width: "20%", marginRight: "7px" }} onClick={() => window.location.href = `tel:전화번호`} />
                        <img src={msg} style={{ width: "20%" }} onClick={() => window.location.href = `sms:전화번호`} />
                    </div>
                    <div>
                        <div>신부 아버지</div>
                        <div>{user[4]?.name}</div>
                        <img src={call} style={{ width: "20%", marginRight: "7px" }} onClick={() => window.location.href = `tel:전화번호`} />
                        <img src={msg} style={{ width: "20%" }} onClick={() => window.location.href = `sms:전화번호`} />
                    </div>
                </div>
                <div className='contactDiv'>
                    <div>
                        <div>신랑 어머니</div>
                        <div>{user[2]?.name}</div>
                        <img src={call} style={{ width: "20%", marginRight: "7px" }} onClick={() => window.location.href = `tel:전화번호`} />
                        <img src={msg} style={{ width: "20%" }} onClick={() => window.location.href = `sms:전화번호`} />
                    </div>
                    <div>
                        <div>신부 어머니</div>
                        <div>{user[5]?.name}</div>
                        <img src={call} style={{ width: "20%", marginRight: "7px" }} onClick={() => window.location.href = `tel:전화번호`} />
                        <img src={msg} style={{ width: "20%" }} onClick={() => window.location.href = `sms:전화번호`} />
                    </div>
                </div>
                {/* <img src={call} />
                <img src={msg} /> */}


            </div>
        </div>
    )
}

export default ContactModal