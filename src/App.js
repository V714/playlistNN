import './App.css';
import {in_my_mind} from './music.js';
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import $ from 'jquery';
import anne from './anne.mp4';

/* Perfect function, like a time.sleep() from python */
const delay = ms => new Promise(res => setTimeout(res, ms));

/* notes length in ms */


/* const c3=131
const cs3=139
const d3=147
const ds3=156
const e3=165
const f3=175
const fs3=185
const g3=196
const gs3=208
const a3=220
const as3=233
const b3=247
const c4=262
const cs4=277
const d4=294
const ds4=311
const e4=330
const f4=349
const fs4=370
const g4=392
const gs4=415
const a4=440
const as4=466
const b4=494
const c5=523
const cs5=554
const d5=587
const ds5=622
const e5=659
const f5=698
const fs5=740
const g5=784
const gs5=831
const a5=880
const as5=932
const b5=988 */

/* Synth init */
const synth = new Tone.Oscillator({
    type:"sawtooth",
    frequency: 440,
    volume: -32
}).toMaster();

let inLoop=false;

/* Function that plays specific Hz for specific time (ms) */
const playThis = async(hz,time) => {
  synth.start();synth.frequency.value=hz;await delay(time);synth.stop();
}

/* Number of the note returning the frequency in Hz of that note */
const num_to_note = (num) =>{
  switch(num){
      case 0: return 131;
      case 1: return 139;
      case 2: return 147;
      case 3: return 156;
      case 4: return 165;
      case 5: return 175;
      case 6: return 185;
      case 7: return 196;
      case 8: return 208;
      case 9: return 220;
      case 10: return 233;
      case 11: return 247;

      case 12: return 262;
      case 13: return 277;
      case 14: return 294;
      case 15: return 311;
      case 16: return 330;
      case 17: return 349;
      case 18: return 370;
      case 19: return 392;
      case 20: return 415;
      case 21: return 440;
      case 22: return 466;
      case 23: return 494;

      case 24: return 523;
      case 25: return 554;
      case 26: return 587;
      case 27: return 622;
      case 28: return 659;
      case 29: return 698;
      case 30: return 740;
      case 31: return 784;
      case 32: return 831;
      case 33: return 880;
      case 34: return 932;
      case 35: return 988;
      
  }
}

/* Color of the notes length */
const colorFromNoteValue = (value) => {
  switch(value){
    case 0.2: return "#050";
    case 0.4: return "#080";
    case 0.6: return "#0b0";
    case 0.8: return "#0a8";
    case 1.0: return "#0ad";
    case 0.0: return "#222";
  }
}

/* variable that ends all (basically stops the songs) */
let koniecztym = false;

