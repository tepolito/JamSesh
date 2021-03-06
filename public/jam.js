var piano;
var instrument = 'piano';
var playbackInst;

let pianoNotes = {'C6' : 'C6.[mp3|ogg]',
            'C1' : 'C1.[mp3|ogg]',
            'D#1' : 'Ds1.[mp3|ogg]',
            'F#1' : 'Fs1.[mp3|ogg]',
            'A1' : 'A1.[mp3|ogg]',
            'C2' : 'C2.[mp3|ogg]',
            'D#2' : 'Ds2.[mp3|ogg]',
            'F#2' : 'Fs2.[mp3|ogg]',
            'A2' : 'A2.[mp3|ogg]',
            'C3' : 'C3.[mp3|ogg]',
            'D#3' : 'Ds3.[mp3|ogg]',
            'F#3' : 'Fs3.[mp3|ogg]',
            'A3' : 'A3.[mp3|ogg]',
            'C4' : 'C4.[mp3|ogg]',
            'D#4' : 'Ds4.[mp3|ogg]',
            'F#4' : 'Fs4.[mp3|ogg]',
            'A4' : 'A4.[mp3|ogg]',
            'C5' : 'C5.[mp3|ogg]',
            'D#5' : 'Ds5.[mp3|ogg]',
            'F#5' : 'Fs5.[mp3|ogg]',
            'A5' : 'A5.[mp3|ogg]',
            'C6' : 'C6.[mp3|ogg]',
            'D#6' : 'Ds6.[mp3|ogg]',
            'F#6' : 'Fs6.[mp3|ogg]',
            'A6' : 'A6.[mp3|ogg]',
            'C7' : 'C7.[mp3|ogg]',
            'D#7' : 'Ds7.[mp3|ogg]',
            'F#7' : 'Fs7.[mp3|ogg]',
            'A7' : 'A7.[mp3|ogg]',
            'C8' : 'C8.[mp3|ogg]',
        }

piano = new Tone.Sampler(pianoNotes, {
            'release' : 1,
            'baseUrl' : './audio/salamander/',
            'onload': function()
             { 
              console.log('loaded')
            } 
  }).toMaster();

synth = new Tone.Synth(pianoNotes, {
            'release' : 1,
            'baseUrl' : './audio/salamander/' 
  }).toMaster();

memSynth = new Tone.MembraneSynth(pianoNotes, {
            'release' : 1,
            'baseUrl' : './audio/salamander/' 
  }).toMaster();



      //  var keyboard = Interface.Keyboard();

//Interface.Loader();



  var loopPiano; //the interval
var playback = [] //the notes

var recordToLoop = false;  //determines
var loopTimePiano = 0; 
var loopTimeIntPiano; 
//Start & Stop loop 
$('#piano #loopPiano').click(function(){ startLoop() })
//$('#pause-loop').click(function(){ pauseLoop() })
$('#piano #clear-loopPiano').click(function(){ clearLoop() })
function incrementLoopTime(){
  loopTimeIntPiano = setInterval(function(){
    loopTimePiano+=10;
    //console.log(`piano loop time ${loopTimePiano}`);
    $('#loopTimePiano').text(loopTimePiano)   
  },10) 
}
function startLoop(){
  //clearLoop() 
  recordToLoop = !recordToLoop;
  incrementLoopTime();
  loopPiano = setInterval(function(){
    console.log('play')
    playLoop(); 
    loopTimePiano = 0;
  },2000)
}
function playLoop(){
  playback.forEach(function(sound){
    setTimeout(function(s){
     // console.log(sound);
      //new Audio(`./drumkit/${sound.key}.ogg`).play()
      
      if(sound.attack)  //sdf
      {
        playbackInst = sound.instrument
        switchInstruments()
        switch(sound.instrument)
        {
          case 'piano': 
                        piano.triggerAttack(sound.key)
                   break;
                   
          case 'synth': 
                        synth.triggerAttackRelease(sound.key, '8n');
                   break;
                   
          case 'memSynth':
                        memSynth.triggerAttackRelease(sound.key, '8n');
                   break;                             
        }
        
        console.log(isRecording);
        if(isRecording)
          {
            recording.push({
              'key':sound.key,
              'time': recordingTime,
              'attack': true,
              'instrument': sound.instrument 
            })
          }
        $('.visualizer').css({'width':sound.time+'px'});
      }
      else
      {
        playbackInst = sound.instrument
        switchInstruments()
        switch(sound.instrument)
        {
          case 'piano': 
                        piano.triggerRelease(sound.key)
                   break;
                   
          case 'synth': 
                        synth.triggerAttackRelease(sound.key, '8n');
                   break;
                   
          case 'memSynth': 
                           memSynth.triggerAttackRelease(sound.key, '8n');
                   break;                             
        }
        
        if(isRecording)
          {
            recording.push({
              'key':sound.key,
              'time': recordingTime,
              'attack': false,
              'instrument': sound.instrument 
            })
          }
        $('.visualizer').css({'width':50+'px'});
      }

    }, sound.time)    
    
  })
}

