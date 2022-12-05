var jsnao = {
    error: function (data) {
        console.log(data)
    },
    display_video: async function (camera) {
        $('#video-button').hide(0);
        $('#video-div').show(0);
        $('#main-controls').hide(0);
        $('#main-labels').hide(0);
        $('#down-menu').show(0);

        jsnao.t = [];
        for (var i = 0; i < 1024; ++i) {
            jsnao.t[String.fromCharCode(i)] = i;
        }
        var z = Math.floor((Math.random() * 10000) + 1);
        await this.subscribed_video(await video.subscribeCamera("test_z" + z, camera, 0, 10, 5));
    },
    subscribed_video: async function (sname) {
        jsnao.sname = sname;
        await this.image_remote(await video.getImageRemote(jsnao.sname));
    },
    image_remote: async function (data) {
        var imgData = data;
        if (imgData.length > 6) {
            var idCanvas = 'video-canvas';
            var imgWidth = imgData[0];
            var imgHeight = imgData[1];
            var imgBin = imgData[6];
            jsnao.display_image(idCanvas, imgWidth, imgHeight, imgBin);
        }


        await jsnao.image_remote(await video.getImageRemote(jsnao.sname));
    },
    display_image: function (idCanvas, imgWidth, imgHeight, imgBin) {
        var x = 0;
        var w = imgWidth * imgHeight * 4;
        var canvas = document.getElementById(idCanvas);
        var context = canvas.getContext('2d');
        var imageData = context.getImageData(0, 0, imgWidth, imgHeight);
        for (var p = 0; p < w;) {
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
    , displayButtons: function (){
        $('#video-button').show(0);
        $('#video-div').hide(0);
        $('#main-controls').show(0);
        $('#main-labels').show(0);
        $('#down-menu').hide(0);
        video.unsubscribe(jsnao.sname)
    }
}

