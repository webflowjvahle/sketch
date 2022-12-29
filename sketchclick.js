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

            const sketch = Sketch.create({
              container: document.getElementById("sketchable"),
              width: canvasSketchParent.offsetWidth,
              height: canvasSketchParent.offsetWidth,
              fullscreen: false,
              autoclear: false,
              touchmove: function () {
                if (this.dragging) {
                  var touch = this.touches[0];
                  this.lineWidth = 3;
                  this.beginPath();
                  this.moveTo(touch.ox, touch.oy);
                  this.lineTo(touch.x, touch.y);
                  this.strokeStyle = "#ef233c";
                  this.stroke();
                }
              },
            });

            document
              .getElementById("sketchable")
              .addEventListener("mousedown", function (event) {
                sketch.dragging = true;
              });

            document
              .getElementById("sketchable")
              .addEventListener("mousemove", function (event) {
                if (sketch.dragging) {
                  sketch.lineWidth = 3;
                  sketch.beginPath();
                  sketch.moveTo(event.offsetX, event.offsetY);
                  sketch.lineTo(event.offsetX, event.offsetY);
                  sketch.strokeStyle = "#ef233c";
                  sketch.stroke();
                }
              });

            document
              .getElementById("sketchable")
              .addEventListener("mouseup", function (event) {
                sketch.dragging = false;
              });

            document
              .getElementById("sketchable")
              .addEventListener("touchstart", function (event) {
                sketch.dragging = true;
              });

            document
              .getElementById("sketchable")
              .addEventListener("touchmove", function (event) {
                if (sketch.dragging) {
                  var touch = event.touches[0];
                  sketch.lineWidth = 3;
                  sketch.beginPath();
                  sketch.moveTo(touch.pageX, touch.pageY);
                  sketch.lineTo(touch.pageX, touch.pageY);
                  sketch.strokeStyle = "#ef233c";
                  sketch.stroke();
                }
              });

            document
              .getElementById("sketchable")
              .addEventListener("touchend", function (event) {
                sketch.dragging = false;
              });

            document
              .getElementById("btnClear")
              .addEventListener("click", function () {
                sketch.clear();
              });
          }, 400);
        });
      } else {
        console.log("navLinkSketch element is not present on the page");
      }
    }
  }
};

let observerSketch = new MutationObserver(callbackSketch);
observerSketch.observe(targetNodeSketch, configSketch);
