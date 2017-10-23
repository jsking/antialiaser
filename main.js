function uploadFile() {
    getEl("hiddenFile").click();
}


function imageUploaded(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(event) {
        var loadImage = new Image();
        loadImage.src = event.target.result;
        
        loadImage.onload = function() {
            var canvas = getEl("canvas");
            canvas.width = loadImage.width * 2;
            canvas.style.width = (loadImage.width * 2) + "px";
            canvas.height = loadImage.height * 2;
            canvas.style.height = (loadImage.height * 2) + "px";
            
            var ctx = canvas.getContext("2d");
            ctx.scale(2,2);
            ctx.drawImage(loadImage,0,0);
            ctx.scale(1,1);
            
            stackBlurCanvasRGBA("canvas", 0, 0, loadImage.width, loadImage.height, 1);
            
            //CANVAS 2
            
            var canvas2 = getEl("dispCanvas");
            
            canvas2.width = loadImage.width;
            canvas2.style.width = loadImage.width+ "px";
            canvas2.height = loadImage.height;
            canvas2.style.height = loadImage.height + "px";
            
            var ctx2 = canvas2.getContext("2d");
            ctx2.scale(0.5,0.5);
            ctx2.drawImage(canvas,0,0);
            
            
            ctx.scale(2,2);
            ctx.drawImage(canvas2,0,0);
            ctx.scale(1,1);
            stackBlurCanvasRGBA("canvas", 0, 0, loadImage.width, loadImage.height, 1);
            ctx2.drawImage(canvas,0,0);
        }
    };
    
    reader.readAsDataURL(selectedFile);
}