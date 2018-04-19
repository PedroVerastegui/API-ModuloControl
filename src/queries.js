let cn = require('../src/dbconnection');
let ind = require('../src/algoritms');
let db = cn.connection;

function SelectQuery(req, res, next, whereIN){
    let where = "WHERE "+whereIN;
    if (whereIN === "") where = "";
    db.any("SELECT *, alumno.codigo as Codigo, alumno.ape_nom as Nombre, alumno.dni as DNI, concepto.concepto as Concepto " +
        "from recaudaciones " +
        "INNER JOIN alumno ON recaudaciones.id_alum = alumno.id_alum " +
        "JOIN concepto ON recaudaciones.id_concepto = concepto.id_concepto " +
        "JOIN tipo_concepto ON concepto.concepto = tipo_concepto.concepto " +
        where)
        .then(function(data){
            res.status(200)
                .json({
                    status : 'success',
                    data:data,
                    message : 'Retrieved List'
                });
        })
        .catch(function(err){
            return next(err);
        })
}
function UpdateQuery(req, res, next, indiceSet, when1, when2, indices) {
    db.any(`UPDATE recaudaciones SET ${ind.i_flag} = CASE ${ind.i_recaudacion} 
        ${when1}, ${ind.i_obs} = CASE ${ind.i_recaudacion} ${when2}
         WHERE ${ind.i_recaudacion} IN (${indices})`)
        .then(function(data){
            res.status(200)
                .json({
                    status : 'success',
                    data:data,
                    message : 'Retrieved List'
                });
        })
        .catch(function (err) {
            return next(err);
        })
}

module.exports = {
    SelectQuery:SelectQuery,
    UpdateQuery:UpdateQuery,
};