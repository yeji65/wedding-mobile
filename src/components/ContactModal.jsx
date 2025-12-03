import React from 'react'
import '@/css/ContactModal.css'
import call from '@/images/call.png';
import msg from '@/images/msg.png';

const ContactModal = ({ setIsModal,user }) => {

    return (
        <div className="modal-overlay">
            <button className="modal-close" onClick={() => setIsModal(false)}>×</button>
            <div onClick={(e) => e.stopPropagation()} className="contact-modal">
                <div className='contactDiv'>
                    <div>
                        <div>신랑</div>
                        <div>{user[0]?.name}</div>
                        <img src={call} style={{ width: "20%", marginRight: "7px" }} onClick={() => window.location.href = `tel:${user[0]?.phone}`} />
                        <img src={msg} style={{ width: "20%" }} onClick={() => window.location.href = `sms:${user[0]?.phone}`} />
                    </div>
                    <div>
                        <div>신부</div>
                        <div>{user[3]?.name}</div>
                        <img src={call} style={{ width: "20%", marginRight: "7px" }} onClick={() => window.location.href = `tel:${user[3]?.phone}`} />
                        <img src={msg} style={{ width: "20%" }} onClick={() => window.location.href = `sms:${user[3]?.phone}`} />
                    </div>
                </div>
                <div className='contactDiv'>
                    <div>
                        <div>신랑 아버지</div>
                        <div>{user[1]?.name}</div>
                        <img src={call} style={{ width: "20%", marginRight: "7px" }} onClick={() => window.location.href = `tel:${user[1]?.phone}`} />
                        <img src={msg} style={{ width: "20%" }} onClick={() => window.location.href = `sms:${user[1]?.phone}`} />
                    </div>
                    <div>
                        <div>신부 아버지</div>
                        <div>{user[4]?.name}</div>
                        <img src={call} style={{ width: "20%", marginRight: "7px" }} onClick={() => window.location.href = `tel:${user[4]?.phone}`} />
                        <img src={msg} style={{ width: "20%" }} onClick={() => window.location.href = `sms:${user[4]?.phone}`} />
                    </div>
                </div>
                <div className='contactDiv'>
                    <div>
                        <div>신랑 어머니</div>
                        <div>{user[2]?.name}</div>
                        <img src={call} style={{ width: "20%", marginRight: "7px" }} onClick={() => window.location.href = `tel:${user[2]?.phone}`} />
                        <img src={msg} style={{ width: "20%" }} onClick={() => window.location.href = `sms:${user[2]?.phone}`} />
                    </div>
                    <div>
                        <div>신부 어머니</div>
                        <div>{user[5]?.name}</div>
                        <img src={call} style={{ width: "20%", marginRight: "7px" }} onClick={() => window.location.href = `tel:${user[5]?.phone}`} />
                        <img src={msg} style={{ width: "20%" }} onClick={() => window.location.href = `sms:${user[5]?.phone}`} />
                    </div>
                </div>
                {/* <img src={call} />
                <img src={msg} /> */}


            </div>
        </div>
    )
}

export default ContactModal