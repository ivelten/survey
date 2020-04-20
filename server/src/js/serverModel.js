
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'mydb'
});

const rj = (rows) => (Object.values(JSON.parse(JSON.stringify(rows))));

const getSQL = (query) => new Promise((resolve, reject) => {
  console.log('executando query: ' + query);
  setTimeout( () => connection.query(query, function (err, rows) {
    if (err) {
      console.error(error)
      reject(err)
    }
    resolve(rj(rows))
  }),100)
})
const dts = (dt) => JSON.stringify({ data: dt });

app.get('/api/forms', (req, res) => getSQL("SELECT  distinct formulario FROM mydb.perguntas;")
  .then(r => res.send(dts(r)))
  .catch(() => res.send("{}")));

  
app.get('/api/form/:form*?', (req, res) => {
  const form = req.params.form
  if (form) {
    let query = `select descricao as pergunta,id_pergunta as id from  perguntas where perguntas.formulario = "${form}";`;
    getSQL(query).then((perguntas) => {
      let result = []
      new Promise((resolve, reject) => {
        perguntas.map(({ pergunta, id }) => {
          query = `SELECT id_alternativa,descricao, alternativa  from alternativas  where alternativas.id_pergunta = ${id};`
          getSQL(query)
            .then(alternativas => result.push({ pergunta, alternativas }))
            .catch(error => result.push({ [pergunta]: { error } }))
            .finally(() => (result.length == perguntas.length) ? resolve(result) : null)
        }, {})
      }).then(r => res.send(dts(r)))
        .catch(e => {
          console.err(e)
          res.send("{}")
        })
    }).catch((() => res.send("{}")))
  } else {
    res.send("{}")
  }
});


app.get('/api/response', (req, res) => {
  let respostas = req.query.respostas
  let result = [];
  if (respostas) {
    try {
      respostas = JSON.parse(respostas)
      let query = `
      INSERT INTO respostas (id_alternativa)

      VALUES ${respostas.reduce((state, value, i) => {
        state += `(${value})`
        if (i + 1 < respostas.length)
          state += ","
        return state
      }, '')};`;
      getSQL(query)
        .then(() => {
          new Promise((resolve, reject) => {
            respostas.forEach(r => {
              query = `SELECT descricao FROM recomendacoes where id_alternativa = ${r};`;
              getSQL(query)
                .then(resposta => result.push({ id: r,recomendacao:resposta }))
                .catch(error => result.push({ id:r, recomendacao:null }))
                .finally(() => (result.length == respostas.length) ? resolve(result) : null)
            })
          }).then(r => res.send(dts(r)))
            .catch(e => {
              console.err(e)
              res.send("{}")
            })
        })
        .catch(e => res.send('{}'))

    } catch (error) {
      console.error(error)
      res.send('{}')
    }
  } else {
    console.error('respostas invalidas')
    res.send('{}')
  } 


})
app.get('/api/report/:form*?', (req, res) => {
  const form = req.params.form
  if(form){
    let query = ` select 
perguntas.descricao as pergunta,
alternativas.descricao as alternativa,
count(respostas.id_alternativa) as quantidade
		from alternativas 
        inner join (perguntas,respostas) on 
        perguntas.id_pergunta = alternativas.id_pergunta 	and   respostas.id_alternativa = alternativas.id_alternativa 
       where perguntas.formulario = '${form}' group by respostas.id_alternativa;`
              
       getSQL(query)
       .then(r => res.send(dts(r)))
       .catch(() => res.send("{}"));

  }else{
    res.send('{}')
  }
})
app.post('/create', (req, res) => {
  console.log(res)
  // res.send(resposeJson);
});

app.listen(port, () => console.log(`Listening on port ${port}`));