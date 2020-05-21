const {getDB}=require('./db.js')


async function addProject(_,{project}){
    const db=getDB();
    project.id=await getNextSequenceNo("project_id","project_value");
    
    try{
      const result=await db.collection("projects").insertOne(project)
        return result.result.n;
    }
    catch(err){console.log(e);} 

    
    }
// ==================================================================
    async function deleteBug(_,{id}){
     const db=getDB();
     try{
        const result=await db.collection("buggs").deleteOne({id})
        return result.result.n;
     }
     catch(err){console.log(err)}
    }
async function deleteProject(_,{id}){
    const db=getDB();
    try{
       const result=await db.collection("projects").deleteOne({id})
       return result.result.n;
    }
    catch(err){console.log(err)}
}

// ===================================================
    async function addBug(_,{bug}){
        const db=getDB();
        bug.id=await getNextSequenceNo("bug_id","bug_value");
        try{
            const res=await db.collection("buggs").insertOne(bug);
                return(res.result.n);
        
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

async function getNextSequenceNo(seq_name,value){
    const db=getDB();
  var sequenceId=await db.collection("counters").findOneAndUpdate(
        {_id:seq_name},
       {$inc:{[value]:1}},
       { new:true}
    );
   return seq_name==="project_id"?sequenceId.value.project_value:sequenceId.value.bug_value
}
 module.exports={projectsList,addProject,addBug,bugsList,updateProject,deleteProject,deleteBug}





























  

















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