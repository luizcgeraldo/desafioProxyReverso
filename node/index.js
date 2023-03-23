const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};


app.get('/', (req, res) => {
  getPeople(res);
});

function verifPeople(conn){
  
  const  sql = `select id, name from people` ;

  conn.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      return;
    }

  // Se não houver registros, insere um novo registro "Fullcycle"
    if (results.length === 0) {
      conn.query('INSERT INTO people (name) VALUES ("FullCycle Rocks!")', (error, results) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log('Novo registro inserido com sucesso.');
      });
    } else {
      console.log('Já existem registros na tabela.');
    }
  });
}

async function getPeople(res){
  const conn = mysql.createConnection(config);
  const  sql = `select id, name from people` ;
  
  verifPeople(conn);
  
  setTimeout(() => {
    console.log('esperando...');
      //recupera registro e apresenta na tela 
    conn.query(sql,
      function(err, [rows]){
          console.log(rows.name)
          res.send('<h1>'+rows.name+'</h1>') 
    });
  }, 2000);
  
}

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})