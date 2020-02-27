var audioBoxes,
    boxes = [];
var loadIcon, playIcon, pauseIcon;

function initAudioBoxes() {
    audioBoxes = document.querySelectorAll(".audio-box");
    for (var i = 0; i < audioBoxes.length; i++) {
        var b = audioBoxes[i];
        var box = {
            songPlaying: false,
            dragging: false
        };
        box.totalDuration = b.querySelector(".track-duration-text");
        box.song = b.querySelector("audio");
        box.song.load();
        box.playButton = b.querySelector(".btn");
        box.playButton.style.cursor = "pointer";
        box.loadIcon = new Image();
        box.loadIcon.src = "https://pelletierauger.com/style/audio-icons/load-icon.png";
        box.playIcon = new Image();
        box.playIcon.src = "https://pelletierauger.com/style/audio-icons/play-icon.png";
        box.pauseIcon = new Image();
        box.pauseIcon.src = "https://pelletierauger.com/style/audio-icons/pause-icon.png";
        box.playButton.appendChild(box.loadIcon);
        box.progressbar = b.querySelector(".progress-bar");
        box.progressbar.style.cursor = "pointer";
        box.progressBarOverlay = b.querySelector(".progress-bar-overlay");
        box.timeIndicator = b.querySelector(".current-progress-text");
        box.timeIndicator.innerHTML = "0:00";
        (function(box) {
            box.song.onloadeddata = function() {
                // box.playButton.removeChild(box.loadIcon);
                box.playButton.innerHTML = "";
                box.playButton.appendChild(box.playIcon);
                box.totalDuration.innerHTML = millisToMinutesAndSeconds(box.song.duration * 1000);
                box.playButton.onclick = function() {
                    if (box.songPlaying) {
                        box.song.pause();
                        box.songPlaying = false;
                        // box.playButton.removeChild(box.pauseIcon);
                        box.playButton.innerHTML = "";
                        box.playButton.appendChild(box.playIcon);
                    } else {
                        box.song.play();
                        box.songPlaying = true;
                        box.updateProgressBar();
                        // box.playButton.removeChild(box.playIcon);
                        box.playButton.innerHTML = "";
                        box.playButton.appendChild(box.pauseIcon);
                    }
                };
                box.progressbar.addEventListener("click", function(event) {
                    var percent = event.offsetX / this.offsetWidth;
                    box.song.currentTime = percent * box.song.duration;
                    box.timeIndicator.innerHTML = millisToMinutesAndSeconds(box.song.currentTime * 1000);
                    box.progressBarOverlay.style.width = (percent * 100) + "%";
                });
                box.progressbar.addEventListener("mousedown", function(event) {
                    box.dragging = true;
                });
                box.progressbar.addEventListener("mousemove", function(event) {
                    if (box.dragging) {
                        var percent = event.offsetX / this.offsetWidth;
                        box.song.currentTime = percent * box.song.duration;
                        box.timeIndicator.innerHTML = millisToMinutesAndSeconds(box.song.currentTime * 1000);
                        box.progressBarOverlay.style.width = (percent * 100) + "%";
                    }
                });
                box.progressbar.addEventListener("mouseup", function(event) {
                    box.dragging = false;
                });
                box.progressbar.addEventListener("mouseleave", function(event) {
                    box.dragging = false;
                });
                box.updateProgressBar = function() {
                    var percent = box.song.currentTime / box.song.duration * 100;
                    box.progressBarOverlay.style.width = percent + "%";
                    box.timeIndicator.innerHTML = millisToMinutesAndSeconds(box.song.currentTime * 1000);
                    if (box.songPlaying && !box.song.paused) {
                        window.requestAnimationFrame(function() {
                            box.updateProgressBar();
                        });
                    } else {
                        box.songPlaying = false;
                        // box.playButton.removeChild(box.pauseIcon);

                        box.playButton.innerHTML = "";
                        box.playButton.appendChild(box.playIcon);
                    }
                };
            };
        }(box));
        boxes.push(box);
    }
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}

document.onreadystatechange = function() {
    if (document.readyState === 'interactive') {
        initAudioBoxes();
    }
};