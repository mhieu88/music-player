import Player from "./modules/player.js";
import Playlist from "./modules/playlist.js";
import Controls from "./modules/controls.js";
import Config from "./modules/config.js";

import Songs from "./modules/songs.js";

// DOM Elements
const titleElement = document.querySelector("title");

const audioElement = document.getElementById("audio");
const playlistElement = document.querySelector(".playlist");
const playBtnElement = document.querySelector(".btn-toggle-play");
const nextBtnElement = document.querySelector(".btn-next");
const prevBtnElement = document.querySelector(".btn-prev");
const randomBtnElement = document.querySelector(".btn-random");
const repeatBtnElement = document.querySelector(".btn-repeat");
const progressElement = document.getElementById("progress");
const playerElement = document.querySelector(".player");

// Modules
const configModule = new Config("MUSIC_PLAYER_CONFIG");

const playlistModule = new Playlist(playlistElement, null);
const playerModule = new Player(
    titleElement,
    audioElement,
    Songs,
    playerElement,
    playlistModule
);

playlistModule.player = playerModule;

// Create the Controls module
const controlsModule = new Controls(
    playerModule,
    playBtnElement,
    nextBtnElement,
    prevBtnElement,
    randomBtnElement,
    repeatBtnElement,
    progressElement
);

// Initialize
playerModule.isRandom = configModule.get("isRandom") || false;
playerModule.isRepeat = configModule.get("isRepeat") || false;

// Load playlist
playlistModule.render();

// Playlist click
playlistModule.handleSongClick();

// Events
controlsModule.setupEventHandlers();

// Load current song
playerModule.loadCurrentSong();
