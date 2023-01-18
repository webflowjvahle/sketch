let targetNodeSketch = document.querySelector(".c-main");

let configSketch = { childList: true };

let callbackSketch = function (mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.");
      if (document.querySelector("[data-sketch]")) {
        console.log("navLinkSketch element is present on the page");
        let navLinkSketch = document.querySelector("[data-sketch");
        navLinkSketch.addEventListener("click", function () {
          console.log("navLinkSketch has been clicked");
          setTimeout(function () {
            const canvasSketchParent = document.querySelector(".c-sketch");
            const sketchable = document.getElementById("sketchable");
            const sketch = Sketch.create({
              container: sketchable,
              width: canvasSketchParent.offsetWidth,
              height: canvasSketchParent.offsetWidth,
              fullscreen: false,
              autoclear: false,
            });

            let isDrawing = false;

            sketchable.addEventListener("mousedown", function (event) {
              sketch.dragging = true;
              sketch.beginPath();
              sketch.moveTo(event.offsetX, event.offsetY);
            });

            sketchable.addEventListener("mousemove", function (event) {
              if (sketch.dragging) {
                sketch.lineWidth = 3;
                sketch.lineTo(event.offsetX, event.offsetY);
                sketch.strokeStyle = "#ef233c";
                sketch.stroke();
              }
            });

            sketchable.addEventListener("mouseup", function (event) {
              sketch.dragging = false;
            });

            sketchable.addEventListener("touchstart", function (event) {
              sketch.dragging = true;
              var touch = event.touches[0];
              sketch.beginPath();
              sketch.moveTo(touch.pageX, touch.pageY);
            });

            sketchable.addEventListener("touchmove", function (event) {
              if (sketch.dragging) {
                var touch = event.touches[0];
                sketch.lineWidth = 3;
                sketch.lineTo(touch.pageX, touch.pageY);
                sketch.strokeStyle = "#ef233c";
                sketch.stroke();
              }
            });

            sketchable.addEventListener("touchend", function (event) {
              sketch.dragging = false;
            });

            document
              .getElementById("btnClear")
              .addEventListener("click", function () {
                sketch.clear();
              });
          }, 800);
        });
      } else {
        console.log("navLinkSketch element is not present on the page");
      }
    }
  }
};

let observerSketch = new MutationObserver(callbackSketch);
observerSketch.observe(targetNodeSketch, configSketch);
