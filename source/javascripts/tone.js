// Example showing how to produce a tone using Web Audio API.
// Load the file webaudio_tools.js before loading this file.
// This code will write to a DIV with an id="soundStatus".
var oscillator;
var amp;

// Create an oscillator and an amplifier.

// Create a button to switch the oscillator type

// buttonClickResult = function (){ 
// var button = document.getElementById('btn1');  
// button.onclick = function buttonClicked()  
// {  
// if(button.className=="off") //if class name is "off" 
// { button.className="on"; // assign it to "on" and.... 
// button.src='on.png';  oscOn (); // assign it's scr img  
// playClickSound('click.wav');  
// } 
// else if(button.className=="on") //if class name IS "on" 
// {  button.className="off"; //Change it to "off" 
// button.src='off.png'; // and assign it a different src image 
// playClickSound('click.wav');  
// oscillator.disconnect();  
// }

// }  
// };  
// buttonClickResult();




function initAudio()
{
    // Use audioContext from webaudio_tools.js
    if( audioContext )
    {
        oscillator = audioContext.createOscillator();
        fixOscillator(oscillator);

        oscillator.type = 'square';
        oscillator.frequency.value = 440;
        amp = audioContext.createGain();
        amp.gain.value = 0;
    
        // Connect oscillator to amp and amp to the mixer of the audioContext.
        // This is like connecting cables between jacks on a modular synth.
        oscillator.connect(amp);
        amp.connect(audioContext.destination);
        oscillator.start(0);
        writeMessageToID( "soundStatus", "<p>Audio initialized.</p>");
    }
}

// Set the frequency of the oscillator and start it running.
function startTone( frequency )
{
    var now = audioContext.currentTime;
    
    oscillator.frequency.setValueAtTime(frequency, now);
    
    // Ramp up the gain so we can hear the sound.
    // We can ramp smoothly to the desired value.
    // First we should cancel any previous scheduled events that might interfere.
    amp.gain.cancelScheduledValues(now);
    // Anchor beginning of ramp at current value.
    amp.gain.setValueAtTime(amp.gain.value, now);
    amp.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
    
    writeMessageToID( "soundStatus", "<p>Play tone at frequency = " + frequency  + "</p>");
}

function stopTone()
{
    var now = audioContext.currentTime;
    amp.gain.cancelScheduledValues(now);
    amp.gain.setValueAtTime(amp.gain.value, now);
    amp.gain.linearRampToValueAtTime(0.0, audioContext.currentTime + 1.0);
    writeMessageToID( "soundStatus", "<p>Stop tone.</p>");
}



// init once the page has finished loading.
window.onload = initAudio;