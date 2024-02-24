import { useState,useEffect,useRef } from 'react'
import './App.css'
import { answerButtonFun, callButtonFun, webcamButtonFun } from './main'
function App() {
  const [webcamVideo,setWebcamVideo] = useState(null)
  const [remoteVideo,setRemoteVideo] = useState(null)
  const [callBtn,setCallBtn] = useState(true)
  const [ansBtn,setAnsBtn] = useState(true)
  const [webcamBtn,setWebCamBtn] = useState(false)
  const [hangupBtn,setHangupBtn] = useState(true)
  const [callInputVal,setCallInputVal] = useState("")

  const webcamVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (webcamVideo) {
      webcamVideoRef.current.srcObject = webcamVideo;
    }
    if (remoteVideo) {
      remoteVideoRef.current.srcObject = remoteVideo;
    }
  }, [webcamVideo, remoteVideo]);


  return (
    <>
      <h2>1. Start your Webcam</h2>
    <div className="videos">
      <span>
        <h3>Local Stream</h3>
        <video id="webcamVideo" autoPlay playsInline ref={webcamVideoRef}></video>
      </span>
      <span>
        <h3>Remote Stream</h3>
        <video id="remoteVideo" autoPlay playsInline ref={remoteVideoRef}></video>
      </span>


    </div>

    <button id="webcamButton" disabled={webcamBtn} onClick={async()=>{
      const data = await webcamButtonFun();
      console.log(`${data.webcamVideo}`);
      setWebcamVideo(data.webcamVideo);
      setRemoteVideo(data.remoteVideo);
      setWebCamBtn(data.webcamButton);
      setCallBtn(data.callButton);
      setAnsBtn(data.answerButton)
    }}>Start webcam</button>
    <h2>2. Create a new Call</h2>
    <button id="callButton" disabled={callBtn} onClick={async()=>{const val = await callButtonFun();setHangupBtn(val.hangupButton);setCallInputVal(val.callInput)}}>Create Call (offer)</button>

    <h2>3. Join a Call</h2>
    <p>Answer the call from a different browser window or device</p>
    
    <input id="callInput" value={callInputVal} onChange={(e) => setCallInputVal(e.target.value)}/>
    <button id="answerButton" disabled={ansBtn} onClick={()=>{answerButtonFun(callInputVal)}}>Answer</button>

    <h2>4. Hangup</h2>

    <button id="hangupButton" disabled={hangupBtn}>Hangup</button>
    </>
  )
}

export default App
