
export default (image, cb) =>  {
    var file = image;
    var reader = new FileReader();
    reader.onloadend = function() {
        cb(reader.result.split(",")[1])
    }
    reader.readAsDataURL(file);
  }