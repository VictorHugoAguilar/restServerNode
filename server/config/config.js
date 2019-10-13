/**
 * Puerto
 */

process.env.PORT = process.env.PORT || 3000;

/** 
 * Entorno
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * BASE DATOS
 */
/**
 * Local
 * mongodb: //localhost:27017/cafe
 * Remota
 * mongodb + srv: //victoruugo:Victor1985@cluster0-6bmas.mongodb.net/cafe
 */

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://victoruugo:Victor1985@cluster0-6bmas.mongodb.net/cafe';
}

process.env.URLDB = urlDB;