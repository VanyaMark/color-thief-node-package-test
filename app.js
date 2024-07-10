// importar módulos de terceros
const express = require('express');
const morgan = require('morgan');

// creamos una instancia del servidor Express
const app = express();

// Tenemos que usar un nuevo middleware para indicar a Express que queremos procesar peticiones de tipo POST
app.use(express.urlencoded({ extended: true }));

// Añadimos el middleware necesario para que el client puedo hacer peticiones GET a los recursos públicos de la carpeta 'public'
app.use(express.static('public'));

// Especificar a Express que quiero usar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Usamos el middleware morgan para loguear las peticiones del cliente
app.use(morgan('tiny'));

const { getColorFromURL } = require('color-thief-node');


//database
let images = [{
    id: 1,
    title: "happy cat",
    url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
}, {
    id: 2,
    title: "happy dog",
    url: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}, {
    id: 3,
    title: "cat snow",
    url: "https://images.pexels.com/photos/3923387/pexels-photo-3923387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}, {
    id: 4,
    title: "woman in lake",
    url: "https://images.pexels.com/photos/2365067/pexels-photo-2365067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}];

// Cuando nos hagan una petición GET a '/' renderizamos la home.ejs
app.get('/', (req, res) => {

    getColorFromURL(images[2].url)
    .then(dominantColor => {
        console.log('dominant color: ', dominantColor)

        res.render('home', {
            images,
            dominantColor
        });
    })
    .catch(err => console.log('Something bad has happened: ', err))

});

app.listen(3010, (req, res) => {
    console.log("Servidor escuchando correctamente en el puerto 3010.")
});
