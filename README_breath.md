# BreathCapture.js
Microphone-based breath tracking for the web! Made during the XR Brain Jam. Featured at https://app.brainsatplay.com

Paper I referenced: http://www.cs.rug.nl/~aiellom/tesi/avalur

To do it better, this paper added LSTM: https://dl.acm.org/doi/pdf/10.1145/3369835

## Usage

With latest Node LTS installed
`npm i breathcapture`

```
//How to use in npm projects

import {BreathCapture} from BreathCapture

let Capture = new BreathCapture(); //Create class instance
Capture.analyze();                 //Begin the analysis loop
Capture.connectMic();              //Connect your microphone to the browser

//Manually calibrate to correct the capture. Do this ~1 sec after breathing in.
Capture.calibrate();

//Outputs captured in this object as arrays
//More fine grained data are in the class
/*
Capture.output === {
    belowThreshold: false,              //Are the detected breathing peaks below the mean threshold (too quiet?) //bool
    isHolding: false,                   //Is the user between an in and out breath?     //bool
    inVolumes: this.inPeakVolumes,      //summed fft volume of in-breath                //float array
    outVolumes: this.outPeakVolumes,    //summed fft volume of out-breath               //float array
    inTimes: this.inPeakTimes,          //timestamps of in-breaths                      //unix ms timestamp array
    outTimes: this.outPeakTimes,        //timestamps of out-breaths                     //unix ms timestamp array
    inToOutTimes: this.inToOutTimes,    //timeframe between out- and in-breaths         //ms int array
    fastTimes: this.fastPeakTimes,      //timestamps of the fast sma peaks              //unix ms timestamp array
    fastRate: this.fastPeakDt,          //For fast breathing look for coherent breaths  //ms int array
    breathRate: this.breathingRate,     //look for coherent breaths                     //ms int array
    brv: this.breathingRateVariability,  //Lower is better                               //ms int array
    audioFFT: this.output.audioFFT,
    fastSmoothedVolume: this.audSumSmoothedFast,
    slowSmoothedVolume: this.audSumSmoothedSlow,
    longSmoothedVolume: this.audSumSmoothedLong
};
*/

```
