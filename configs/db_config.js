const mysql = require("mysql");
const squel = require('squel');
//настройка подключения
const con = mysql.createConnection({
  user     : 'kuku',
  password : 'password',
  host     : 'localhost',
  database : 'test_db',
  port     : 4000
});
//connect();
con.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  squel.select()
        .from("students")
        .toString()
  let createThemesTable = `create table if not exists themes(
                          themeId int auto_increment not null,
                          themeName varchar(255) not null,
                          primary key(themeId)
                          )`;
  let createVotesTable = `create table if not exists votes(
                          voteId int auto_increment not null,
                          themeId int not null,
                          yes boolean,
                          no boolean,
                          primary key(voteId),
                          foreign key (themeId) REFERENCES themes(themeId)
                          )`;
  //creation queries
  con.query(createThemesTable, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
  con.query(createVotesTable, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

});
module.exports = con;
