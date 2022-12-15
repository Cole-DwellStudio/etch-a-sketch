// query and store all needed html elements

// function for drawing a grid of div's on page
// default to some value
// when slider(1-100) is used redraw grid with desired number
// loop (x(from slider / or default)) times
// each time add a div to document from template
// register each new div for on-hover events
// on hover (while click is held down)
// update color of div element using:
// color picker (input type="color")
// or rainbow if checkbox is selected

const canvas = document.querySelector(".canvas");
const sizeSlider = document.querySelector("#slider");
const resetButton = document.querySelector(".resetButton");
const colorPicker = document.querySelector(".colorPicker");
const sliderLabel = document.querySelector(".sliderLabel");
const rainbowCheckbox = document.querySelector("#rainbowCheckbox");

let pixels = [];

sizeSlider.addEventListener("click", () => {
  drawGrid();
  sliderLabel.innerHTML = `${sizeSlider.value}x${sizeSlider.value}`;
});

resetButton.addEventListener("click", () => {
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = "white";
  });
});

function drawGrid() {
  let size = sizeSlider.value;

  // empty our canvas and clear our previous array
  canvas.innerHTML = "";
  pixels = [];

  for (let i = 1; i <= size * size; i++) {
    const pixel = document.createElement("div");

    // set the default values of the new pixel(div) element
    pixel.style.padding = "0";
    pixel.style.margin = "0";
    pixel.style.width = `${parseFloat(800 / size)}px`;
    pixel.style.height = `${parseFloat(800 / size)}px`;
    pixel.style.zIndex = "4";
    pixel.style.backgroundColor = "white";

    // add the "pixel" to our canvas
    canvas.appendChild(pixel);

    pixel.addEventListener("pointerover", function (e) {
      if (e.buttons === 1 || e.buttons == 3) {
        if (rainbowCheckbox.checked === true) {
          pixel.style.backgroundColor = `rgb(${Math.random() * 255},${
            Math.random() * 255
          },${Math.random() * 255})`;
        } else {
          pixel.style.backgroundColor = colorPicker.value;
        }
      }
    });
    pixel.addEventListener("pointerdown", function (e) {
      if (rainbowCheckbox.checked === true) {
        pixel.style.backgroundColor = `rgb(${Math.random() * 255},${
          Math.random() * 255
        },${Math.random() * 255})`;
      } else {
        pixel.style.backgroundColor = colorPicker.value;
      }
    });

    // store the new "pixel" in an array so we can access it later
    pixels.push(pixel);
  }
}

// set slider label to its initial value
sliderLabel.innerHTML = `${sizeSlider.value}x${sizeSlider.value}`;

// initialize the grid
drawGrid();
