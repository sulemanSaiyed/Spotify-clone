let currentSong= new Audio();

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
  const playMusic= (track)=>{
    //let audio= new Audio("/songs/"+track)
    currentSong.src="/songs/"+track
    currentSong.play()
      play.src="play.svg"
  }
   async function main(){
   
    // get list of all songs
  
  let songs= await getSongs()
  
  //show all the songs in playlist
  let songUL=document.querySelector(".songList").getElementsByTagName("ul")[0]
  for (const song of songs) {
    songUL.innerHTML=songUL.innerHTML+`<li>
    
     
                <img class="invert" src="music.svg" alt="">
                <div class="info">
                  <div>${song.replaceAll("%20", " ")}</div>
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

}
  main()