const express = require("express");
const router = express.Router();
const Client = require("../models/tbl_whatsapp_client_config");
const Endpoint = require("../models/tbl_endpoint_table");
const MobileNumber = require("../models/tbl_mobile_numbers");
const Mapping = require("../models/tbl_client_endpoint_mapping");
const { v4: uuidv4 } = require('uuid');
const redis = require("redis");
const REDIS_PORT = 6379;
const redisClient = redis.createClient(REDIS_PORT);

// API FOR ADDING NEW CLIENT (CREATE)
router.post("/add/whatsappclient", async(req, res, next) => {
  try {
    var apiKey = uuidv4();
    var appId = uuidv4().replace(/-/g,'');
    const numbers = req.body.numbers;
    const endpoints = await Endpoint.findAll({});
    var endpointPaths = [];

    const client = await Client.create({
        app_id: appId,
        api_key: apiKey,
        issued_to: req.body.issuedTo,
        namespace: req.body.namespace,
        language: 'en_',
        template_name: req.body.templateName,
        org_id: req.body.orgId,
        is_active: true
    });

    numbers.forEach(async(currNumber) => {
      await MobileNumber.create({
        number: currNumber,
        whatsapp_client_config_id: client.id
      });
    });
    
    endpoints.forEach(async(endpoint) => {
      await Mapping.create({
        whatsapp_client_config_id: client.id,
        endpoint_table_id: endpoint.id  
      });
      endpointPaths.push(endpoint.path);
    })

    // INSERTING DATA INTO REDIS
    const redisData = {
      apiKey: client.api_key,
      namespace: client.namespace,
      issuedTo: client.issued_to,
      templateName: client.template_name,
      language: '_en',
      orgId: client.org_id,
      isActive: client.is_active,
      numbers: numbers,
      endpoints: endpointPaths
    }

    const asyncFun = async() => {
      await redisClient.set(client.app_id, JSON.stringify(redisData)); 
    }
    asyncFun();

    res.json(client);
  }
  catch(error) {
    res.json(next(error));
  }
});

// API FOR GETTING THE CLIENT (READ)
router.get("/get/whatsappclient/:appid", async(req, res, next) => {
  try {
    redisClient.GET(req.params.appid, async(err, obj) => {
      try {
        if(obj === null) {
          const client = await Client.findOne({where: {app_id: req.params.appid}});

          var endpoints = await Endpoint.findAll({});
          var endpointPaths = [];
          endpointPaths.push(endpoints[0].path);
          endpointPaths.push(endpoints[1].path);

          var mobileNumbers = await MobileNumber.findAll({where: {whatsapp_client_config_id: client.id}});
          var numbers = [];
          mobileNumbers.forEach((num) => {
            numbers.push(num.number);
          });
          
          const redisData = {
            apiKey: client.api_key,
            namespace: client.namespace,
            issuedTo: client.issued_to,
            templateName: client.template_name,
            language: '_en',
            orgId: client.org_id,
            isActive: client.is_active,
            numbers: numbers,
            endpoints: endpointPaths
          }
          const asyncFun = async() => {
            await redisClient.set(client.app_id, JSON.stringify(redisData)); 
          }
          asyncFun();
          res.json(redisData);
        }
        else {
          res.json(JSON.parse(obj));
        }
      }
      catch(err) {
        res.json(err);
      }
    });
  }
  catch(error) {
    res.json(next(error));
  }
});

// API FOR UPDATING THE CLIENT (UPDATE)
router.put("/update/whatsappclient/:appid", async(req, res, next) => {
  try {
    // UPDATING CLIENT DATA
    const client = await Client.findOne({where: {app_id: req.params.appid}});
    client.update({
      issued_to: req.body.issuedTo,
      namespace: req.body.namespace,
      template_name: req.body.templateName,
      org_id: req.body.orgId
    });

    // GETTING THE ENDPOINT PATHS
    var endpoints = await Endpoint.findAll({});
    var endpointPaths = [];
    endpointPaths.push(endpoints[0].path);
    endpointPaths.push(endpoints[1].path);

    // UPDATING THE MOBILE NUMBERS 
    var numbers = req.body.numbers;
    await MobileNumber.destroy({where: {whatsapp_client_config_id: client.id}});
    numbers.forEach(async(currNumber) => {
      await MobileNumber.create({
        number: currNumber,
        whatsapp_client_config_id: client.id
      });
    });

    // UPDATING THE REDIS DATA
    const redisData = {
      apiKey: client.api_key,
      namespace: client.namespace,
      issuedTo: client.issued_to,
      templateName: client.template_name,
      language: '_en',
      orgId: client.org_id,
      isActive: client.is_active,
      numbers: numbers,
      endpoints: endpointPaths
    }

    // SETTING THE NEW REDIS DATA
    const asyncFun = async() => {
      await redisClient.set(client.app_id, JSON.stringify(redisData)); 
    }
    asyncFun();

    // SHOWING NEW DATA
    res.json(redisData);
  }
  catch(error) {
    res.json(next(error));
  }
})


// API FOR REMOVING THE CLIENT (DELETE) (set is active to true)
router.put("/delete/whatsappclient/:appid", async(req, res, next) => {
  try {
    const client = await Client.findOne({where: {app_id: req.params.appid}});
    // SETTING ISACTIVE TO FALSE
    client.update({is_active: false});

    var endpoints = await Endpoint.findAll({});
    var endpointPaths = [];
    endpointPaths.push(endpoints[0].path);
    endpointPaths.push(endpoints[1].path);
    
    var mobileNumbers = await MobileNumber.findAll({where: {whatsapp_client_config_id: client.id}});
    var numbers = [];
    mobileNumbers.forEach((num) => {
      numbers.push(num.number);
    });

    const redisData = {
      apiKey: client.api_key,
      namespace: client.namespace,
      issuedTo: client.issued_to,
      templateName: client.template_name,
      language: '_en',
      orgId: client.org_id,
      isActive: client.is_active,
      numbers: numbers,
      endpoints: endpointPaths
    }
    const asyncFun = async() => {
      await redisClient.set(client.app_id, JSON.stringify(redisData)); 
    }
    asyncFun();
    res.json(client);
  }
  catch(error) {
    res.json(next(error));
  }
})

module.exports = router;