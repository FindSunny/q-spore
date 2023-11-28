const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
let data = new FormData();
data.append('styleColorCode', '119307591E10');
data.append('channelCode', 'cms');
data.append('imageRuleId', '59');
data.append('imageCode', '透明图(色)');
data.append('file', fs.createReadStream('D:/88_flyming/00python/input/grayscale/223414030E08_V30_no_3701483.png'));
data.append('imagePosition', '1');

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://cms-dev.bestseller.com.cn/stage-api/product/product/detail/image/upload',
  headers: { 
    'Content-Type': 'multipart/form-data', 
    'Authorization': '7151c167-d93b-4714-b61f-026f0c4640e4',
    ...data.getHeaders()
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
