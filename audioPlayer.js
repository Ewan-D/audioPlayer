
let song = document.getElementById('song');
let songB = document.getElementById('songB');

let tapeInfo = document.getElementById('tapeInfo')
let songTitle;
let songTitleB;
let sideB;

// API - will fetch all tags for song. needs url so using .currentSrc...
let jsmediatags = window.jsmediatags;

window.onload = () => {

jsmediatags.read(song.currentSrc, {
        onSuccess: function(tag) {
            songTitle = tag.tags.title;
            tapeInfo.innerText = `index: "${songTitle}"`;
        },
        onError: function(error) {
            console.log(error);
        }
    });
jsmediatags.read(songB.currentSrc, {
         onSuccess: function(tag) {
             songTitleB = tag.tags.title;
         },
         onError: function(error) {
             console.log(error);
         }
    });
}

// set the name (index) of the track
 let currentSong = () => {
     if(!sideB){
         tapeInfo.innerText = `index: "${songTitle}"`;
     } else {
         tapeInfo.innerText = `index: "${songTitleB}"`;
     }
 };

let playTape; //set play status

// variables for the tape animation
let tapeContainer = document.getElementById('tapeContainer');
let rotationL = 0;
let rotationR = 72;

//set the roll of tape size at load time (updated in after play)
let ltapeSize = 1;
let rtapeSize = 0.35;
ltape.style.transform="scale("+ltapeSize+")";
rtape.style.transform="scale("+rtapeSize+")";

// calculate speed
let aside = song.duration;
let bside = songB.duration;

// for the small screen
let miniWheel = document.getElementById('miniWheel')

let wheelL = document.getElementById('wheelL')
let wheelR = document.getElementById('wheelR')

// offset the tapeR to get it looking asymetrical :)
wheelR.style.transform="rotate(72deg)";

// player controls
let playButton = document.getElementById('songPlay');
play = (id) =>{

     if(!playTape){
     playTape = window.setInterval(spin, 60);
         } else {
     console.log('already playing')
         }

     if(!sideB){
playButton.classList.remove('border-t-0', 'border-l-0');
playButton.classList.add('border-b-0', 'border-r-0', 'bg-gray-200');
         song.play();
     } else {
         songB.play();
     }
};

pause = (id) =>{
     if(!sideB){
     song.pause();
     } else {
         songB.pause();
     }

     stopSpin();
};

stop = (id) =>{

     song.currentTime = 0;
     songB.currentTime = 0;
     stopSpin();
     reset();

     if(!sideB){
         song.pause();
     }else{
         songB.pause();
     }
};

// tape animation
let spin = () => {

     rotationL-=4;
     rotationR-=4;

     ltapeSize-= 0.0001;
     rtapeSize+= 0.0001;

     miniWheel.style.transform="rotate("+rotationR+"deg)";

     wheelL.style.transform="rotate("+rotationL+"deg)";
     wheelR.style.transform="rotate("+rotationR+"deg)";

	 ltape.style.transform ="scale("+ltapeSize+")";
     rtape.style.transform="scale("+rtapeSize+")";

}

let stopSpin = () => {
     clearInterval(playTape);
     playTape = 0;
};

let reset = () => {
     ltapeSize = 1;
     rtapeSize = 0.35;
     rotationL = 0;
     rotationR = 75;

     miniWheel.style.transform="rotate(0deg)"

     wheelL.style.transform="rotate(0deg)";
     wheelR.style.transform="rotate(72deg)";

	 ltape.style.transform ="scale(1)";
     rtape.style.transform="scale(0.35)";
};

// 'flips' tape to other side NOTE: name this better flip or turn or just anything other than spin!!
spinTape = () => {
// checks if tape is playing first

     if(!playTape){

         let side = document.getElementById('side')
			if(side.innerText == 'A'){
				side.innerText = 'B'
                tapeContainer.classList.remove('bg-gradient-to-r')
                tapeContainer.classList.add('bg-gradient-to-l')

                sideB = 1;
            } else {
                side.innerText = 'A'
                tapeContainer.classList.remove('bg-gradient-to-l')
                tapeContainer.classList.add('bg-gradient-to-r')

                sideB = 0;
            }

     } else {
         console.log('stop tape first!');
     };

currentSong();
};
// stop animation at the end of the song
song.onended = (e) =>  stopSpin();
songB.onended = (e) =>  stopSpin();
