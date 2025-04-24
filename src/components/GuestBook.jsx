import React, { useEffect, useState } from 'react'
import '@/css/GuestBook.css'
import { collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '@/firebase';

const GuestBook = () => {

    const [boardData, setBoardData] = useState([])
    const search = async () => {
        let docs = await getDocs(collection(db, 'board'));
        let tmp = []
        docs.forEach((doc) => {
            tmp.push(doc.data())
            setBoardData(tmp)

        });
    }

    useEffect(() => {
        search()
    }, [])
    const [editingPost, setEditingPost] = useState(null);
    const [editText, setEditText] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [inputPassword, setInputPassword] = useState('');

    const handleEditClick = (post) => {
        setInputPassword('');
        setShowPasswordModal(true);
    };

    const handlePasswordConfirm = () => {
        if (inputPassword === '1234') {
            setEditText(editingPost.content);
            setShowPasswordModal(false);
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    };

    const confirmEdit = () => {
        setBoardData((prev) =>
            prev.map((p) => (p.id === editingPost.id ? { ...p, content: editText } : p))
        );
        setEditingPost(null);
        setEditText('');
    };

    const cancelEdit = () => {
        setEditingPost(null);
        setEditText('');
    };


    return (
        <div className="container">
            {!editingPost && <button className="write-btn">글쓰기</button>}

            <div className="board">
                {!editingPost ? (
                    boardData.map((post) => (
                        <div className="post" key={post.id}>
                            <div className="post-header">
                                <span className="post-name">{post.name}</span>
                                <div className="post-actions">
                                    <span onClick={() => handleEditClick(post)}>수정</span>
                                    <span>삭제</span>
                                </div>
                            </div>
                            <div className="post-content">{post.content}</div>
                            <div className="post-date">{post.date}</div>
                        </div>
                    ))
                ) : (
                    <div className="form-box">
                        <h3>수정하기</h3>
                        <textarea
                            className="edit-textarea"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                        />
                        <div className="button-row">
                            <button onClick={confirmEdit}>수정</button>
                            <button onClick={cancelEdit}>취소</button>
                        </div>
                    </div>
                )}
            </div>

            {/* 비밀번호 모달 */}
            {showPasswordModal && (
                <div className="modal">
                    <div className="modal-box">
                        <h3>비밀번호 확인</h3>
                        <input
                            type="password"
                            placeholder="비밀번호 입력"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                        />
                        <div className="button-row">
                            <button onClick={handlePasswordConfirm}>확인</button>
                            <button onClick={() => setShowPasswordModal(false)}>취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default GuestBook