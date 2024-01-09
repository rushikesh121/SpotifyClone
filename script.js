console.log("Hello jS")
let currentSongs = new Audio();
let songs;
async function getSongs(url) {

    let a = await fetch(`http://localhost:5500/folder/${url}`)
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${url}/`)[1]);
        }

    }
    return songs;

}
async function main() {


     songs = await getSongs("fav");


    let songList = document.querySelector(".songList").getElementsByTagName("ul")[0];

    for (const song of songs) {

        songList.innerHTML = songList.innerHTML + `
        <li>
        <img class="invert" src="./assets/images/music-solid.svg" alt="">
        <div class="songInfo ">
            <div>${song.replaceAll("%20", ' ')}</div>
            <div>  </div>
        </div>
        <div class="playNow ">
            <span>Play Now</span>
            <img class="invert" src="./assets/images/PLBB.svg" alt="">
        </div>
    </li>
            
        `;
    }

    function playMusic(s) {

        currentSongs.src = `http://localhost:5500/folder/${url}`



        currentSongs.play();
        play.src = "./assets/images/paused.svg";
        sInfo.innerHTML = s;
        sTime.innerHTML = "00:00 / 00:00";




    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e) => {

        e.addEventListener('click', (element) => {


            playMusic(e.querySelector(".songInfo").firstElementChild.innerHTML);
        });

    });
    let play = document.getElementById("play");
    let sInfo = document.getElementById("sInfo");
    let sTime = document.getElementById("sTime");

    play.addEventListener('click', (e) => {
        if (currentSongs.paused) {
            currentSongs.play();
            play.src = "./assets/images/paused.svg";
        }
        else {

            currentSongs.pause();
            play.src = "./assets/images/circle-play-regular.svg";
        }
    });
    
   
    
    // Example usage:
  
    
    currentSongs.addEventListener("timeupdate", () => {
        
        document.querySelector(".songTime").innerHTML = `${(currentSongs.currentTime)}/${(currentSongs.duration)}`
        document.querySelector(".circle").style.left=(currentSongs.currentTime/currentSongs.duration)*100 + "%";
    })
    

    //hamburger
    document.querySelector(".hambur").addEventListener('click',(e)=>{
        document.querySelector(".left").style.left=0;
        
    })
    document.querySelector(".close").addEventListener('click',(e)=>{
        document.querySelector(".left").style.left=-100+"%";
        
    })

    document.getElementById("prev").addEventListener("click",(e)=>{
        let ind=songs.indexOf(currentSongs.src.split("/").slice(-1)[0])
        if((ind-1)>=0)
        playMusic(songs[ind-1]);
    })
    document.getElementById("next").addEventListener("click",(e)=>{
        let ind=songs.indexOf(currentSongs.src.split("/").slice(-1)[0])
        if((ind+1)<songs.length)
        playMusic(songs[ind+    1]);
    })
    document.querySelector(".vol").getElementsByTagName("input")[0].addEventListener('change',(e)=>{
      currentSongs.volume=parseInt(e.target.value)/100;
    })
}
// console.log(songs)
main();