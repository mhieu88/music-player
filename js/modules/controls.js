export default class Controls {
    constructor(
        player,
        playBtn,
        nextBtn,
        prevBtn,
        randomBtn,
        repeatBtn,
        progress
    ) {
        this.player = player;
        this.playBtn = playBtn;
        this.nextBtn = nextBtn;
        this.prevBtn = prevBtn;
        this.randomBtn = randomBtn;
        this.repeatBtn = repeatBtn;
        this.progress = progress;

        this.lastUpdateTime = 0; // For throttling the timeupdate event
        this.throttleInterval = 100; // Time in ms between progress updates

        // Initialize event handlers
        this.setupEventHandlers();
    }

    // Throttled time update handler for progress bar
    handleTimeUpdate() {
        const now = Date.now();
        if (now - this.lastUpdateTime > this.throttleInterval) {
            const progressPercent =
                (this.player.audio.currentTime / this.player.audio.duration) *
                100;
            this.progress.value = progressPercent;
            this.lastUpdateTime = now;
        }
    }

    // Handle volume change and update audio volume
    handleVolumeChange() {
        const volumePercent = this.volume.value / 100;
        this.player.audio.volume = volumePercent; // Update audio volume
    }

    // Handle the events for play/pause, next, prev, random, and repeat buttons
    setupEventHandlers() {
        // Play/Pause toggle button
        this.playBtn.onclick = () => {
            this.player.isPlaying ? this.player.pause() : this.player.play();
        };

        // Next song button
        this.nextBtn.onclick = () => this.player.nextSong();

        // Previous song button
        this.prevBtn.onclick = () => this.player.prevSong();

        // Random button
        this.randomBtn.onclick = () => this.player.toggleRandom();

        // Repeat button
        this.repeatBtn.onclick = () => this.player.toggleRepeat();

        // Update progress bar as the song plays, with throttling
        this.player.audio.addEventListener("timeupdate", () =>
            this.handleTimeUpdate()
        );

        // Handle changes to the progress bar (e.g., by dragging or clicking)
        this.progress.addEventListener("input", (e) => {
            const seekTime =
                (this.player.audio.duration / 100) * e.target.value;
            this.player.audio.currentTime = seekTime;
        });

        // Handle clicking on the progress bar (set playback to clicked position)
        this.progress.addEventListener("click", (e) => {
            const rect = this.progress.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const percent = (offsetX / rect.width) * 100;
            const seekTime = (this.player.audio.duration / 100) * percent;
            this.player.audio.currentTime = seekTime;
            this.progress.value = percent;
        });
    }
}
