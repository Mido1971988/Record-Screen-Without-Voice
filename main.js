let options = {
    video : {
        MediaSource : "screen",
        width: 640,
        height: 480 
    },
    audio : false
}

navigator.mediaDevices.getDisplayMedia(options)
.then(function(mediaStreamObj){
    let start = document.getElementById('btnStart');
    let stop = document.getElementById('btnStop');
    let output = document.getElementById("output")
    let mediaRecorder = new MediaRecorder(mediaStreamObj);

    start.addEventListener('click', (ev)=>{
        if(mediaRecorder.state === "inactive"){
        mediaRecorder.start();
    }
    })
    stop.addEventListener('click', (ev)=>{
        if(mediaRecorder.state === "recording" ){
            mediaRecorder.stop();
        }
    });
    mediaRecorder.ondataavailable = function(ev) { 
        singleBlob = ev.data
    }

    mediaRecorder.onstop = (ev)=>{
        let videoURL = window.URL.createObjectURL(singleBlob);
        let videoEl = document.createElement("video") 
        videoEl.setAttribute("controls","")
        videoEl.src = videoURL;
        output.appendChild(videoEl)
    }
})
.catch(function(err) { 
    console.log(err.name, err.message); 
});
