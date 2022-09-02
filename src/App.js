import React, {useRef} from 'react'
import './App.css';
import * as facemesh from '@tensorflow-models/facemesh'
import * as tf from '@tensorflow/tfjs'
import Webcam from 'react-webcam'

function App() {

  //setup references
const webcamRef = useRef(null)
const canvasRef = useRef(null)

 // load facemesh
 const runFacemesh = async () => {
  const net = await facemesh.load({
    inputResolution:{width:640, height:480}, scale:0.8
  });
  setInterval(()=> {
    detect(net)
  },100)
 }

 //detec
const detect = async(net) => { 
  if (typeof webcamRef.current !== "undefined" &&
  webcamRef.current !== null &&
  webcamRef.current.video.readyState === 4
  ) {
    //get video props
    const video = webcamRef.current.video;
    const videoW = webcamRef.current.video.videoWidth;
    const videoH = webcamRef.current.video.videoHeight;

    //and set video
    webcamRef.current.video.width = videoW;
    webcamRef.current.video.height = videoH;

    // set canvas
    canvasRef.current.width = videoW
    canvasRef.current.height = videoH

    //make detections
    const face = await net.estimateFaces(video)
    console.log(face)

    //get context for drawing

  }
 };
runFacemesh();
  return (
    <div>
      <Webcam ref={webcamRef} className="basics" />
      <canvas ref={canvasRef} className="basics" />
    </div>
  )
}

export default App