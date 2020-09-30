const pool = require('../database')

exports.getArticulos = async function(){
    return await pool.query('SELECT * FROM Articulos');
}

exports.GetArticuloById = async (id) => {
    try {
        let arts = await pool.query(`SELECT * FROM Articulos WHERE id = ${id}`);
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
    let cmd = `INSERT INTO Articulos(idcategoria, nombre, descripcion, precio, referencia)
               VALUES(${a.idcategoria}, '${a.nombre}', '${a.descripcion}', ${a.precio}, '${a.referencia}')`
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
        let res = await pool.query(`DELETE FROM articulos WHERE id = ${id}`);
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
    let cmd = `UPDATE Articulos SET `
    if (a.idcategoria) cmd += `idcategoria = ${a.idcategoria},`;
    if (a.nombre) cmd += ` nombre = '${a.nombre}',`;
    if (a.descripcion) cmd += `descripcion = '${a.descripcion}',`;
    if (a.precio) cmd += `precio = ${a.precio},`;
    if (a.referencia) cmd += `referencia = '${a.referencia}'`;
    if(cmd[cmd.length - 1] == ',') cmd = cmd.substr(0, cmd.length - 2);
    cmd += ` WHERE id = ${id}`;
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