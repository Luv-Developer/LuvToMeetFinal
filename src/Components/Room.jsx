import React from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../SupabaseClient"
import { useEffect,useState } from "react"
import "./Room.css"

const Room = () => {

    const [email,setemail] = useState("")
    const [name,setname] = useState("")

    useEffect(()=>{
        const checksession = async ()=>{
            const { data: { session } } = await supabase.auth.getSession();
            if(session?.user?.email){
                setemail(session.user.email)
            }
            if(session?.user?.user_metadata?.name){
                setname(session?.user?.user_metadata?.name)
            }
        }
        checksession()
    }, [setemail])
    const navigate = useNavigate()
    const signout = async() => {
        await supabase.auth.signOut()
        navigate("/")
    }
    return(
        <>

         <header class="header" id="header">
        <div class="nav-container">
            <a href="/" class="logo">
                <i class="fas fa-video logo-icon"></i>
                LuvToMeet
            </a>
            
            <div class="nav-right">
                <a href = "/">
                <button class="nav-btn home-btn" id="homeBtn">
                    <i class="fas fa-home"></i>
                    Home
                </button>
                </a>
                <button onClick={signout} class="nav-btn signout-btn" id="signoutBtn">
                    <i class="fas fa-sign-out-alt"></i>
                    Sign Out
                </button>
            </div>
        </div>
    </header>

    <main class="main-content">

        <div class="floating-elements">
            <div class="floating-element element-1"></div>
            <div class="floating-element element-2"></div>
            <div class="floating-element element-3"></div>
        </div>
        
        <section class="welcome-section">
            <div class="welcome-icon">
                <i class="fas fa-hand-sparkles"></i>
            </div>
            <h1 class="welcome-title" id="welcomeTitle">Welcome, {name}</h1>
            <div class="user-email">
                <i class="fas fa-envelope"></i>
                <span id="userEmail">{email}</span>
            </div>
        </section>

        <section class="room-actions">
            <div class="action-card">
                <div class="action-icon">
                    <i class="fas fa-plus-circle"></i>
                </div>
                <h3 class="action-title">Create New Room</h3>
                <p class="action-description">Start a new video meeting instantly. Customize settings and invite participants to join your secure conference room.</p>
                <a href = "/createroom">
                <button class="action-btn create-room-btn" id="createRoomBtn">
                    <i class="fas fa-video"></i>
                    Create Room
                </button>
                </a>
            </div>
            
            <div class="action-card">
                <div class="action-icon">
                    <i class="fas fa-sign-in-alt"></i>
                </div>
                <h3 class="action-title">Join Existing Room</h3>
                <p class="action-description">Enter a meeting ID or link to join an ongoing video conference. Connect with colleagues, friends, or team members.</p>
                <a href = "/joinroom">
                <button class="action-btn join-room-btn" id="joinRoomBtn">
                    <i class="fas fa-user-friends"></i>
                    Join Room
                </button>
                </a>
            </div>
        </section>

    </main>

    <div class="modal" id="createRoomModal">
        <div class="modal-content">
            <button class="modal-close" id="closeCreateModal">&times;</button>
            <h3 class="modal-title">Create New Room</h3>
            <p class="modal-description">Set up your new meeting room with customized settings.</p>
        </div>
    </div>

    <div class="modal" id="joinRoomModal">
        <div class="modal-content">
            <button class="modal-close" id="closeJoinModal">&times;</button>
            <h3 class="modal-title">Join Existing Room</h3>
            <p class="modal-description">Enter the meeting ID or link to join a room.</p>
        </div>
    </div>

    <div class="loading" id="loading">
        <div class="spinner"></div>
        <p id="loadingText">Processing your request...</p>
    </div>
        </>
    )
}

export default Room 
