export default class Playlist {
    constructor(container, player) {
        this.container = container;
        this.player = player;
        this.container.addEventListener("click", (e) =>
            this.handleSongClick(e)
        ); // Event delegation
    }

    render() {
        const htmls = this.player.songs.map(
            (song, index) => `
            <div class="song ${
                index === this.player.currentIndex ? "active" : ""
            }" data-index="${index}">
                <div class="thumb" style="background-image: url('${
                    song.image
                }')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.artist}</p>
                </div>
                <div class="option"><i class="fas fa-ellipsis-h"></i></div>
            </div>
        `
        );
        this.container.innerHTML = htmls.join("");
    }

    handleSongClick() {
        this.container.onclick = (e) => {
            const songNode = e.target.closest(".song:not(.active)");
            if (songNode) {
                const index = Number(songNode.dataset.index);
                this.player.currentIndex = index;
                this.player.loadCurrentSong();
                this.player.play();
                this.render(); // Re-render the playlist on song click
            }
        };
    }
}
