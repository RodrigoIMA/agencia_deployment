import Sequelize from 'sequelize';
import db from '../config/db.js';

export const Testimonial = db.define('testimoniales', { // aca en el entre () se le pasa el nombre de la base de datos y un objeto de configuración donde se define cada una de las tablas
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    },
});