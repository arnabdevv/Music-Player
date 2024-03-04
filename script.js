const songs = [
    {
        name: 'song 1',
        title: 'Aro Ekbar Cholo Fire Jai',
        artist: 'Rupam Islam',
    },
    {
        name: 'song 2',
        title: 'Benche Thakar Gaan',
        artist: 'Anupam Roy',
    },
    {
        name: 'song 3',
        title: 'Bhalobashar Morshum',
        artist: 'Shreya Ghoshal',
    },
    {
        name: 'song 4',
        title: 'Ei Obelay',
        artist: 'Shironamhin',
    },
    {
        name: 'song 5',
        title: 'Kobitar Gaan',
        artist: 'null',
    },
    {
        name: 'song 6',
        title: 'Neel Rong Chilo Vison Priyo',
        artist: 'Rupam Islam',
    },
    {
        name: 'song 7',
        title: 'Oviman',
        artist: 'Tanveer Evan',
    },
    {
        name: 'song 8',
        title: 'Prithibita Naki Choto Hote Hote',
        artist: 'Rupam Islam',
    },
];
// Get DOM elements
const progress = document.getElementById('progress');
const songName = document.getElementById('song-name');
const ctrlIcon = document.getElementById('playPause-icon');
const backwardIcon = document.getElementById('backward-icon');
const forwardIcon = document.getElementById('forward-icon');
const artistName = document.querySelector('.artist-name');
const songThumb = document.querySelector('.song-img');
const songTitle = document.querySelector('.song-title');

// Set progress max value when the song metadata is loaded
songName.onloadedmetadata = function () {
    progress.max = songName.duration;
    progress.value = songName.currentTime;
}

// Function to toggle play/pause
function playPause() {
    if (ctrlIcon.classList.contains('fa-pause')) {
        songName.pause();
        ctrlIcon.classList.remove('fa-pause');
        ctrlIcon.classList.add('fa-play');
    } else {
        songName.play();
        ctrlIcon.classList.remove('fa-play');
        ctrlIcon.classList.add('fa-pause');
    }
}

// Update progress value continuously while playing
songName.addEventListener('timeupdate', function () {
    progress.value = songName.currentTime;
});

// Update song current time when progress bar is changed
progress.oninput = function () {
    songName.currentTime = progress.value;
}

// Update play/pause button and progress value when song is ended
songName.addEventListener('ended', function () {
    ctrlIcon.classList.remove('fa-pause');
    ctrlIcon.classList.add('fa-play');
    progress.value = 0;
});

//forward
function loadSongs(song) {
    songTitle.textContent = song.title;
    if(song.artist == 'null'){
        artistName.textContent = "not fund in database";
    }
    else{
        artistName.textContent = song.artist;
    }
    songName.src = `media/song audio/${song.name}.mp3`;
    songThumb.src = `media/song thamb/${song.name}.jpg`;
}
let songIndex = 0;
// loadSongs(songs[songIndex]);
function nextSong(){
    songIndex = (songIndex + 1) % songs.length;
    loadSongs(songs[songIndex]);
    songName.pause();
    ctrlIcon.classList.remove('fa-pause');
    ctrlIcon.classList.add('fa-play');
}
function previousSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSongs(songs[songIndex]);
    songName.pause();
    ctrlIcon.classList.remove('fa-pause');
    ctrlIcon.classList.add('fa-play');
}