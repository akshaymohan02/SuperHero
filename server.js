const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors'); // npm install cors

const app = express();

app.options('*', cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const db = new Database('super.db');

const multer = require('multer');
const upload = multer();


// CREATE => POST
app.post('/super',upload.none(),(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    const sql = "INSERT INTO place(name,place) VALUES (?,?)";
    const statement = db.prepare(sql);
    statement.run([req.body.name,req.body.place]);
    const sql2 = "INSERT INTO power(name,powers) VALUES (?,?)";
    const statement2 = db.prepare(sql2);
    statement2.run([req.body.name,req.body.powers]);
    const sql3 = "INSERT INTO weakness(name,weakness) VALUES (?,?)";
    const statement3 = db.prepare(sql3);
    statement3.run([req.body.name,req.body.weakness]);
    res.end();
});


// READ => GET
app.get('/super',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    const sql = "SELECT power.name,power.powers,weakness.weakness,place.place FROM power,weakness,place WHERE power.name=weakness.name AND weakness.name=place.name";
    const statement = db.prepare(sql);

    const arrOutput = [];
    for(const cust of statement.iterate())
    {
        arrOutput.push(cust);
    }
    res.end(JSON.stringify(arrOutput));
});

// DELETE => DELETE
app.delete('/super/:id',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    const sql = "DELETE FROM place WHERE name=?";
    const statement = db.prepare(sql);
    statement.run([req.params.id]);
    const sql2 = "DELETE FROM power WHERE name=?";
    const statement2 = db.prepare(sql2);
    statement2.run([req.params.id]);
    const sql3 = "DELETE FROM weakness WHERE name=?";
    const statement3 = db.prepare(sql3);
    statement3.run([req.params.id]);
    
    res.end();
});
// Update=>PUT
app.put('/super/:id',upload.any(),(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    const sql = "UPDATE place SET name = ? , place = ? WHERE name = ?";
    const statement = db.prepare(sql);
    statement.run([req.body.name,req.body.place,req.params.id]);
    const sql2 = "UPDATE power SET name = ? , powers = ? WHERE name = ?";
    const statement2 = db.prepare(sql2);
    statement2.run([req.body.name,req.body.powers,req.params.id]);
    const sql3 = "UPDATE weakness SET name = ? , weakness = ? WHERE name = ?";
    const statement3 = db.prepare(sql3);
    statement3.run([req.body.name,req.body.weakness,req.params.id]);
    res.end();  
   
});


app.listen(8888);