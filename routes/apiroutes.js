const express = require("express");
const router = express.Router();
const Client = require("../models/clients");
const Endpoint = require("../models/endpoints");
const MobileNumber = require("../models/mobilenumbers");
const Mapping = require("../models/mapping");
const { v4: uuidv4 } = require('uuid');
const redis = require("redis");
const REDIS_PORT = 6379;
const redisClient = redis.createClient(REDIS_PORT);

// API FOR GETTING ALL ENDPOINTS
router.get("/endpoints", async (req, res, next) => {
  try {
    const response = await Endpoint.findAll({});
    res.json(response);
  }
  catch(error) {
    res.json(next(error));
  }
});

// API FOR GETTING ALL CLIENTS
router.get("/clients", async (req, res, next) => {
  try {
    const response = await Client.findAll({});
    res.json(response);
  }
  catch(error) {
    res.json(next(error));
  }
});

// API FOR GETTING ALL MOBILENUMBERS
router.get("/mobilenumbers/:id", async (req, res, next) => {
  try {
    const response = await MobileNumber.findAll({where: {clientid: req.params.id}});
    res.json(response);
  }
  catch(error) {
    res.json(next(error));
  } 
});


router.get("/client/:appid", async(req, res, next) => {
  try {
    const client = await Client.findOne({where: {appid: req.params.appid}});
    redisClient.GET(client.issuedTo, async(err, obj) => {
      try {
        if(obj === null) {
          var endpoints = await Endpoint.findAll({});
          var endpointPaths = [];
          endpointPaths.push(endpoints[0].path);
          endpointPaths.push(endpoints[1].path);
          var MobileNumbers = await MobileNumber.findAll({where: {clientid: client.clientid}});
          var numbers = [];
          MobileNumbers.forEach((num) => {
            numbers.push(num.number);
          });
          const redisData = {
            appid: client.appid,
            apikey: client.apikey,
            namespace: client.namespace,
            templateName: client.templateName,
            language: '_en',
            numbers: numbers,
            endpoints: endpointPaths
          }
          redisClient.SET(client.issuedTo, JSON.stringify(redisData));
          res.json(redisData);
        }
        else {
          res.json(JSON.parse(obj));
        }
      }
      catch(error) {
        res.json(error);
      }
    });
  }
  catch(error) {
    res.json(next(error));
  }
})

// API FOR ADDING NEW CLIENT TO DB AND REDIS
router.post("/clients", async(req, res, next) => {
    try {
      var ApiKey = uuidv4();
      var AppId = uuidv4().replace(/-/g,'');
      const numbers = req.body.numbers;
      var endpointPaths = [];

      const endpoints = await Endpoint.findAll({});
      endpointPaths.push(endpoints[0].path);
      endpointPaths.push(endpoints[1].path);

      const newClient = await Client.create({
          appid: AppId,
          apikey: ApiKey,
          issuedTo: req.body.issuedTo,
          namespace: req.body.namespace,
          templateName: req.body.templateName
      });
      numbers.forEach( async(currNumber) => {
        const newNumber = await MobileNumber.create({
          number: currNumber,
          clientid: newClient.clientid
        });
      });

      const mapping1 = await Mapping.create({
        clientid: newClient.clientid,
        endpointid: endpoints[0].endpointid
      });

      const mapping2 = await Mapping.create({
        clientid: newClient.clientid,
        endpointid: endpoints[1].endpointid
      });

      // INSERTING DATA INTO REDIS

      const redisData = {
        appid: newClient.appid,
        apikey: newClient.apikey,
        namespace: newClient.namespace,
        templateName: newClient.templateName,
        language: '_en',
        numbers: numbers,
        endpoints: endpointPaths
      }

      redisClient.set(newClient.issuedTo, JSON.stringify(redisData));
      redisClient.get(newClient.issuedTo, (err, obj) => {
        if(err) {
          console.log(err);
        }
        else {
          console.log(JSON.parse(obj));
        }
      });

      // SHOWING THE RESULT
      res.json(newClient);
    }
    catch(error) {
      res.json(next(error));
    }
});

module.exports = router;