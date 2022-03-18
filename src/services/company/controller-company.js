const company = require('./model-company').company;
const sequelize = require('sequelize');

class companyController {
  constructor(dbURI) {
    const Sequelize = new sequelize('sequelizedb', 'root', '', {
      host: dbURI,
      dialect: 'mysql',
    });
  }

  async addCompany(req, res) {
    let data = req.body;
    let response = {
      status: 505,
      msg: 'Faild',
      data: null,
    };

    try {
      response.data = await company.create(data);
      response.status = 200;
      response.msg = 'OK';
      res.json(response);
    } catch (e) {
      res.status(505).json(response);
    }
  }

  async getCompany(req, res) {
    let response = {
      status: 505,
      msg: 'Faild',
      data: null,
    };

    try {
      response.data = await company.findAll({});
      response.status = 200;
      response.msg = 'OK';
      res.json(response);
    } catch (e) {
      res.status(505).json(response);
    }
  }

  async getCompany(req, res) {
    const id = req.params.id;

    try {
      response.data = await company.findOne({ where: { id: id } });
      response.status = 200;
      response.msg = 'OK';
      res.json(response);
    } catch (e) {
      res.status(505).json(response);
    }
  }
}
module.exports = {
  companyController,
};
