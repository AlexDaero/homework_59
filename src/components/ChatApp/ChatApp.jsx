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
        if (dataPost.message.length > 1 && isNaN(dataPost.author)) {
            setDateTime(new Date().toISOString())
            axios
                .post('http://localhost:8000/messages', dataPost)
                .catch((error) => {
                    console.log(error)
                })
        } else {
            alert('Некорректный ввод!')
        }
    }

    const getMessage = async () => {
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
        <div className="chat">
            <div className="chat_screen">
                <h3 className="chat_screen_title">Чат:</h3>
                {dataGet.map((item, index) => {
                    return (
                        <div className="chat_screen_message" key={`${item.author}_${index}`}>
                            <p className="chat_screen_message_text">{item.message}</p>
                            <p className="chat_screen_message_author">{item.author}</p>

                        </div>
                    )
                })}
            </div>
            <div className="chat_menu">
                <input
                    className="chat_menu_input"
                    type="text"
                    value={dataPost.message}
                    onChange={(e) => handleChange(e.target.value, 'message')}
                    placeholder="Введите сообщение"
                />
                <input
                    className="chat_menu_input"
                    type="text"
                    value={dataPost.author}
                    onChange={(e) => handleChange(e.target.value, 'author')}
                    placeholder="Ваше имя"
                />
                <button
                    className="chat_menu_btn"
                    onClick={sendMessage}
                >
                    Отправить
                </button>
            </div>
        </div>
    )
}

export default ChatApp