function clearLoop()
{
  clearInterval(loopPiano) 
  clearInterval(loopTimeIntPiano) 
  recordToLoop = false;
  playback = []; 
  loopTimePiano = 0; 
}

/*$('.sounds button').click(function()
{
  console.log(this.name);
  let sound = this.name;  
  new Audio(`./drumkit/${sound}.ogg`).play()
  if(recordToLoop){
    playback.push({
      'key':sound,
      'attack': loopTime 
    })
  }
  
  
})*/
/*
//Add to playback 
$(window).keydown(function(e){
  if(recordToLoop){
    console.log('keydown', String.fromCharCode( e.which ));
    playback.push({
      'key':String.fromCharCode( e.which ),
      'attack': loopTime 
    })
  }
});
$(window).keyup(function(e){
  if(recordToLoop){
    console.log('keyup', String.fromCharCode( e.which ));
    playback.push({
      'key':String.fromCharCode( e.which ),
      'release': loopTime
    })    
  }
});
*/
/*
function pauseLoop(){
  clearInterval(loop) 
  clearInterval(loopTimeInt)  
  recordToLoop = false; 
}*/

$('#pianoButton').on('click', function(e)
{
  instrument = 'piano';

  switchInstruments();

   /*piano = new Tone.Sampler(pianoNotes, {
            'release' : 1,
            'baseUrl' : './audio/salamander/'}).toMaster();*/
})

$('#synthButton').on('click', function(e)
{
  instrument = 'synth';

  switchInstruments();

   /*piano = new Tone.Synth(pianoNotes, {
            'release' : 1,
            'baseUrl' : './audio/salamander/'}).toMaster()*/;
})

$('#membraneButton').on('click', function(e)
{
  instrument = 'memSynth';

  switchInstruments();

   /*piano = new Tone.MembraneSynth(pianoNotes, {
            'release' : 1,
            'baseUrl' : './audio/salamander/'}).toMaster();*/
})



  function switchInstruments()
  {
    return;
    switch(instrument)
         {
          case 'piano': return new Promise((resolve, reject) => { 
                        piano = new Tone.Sampler(pianoNotes, {
                        'release' : 1,
                        'baseUrl' : './audio/salamander/',
                        'onload'  : function()
                        {
                          console.log('hi');
                            resolve('success');

                        }}).toMaster();
                      })
            break;

          case 'synth': piano = new Tone.Synth(pianoNotes, {
                        'release' : 1,
                        'baseUrl' : './audio/salamander/'}).toMaster();
            break;
            
          case 'memSynth': piano = new Tone.MembraneSynth(pianoNotes, {
                        'release' : 1,
                        'baseUrl' : './audio/salamander/'}).toMaster();
            break;    
         }
  }      

         

        console.log(piano);

       // keyboard.keyDown = function (note)
       $('.noteButton').on('mousedown', function (e)
        {
          let note = $(this).text();
          console.log('keydown instrument is : ' + instrument);
          if(instrument == "synth")
          {
            synth.triggerAttackRelease(note, "8n");
          }
          else if(instrument == "memSynth")
          {
            memSynth.triggerAttackRelease(note, "8n");
          }
          else
          {
            piano.triggerAttack(note);
          }
          
          console.log(note);
          if(recordToLoop){
            playback.push({
              'key':note,
              'time': loopTimePiano,
              'attack': true,
              'instrument': instrument 
            })
          }

          if(isRecording)
          {
            recording.push({
              'key':note,
              'time': recordingTime,
              'attack': true,
              'instrument': instrument 
            })
          }
          demo.setup(mouseX,mouseY);
          $('body').append(`<div class="notes" style="position:fixed; left:${mouseX}px; top:${mouseY}px;">&#9834;</div>`);
        });

        /*var mouseX, mouseY;
        $(document).on('mouseover', function(e) {
          mouseX = e.pageX;
          mouseY = e.pageY;
          demo.spawn(mouseX,mouseY);
          console.log(mouseX);
        }).mouseover();*/

       // keyboard.keyUp = function (note)
       $('.noteButton').on('mouseup', function (e) 
        {
          let note = $(this).text();
          console.log('keyup instrument is : ' + instrument);
          if(instrument == "synth" || instrument == "memSynth")
          {
            return;
          }
          else
          {
            piano.triggerRelease(note);
          }
          
          
          if(recordToLoop){
            playback.push({
              'key':note,
              'time': loopTimePiano,
              'attack': false,
              'instrument': instrument 
            }) 

        };

        if(isRecording)
          {
            recording.push({
              'key':note,
              'time': recordingTime,
              'attack': false,
              'instrument': instrument 
            })
          } 
      })

        





