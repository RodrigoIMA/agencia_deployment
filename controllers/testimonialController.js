import { Testimonial } from '../models/Testimoniales.js'

const guardarTestimonial = async (req, res) => { // req.body retorna lo que el usuario escribio en el formulario
    // validar...
    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if (nombre.trim() === '') { // el metodo trim()  lo que hace es quitar los espacios al principio y al final
        errores.push({mensaje: 'el nombre esta vacío'});
    }
    if (correo.trim() === '') { 
        errores.push({mensaje: 'el correo esta vacío'});
    }
    if (mensaje.trim() === '') { 
        errores.push({mensaje: 'el mensaje esta vacío'});
    }
    if (errores.length > 0) {
        // Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll() // es necesario pasarle el resultado al controller para que asi pueda versese en la vista
 
        // Mostrar la visa con los errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        }) 
    } else {
        // Almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
}