

var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"); 

  const Blockchain = require('./models/blockchain.js');

var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();
let blockchain = [];
let count = 0;

router.post("/blockchain", function (req, res) {
  
  console.log("creating: " + req.body.blockchain + " pattern: " + req.body.pattern);
  
  blockchainTmp = new Blockchain(count,req.body.blockchain,req.body.pattern);
  
  blockchain[count] = blockchainTmp;
 
  count++;

  //console.log(JSON.stringify(blockchain, null, 2));

  res.send(JSON.stringify(blockchainTmp, null, 2));
});

router.get("/", function (req, res) {    
  
  res.send(SHA256("Hello to CashChain").toString());
});

app.use(router);

app.listen(3000, function () {
  console.log("Node server running on http://localhost:3000");
});

