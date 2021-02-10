import Sequelize from 'sequelize';
import db from '../config/db.js';

export const Viaje = db.define('viajes', { // aca en el entre () se le pasa el nombre de la base de datos y un objeto de configuración donde se define cada una de las tablas
    titulo: {
        type: Sequelize.STRING
    },
    precio: {
        type: Sequelize.STRING
    },
    fecha_ida: {
        type: Sequelize.DATE
    },
    fecha_vuelta: {
        type: Sequelize.DATE
    },
    imagen: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    disponibles: {
        type: Sequelize.STRING
    },
    slug: {
        type: Sequelize.STRING
    },
});