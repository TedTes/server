const {getDB}=require('./db.js')


async function addProject(_,{project}){
    const db=getDB();
    // project.created=new Date();
    // project.id=getNextSequenceNo(project);
    const result=db.collection("projects").insertOne(project,(err,result)=>{
        if(err)
        MongoClient.close();
      else return(result.result.n);
    });
    
    }
    async function addBug(_,{bug}){
        const db=getDB();
        bug.id=getNextSequenceNo(bug);
        try{
            const res=await db.collection("buggs").insertOne(bug,(err,res)=>{
            })
        }
        catch(err){
            console.log(`Error from DB:${err}`);
        }
      
    }
async function projectsList(_,{}){
    const db= getDB();
    // const filter={};
  const result=await db.collection('projects').find({})
 const projects=await result.toArray();
    return {projects};
}
async function updateProject(_,{project}){

    const db= getDB();
    try{
        const result=await db.collection('projects').updateOne({"id":project.id},{$set:{"name":project.name,"leadName":project.leadName}})
        return result.result.n;
   }
    catch(e){
console.log(e);
    }
  
}

async function bugsList(_,{proName}){
    const db=getDB();
    const result=await db.collection('buggs').find({"projectName":`${proName}`})
    const bugs=await result.toArray();
    return {bugs}
}

async function getNextSequenceNo(colln){
    const sequenceId=0;
    if(colln===bug){
        sequenceId=db.collection("counter").findOneAndUpdate({
            update:{$inc:{$buggs_id:1}},
            new:true
        })
    }
else{
    sequenceId=db.collection("counter").findOneAndUpdate({
        update:{$inc:{$projects_id:1}},
        new:true
    })
}
return sequenceId.id;
}
 

module.exports={projectsList,addProject,addBug,bugsList,updateProject}





























  

















// if(status) filter.status=status;
    // if(effortMin!==undefined||effortMax!==undefined)
    // {
    //   filter.effort={};
    //   filter.effort.$gte=effortMin||0;
    //   filter.effort.$lte=effortMax||effortMin;
    // }
    // //const bugs=await db.collection('buggs').find(filter).toArray();
    // if(search)filter.$text={$search:search};

    // const cursor=await db.collection('buggs').findOne({id:1})
    // const projects=await db.collection('projects').find({})
    // console.log(cursor)
    // .sort({id:1})
    // .skip(PAGE_SIZE*(page-1))
    // .limit(PAGE_SIZE);
  
    //   const listCount=await cursor.count(false); 
    //   const  bugs=cursor.toArray();
    //   const pages=Math.ceil(listCount/PAGE_SIZE);















// async function counter(){
//     let id;
//     console.log("databse")
//     const db=getDB();
//    const result=await db.collection("counters").findOne({});
//    console.log("from db")
//   const counter=await result.id;
//   return counter;
//     // console.log(counter[0].id) ;
// //     id =parseInt(result.id);
// //    console.log(id)
 
  
// }