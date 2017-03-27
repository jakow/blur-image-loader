
// normal images
function blurLoadImages() {
let elements = document.querySelectorAll('.img-blur-loader');
for (let element of elements) {
    let preview = element.querySelector('.preview');
    // need to create a new image because it may not be possible to attach the event
    // to the small image before it is loaded and thus the event would not fire.
    let small = new Image();
    small.onload = function () {
      preview.classList.add('loaded');
    };
    small.src = preview.src;
    if (!element.dataset.src) throw new Error("No blur loader data-source defined");
    large = new Image();
    large.classList.add('original');
    element.appendChild(large);
    large.onload = function() {
        large.classList.add('loaded');
    };
    large.src = element.dataset.src;
  }
}

blurLoadImages();

function blurSvgFilter(encodedImage, blurValue, width, height) {
return `<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     width="1600" height="1600"
     viewBox="0 0 32 32">
  <filter id="blur" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feGaussianBlur stdDeviation="${blurValue} ${blurValue}" edgeMode="duplicate" />
    <feComponentTransfer>
      <feFuncA type="discrete" tableValues="1 1" />
    </feComponentTransfer>
  </filter>
  <image filter="url(#blur)"
         xlink:href="${encodedImage}"
         x="0" y="0"
         height="100%" width="100%"/>
</svg>`;
}

function imgEncode(imgUrl, callback) {
  let img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = function() {
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0,0);
    if (callback)
      callback(canvas.toDataURL('image/png'));
    }
  img.src = imgUrl;
}

function svgUrlEncode(svgString) {
  return `url("data:image/svg+xml,charset=utf-8,${window.btoa(svgString)}")`;
}
// background images
function blurLoadBackgroundImages() {
  let elements = document.querySelectorAll('.bg-img-blur-loader');
  for (let element of elements) {
      let largeBg = document.createElement('div');
      largeBg.classList.add('bg-img', 'original');
      element.appendChild(largeBg);
      largeImg = new Image();
      let src = element.dataset.src;
      largeBg.style.backgroundImage = `url("${src}")`;
      if (!src) throw new Error("No final source specified for bg img loader.");
      largeImg.onload = function() { 
        element.style.filter = "initial";
        largeBg.classList.add('loaded');

      }
      largeImg.src = src;
  }
}
blurLoadBackgroundImages();