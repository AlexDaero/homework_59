import React, { useEffect, useState } from "react";
import './ChatApp.css'
import axios from 'axios'

const ChatApp = () => {
    const [dataPost, setDataPost] = useState({ message: '', author: '' })
    const [dataGet, setDataGet] = useState([])
    const [dateTime, setDateTime] = useState('')
    let chatTimer

    const handleChange = (value, type) => {
        const copyState = { ...dataPost }
        if (type === 'message') {
            copyState.message = value
        } else {
            copyState.author = value
        }
        setDataPost(copyState)
    }


    return (
        <div className="chat_menu">
            <div>
                <p>Чат:</p>
                {dataGet.map((item, index) => {
                    return (
                        <div key={`${item.author}_${index}`}>
                            <p>Сообщение - {item.message}</p>
                            <p>Автор - {item.author}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChatApp