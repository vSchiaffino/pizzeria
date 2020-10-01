const Database = require('./database');
const { dbTypes, filterOperators } = require('./types');



var db = new Database("users", {id: dbTypes.NUMBER, nombre: dbTypes.STRING, contraseña: dbTypes.STRING});


const q = db.addRow({
    id: 1,
    nombre: 'Valen',
    contraseña: 'Secreto'
})
// const q = db.getAll({nombre: 'Valentin', id: 1});
// const q = db.getByFilter({nombre: 'Valentin', id: 1});


console.log(q);