function App() {
  
  const [melody, setMelody] = useState(in_my_mind);
  const [pressedError, setPressedError] = useState(false);
  const [breakNow, setBreakNow] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [bpm, setBPM] = useState(128);
  const [selectedNote, setSelectedNote] = useState(0.0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [n4, setN4] = useState(0)
  const [n2, setN2] = useState(0)
  const [n1, setN1] = useState(0)
  const [n8, setN8] = useState(0)
  const [n16, setN16] = useState(0)
  const [abyss, setAbyss] = useState(false)


  useEffect(() => {
    setTimes(bpm);

    $( ".secret2" ).hover(
      function() {
   if($("#circle").position().left>$(".secret2").position().left+7 && $("#circle").position().left<$(".secret2").position().left+43){
       
       
       let pos = $("#circle").position();
       $("#circle").css({"animation":"none","left":pos.left})
           $("#circle").animate({left:'49%'}, 1500);
           $('.pseudo-body').animate({backgroundColor:'black'}, 1500);
       $('.pseudo-body').css({"animation":"white 1.7s 1 linear 1.5s forwards"})
       $(".wave").animate({backgroundColor:'#c9c9c9',border:'solid 1px #070707'},1500); }
}

);

  })

  const enterAbyss = async() =>{
    koniec();
    $("#secret0").css('opacity', '1');

    await delay(2000);
    $("#secret0").css('width', '5000px');
    $("#secret0").css('height', '5000px');
    $("#secret0").css('left', '-50%');
    $("#secret0").css('top', '-100%');
    await delay(1500);
    setAbyss(true);
    $("#secret0").css('opacity', '0');
    
    await delay(6200);
    $("#secret0").remove();

  }
const setTimes = (bpm) => {
  if(bpm==0 && bpm!=''){enterAbyss();$("#cannabis").css('opacity','0');}
  else if(bpm==420){$("#cannabis").css('opacity','1');$("#cannabis").css('z-index','420')}
  else if(bpm==666){$("#anne").css('z-index','666');$(".body").css('opacity','0');document.getElementById("anne").play();}
  else{
    $("#cannabis").css('opacity','0');
  setN4(60000/bpm);
  setN2((60000/bpm)*2);
  setN1(((60000/bpm)*2)*2);
  setN8((60000/bpm)/2);
  setN16(((60000/bpm)/2)/2);}
}
  const playSong = async(song,where) => {

    if(inLoop===true){setPressedError(true);return 'Already in loop';}
    koniecztym=false;

    if(bpm>0){
      for(let i=where;i<song.length;i++){
        inLoop=true;
        if(koniecztym){
          document.getElementsByClassName('step')[i-1].style.backgroundColor='#333';
          inLoop=false;
          koniecztym=false;
          break;
        }

        for(let j=0;j<song[i].length;j++)
        {
            if(song[i][j] > 0)
            {
                switch(song[i][j])
                {
                    case 0.2: playThis(num_to_note(j),n16);break;
                    case 0.4: playThis(num_to_note(j),n8);break;
                    case 0.6: playThis(num_to_note(j),n4);break;
                    case 0.8: playThis(num_to_note(j),n2);break;
                    case 1: playThis(num_to_note(j),n1);break;
                }
            }
        }

        if(i===0){document.getElementsByClassName('step')[i].style.backgroundColor='#f0f'; }

        else
        {   
          document.getElementsByClassName('step')[i].style.backgroundColor='#f0f'
          document.getElementsByClassName('step')[i-1].style.backgroundColor='#333'
        }

        await delay(n16)

        if(i==song.length-1)
        {
          document.getElementsByClassName('step')[i].style.backgroundColor='#333';
          koniecztym=false;
          i=-1;
        }

    }
    }
    else if(bpm<0){
    for(let i=where;i>-1;i--){
        inLoop=true;
        if(koniecztym){
          document.getElementsByClassName('step')[i-1].style.backgroundColor='#333';
          inLoop=false;
          koniecztym=false;
          break;
        }

        for(let j=0;j<song[i].length;j++)
        {
            if(song[i][j] > 0)
            {
                switch(song[i][j])
                {
                    case 0.2: playThis(num_to_note(j),Math.abs(n16));break;
                    case 0.4: playThis(num_to_note(j),Math.abs(n8));break;
                    case 0.6: playThis(num_to_note(j),Math.abs(n4));break;
                    case 0.8: playThis(num_to_note(j),Math.abs(n2));break;
                    case 1: playThis(num_to_note(j),Math.abs(n1));break;
                }
            }
        }

        if(i===melody.length){document.getElementsByClassName('step')[i].style.backgroundColor='#f0f'; }

        else
        {   
          document.getElementsByClassName('step')[i].style.backgroundColor='#f0f'
          document.getElementsByClassName('step')[i+1].style.backgroundColor='#333'
        }

        await delay(Math.abs(n16))

        if(i===0)
        {
          document.getElementsByClassName('step')[i].style.backgroundColor='#333';
          koniecztym=false;
          i=melody.length-1;
        }

    }
    }


  }
  /* function that ends everything (basically just stops the melody but you already know about it) */
  const koniec = () =>{
    koniecztym=true;
    setPressedError(false);
  }
  const isBlack = (note) => {
    
    switch(note){
      case 1:
      case 3:
      case 6:
      case 8:
      case 10:

      case 13:
      case 15:
      case 18:
      case 20:
      case 22:

      case 25:
      case 27:
      case 30:
      case 32:
      case 34:
      return true;
      break;
    }
  }
  const updateMelody = async(step,note,val) => {
    if(melody[step][note]===val){return 0;}
    else{
      let newMelody = melody
      let black=false;
      for(let i=0;i<newMelody[step].length;i++){
        newMelody[step][i] = 0;
        black=isBlack(i)
        if(black){document.getElementsByClassName('note')[(step*36)+i].style.backgroundColor="#333"}
        else{document.getElementsByClassName('note')[(step*36)+i].style.backgroundColor="#666"}
        black=false;
      }
      newMelody[step][note] = val
      setMelody(newMelody)
      let notePlace = 0;
      if(step===0){notePlace=note}
      else{
        notePlace = (note) + (step*36)
      }
      if(val==0){
        if(isBlack(note)){document.getElementsByClassName('note')[notePlace].style.backgroundColor="#333";}
        else{document.getElementsByClassName('note')[notePlace].style.backgroundColor="#666";}
      }
      else{document.getElementsByClassName('note')[notePlace].style.backgroundColor=colorFromNoteValue(val);}
      
    }}

    const changeCursor = (e,val) => {
      let elements = document.getElementsByClassName('cursor');
      for (var i = 0; i < elements.length; i++) {
          elements[i].style.backgroundColor="#333";
      }
      setCursor(val);
      e.target.style.backgroundColor='#00c';
    }

    const changeNote = (val) => {
      document.getElementById("selected_note").style.backgroundColor=colorFromNoteValue(val)
      setSelectedNote(val)
    }

    const saveMelodyFile = () => {
      const saveMelody = melody.map(item => {return item+'n'})
      let file = new Blob([(saveMelody).toString()],{type:'text/plain'})
      let a = document.createElement("a")
      let url = URL.createObjectURL(file)
      a.href = url;
      a.download = "test.enm";
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
      }, 0); 

    }

    const loadMelodyFile = (e) => { 
      const reader = new FileReader()
      reader.onerror = error => console.log(error)
      reader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result;
        const newMelody = textFromFileLoaded.split('n')
        let newMelodyReady = []
        newMelody.map(item => newMelodyReady.push(item.split(',').filter(n=>n).map(Number)))
        newMelodyReady.pop()
        setMelody(newMelodyReady)
        console.log(newMelodyReady)
        /* setMelody(textFromFileLoaded); */
      };
    
      reader.readAsText(e.target.files[0])
    }; 
  
  return (<>
    <div className="body">
      <div className="setBPM">
        <input id="bpmtext" type="text" value={bpm} onChange={(e)=>setBPM(e.target.value)}/>
        <button onClick={()=>setTimes(document.getElementById('bpmtext').value)} className="buttonBPM">+</button>
      </div>
      <div className="chooseNote">
        <div id="selected_note"></div>
        <div className="selectedNote" style={{backgroundColor: "#0ad"}} onClick={()=>changeNote(1.0)}>1</div>
        <div className="selectedNote" style={{backgroundColor: "#0a8"}} onClick={()=>changeNote(0.8)}>1/2</div>
        <div className="selectedNote" style={{backgroundColor: "#0b0"}} onClick={()=>changeNote(0.6)}>1/4</div>
        <div className="selectedNote" style={{backgroundColor: "#080"}} onClick={()=>changeNote(0.4)}>1/8</div>
        <div className="selectedNote" style={{backgroundColor: "#050"}} onClick={()=>changeNote(0.2)}>1/16</div>
        <div className="selectedNote" onClick={()=>changeNote(0)}>Erase</div>
      </div>
          <div className="playlist">

            {melody && melody.map((step,index) => {

              let breakk=false;if((index%16)===0){breakk=true;}
              return(<>

                {breakk ? <div className="break"></div> : null}
                <div className="step">
                  {step.map((note,index1) => 
                  {
                    let black=false;
                    let breakkk=false;if((index1%12)===0){breakkk=true;}
                    black=isBlack(index1)
                    return(
                    <>
                      {breakkk ? <div className="break-octave"></div> : null}
                      <div 
                        onClick={()=>updateMelody(index,index1,selectedNote)}
                        className="note" 
                        style={{backgroundColor: note === 0 ? black ? "#222" : "#666" : colorFromNoteValue(note) } }>
                          {/* {note} */}
                      </div>
                    </>
                  )})}
                  <div className="cursor" onClick={(e)=>changeCursor(e,index)}></div>
                </div></>
                )
              })}
          </div>

          {pressedError ? <div className="loopError">Already in Loop!</div> : <></>}

          <div className="buttons">
            <button className="play-button" onClick={()=>playSong(melody,cursor)}>▶</button>
            <button className="play-button" onClick={()=>koniec()}>■</button>
            <button className="play-button" onClick={()=>saveMelodyFile()}><img src={require('./floppy.svg').default}/></button>
            <button className="play-button" ><input className="uploadFile" type="file" onChange={(e)=>loadMelodyFile(e)} /><img className="svg" src={require('./upload.svg').default}/></button>
          </div>

        </div>
        {abyss &&
        <div className="pseudo-body">
        <div className="secret2"></div>
        <div id="circle"></div>
        <div className="secret"></div>
        <div className="wave w1"></div>
        <div className="wave w2"></div>
        <div className="wave w3"></div>
        </div>}
        <div id="secret0"></div>
        <div id="cannabis" style={{position:'absolute',opacity: '0',zIndex: '-1',transition:'2s ease-in-out all',height:'100vh',width:'100vw'}}>
          <img style={{position:'absolute',left:'1700px',bottom:'2300px',width:'200px',height:'200px',transform:'rotate(145deg)'}} src={require('./cannabis2.png').default}/>
          <img style={{position:'absolute',left:'0',bottom:'1230px',width:'500px',height:'900px',transform:'rotate(45deg)'}} src={require('./cannabis.png').default}/>
        </div>
        
        <video id="anne" src={anne} style={{position: 'absolute',top:'0',left:'0',zIndex:'-1'}} width="100%" height="100%"/>
    </>
  );
}

export default App;
