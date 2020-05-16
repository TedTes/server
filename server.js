const express=require('express');
const app=express();
const {connectToDb}=require('./db.js');
const  bug=require( './bug.js');
const {ApolloServer}=require('apollo-server-express')
const fs=require('fs');
const  GraphQLDate=require('./GraphQLDate');
const port =4000;


(async function() {
    try{
   await connectToDb();
   app.listen(port, function () {
       console.log('App started on port 4000');
       });
   }
   catch(e){ console.log('ERROR:',e);}
})()
app.get('/',function(req,res){
    res.send("server")
});

const resolvers = {
    Query:{
    queryProjects:bug.projectsList,
    bugsList:bug.bugsList
     },
    Mutation:{
   addProject:bug.addProject,
   addBug:bug.addBug,
   updateProject:bug.updateProject,
   deleteProject:bug.deleteProject
    },
    GraphQLDate,
    };
   
    const server = new ApolloServer({
        typeDefs:fs.readFileSync('./schema.graphql','utf-8'),
        resolvers,
        playground:true,
        formatError: error => {
            console.log(error);
            return error;
            },
        });
       
        server.applyMiddleware({ app, path: '/graphql'});
       