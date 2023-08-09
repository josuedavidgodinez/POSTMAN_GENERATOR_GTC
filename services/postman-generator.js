const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Crea una solicitud en formato JSON
function createRequest(dataValue) {

  let headers=process.env.headers.split(',').map((header)=>{
    return {
      key : header , value : `{{${header}}}`
    }
  });
  let privatePathWord=process.env.privatePathWord+'/';


    return {
      name: `Request for ${dataValue.value}`,
      request: {
        method: 'POST',
        header: [
          { key: 'Content-Type', value: 'application/json' },
          ...headers
        ],
        body: {
          mode: 'raw',
          raw: JSON.stringify({ xss: { key: 'value' } })
        },
        url: {
          raw: `{{endpoint}}/${dataValue.privado?'secure/':''}${dataValue.value}`,
          protocol: '{{protocol}}',
          host: '{{host}}',
          port: '{{port}}',
          path: `/${dataValue.privado?privatePathWord:''}${dataValue.value}`
        }
      },
      response: []
    };
  }
  
function creatPostmanCollection(RequestsArray,NombreColleccion,DescripcionColleccion) {
      // Crea una lista de solicitudes basada en los valores únicos
  const requests = RequestsArray.map(dataValue => createRequest(dataValue));
  
  // Escribe el JSON en un archivo
  const collectionJSON = {
    info: {
      _postman_id: uuidv4(),
      name: NombreColleccion,
      description: DescripcionColleccion,
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
    },
    item: requests
  };
  
  fs.writeFileSync(`generated/${NombreColleccion}.json`, JSON.stringify(collectionJSON, null, 2));
  console.log('Collection JSON generado y guardado en postman_collection.json');
}
  

module.exports={creatPostmanCollection}
