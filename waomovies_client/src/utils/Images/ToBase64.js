
function urlImageToBase64(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result.split(",")[1]);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

export default (image, type="file", cb) =>  {
    var file = image;
    if(type=="file"){
        var reader = new FileReader();
        reader.onloadend = function() {
            cb(reader.result.split(",")[1])
        }
        reader.readAsDataURL(file);
    } else {
        urlImageToBase64(image, cb)     
    }
   
  }