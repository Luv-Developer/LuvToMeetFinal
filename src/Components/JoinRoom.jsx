import React from "react"
import { useState } from "react"
import "./JoinRoom.css"
import { supabase } from "../../SupabaseClient"
import { useNavigate } from "react-router-dom"

const JoinRoom = () => {
    const [link, setlink] = useState("")
    const navigate = useNavigate()
    return (
        <>
            <header className="header" id="header">
                <div className="nav-container">
                    <a href="/" className="logo">
                        <i className="fas fa-video logo-icon"></i>
                        LuvToMeet
                    </a>

                    <div className="nav-right">
                        <a href = "/">
                        <button className="nav-btn home-btn" id="homeBtn">
                            <i className="fas fa-home"></i>
                            Home
                        </button>
                        </a>

                        <button onClick={async()=>{
                            await supabase.auth.signOut()
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
                <div className="join-room-card">
                    <div className="card-icon">
                        <i className="fas fa-sign-in-alt"></i>
                    </div>

                    <h1 className="card-title">Join Room</h1>
                    <p className="card-subtitle">Enter the meeting link or ID to join an existing video conference</p>

                    <form onSubmit = {(e)=>{
                        e.preventDefault()
                        window.location.href = link
                    }} className="join-form" id="joinForm">
                        <div className="form-group">
                            <label className="form-label" htmlFor="roomLink">
                                <i className="fas fa-link"></i>
                                Room Link or ID
                            </label>
                            <div className="input-wrapper">
                                <input
                                    value = {link}
                                     onChange={(e)=>{
                                        setlink(e.target.value)
                                     }}
                                    type="text"
                                    id="roomLink"
                                    className="form-input"
                                    placeholder="Paste meeting link or enter room ID (e.g., abc-123-xyz)"
                                    required
                                    autoFocus
                                />
                                <span className="input-icon">
                                    <i className="fas fa-paperclip"></i>
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="join-btn" id="joinRoomBtn">
                            <i className="fas fa-video"></i>
                            Join Room
                        </button>
                    </form>

                    <div className="qr-container" id="qrContainer">
                        <div className="qr-code">
                            <i className="fas fa-qrcode" style={{ fontSize: "60px", color: "var(--primary)" }}></i>
                        </div>
                        <p className="qr-note">Scan this QR code with your phone camera to join</p>
                    </div>
                </div>
            </main>

            <div className="join-modal" id="joinModal">
                <div className="modal-content">
                    <button className="modal-close" id="closeModal">&times;</button>
                    <div className="modal-icon success">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <h2 className="modal-title">Joining Meeting</h2>
                    <p className="modal-description" id="modalDescription">You're about to join the meeting room.</p>

                    <div className="meeting-info">
                        <div className="info-item">
                            <span className="info-label">Room Name:</span>
                            <span className="info-value" id="modalRoomName">Team Meeting</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Participants:</span>
                            <span className="info-value" id="modalParticipants">12 active</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Meeting Status:</span>
                            <span className="info-value" id="modalStatus">In progress</span>
                        </div>
                    </div>

                    <button className="action-btn primary-btn" id="enterMeetingBtn">
                        <i className="fas fa-video"></i>
                        Enter Meeting Room
                    </button>

                    <button className="action-btn secondary-btn" id="waitingRoomBtn">
                        <i className="fas fa-hourglass-half"></i>
                        Join Waiting Room
                    </button>

                    <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "var(--gray)" }}>
                        <i className="fas fa-info-circle"></i>
                        Your microphone will be muted upon entry
                    </p>
                </div>
            </div>

            <div className="join-modal" id="errorModal">
                <div className="modal-content">
                    <button className="modal-close" id="closeErrorModal">&times;</button>
                    <div className="modal-icon error">
                        <i className="fas fa-exclamation-circle"></i>
                    </div>
                    <h2 className="modal-title">Unable to Join</h2>
                    <p className="modal-description" id="errorDescription">There was an issue joining the meeting room.</p>

                    <div className="meeting-info">
                        <div className="info-item">
                            <span className="info-label">Error Code:</span>
                            <span className="info-value" id="errorCode">ROOM_NOT_FOUND</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Suggestion:</span>
                            <span className="info-value" id="errorSuggestion">Check the meeting link and try again</span>
                        </div>
                    </div>

                    <button className="action-btn primary-btn" id="tryAgainBtn">
                        <i className="fas fa-redo"></i>
                        Try Again
                    </button>

                    <button className="action-btn secondary-btn" id="contactHostBtn">
                        <i className="fas fa-envelope"></i>
                        Contact Host
                    </button>
                </div>
            </div>

            <div className="loading" id="loading">
                <div className="spinner"></div>
                <p id="loadingText">Connecting to meeting room...</p>
            </div>
        </>
    )
}

export default JoinRoom