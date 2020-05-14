const MongoClient=require('mongodb').MongoClient;
require('dotenv').config();
var db;

async function connectToDb(){
    try{
       const client= await MongoClient.connect("mongodb+srv://Tedros:tedi@bugtracker-69156.mongodb.net/bugtracker?retryWrites=true&w=majority",{useNewUrlParser:true})
            db=client.db('bugtracker');
            // getDB();
         }
    catch(e){
        console.log("Error:"+e)
    }

}
function getDB(){
//     let filter={};
//   const res=await db.collection('buggs').find(filter);
//   console.log(res);
return db;
}

module.exports={getDB,connectToDb}