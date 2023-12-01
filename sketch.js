let exampleShader;
let backgroundImage;
let gradientIndex;

function preload() {
    exampleShader = loadShader('vert.vert', 'frag.frag');
    backgroundImage = loadImage('image.jpg');
}

function setup() {
    createCanvas(600, 600, WEBGL);
    shader(exampleShader);
    noStroke();

    gradientIndex = 0;

    get_color_gradient(gradientIndex).then(palletArray => {
        if (palletArray !== null && palletArray.length === 4) {
            exampleShader.setUniform("resolution", [600, 600]);
            exampleShader.setUniform("grad_a", palletArray[0]);
            exampleShader.setUniform("grad_b", palletArray[1]);
            exampleShader.setUniform("grad_c", palletArray[2]);
            exampleShader.setUniform("grad_d", palletArray[3]);
        } else {
            console.error("Invalid palletArray.");
        }
    });
}

function draw() {
    exampleShader.setUniform("millis", millis());
    rect(-width / 2, -height / 2, width, height);
}

function get_color_gradient(index) {
    const filePath = './pallets.json';

    return fetch(filePath)
        .then(response => response.json())
        .then(data => {
            if (data.pallets && index >= 0 && index < data.pallets.length) {
                const palletArrayString = data.pallets[index];
                const palletArray = JSON.parse(palletArrayString.replace(/\(/g, '[').replace(/\)/g, ']'));
                return palletArray;
            } else {
                console.error("Invalid index or missing 'pallets' array.");
                return null;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return null;
        });
}