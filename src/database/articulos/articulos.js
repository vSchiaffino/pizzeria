const pool = require('../database')
const { articulosDb } = require('../databaseHandler');

exports.getArticulos = async function(){
    return await pool.query(articulosDb.getAll());
}

exports.GetArticuloById = async (id) => {
    try {
        let arts = await pool.query(articulosDb.getByFilter({id: id}));
        if(arts.length >= 1)
        {
            return arts[0];
        }
        else
        {
            return {error: "No se encontró ese id."}
        }
    } catch (err) {
        return {error: err}
    }
}

exports.newArticulo = async (a) => {
    let cmd = articulosDb.addRow(a)
    try
    {
        let res = await pool.query(cmd);
        // console.log(res);
        return {ok:true};
    }
    catch(err)
    {
        return {ok: false, error: err};
    }
}

exports.delArticulo = async (id) => {
    try
    {
        let res = await pool.query(articulosDb.deleteRow(id));
        return {ok: true};
    }
    catch(err)
    {
        return {ok: false, error: err};
    }
}

exports.modArticulo = async(id, a) => {
    if (!a.idcategoria && !a.nombre && !a.descripcion && !a.precio && !a.referencia){
        return {ok: false, error: 'No changes given'}
    }
    let cmd = articulosDb.updateRow(id, a)
    try
    {
        let res = await pool.query(cmd);
        console.log(res);
        return {ok:true};
    }
    catch(err)
    {
        return {ok: false, error: err};
    }
}