const isSeeker= (req, res, next) =>{
    res.locals.user = req.user;
    if (req.user.role==="Seeker"){
        next();
    }
    else{
        res.status(405).send({msg: "Login as a Seeker to access this page"})
    }
}
const isCompany =(req, res, next) =>{
    res.locals.user = req.user;
    if (req.user.role==="Company"){
        
        next();
    }
    else{
        res.status(405).send({msg: "Login as a Company to access this page"})
    }

}
  

module.exports = {isSeeker,isCompany}