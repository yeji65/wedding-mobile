import React, { useEffect, useState } from 'react'
import '@/css/GuestBook.css'
import { collection, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from '@/firebase';

const GuestBook = ({ setSelectedData, selectedData, mode, setMode, setShowPasswordModal, setInputPassword,}) => {
    const [boardData, setBoardData] = useState([])
    const search = async () => {
        let docs = await getDocs(collection(db, 'board'));
        let tmp = []
        docs.forEach((doc) => {
            tmp.push(doc.data())
        });

        const sortedData = tmp.sort((a, b) => {
            const fixDateFormat = (str) => {
                const [year, month, dayAndTime] = str.split('/');
                const [day, time] = dayAndTime.split(' ');
                return `20${year}-${month}-${day}T${time}`;
            };

            const dateA = new Date(fixDateFormat(a.date));
            const dateB = new Date(fixDateFormat(b.date));
            return dateB - dateA;
        });
        setBoardData(sortedData)
    }

    useEffect(() => {
        search()
    }, [])

    const [editText, setEditText] = useState({ name: '', content: '', password: '' });

    const handleEditClick = (post) => {
        setShowPasswordModal({ mode: "U", state: true });
        setSelectedData(post)
    };

    const handleDelClick = (post) => {
        setShowPasswordModal({ mode: "D", state: true });
        setSelectedData(post)
    };

    useEffect(() => {
        if (mode == "D")
            try {
                const postRef = doc(db, "board", "board_" + selectedData.id);
                deleteDoc(postRef);
                search()
                setMode("R")
                alert("게시글이 삭제되었습니다.");
            } catch (error) {
                alert("삭제에 실패했습니다. 다시 시도해주세요.");
            }
    }, [mode])


    const now = new Date();
    const year = String(now.getFullYear()).slice(2); // '25'
    const month = String(now.getMonth() + 1).padStart(2, '0'); // '04'
    const day = String(now.getDate()).padStart(2, '0'); // '24'
    const hour = String(now.getHours()).padStart(2, '0'); // '10'
    const minute = String(now.getMinutes()).padStart(2, '0'); // '30'

    const formatted = `${year}/${month}/${day} ${hour}:${minute}`;

    const confirmEdit = () => {
        try {
            if (mode == "W") {
                if (!editText.name || !editText.content || !editText.password) {
                    alert("이름, 비밀번호, 내용을 모두 작성해주세요.");
                    return;
                }
                // id 생성
                const nextId = boardData.length > 0
                    ? Math.max(...boardData.map(item => item.id)) + 1
                    : 1;

                let _data = { id: nextId, name: editText.name, content: editText.content, date: formatted, password: editText.password }
                // setBoardData(prevItems => [...prevItems, _data]);
                setDoc(doc(db, "board", "board_" + nextId), _data)

            } else if (mode == "U") {
                if (!selectedData.name || !selectedData.content || !selectedData.password) {
                    alert("이름, 비밀번호, 내용을 모두 입력해주세요.");
                    return;
                }
                setDoc(doc(db, "board", "board_" + selectedData.id), {
                    id: selectedData.id,
                    name: selectedData.name,
                    content: selectedData.content,
                    date: formatted,
                    password: selectedData.password
                });
                // setBoardData((prev) =>
                //     prev.map((p) => (p.id === selectedData.id ? { ...p, name: editText.name, content: editText.content, date: formatted, password: editText.password } : p))
                // );

            }
            alert(`게시글이 ${mode == "W" ? "등록" : "수정"} 되었습니다.`);
            search()
            setMode('R')
            setSelectedData({})
            setEditText({ name: '', content: '', password: '' });
        } catch (error) {
            alert(`${mode == 'W' ? "등록" : "수정"}에 실패했습니다. 다시 시도해주세요.`);
        }

    };

    const cancelEdit = () => {
        setMode('R')
        setEditText({ name: '', content: '', password: '' });
        setSelectedData({})
    };



    return (
        <div className="container">
            {mode == 'R' && <button className="write-btn" onClick={() => { setMode('W') }}>글쓰기</button>}
            <div className="board" style={mode == 'R' ? {overflowY: 'scroll'} : null }>
                {mode == 'R' ? (
                    boardData
                        .sort((a, b) => b.date - a.date)
                        .map((post) => (
                            <div className="post" key={post.id}>
                                <div className="post-header">
                                    <span className="post-name">{post.name}</span>
                                    <div className="post-actions">
                                        <span onClick={() => handleEditClick(post)}>수정</span>
                                        <span onClick={() => handleDelClick(post)}>삭제</span>
                                    </div>
                                </div>
                                <div className="post-content">{post.content}</div>
                                <div className="post-date">{post.date}</div>
                            </div>
                        ))
                ) : null}
                {mode == 'U' ?
                    <div className="form-box">
                        <div className="input-row">
                            <label>이름</label>
                            <input
                                maxLength={10}
                                type="text"
                                className="underline-input"
                                defaultValue={selectedData.name !== '' ? selectedData.name : ''}
                                onChange={(e) => setSelectedData({ ...selectedData, name: e.target.value })}
                            />
                        </div>
                        <div className="input-row">
                            <label>비번</label>
                            <input
                                type="text"
                                className="underline-input"
                                defaultValue={selectedData.password !== '' ? selectedData.password : ''}
                                onChange={(e) => setSelectedData({ ...selectedData, password: e.target.value })}
                                placeholder='수정 or 삭제시 비밀번호 필수'
                                required={true}
                            />
                        </div>
                        <div className="input-row textarea-style">
                            <label>내용</label>
                            <textarea
                                className="multi-underline-textarea"
                                defaultValue={selectedData.content !== '' ? selectedData.content : ''}
                                onChange={(e) => setSelectedData({ ...selectedData, content: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <div className="button-row">
                            <button onClick={confirmEdit}>수정</button>
                            <button onClick={cancelEdit}>취소</button>
                        </div>
                    </div>
                    : null}
                {mode == 'W' ?
                    <div className="form-box">
                        <div className="input-row">
                            <label>이름</label>
                            <input
                                type="text"
                                className="underline-input"
                                defaultValue={''}
                                onChange={(e) => setEditText({ ...editText, name: e.target.value })}
                            />
                        </div>
                        <div className="input-row">
                            <label>비번</label>
                            <input
                                type="text"
                                className="underline-input"
                                defaultValue={''}
                                onChange={(e) => setEditText({ ...editText, password: e.target.value })}
                                placeholder='수정 or 삭제시 비밀번호 필수'
                                required={true}
                            />
                        </div>
                        <div className="input-row textarea-style">
                            <label>내용</label>
                            <textarea
                                className="multi-underline-textarea"
                                defaultValue={''}
                                onChange={(e) => setEditText({ ...editText, content: e.target.value })}
                                rows={4}
                            />
                        </div>

                        <div className="button-row">
                            <button onClick={confirmEdit}>등록</button>
                            <button onClick={cancelEdit}>취소</button>
                        </div>
                    </div>
                    : null}
            </div>

        </div>
    );
}
export default GuestBook