const pool = require('../database')
const { pedidosCabeceraDb, pedidosDetalleDb } = require('../databaseHandler');

exports.addDetalles = async(idcabecera, detalles = []) => {
    try
    {
        let querys = []
        detalles.forEach((d) => {
            d.idcabecera = idcabecera;
            querys.push(pedidosDetalleDb.addRow(d));
        })
        const query = querys.join(";\n") + ';';
        const ret = await pool.query(query)
        return {ok: true}
    }
    catch(err)
    {
        return {ok: false, error: err};
    }
}

exports.addCabecera = async (cabecera) => {
    const id = await getNewIdCabecera();
    cabecera.id = id;
    const query = await pedidosCabeceraDb.addRow(cabecera)
    await pool.query(query);
    return id;
}

const getNewIdCabecera = async () => {
    const rows = await pool.query("SELECT max(id) as maxid FROM pedidoscabecera");
    let row = rows[0];
    return row.maxid == undefined ? 1 : row.maxid + 1;
}

exports.getCabeceras = async () =>  {
    const rows = await pool.query(pedidosCabeceraDb.getAll());
    for (let i = 0; i < rows.length; i++) {
        rows[i].detalles = await pool.query(pedidosDetalleDb.getByFilter({idcabecera: rows[i].id}));
    }
    return rows
}