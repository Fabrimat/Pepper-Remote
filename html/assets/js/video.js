var jsnao = {
    error : function(data) { console.log(data) },
    display_video : async function() {
        $('#video-button').hide(300);
        $('#video-div-0').show(300);
        $('#video-div-1').show(300);
        $('#video-div-2').show(300);
        jsnao.t = [];
        for (var i = 0; i < 1024; ++i) {
            jsnao.t[String.fromCharCode(i)] = i;
        }
        var z = Math.floor((Math.random()*10000)+1);
        await this.subscribed_video(await video.subscribeCameras("test_z" + z, [0, 1], [0, 0], [10, 10], 30));
    },
    subscribed_video : async function(sname) {
        jsnao.sname = sname;
        await this.image_remote(await video.getImagesRemote(jsnao.sname));
    },
    image_remote : async function(data) {
        if (data.length > 0) {
            var imgData = data[0];
            if (imgData.length > 6) {
                var idCanvas = 'video-canvas-0';
                var imgWidth = imgData[0];
                var imgHeight = imgData[1];
                var imgBin = imgData[6];
                jsnao.display_image(idCanvas, imgWidth, imgHeight, imgBin);
            }
        }
        if (data.length > 1) {
            var imgData = data[1];
            if (imgData.length > 6) {
                var idCanvas = 'video-canvas-1';
                var imgWidth = imgData[0];
                var imgHeight = imgData[1];
                var imgBin = imgData[6];
                jsnao.display_image(idCanvas, imgWidth, imgHeight, imgBin);
            }
        }
        if (data.length > 2) {
            var imgData = data[1];
            if (imgData.length > 6) {
                var idCanvas = 'video-canvas-2';
                var imgWidth = imgData[0];
                var imgHeight = imgData[1];
                var imgBin = imgData[6];
                jsnao.display_image(idCanvas, imgWidth, imgHeight, imgBin);
            }
        }
        await jsnao.image_remote(await video.getImagesRemote(jsnao.sname));
    },
    display_image : function(idCanvas, imgWidth, imgHeight, imgBin) {
        var x = 0;
        var w = imgWidth * imgHeight * 4;
        var canvas = document.getElementById(idCanvas);
        var context = canvas.getContext('2d');
        var imageData = context.getImageData(0, 0, imgWidth, imgHeight);
        for (var p = 0; p < w; ) {
            let y = imgBin[x++];
            let u = imgBin[x++];
            let v = imgBin[x++];
            let rgb = colorconv.YUV2RGB([y, u, v])

            imageData.data[p++] = rgb[0];
            imageData.data[p++] = rgb[1];
            imageData.data[p++] = rgb[2];
            imageData.data[p++] = 255;
        }

        context.putImageData(imageData, 0, 0);
    }
}