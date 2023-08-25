import React, { useState, useRef ,useEffect} from 'react';
import './Record.css';

const Record = () => {
  const [webcamStream, camStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [webcamRecorder, setWebcamRecorder] = useState(null);
  const [screenRecorder, setScreenRecorder] = useState(null);
  const liveWebcamRef = useRef(null);
  const liveScreenRef = useRef(null);
  const recordedWebcamRef = useRef(null);
  const recordedScreenRef = useRef(null);

  const startWebcamRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      camStream(stream);
      liveWebcamRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      setWebcamRecorder(recorder);

      const chunks = [];
      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: 'video/webm' });
        recordedWebcamRef.current.src = URL.createObjectURL(recordedBlob);


        const dataURL = URL.createObjectURL(recordedBlob);
        localStorage.setItem('recordedWebcamVideo', dataURL);
      };

      recorder.start();
    } catch (error) {
      console.error('Error starting webcam recording:', error);
    }
  };

  const startScreenRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenStream(stream);
      liveScreenRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      setScreenRecorder(recorder);

      const chunks = [];
      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: 'video/webm' });
        recordedScreenRef.current.src = URL.createObjectURL(recordedBlob);

        const dataURL = URL.createObjectURL(recordedBlob);
        localStorage.setItem('recordedScreenVideo', dataURL);
      };

      recorder.start();
    } catch (error) {
      console.error('Error starting screen recording:', error);
    }
  };

  const stopWebcamRecording = () => {
    if (webcamRecorder && webcamRecorder.state === 'recording') {
      webcamRecorder.stop();
    }
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
    }
  };

  const stopScreenRecording = () => {
    if (screenRecorder && screenRecorder.state === 'recording') {
      screenRecorder.stop();
    }
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
    }
  };
  useEffect(() => {
    if (screenStream) {
      screenStream.addEventListener('ended', () => {
        stopScreenRecording();
      });
    }

    return () => {
      if (screenStream) {
        screenStream.removeEventListener('ended', () => {
          stopScreenRecording();
        });
      }
    };
  }, [screenStream]);

  return (
    <div className='container1'>
      <div>
        <h2>Screen Recorder and WebCam Recorder</h2>
        <video ref={liveWebcamRef} autoPlay playsInline />
      </div>
      <div className='cam'>
        <button className="btn btn-primary btn-2" onClick={startWebcamRecording}>Start Webcam Recording</button>
        <button className="btn btn-primary btn-2" onClick={stopWebcamRecording}>Stop Webcam Recording</button>
      </div>
      {screenStream && (
        <div>
          <h2>Live Screen Preview</h2>
          <video className="screen" ref={liveScreenRef} autoPlay playsInline />
        </div>
      )}
      <div className='scrren'>
        <button className="btn btn-primary btn-2" onClick={startScreenRecording}>Start Screen Recording</button>
        <button className="btn btn-primary btn-2" onClick={stopScreenRecording}>Stop Screen Recording</button>
      </div>
      <div>
        <h2>Preview of the Video Recorded</h2>
        <video className="screen" ref={recordedWebcamRef} controls />
        <h2>Recorded Screen Video</h2>
        <video className="screen" ref={recordedScreenRef} controls />
      </div>
    </div>
  );
};

export default Record;
