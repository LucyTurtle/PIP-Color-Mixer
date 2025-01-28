const canvas = document.getElementById('floorCanvas');
const ctx = canvas.getContext('2d');
const errorMessage = document.getElementById('errorMessage');

const images = {
    green: new Image(),
    blue: new Image(),
    red: new Image()
};

images.green.src = 'imgs/patina-green-bs-pebble-01-v01-35x35.png';
images.blue.src = 'imgs/rainbow-blue-bs-pebble-03-v01-35x35.png';
images.red.src = 'imgs/terra-cotta-red-bs-pebble-05-v01-35x35.png';

let imagesLoaded = 0;
const totalImages = Object.keys(images).length;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        drawFlooring();
    }
}

Object.values(images).forEach(img => img.onload = imageLoaded);

function drawFlooring() {
    const greenPct = parseInt(document.getElementById('green').value) || 0;
    const bluePct = parseInt(document.getElementById('blue').value) || 0;
    const redPct = parseInt(document.getElementById('red').value) || 0;

    if (greenPct + bluePct + redPct !== 100) {
        errorMessage.textContent = 'Percentages must add up to 100%!';
        return;
    } else {
        errorMessage.textContent = '';
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const tileSize = 35;
    const totalTiles = Math.ceil((canvas.width * canvas.height) / tileSize); // Overlapping factor
    const tileCounts = {
        green: Math.round(totalTiles * (greenPct / 100)),
        blue: Math.round(totalTiles * (bluePct / 100)),
        red: Math.round(totalTiles * (redPct / 100))
    };

    const tileArray = [];
    Object.keys(tileCounts).forEach(color => {
        for (let i = 0; i < tileCounts[color]; i++) {
            tileArray.push(images[color]);
        }
    });

    tileArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < tileArray.length; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const angle = (Math.random() * 360) * Math.PI / 180;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.drawImage(tileArray[i], -tileSize / 2, -tileSize / 2, tileSize, tileSize);
        ctx.restore();
    }
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', drawFlooring);
});