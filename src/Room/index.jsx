import React from "react"
import { useParams } from "react-router-dom"
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { useState,useEffect } from "react"
import { supabase } from "../../SupabaseClient"

const Roompage = () => {

    const [name,setname] = useState("")

    useEffect(()=>{
        const checkname = async() => {
            const {data: {session} } = await supabase.auth.getSession()
            if(session?.user?.user_metadata?.name){
                setname(session.user.user_metadata.name)
            }
            else{
                setname("Guest")
            }
        }
        checkname()
    }, [setname])

    const {roomid} = useParams()

    const myMeeting = async(element) => {
        const appId = 1062368264
        const serverSecret = "33359e37931ee412428fec5d7f94ef36"
        const kitToken  = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomid,
        Date.now().toString(),
        name
        ) 

    let sharedLinks = [
    {
      name: 'Meeting link',
      url:
        window.location.origin + window.location.pathname + '?roomID=' + roomid,
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
    }

    return(
        <>
          <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
        </>
    )
}

export default Roompage