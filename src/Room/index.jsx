import React from "react"
import { useParams } from "react-router-dom"
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { useState,useEffect,useRef } from "react"
import { supabase } from "../../SupabaseClient"

const Roompage = () => {

    const [name,setname] = useState("")
    const [userId, setUserId] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const containerRef = useRef(null)
    const joinedRef = useRef(false)

    useEffect(()=>{
        const checkname = async() => {
            try {
                const {data: {session} } = await supabase.auth.getSession()
                if(session?.user?.user_metadata?.name){
                    setname(session.user.user_metadata.name)
                } else if(session?.user?.email) {
                    setname(session.user.email)
                } else {
                    setname("Guest")
                }

                if(session?.user?.id) {
                    setUserId(session.user.id)
                } else {
                    setUserId(`guest_${Math.random().toString(36).substring(2, 10)}`)
                }
            } catch(err) {
                console.error("Error fetching user:", err)
                setname("Guest")
                setUserId(`guest_${Math.random().toString(36).substring(2, 10)}`)
            } finally {
                setLoading(false)
            }
        }
        checkname()
    }, [])

    const {roomid} = useParams()

    useEffect(() => {
        if(!loading && name && userId && roomid && containerRef.current && !joinedRef.current) {
            joinedRef.current = true
            myMeeting(containerRef.current)
        }
    }, [loading, name, userId, roomid])

    const myMeeting = async(element) => {
        try {
            if(!roomid) {
                setError("Error: No room ID found. Please use a valid room link.")
                return
            }
            if(!name) {
                setError("Error: Failed to get user name. Please sign in again.")
                return
            }
            
            // Sanitize room ID - Zegocloud only allows alphanumeric, hyphen, underscore
            const sanitizedRoomId = roomid.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 64)
            if(!sanitizedRoomId) {
                setError("Error: Invalid room ID format. Use only letters, numbers, hyphens, and underscores.")
                return
            }
            
            // Use a stable user ID instead of timestamp
            if(!userId) {
                setError("Error: Failed to get user id. Please sign in again.")
                return
            }

            console.log('Joining with:', { sanitizedRoomId, userId, name })
            
            const appId = 1062368264
            const serverSecret = "33359e37931ee412428fec5d7f94ef36"
            const kitToken  = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appId,
                serverSecret,
                sanitizedRoomId,
                userId,
                name
            ) 

            let sharedLinks = [
                {
                    name: 'Meeting link',
                    url: window.location.origin + window.location.pathname + '?roomID=' + sanitizedRoomId,
                },
            ];

            const zc = ZegoUIKitPrebuilt.create(kitToken)
            zc.joinRoom({
                container:element,
                scenario:{
                    mode:ZegoUIKitPrebuilt.VideoConference
                },
                sharedLinks
            })
        } catch(err) {
            console.error('Error joining room:', err)
            const code = err?.code || err?.sdkErrorCode || err?.errorCode || 'unknown'
            const message = err?.message || err?.msg || err?.description || 'Unknown error'
            setError(`Failed to join the room: ${message} (code: ${code})`)
            joinedRef.current = false
        }
    }

    return(
        <>
          {error && (
            <div style={{
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#ff4444',
              color: 'white',
              padding: '15px 20px',
              borderRadius: '5px',
              zIndex: 9999,
              textAlign: 'center',
              maxWidth: '90%'
            }}>
              {error}
            </div>
          )}
          {loading && (
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '10px',
              textAlign: 'center',
              zIndex: 9998,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>Joining room...</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Fetching your information</div>
            </div>
          )}
          <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
        </>
    )
}

export default Roompage