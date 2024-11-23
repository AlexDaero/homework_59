import React, { useEffect, useState } from "react";
import './ChatApp.css'
import axios from 'axios'

const ChatApp = () => {
    const [dataPost, setDataPost] = useState({ message: '', author: '' })
    const [dataGet, setDataGet] = useState([])
    const [dateTime, setDateTime] = useState('')

    const handleChange = (value, type) => {
        const copyState = { ...dataPost }
        if (type === 'message') {
            copyState.message = value
        } else {
            copyState.author = value
        }
        setDataPost(copyState)
    }

    useEffect(() => {
        let chatInterval
        if (dateTime !== '') {
            chatInterval = setInterval(() => {
                console.log('interval')
                getMessage()
            }, 3000)
        }
        return () => {
            clearInterval(chatInterval)
        }
    }, [dateTime])

    const sendMessage = async () => {
        setDateTime(new Date().toISOString())
        axios
            .post('http://localhost:8000/messages', dataPost)
            .catch((error) => {
                console.log(error)
            })
    }

    const getMessage = async () => {
        console.log(`http://localhost:8000/messages?${dateTime}`)
        axios
            .get(`http://localhost:8000/messages?datetime=${dateTime}`)
            .then((response) => {
                setDataGet(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <div className="chat_menu">
            <input
                type="text"
                value={dataPost.message}
                onChange={(e) => handleChange(e.target.value, 'message')}
                placeholder="Введите сообщение"
            />
            <input
                type="text"
                value={dataPost.author}
                onChange={(e) => handleChange(e.target.value, 'author')}
                placeholder="Введите автора"
            />
            <div className="chat_menu_btns">
                <button onClick={sendMessage}>send</button>
                <button onClick={getMessage}>get</button>
            </div>
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