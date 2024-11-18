document.getElementById('translate-button').addEventListener('click', () => {
    const fileInput = document.getElementById('photo-upload');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please upload a photo.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const uploadedImg = new Image();
        uploadedImg.src = event.target.result;
        uploadedImg.onload = function() {
            // Compare the uploaded image with Unown images
            const translation = compareWithUnownImages(uploadedImg);
            document.getElementById('translation-output').textContent = `Translated Pokémon: ${translation}`;
        };
    };
    reader.readAsDataURL(file);
});

function compareWithUnownImages(uploadedImg) {
    const translations = {
        'unown-alfabet-a': 'A',
        'unown-alfabet-b': 'B',
        'unown-alfabet-c': 'C',
        'unown-alfabet-d': 'D',
        'unown-alfabet-e': 'E',
        'unown-alfabet-f': 'F',
        'unown-alfabet-g': 'G',
        'unown-alfabet-h': 'H',
        'unown-alfabet-i': 'I',
        'unown-alfabet-j': 'J',
        'unown-alfabet-k': 'K',
        'unown-alfabet-l': 'L',
        'unown-alfabet-m': 'M',
        'unown-alfabet-n': 'N',
        'unown-alfabet-o': 'O',
        'unown-alfabet-p': 'P',
        'unown-alfabet-q': 'Q',
        'unown-alfabet-r': 'R',
        'unown-alfabet-s': 'S',
        'unown-alfabet-t': 'T',
        'unown-alfabet-u': 'U',
        'unown-alfabet-v': 'V',
        'unown-alfabet-w': 'W',
        'unown-alfabet-x': 'X',
        'unown-alfabet-y': 'Y',
        'unown-alfabet-z': 'Z',
        'unown-alfabet-!': '!',
        'unown-alfabet-vraagteken': '?'
    };

    for (const [fileName, letter] of Object.entries(translations)) {
        const unownImg = new Image();
        unownImg.src = `images/${fileName}.png`;
        if (imagesAreSimilar(uploadedImg, unownImg)) {
            return letter;
        }
    }
    return 'Unknown';
}

function imagesAreSimilar(img1, img2) {
    const canvas1 = document.createElement('canvas');
    const canvas2 = document.createElement('canvas');
    const context1 = canvas1.getContext('2d');
    const context2 = canvas2.getContext('2d');

    canvas1.width = img1.width;
    canvas1.height = img1.height;
    canvas2.width = img2.width;
    canvas2.height = img2.height;

    context1.drawImage(img1, 0, 0, img1.width, img1.height);
    context2.drawImage(img2, 0, 0, img2.width, img2.height);

    const data1 = context1.getImageData(0, 0, img1.width, img1.height).data;
    const data2 = context2.getImageData(0, 0, img2.width, img2.height).data;

    let diff = 0;
    for (let i = 0; i < data1.length; i += 4) {
        const rDiff = Math.abs(data1[i] - data2[i]);
        const gDiff = Math.abs(data1[i + 1] - data2[i + 1]);
        const bDiff = Math.abs(data1[i + 2] - data2[i + 2]);
        if (rDiff > 10 || gDiff > 10 || bDiff > 10) {
            diff++;
        }
    }

    return diff < 1000; // Adjust this threshold as needed
}