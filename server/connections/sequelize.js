const {postgreSequelize} = require("./postgres");
// const {sqliteSequelize} = require("./sqlite");


module.exports = {
    postgres: postgreSequelize
    // sqlite: sqliteSequelize
}