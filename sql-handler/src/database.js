const { dbTypes } = require("./types");

class Database{
    constructor(name = "", fields = {}, joins = [])
    {
        this.joins = joins
        this.name = name;
        this.fields = fields
    }

    getAll()
    {
        return `SELECT * FROM ${this.name};`
    }

    getByFilter(filter = {}, filterOperator = {})
    {
        /* 
            filter = {
                field: expectedValue
            }

            filterOperator = {
                field: operator
            }
        */
       let filt = [];
        Object.entries(filter).forEach((e) => {
            let field = e[0];
            let type = this.fields[field];
            let val = e[1];
            let dbVal = type === dbTypes.STRING ? `'${val}'` : `${val}`;
            let op = filterOperator[field] == undefined ? ' = ' : filterOperator[field];
            filt.push(`${field}${op}${dbVal}`);
        });

        let wherePart = filt.join(' AND ');
        return `SELECT * FROM ${this.name} WHERE ${wherePart}`;
    }

    addRow(row)
    {
        /* 
        row = {
            name: 'valor',
            name: 1
        }
        */
       // fields and values
       let fields = [];
       let values = [];
       Object.entries(row).forEach((e) => {
            let field = e[0];
            let type = this.fields[field];
            let val = e[1];
            fields.push(field);
            values.push(type === dbTypes.STRING ? `'${val}'` : `${val}`);
       });


       let cmd = `INSERT INTO ${this.name}(${fields.join(", ")}) VALUES (${values.join(', ')})`
       return cmd;
    }

    updateRow(id, row)
    {
        let set = [];
        Object.entries(row).forEach((e) => {
            let field = e[0];
            let type = this.fields[field];
            let val = e[1];
            let dbVal = type === dbTypes.STRING ? `'${val}'` : `${val}`;
            set.push(`${field} = ${dbVal}`);
        });

        let setPart = set.join(', ');


        let cmd = `UPDATE ${this.name} SET ${setPart} WHERE id = ${id};`;
        return cmd;
    }

    deleteRow(id)
    {
        return `DELETE FROM ${this.name} WHERE id = ${id}`;
    }

    addField(name, type)
    {
        this.fields[name] = type;
    }

    removeField(name)
    {
        this.fields[name] = undefined;
    }

    addJoin(join = {})
    {
        /*
            join = {
                tableName: name,
                selfField: name,
                externField: name
            }
        */
       this.joins.push(join)
    }
}

module.exports = Database;