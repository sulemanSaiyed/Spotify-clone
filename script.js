let currentSong= new Audio();
//currentSong.src=song[0]
let songs;
function secondsToMinutesSeconds(seconds) {
  if(isNaN(seconds)|| seconds<0){
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds =  Math.floor(seconds % 60);
  
  const formattedMinutes =String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
async function getSongs(){
  let a = await fetch("http://127.0.0.1:5500/songs")
  let response=await a.text();
  console.log(a)
  let div = document.createElement("div")
  div.innerHTML=response;
  let as=div.getElementsByTagName("a")
  
  let songs=[]
  for(let index=0; index<as.length ;index++){
    const element= as[index];
    if(element.href.endsWith(".mp3")){
      songs.push(element.href.split("/songs/")[1])
    }
  }
  
  return songs
  }
  const playMusic= (track, pause=false)=>{
    //let audio= new Audio("/songs/"+track)
    currentSong.src="/songs/"+track
    if(!pause){
     currentSong.play()
         play.src="play.svg"
     }
  
  
      document.querySelector(".songinfo").innerHTML=decodeURI(track)
      document.querySelector(".songtime").innerHTML="00:00/00:00"

  }
   async function main(){
   
    // get list of all songs
  
songs= await getSongs()
  playMusic(songs[0], true)
  //show all the songs in playlist
  let songUL=document.querySelector(".songList").getElementsByTagName("ul")[0]
  for (const song of songs) {
    songUL.innerHTML=songUL.innerHTML+`<li>
    
     
                <img class="invert" src="music.svg" alt="">
                <div class="info">
                  <div>${decodeURI(song)}</div>
                  <div>Denzil</div>
                </div>
                <div class="playnow">
                  <span>
                    Play Now
                  </span>
                <img class="invert" src="play.svg" alt="">
              </div></li>`;
  }

  //attach a evrnt listener to each song
  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
   console.log (e.querySelector(".info").firstElementChild.innerHTML)
   playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
  })

  
  })
//attach a evrnt listener to next and previous  button
play.addEventListener("click", ()=>{
  if (currentSong.paused){
    currentSong.play()
    play.src="pause.svg"
  }
  else{
    currentSong.pause()
    play.src="play.svg"
  }
})
// listen for time update
currentSong.addEventListener("timeupdate", ()=>{
  console.log(currentSong.currentTime, currentSong.duration);
  document.querySelector(".songtime").innerHTML= 
  `${secondsToMinutesSeconds(currentSong.currentTime)} / ${
    secondsToMinutesSeconds(currentSong.duration) }`
  document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%";
})
//addan event lister to sseekbar
document.querySelector(".seekbar").addEventListener("click",e=>{
 let percent= (e.offsetX/e.target.getBoundingClientRect().width)*100;
  document.querySelector(".circle").style.left=percent+"%";
  currentSong.currentTime=((currentSong.duration)*percent)/100
})

// add event listern for hamburger
document.querySelector(".hamburger").addEventListener("click",()=>{
document.querySelector(".left").style.left="0";
})

// add event listern for close button
document.querySelector(".close").addEventListener("click",()=>{
  document.querySelector(".left").style.left="-120%";
  })

  // add event lister to previpus 
  previous.addEventListener("click", ()=>{
    console.log("Previous click")
    let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if((index-1)>=0){
     playMusic(songs[index-1])
    }
  })

   // add event lister to next
  next.addEventListener("click", ()=>{
    console.log("next click")
    let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0])
 if((index+1)<songs.length){
  playMusic(songs[index+1])
 }
  
  })
  // add an event to volume
  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
    console.log(e, e.target, e.target.value)
    currentSong.volume=parseInt(e.target.value)/100
  })
}
  main()