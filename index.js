const fs = require('fs');
const process = require('process');
require('dotenv').config()

const {readFileAsString} = require('./services/file-service');
const {returnData} = require('./services/getdata-services');
const {creatPostmanCollection} = require('./services/postman-generator');

async function writeFileMain () {
    const filePath = 'data/protocols.csv'; // Replace with the actual path to your file
    let args = process.argv;

    let streamfile=await readFileAsString(filePath);
    let arraydata=returnData(streamfile,(results)=>{
        creatPostmanCollection(results,'ChatBotGyT','Requests para el ChatBot de Banco GyT');
    });
}

writeFileMain();





