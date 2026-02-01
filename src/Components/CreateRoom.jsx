import React from "react"
import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import "./CreateRoom.css"
import { supabase } from "../../SupabaseClient"

const CreateRoom = () => {
    const [value, setvalue] = useState("")
    const navigate = useNavigate()

    const handlejoinroom = useCallback(() => {
        navigate(`/room/${value}`)
    }, [navigate, value]) // this is the dependency 

    return (
        <>

            <header className="header" id="header">
                <div className="nav-container">
                    <a href="/" className="logo">
                        <i className="fas fa-video logo-icon"></i>
                        LuvToMeet
                    </a>

                    <div className="nav-right">
                        <a href="/">
                            <button className="nav-btn home-btn" id="homeBtn">
                                <i className="fas fa-home"></i>
                                Home
                            </button>
                        </a>
                        <button onClick={() => {
                            supabase.auth.signOut()
                            navigate("/")
                        }} className="nav-btn signout-btn" id="signoutBtn">
                            <i className="fas fa-sign-out-alt"></i>
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <div className="background-animation">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
                <div className="floating-shape shape-4"></div>
            </div>

            <main className="main-content">

                <div className="create-room-card">
                    <div className="card-icon">
                        <i className="fas fa-plus-circle"></i>
                    </div>

                    <h1 className="card-title">Create Room</h1>
                    <p className="card-subtitle">Start a new video meeting with a custom name. Your room will be ready in seconds!</p>

                    <form className="room-form" id="roomForm">
                        <div className="form-group">
                            <label className="form-label" htmlFor="roomName">
                                <i className="fas fa-keyboard"></i>
                                Room Name
                            </label>
                            <div className="input-wrapper">
                                <input
                                    value={value}
                                    onChange={(e) => {
                                        setvalue(e.target.value)
                                    }}
                                    type="text"
                                    id="roomName"
                                    className="form-input"
                                    placeholder="Enter a descriptive name for your room"
                                    maxLength="50"
                                    required
                                    autoFocus
                                />
                                <span className="input-icon">
                                    <i className="fas fa-edit"></i>
                                </span>
                            </div>
                            <div className="char-counter" id="charCounter">
                                <span id="charCount">0</span>/50 characters
                            </div>
                        </div>

                        <button onClick={handlejoinroom} type="submit" className="create-btn" id="createRoomBtn">
                            <i className="fas fa-video"></i>
                            Create Room
                        </button>
                    </form>

                    <div className="room-options">
                        <h3 className="options-title">
                            <i className="fas fa-star"></i>
                            What you get with your room:
                        </h3>
                        <ul className="options-list">
                            <li>
                                <i className="fas fa-check-circle"></i>
                                <span>Secure end-to-end encrypted video calls</span>
                            </li>
                            <li>
                                <i className="fas fa-check-circle"></i>
                                <span>Live screen sharing capabilities</span>
                            </li>
                            <li>
                                <i className="fas fa-check-circle"></i>
                                <span>Up to 100 participants</span>
                            </li>
                            <li>
                                <i className="fas fa-check-circle"></i>
                                <span>Meeting recording options</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>

            <div className="success-modal" id="successModal">
                <div className="modal-content">
                    <button className="modal-close" id="closeModal">&times;</button>
                    <div className="modal-icon">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <h2 className="modal-title">Room Created Successfully!</h2>
                    <p className="modal-description">Your video meeting room is ready. Share the details below with participants.</p>

                    <div className="meeting-info">
                        <div className="info-item">
                            <span className="info-label">Room Name:</span>
                            <span className="info-value" id="modalRoomName">Team Meeting</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Room ID:</span>
                            <span className="info-value" id="modalRoomId">abc-123-xyz</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Meeting Link:</span>
                            <span className="info-value" id="modalRoomLink">https://luvtomeet.com/meet/abc-123-xyz</span>
                        </div>
                    </div>

                    <button className="copy-btn" id="copyLinkBtn">
                        <i className="fas fa-copy"></i>
                        Copy Meeting Link
                    </button>

                    <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "var(--gray)" }}>
                        <i className="fas fa-info-circle"></i>
                        This link will be active for 24 hours
                    </p>
                </div>
            </div>

            <div className="loading" id="loading">
                <div className="spinner"></div>
                <p id="loadingText">Creating your secure room...</p>
            </div>
        </>
    )
}

export default CreateRoom