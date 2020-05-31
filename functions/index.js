// Importamos functions desde firebasebase-funcions
const functions = require('firebase-functions');
// Importamos firebase-admin para conectarnos con la base de datos
const admin = require("firebase-admin");
// Importamos el archivo de configuración que descargamos
const serviceAccount = require('./firebase-config.json');
// inicializamos nuestra aplicación
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cbo-dev-api.firebaseio.com"
});

// creamos la función que obtiene los recursos de nuestra firebase database
exports.myapi = functions.https.onRequest((req, res) => {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'GET') {
    const data = admin.database().ref('/me') // Hacemos referencia a la base de datos
    data.on('value', (snapshot) => {
      res.json(snapshot.val()); // El elemento resultante lo exponemos en un archivo JSON
    });
  }
});