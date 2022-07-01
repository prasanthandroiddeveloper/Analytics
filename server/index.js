const express = require("express");
const mysql=require("mysql")
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'analytics',
    multipleStatements:true
})

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Mysql Connected")
})
app.get("/getData", (req, res) => {
    // let sql='SELECT * from chartdata';
    // let query=db.query(sql,(err,result)=>{
    //     if(err) throw err
    // //   console.log(result)
   
    //    res.json({data:result});
    // })


    db.query('SELECT * from chartdata; SELECT * from chartprops', [1,2], function(err, results) {
        if (err) throw err;
      
        // `results` is an array with one element for every statement in the query:
        console.log(results[0]); // [{1: 1}]
        console.log(results[1]); // [{2: 2}]

        let a={data:results[0]}

        let b={chart:results[1][0],
            ...a
        }
        

        res.send(b)
      });



 
});


  




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});