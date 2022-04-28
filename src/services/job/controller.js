const {jobModel, appModel} = require('./model');


 class jobController {
  
  // constructor(dbURI) {
  //   this.dbURI = dbURI;
  //   mongoose
  //     .connect(dbURI)
  //     .then(() => console.log('Job database connected successfully'))
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }
  
  async getJobs() {    
    try {
      const doc = await jobModel.find({}).exec();
      return doc;
    } catch (err) {
      throw new Error(`Can't get jobs::ERROR:${err}`);
    }
  }
  
  async getJob(id) {  
    try {
      const doc = await jobModel.findById(id).exec();
      return doc;
    } catch (err) {
        throw new Error(`Can't get job::ERROR:${err}`);
    }
  }

  async addJob(schema) {
    try {
      const saved = new jobModel(schema);
      
      const doc =  await saved.save();
      return doc;
    } catch (err) {
        throw new Error(`Can't Add new job::ERROR:${err}`);
    }
  }
  

  async editJob(id, schema) {
    try {
      const doc = await jobModel.findByIdAndUpdate(id, schema, {  new: true });
      return doc;
    } catch (err) {
        throw new Error(`Can't edit job::ERROR:${err}`);
    }
  }

  async deleteJob(id){
    try{
        const doc = await jobModel.findByIdAndDelete(id);
        return doc;
    }catch(err){
        throw new Error(`Can't delete job::ERROR:${err}`);
    }
  }

}


class applicationController{

  async getApps() {
    try {
      const doc = await appModel.find({}).exec();
      return doc;
    } catch (err) {
      throw new Error(`Can't get application::ERROR:${err}`);
    }
  }
  
  async getApp(id) {  
    try {
      const doc = await appModel.findById(id).exec();
      return doc;
    } catch (err) {
        throw new Error(`Can't get application::ERROR:${err}`);
    }
  }

  async addApp(schema) {
    try {
      const saved = new appModel(schema);
      
      const doc =  await saved.save();
      return doc;
    } catch (err) {
        throw new Error(`Can't Add new application::ERROR:${err}`);
    }
  }
  

  async editApp(id, schema) {
    try {
      const doc = await appModel.findByIdAndUpdate(id, schema, {  new: true });
      
      if (schema.questions) {
        for (const [objK, objV] of Object.entries(doc.questions)) {
          schema.questions.forEach((mapV, mapK) => {
            if (objK == mapK) doc.questions.set(mapK, mapV);
          });
        }
      }
      return doc;
    } catch (err) {
        throw new Error(`Can't edit application::ERROR:${err}`);
    }
  }

  async deleteApp(id){
    try{
        const doc = await jobModel.findByIdAndDelete(id);
        return doc;
    }catch(err){
        throw new Error(`Can't delete application::ERROR:${err}`);
    }
  }
}

module.exports = {
  jobController,
  applicationController,
};
