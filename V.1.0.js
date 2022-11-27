
const scrc = {
    target: null,
    active: {
        paused: false,
        activated: false,
        interval: undefined
    },
    frames: [],
    functionality: {
        recorder: {
            togglePause: ()=>{
                if(scrc.active.activated){
                scrc.active.paused = !scrc.active.paused;
                }
            },
            stopScrc: ()=>{
                scrc.active.activated = false;
                setTimeout(()=>{scrc.frames=[]},500)
            },
            startScrc: ()=>{
                function frame(){
                    if(scrc.active.activated){
                    requestAnimationFrame(frame)
                        if(!scrc.active.paused && scrc.target){
                            if(scrc.target.nodeName == 'CANVAS'){
                                scrc.functionality.captureFrame(scrc.target.toDataURL())
                            }else{
                                throw new Error('SCRC: Target selected is not a CANVAS type element.')
                            }
                        }else if(!scrc.target){
throw new Error('SCRC: Attempted to capture, but there is no target selected. This may be because the target was deleted.')
                        }
                    }else{}
                }
            }
        },
        captureFrame: (base64Href) => {
            scrc.frames.push({
                URL: base64Href
            })
        },
        downloadFrames: () => {
            if(scrc.frames){
                for(var i=0; i < scrc.frames.length; i++){
                    console.log(scrc.frames[i].URL)
                }
            }
        }
    }
}
