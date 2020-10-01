const pool = require('../database')
const { categoriasDb } = require('../databaseHandler');

exports.newCategoria = async(nombre) => {
    try
    {
        await pool.query(categoriasDb.addRow({nombre}));
        return {ok: true}
    }
    catch(err)
    {
        return {ok: false, error: err};
    }
}

exports.getCategorias = async() => {
    return await pool.query(categoriasDb.getAll());
}