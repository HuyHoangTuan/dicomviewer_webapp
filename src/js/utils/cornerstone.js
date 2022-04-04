const cornerstone = require('cornerstone-core');

function getImage(imageId) 
{
      const width = 256;
      const height = 256;
      function checkImageId()
      {
            var index = imageId.indexOf('base64://');
            if(index !== 0 )
            {
                  return false;
            }
            return true;
      }
      function str2ab(str) 
      {
            var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
            var bufView = new Uint16Array(buf);
            var index = 0;
            for (var i=0, strLen=str.length; i<strLen; i+=2) {
            var lower = str.charCodeAt(i);
            var upper = str.charCodeAt(i+1);
            bufView[index] = lower + (upper <<8);
            index++;
            }
            return bufView;
      }

      function getPixelDataImageId()
      {
            if(checkImageId() === false) throw " unknow ImageId";
            var newImageId = imageId.slice('base64://'.length);
            var pixelDataAsString = window.atob(newImageId);
            var pixelData = str2ab(pixelDataAsString);
            console.log(pixelData);
            return pixelData;
      }

      var image = 
      {
            imageId: imageId,
            minPixelValue : 0,
            maxPixelValue : 257,
            slope: 1.0,
            intercept: 0,
            windowCenter : 127,
            windowWidth : 256,
            getPixelData: getPixelDataImageId,
            rows: height,
            columns: width,
            height: height,
            width: width,
            color: true,
            columnPixelSpacing: undefined,
            rowPixelSpacing: undefined,
            sizeInBytes: width * height * 2
        };

      return {
          promise: new Promise((resolve) => {
            resolve(image);
          }),
          cancelFn: undefined
      };
  }

  cornerstone.registerImageLoader('base64', getImage);

  export default cornerstone;