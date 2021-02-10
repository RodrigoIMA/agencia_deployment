import { Viaje } from '../models/Viaje.js'
import { Testimonial } from '../models/Testimoniales.js'

const paginaInicio = async (req, res) => { // express utiliza en el callback req (request) que es lo que yo envío por ejemplo cuando lleno un formulario en el request va lo que yo puse, res (response) que es lo que express nos responde, es decir, me dice si envie datos mal o si una página no existe

    const promiseDB = []; 

    promiseDB.push(Viaje.findAll({ limit: 3 })); // con findAll selecciono todos los elementos de la base de datos pero con ({limit: 3}) limito esos resultados a solo 3
    promiseDB.push(Testimonial.findAll({ limit: 3 }));

    try {
        const resultado = await Promise.all(promiseDB) // con await Promise.all lo que consigo es poder realizar dos o mas cosultas a la base de datos al mismo tiempo, no se pueden hacer dos wait en vez del promise, funciona, pero es perjudicial para la performance de la página.

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        }); // de esta manera yo puedo crear mi propia respuesta. con .send yo envio algo para que se muestre en pantalla. También esta .json y con {} escribo el json.
        // el mas común en .render que se utiliza para mostrar un vista
    } catch (error) {
        console.log(error);
    }
    
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    }); // nostros hace referencia al archivo nosotros.pug de la carpeta views
}

const paginaViajes = async (req, res) => {
    // Consultar base de datos
    const viajes = await Viaje.findAll();

    console.log(viajes);

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll() // findAll retorna un arreglo con la info de la base de datos
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}

// Mestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => { // siempre que utilizamos el async tenemos que usar el try catch
    
    const {slug} = req.params;  // cons req.params accedo a la variable viaje que es la que contiene los distintos slug para hacer las rutas culias

    try {
        const viaje = await Viaje.findOne({where: {slug}});

        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}