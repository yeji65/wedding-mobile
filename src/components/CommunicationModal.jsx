import React, { useEffect, useState } from 'react'
import '@/css/Communication.css'
import { collection, addDoc } from "firebase/firestore";
import { db } from '@/firebase';
// firestore의 메서드 import
import { doc, getDoc } from 'firebase/firestore';

const CommunicationModal = ({ setIsCommunicationModal }) => {

    const [side, setSide] = useState('신랑측');
    const [isAttend, setIsAttend] = useState('참석');
    const [name, setName] = useState('');
    const [count, setCount] = useState('');
    const [content, setContent] = useState('');
    const [meal, setMeal] = useState('예정');


    const handleSubmit = async () => {
        if (!name || !count) {
            alert('성함과 참석인원을 입력해주세요.');
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "attendance"),
                {
                    구분: side,
                    성함: name,
                    식사여부: meal,
                    전달사항: content,
                    참석여부: isAttend,
                    참석인원: count
                });
            console.log("Document written with ID: ", docRef.id);
            setIsCommunicationModal(false)
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    };

    const [test, setTest] = useState()
    // async - await로 데이터 fetch 대기
    async function getTest() {
        // document에 대한 참조 생성
        const docRef = doc(db, "test", "item1");

        // 참조에 대한 Snapshot 쿼리
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setTest(docSnap.data())
        }
    };
    // 최초 마운트 시에 getTest import
    useEffect(() => {
        getTest()
    }, [])
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="modal-header">
                    <h2>참석 의사 전달</h2>
                    <button className="modal-close" onClick={() => setIsCommunicationModal(false)}>×</button>
                </div>

                <table className="modal-table">
                    <tbody>
                        <tr>
                            <th>구분</th>
                            <td>
                                <div className="toggle-button">
                                    <button
                                        className={side === '신랑측' ? 'active' : ''}
                                        onClick={() => setSide('신랑측')}
                                    >신랑측</button>
                                    <button
                                        className={side === '신부측' ? 'active' : ''}
                                        onClick={() => setSide('신부측')}
                                    >신부측</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>참석</th>
                            <td>
                                <div className="toggle-button">
                                    <button
                                        className={isAttend === '참석' ? 'active' : ''}
                                        onClick={() => setIsAttend('참석')}
                                    >참석</button>
                                    <button
                                        className={isAttend === '불참' ? 'active' : ''}
                                        onClick={() => setIsAttend('불참')}
                                    >불참</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>성함</th>
                            <td>
                                <input
                                    type="text"
                                    placeholder="성함"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>참석인원</th>
                            <td>
                                <input
                                    type="number"
                                    placeholder="본인 포함 총 참석인원"
                                    value={count}
                                    onChange={(e) => setCount(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>식사여부</th>
                            <td>
                                <div className="toggle-button">
                                    {['예정', '안함', '미정'].map((opt) => (
                                        <button
                                            key={opt}
                                            className={meal === opt ? 'active' : ''}
                                            onClick={() => setMeal(opt)}
                                        >{opt}</button>
                                    ))}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>전달사항</th>
                            <td>
                                <input
                                    type="string"
                                    placeholder="전달사항을 입력해주세요(최대25자)"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button className="submit-button" onClick={handleSubmit}>
                    참석 의사 전달하기
                </button>
            </div>
        </div>
    );
};
export default CommunicationModal