export default class Player {
    constructor(title, audio, songs, player, playlist) {
        this.title = title;
        this.audio = audio;
        this.songs = songs;
        this.player = player;
        this.playlist = playlist;
        this.currentIndex = 0;
        this.isPlaying = false;
        this.isRandom = false;
        this.isRepeat = false;

        // Lắng nghe sự kiện kết thúc bài hát
        this.audio.onended = () => this.handleSongEnd();
        this.cd = document.querySelector(".cd");
        this.cdWidth = this.cd.offsetWidth;
        this.setupCDResize();
    }

    // Bài hát hiện tại đang hiển thị
    get currentSong() {
        return this.songs[this.currentIndex];
    }

    // Cập nhật tên bài hát trong title
    updateTitle() {
        this.title.textContent = this.currentSong.name; // Cập nhật title cho thẻ <title>
        document.title = this.currentSong.name; // Cập nhật nội dung thẻ <title> trên trang
    }

    // Khi bài hát được play
    play() {
        this.audio.play();
        this.isPlaying = true;
        this.player.classList.add("playing");
    }

    // Khi ngưng phát nhạc
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.player.classList.remove("playing");
    }

    // Chuyển bài
    nextSong() {
        this.currentIndex = this.isRandom
            ? this.getRandomSongIndex()
            : (this.currentIndex + 1) % this.songs.length;
        this.loadCurrentSong();
        this.playlist.render(); // Re-render playlist to reflect active song
        this.resetProgress(); // Reset progress bar
        this.playIfNeeded();
    }

    // Chuyển bài trước
    prevSong() {
        this.currentIndex =
            (this.currentIndex - 1 + this.songs.length) % this.songs.length;
        this.loadCurrentSong();
        this.playlist.render(); // Re-render playlist to reflect active song
        this.resetProgress(); // Reset progress bar
        this.playIfNeeded();
    }

    // Tải thông tin bài hát hiện tại
    loadCurrentSong() {
        const { name, image, path } = this.currentSong;
        document.querySelector("header h2").textContent = name;
        document.querySelector(
            ".cd-thumb"
        ).style.backgroundImage = `url('${image}')`;
        this.audio.src = path;
        this.updateTitle(); // Cập nhật tên bài hát trong title khi tải bài hát mới

        document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${image}')`;
        document.body.style.backgroundSize = "contain"; // Đảm bảo ảnh bao phủ toàn bộ màn hình
        document.body.style.backgroundRepeat = "repeat-x"; // Ngừng lặp lại ảnh nền
        document.body.style.backgroundPosition = "center"; // Căn giữa ảnh nền
        document.body.style.backgroundAttachment = "fixed"; // Giữ ảnh nền cố định khi cuộn trang
    }

    // Bật/tắt chế độ random và tắt chế độ repeat
    toggleRandom() {
        this.isRandom = !this.isRandom;
        this.isRepeat = false; // Tắt chế độ repeat khi bật random
        this.updateUI();
    }

    // Bật/tắt chế độ repeat và tắt chế độ random
    toggleRepeat() {
        this.isRepeat = !this.isRepeat;
        this.isRandom = false; // Tắt chế độ random khi bật repeat
        this.updateUI();
    }

    // Xử lý khi bài hát kết thúc
    handleSongEnd() {
        if (this.isRepeat) {
            this.loadCurrentSong();
            this.play();
        } else {
            this.nextSong();
        }
    }

    // Lấy index ngẫu nhiên của bài hát, đảm bảo không trùng bài hát hiện tại
    getRandomSongIndex() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.songs.length);
        } while (randomIndex === this.currentIndex);
        return randomIndex;
    }

    // Cập nhật UI (playlist, trạng thái button random, repeat)
    updateUI() {
        this.playlist.render(); // Cập nhật lại playlist
        document
            .querySelector(".btn-random")
            .classList.toggle("active", this.isRandom);
        document
            .querySelector(".btn-repeat")
            .classList.toggle("active", this.isRepeat);
    }

    // Nếu bài hát đang phát, phát lại bài hát ngay sau khi tải
    playIfNeeded() {
        if (this.isPlaying) {
            this.play();
        }
    }

    // Reset progress bar to 0
    resetProgress() {
        const progressBar = document.querySelector(".progress");
        progressBar.value = 0;
    }

    // Phóng to / thu nhỏ CD khi cuộn trang
    setupCDResize() {
        document.onscroll = () => {
            const scrollTop =
                window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = this.cdWidth - scrollTop;

            this.cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : "0";
            this.cd.style.opacity = newCdWidth / this.cdWidth;
        };
    }
}
