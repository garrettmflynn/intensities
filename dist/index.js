(()=>{var y=class{get in(){return this.nodes[0]}constructor(e){this.context=null,this.info=e,this.nodes=[],this.analyser=null,this.out=null,this.canListen=!1,this.analyses={},this.integrations={}}analyse=()=>{for(let e in this.analyses)this.analyses[e].output=this.analyses[e].function();for(let e in this.integrations)this.integrations[e].output=this.integrations[e].function()};initializeContext=()=>{if(!this.context){if(setInterval(this.analyse,50),this.context=new(window.AudioContext||window.webkitAudioContext),this.info.minFreq){let e=this.context.createBiquadFilter();this.nodes.push(e),e.type="highpass",e.frequency.value=this.info.minFreq}if(this.info.maxFreq){let e=this.context.createBiquadFilter();this.nodes.push(e),e.type="lowpass",e.frequency.value=this.info.maxFreq,this.nodes[this.nodes.length-1].connect(e)}this.analyser=this.createAnalyser(),this.nodes[this.nodes.length-1].connect(this.analyser),this.out=this.context.createGain(),this.out.gain.value=1,this.out.connect(this.context.destination)}};createAnalyser=(e=this.context)=>{let t=e.createAnalyser();return t.smoothingTimeConstant=this.info.smoothingTimeConstant,t.fftSize=this.info.fftSize,t.minDecibels=this.info.minDecibels,t.maxDecibels=this.info.maxDecibels,t};cloneAudioBuffer=e=>{let t=new AudioBuffer({length:e.length,numberOfChannels:e.numberOfChannels,sampleRate:e.sampleRate});for(let n=0;n<t.numberOfChannels;++n){let i=e.getChannelData(n);t.copyToChannel(i,n)}return t};fft=function(e,t,n){let i=new OfflineAudioContext(1,e.length,this.context.sampleRate),s=i.createScriptProcessor(1024,1,1);s.connect(i.destination);let o=this.createAnalyser(i),a=i.createBufferSource();a.connect(o);let f=[];s.onaudioprocess=function(d){let l=new Uint8Array(o.frequencyBinCount);o.getByteFrequencyData(l),typeof t=="function"&&t(l),f.push(l)},o.connect(s),a.buffer=e,a.onended=function(d){typeof n=="function"&&n(f)},a.start(),i.startRendering().catch(d=>console.log("Rendering failed: "+d))};addSource=(e,t=()=>{})=>{e.connect(this.in);let n=e.channelCount??e.buffer?.numberOfChannels;if(n>1){var i=this.context.createChannelSplitter(n);this.analyser.connect(i);var s=this.context.createChannelMerger(n);for(let r=0;r<n;r++){let g=t();g.container.insertAdjacentHTML("afterbegin",`<h3>${r==0?"Left":"Right"} Channel </h3>`);let h=this.context.createGain();h.gain.setValueAtTime(1,this.context.currentTime);let m=this.createAnalyser();i.connect(m,r),m.connect(h),h.connect(s,0,r),this.addAnalysis(m,"fft",g.spectrogram)}let o=(r,g)=>r.map((h,m)=>Math.abs(h-g[m])),a=t();a.container.insertAdjacentHTML("afterbegin","<h3>Additive</h3>");let f=(r,g)=>r.map((h,m)=>h+g[m]);this.integrate("additive",[0,1],r=>f(r[0].frequencies,r[1].frequencies),a.spectrogram,"data");let d=t();d.container.insertAdjacentHTML("afterbegin","<h3>Difference</h3>"),this.integrate("difference",[0,1],r=>o(r[0].frequencies,r[1].frequencies),d.spectrogram,"data");let l=this.context.createGain();s.connect(l),l.connect(this.out),this.canListen?l.gain.value=1:l.gain.value=0}else{let o=t(),a=this.context.createGain();this.analyser.connect(a),a.connect(this.out),this.canListen?a.gain.value=1:a.gain.value=0,this.addAnalysis(this.analyser,"fft",o.spectrogram)}video&&(video.onended=()=>{e.disconnect()}),e.start instanceof Function&&e.start()};addAnalysis=(e,t,n)=>{let i=()=>{};switch(t){case"fft":let s=new Uint8Array(e.frequencyBinCount);i=()=>{e.getByteFrequencyData(s);let a=Array.from(s);return n.updateData(a),{frequencies:a}};break;case"raw":let o=new Uint8Array(1);i=()=>{e.getByteTimeDomainData(o);let a=Array.from(o);return n.updateData([a]),{timeseries:a}};break}this.analyses[Object.keys(this.analyses).length]={function:i,output:null}};integrate=(e,t,n=o=>{},i,s)=>{this.integrations[e]={function:()=>{let o=n(t.map(a=>this.analyses[a].output));i[s]=o},output:null}};listen=(e=!this.canListen)=>{this.canListen=e}};var G=document.getElementById("app"),H=document.getElementById("data"),S=document.getElementById("start"),x=document.getElementById("in"),C=document.getElementById("out"),A=document.getElementById("video"),D=document.getElementById("files"),U=document.getElementById("main"),q=document.getElementById("videos"),L=document.getElementById("analyses"),b=document.getElementById("design");b.controls=[{label:"Color Scale",type:"select",options:visualscript.streams.data.InteractiveSpectrogram.colorscales}];var E=document.querySelector("visualscript-overlay"),p=document.createElement("div");E.insertAdjacentElement("beforeend",p);p.style=`
    width: 100%;
    height: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
    font-size:170%;
    font-weight: bold;
    font-family: sans-serif;
  `;var M=Math.pow(2,11),T=7e3,j=0,I={smoothingTimeConstant:.2,fftSize:M,minDecibels:-127,maxDecibels:0,minFreq:T,maxFreq:j},u=new y(I);navigator.mediaDevices.enumerateDevices().then(F);var w={};function F(c){for(var e=0;e!==c.length;++e){var t=c[e],n=document.createElement("option");n.value=t.deviceId,t.kind==="audioinput"?(n.text=t.label||"Microphone "+(x.length+1),x.options=[...x.options,n]):t.kind==="audiooutput"?(n.text=t.label||"Speaker "+(C.length+1),C.options=[...C.options,n]):t.kind==="videoinput"&&(n.text=t.label||"Camera "+(A.length+1),A.options=[...A.options,n])}}var B=(c,e={})=>{let t=document.createElement("div");return t.classList.add("container"),L.insertAdjacentElement("beforeend",t),e.video&&(e.stream?(e.video.srcObject=e.stream,e.video.controls=!0,e.video.muted=!0):e.video.controls=!0,e.video.autoplay=!0),w[c]={container:t,video:e.video,stream:e.stream,spectrogram:new visualscript.streams.data.Spectrogram},t.insertAdjacentElement("beforeend",w[c].spectrogram),w[c]},v=0;D.onChange=async c=>{u.initializeContext(),v=0;for(let e of c.target.files){let t=e.type.split("/")[0],n,i;t==="video"?(i=document.createElement("video"),i.src=URL.createObjectURL(e),n=u.context.createMediaElementSource(i)):n=await k(e),i&&q.insertAdjacentElement("beforeend",i),u.addSource(n,()=>{let s=B(v,{video:i});return v++,s})}};S.onClick=()=>{u.initializeContext(),u.listen(!1),navigator.mediaDevices.getUserMedia({audio:{deviceId:{exact:x.value}},video:{exact:A.value}}).then(c=>{let e=document.createElement("video"),t=u.context.createMediaStreamSource(c);q.insertAdjacentElement("beforeend",e),u.addSource(t,()=>{let n=B(v,{video:e,stream:c});return v++,n})})};var k=c=>new Promise((e,t)=>{let n=new FileReader;n.onload=s=>{p.innerHTML="Decoding audio data from file...",E.open=!0,u.context.decodeAudioData(s.target.result,o=>{p.innerHTML="Audio decoded! Analysing audio data...",u.fft(o,null,a=>{let f=new visualscript.streams.data.InteractiveSpectrogram({data:a.slice(0,5e3),Plotly}),d=b.controls[0];d.value=f.colorscale,d.onChange=r=>{f.colorscale=r.target.value},b.controls=[d],b.insertAdjacentElement("beforeend",f),p.innerHTML="Analysis complete!",E.open=!1;let l=u.context.createBufferSource();l.buffer=o,e(l)})})};function i(s){console.log(`${s.type}: ${s.loaded} bytes transferred
`),s.type}n.addEventListener("error",i),n.readAsArrayBuffer(c)});})();