/*$(document).ready(function(){
  piano();
  piano2();
});*/




/*function piano2()
{
  var loop; //the interval
var playback = [] //the notes
var recordToLoop = false;  //determines
var loopTime = 0; 
var loopTimeInt; 
//Start & Stop loop 
$('#loopDrums').click(function(){ startLoop() })
//$('#pause-loop').click(function(){ pauseLoop() })
$('#clear-loopDrums').click(function(){ clearLoop() })
function incrementLoopTime(){
  loopTimeInt = setInterval(function(){
    loopTime+=10;
    console.log(loopTime)
    $('#loopTimeDrums').text(loopTime)   
  },10) 
}
function startLoop(){
  clearLoop() 
  recordToLoop = true;
  incrementLoopTime();
  loop = setInterval(function(){
    console.log('play')
    playLoop(); 
    loopTime = 0;
  },2000)
}
function playLoop(){
  playback.forEach(function(sound){
    setTimeout(function(s){
      console.log(sound);
      new Audio(`./drumkit/${sound.key}.ogg`).play()

    }, sound.attack)    
    
  })
}

function clearLoop()
{
  clearInterval(loop) 
  clearInterval(loopTimeInt) 
  recordToLoop = false; 
  playback = []; 
  loopTime = 0; 
}

$('#soundsDrums button').click(function()
{
  console.log(this.name);
  let sound = this.name;  
  new Audio(`./drumkit/${sound}.ogg`).play()
  if(recordToLoop){
    playback.push({
      'key':sound,
      'attack': loopTime 
    })
  }
  
  
})

};*/


// PLAY PAUSE RECORD SAVE

var recording = [];
var recordingTime = 0;

var isRecording = false;
var recordingInterval;
var inc = 50;

document.getElementById('start').addEventListener("click", startRecord);

document.getElementById('pause').addEventListener("click", pauseRecord);

document.getElementById('clear').addEventListener("click", clearRecord);

document.getElementById('saveRecord').addEventListener("click", saveRecord);

document.getElementById('play').addEventListener('click', playRecord);

function startRecord()
{
  isRecording = true;

  recordingInterval = setInterval(recordingIncrement, inc)
}

function recordingIncrement()
{
  recordingTime += inc;

  document.getElementById('clock').innerHTML = recordingTime;
}

function pauseRecord()
{
  clearInterval(recordingInterval);
  isRecording = false;
}

function clearRecord()
{
  recording = [];
  isRecording = false;
  clearInterval(recordingInterval);
  recordingTime = 0;
  document.getElementById('clock').innerHTML = recordingTime;
}

function saveRecord()
{
  console.log(recording);
  pauseRecord();

  var songname = prompt("Please enter a song name", "MySong");

  if(!songname)
  {
    return;
  }
  $.ajax(
            {
              type: 'POST',
              data: JSON.stringify({songname: songname, song: recording}),
              contentType: 'application/json',
              url: '/saveRecord',             
              success: function(data) 
              {
                console.log('success');
                console.log(JSON.stringify(data));
              }
            });
}

function playRecord()
{
  pauseRecord();

  /*piano = new Tone.Sampler(pianoNotes, {
            'release' : 1,
            'baseUrl' : './audio/salamander/'}).toMaster();

  var keyboard = Interface.Keyboard();

  Interface.Loader();*/


  console.log(instrument, piano);
  switchInstruments();
  recording.forEach(function(note)
  {
    if(note.attack)
    {
      setTimeout(function()
      {
        instrument = note.instrument
       /*let myFirstPromise =  switchInstruments()
        myFirstPromise.then((successMessage) => {
        console.log("Yay! " + successMessage);*/
        
        switch(note.instrument)
        {
          case 'piano': 
                        piano.triggerAttack(note.key);
                   break;
                   
          case 'synth': 
                        synth.triggerAttackRelease(note.key, '8n');
                   break;
                   
          case 'memSynth':
                        memSynth.triggerAttackRelease(note.key, '8n');
                   break;                             
        }
       //}); //piano.triggerAttack(note.key)
      }, note.time);
    }
    else
    {
      setTimeout(function()
      {
        instrument = note.instrument
       // switchInstruments()
        /*let mySecondPromise =  switchInstruments()
        mySecondPromise.then((successMessage) => {
        console.log("Yay! " + successMessage);*/
        switch(note.instrument)
        {
          case 'piano': 
                        piano.triggerRelease(note.key)
                   break;
                   
          case 'synth': 
                        synth.triggerAttackRelease(note.key, '8n');
                   break;
                   
          case 'memSynth': 
                           memSynth.triggerAttackRelease(note.key, '8n');
                   break;                             
        }
       //}); //piano.triggerRelease(note.key)
      }, note.time);
    }
  })
}





















