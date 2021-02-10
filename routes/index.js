import express from 'express';
import {paginaInicio, 
        paginaNosotros, 
        paginaViajes, 
        paginaTestimoniales,
        paginaDetalleViaje
} from '../controllers/paginasController.js'
import {
        guardarTestimonial
} from '../controllers/testimonialController.js'

const router = express.Router(); // aca estamos utilizando la misma instancia de express pero estamos utilizando su router. Solo se debe tener una instancia de express (app)

// express soporta los verbos para hacer el crud, get, post, put, patch y delete
router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetalleViaje); // aca creamos un comodin que lo que hace es cargar un metodo del contorlador que cambia la variable dependiendo de lo que quiero ver y asi poder cargar distintas rutas en vez de ir creando multiples rutas.

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);

export default router;