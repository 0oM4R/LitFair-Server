const isSeeker= (req, res, next) =>{
    const seeker= req.user
    if (seeker.rules==="Seeker"){
        
        next();

        //get seeker info
    }
    else{
        res.status(405).send({msg: "Login as a Seeker to access this page"})
    }
}
const isCompany =(req, res, next) =>{
    const company =req.user;
    if (company.rules==="Company"){
        
        next();

        //get seeker info
    }
    else{
        res.status(405).send({msg: "Login as a Company to access this page"})
    }

}
  

module.exports = {isSeeker,isCompany}