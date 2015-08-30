$(function () {
    var audioInput = $('#audio-input');
    var audioPlayer = $('#audio-player');
    var audioSource = $('#audio-source');
    var audioSourceNode = document.getElementById('audio-source');

    audioInput.change(function () {
        var files = this.files;
        var file = URL.createObjectURL(files[0]);
        audioPlayer.attr('src', file);
        audioSource.attr('src', file);
    });

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audio = audioCtx.createMediaElementSource(audioSourceNode);
    var analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    audio.connect(analyser);

    audioPlayer.on('play', function() {
        audioSourceNode.play();
    });

    audioPlayer.on('pause', function() {
        audioSourceNode.pause();
    });

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    var canvas = document.getElementsByTagName('canvas')[0];
    var canvasCtx = canvas.getContext('2d');
    var canvasWidth = 500;
    var canvasHeight = 260;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    function draw() {
        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = 'rgb(256, 256, 256)';
        canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

        var barWidth = (canvasWidth / bufferLength) * 2.5;
        var barHeight;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            canvasCtx.fillStyle = 'rgb(' + barHeight + ', 30, 30)';
            canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    draw();
});
