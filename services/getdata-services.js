const csv = require('csv-parser');


// Función para procesar los datos por columna
function procesarColumnas(data,headers) {
    let dataArray=[]
    for (const header of headers) {
        for (const row of data) {
            const ObjtoInsert=row[header];
            if(ObjtoInsert){
                if(!dataArray.some((obj)=>obj.privado ===  ObjtoInsert.privado && obj.value === ObjtoInsert.value)) 
                dataArray.push(row[header]);
            }
        }
    }
    return dataArray;
}


function returnData(ReadableStream,callback) {
    let matrix = [];
    let headers = [];
    let results = [];

        ReadableStream.pipe(csv({
            mapValues: ({ header, index, value }) => {
                if (header && value) {
                    let privado = header.includes(process.env.PrivateHeaderName);
                    return { privado, value };
                }
            }

        })
        )
        .on('headers',  (headersStr) => {
            headersStr.forEach((head)=>{
                headers.push(head);
            })
            return headersStr;
        })
        .on('data', (row) => matrix.push(row))
        .on('end', () => {
            console.log('Lectura del CSV finalizada.');
           results= procesarColumnas(matrix,headers);
           callback(results);
        })
}

module.exports = {returnData};
