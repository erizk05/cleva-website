
const Jimp = require('jimp');
Jimp.read('assets/logo.png').then(image => {
  let r = 0, g = 0, b = 0, a = 0, count = 0;
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    // skip completely transparent pixels
    if(this.bitmap.data[idx + 3] > 0) {
      r += this.bitmap.data[idx];
      g += this.bitmap.data[idx + 1];
      b += this.bitmap.data[idx + 2];
      count++;
    }
  });
  r = Math.floor(r/count);
  g = Math.floor(g/count);
  b = Math.floor(b/count);
  console.log('Average color: rgb(' + r + ',' + g + ',' + b + ')');
});
