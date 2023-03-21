const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const  sql = `select id, name from people` 
connection.query(sql,
    function(err, [rows]){
        console.log(rows.name)
        app.get('/',(req, res) => {
            res.send('<h1>'+rows.name+'</h1>')    
          })
    }
 
);
connection.end()

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})