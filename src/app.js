

var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"); 

  const Blockchain = require('./models/blockchain.js');
  const Block = require('./models/block.js');

var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();
let blockchain = [];
let blockchaincount = 0;

router.post("/blockchain", function (req, res) {
  
  console.log("creating chain: " + req.body.blockchain + " pattern: " + req.body.pattern);
  
  blockchainTmp = new Blockchain(blockchaincount,req.body.blockchain,req.body.pattern);
  
  blockchain[blockchaincount] = blockchainTmp;
 
  blockchaincount++;

  //console.log(JSON.stringify(blockchain, null, 2));

  res.send(JSON.stringify(blockchainTmp, null, 2));
});



router.post("/block", function (req, res) {
  
  console.log("creating block for chain: " + req.body.blockchainhash);

  console.log("Looking for chain: " + req.body.blockchainhash);
  var chaintmp;
  for (var x = 0; x <= blockchaincount; x++) {
    if(blockchain[x].hash === req.body.blockchainhash){
      chaintmp = blockchain[x];
      break;
    }
  }
  if(chaintmp === null) res.status(404).send("Blockchain not found");
  
  


  parenthash = chaintmp.datablock[chaintmp.count-1].hash;
  newblock = new Block(parenthash,chaintmp.pattern, req.body.data);
  chaintmp.add(newblock);

 // blocktmp = new Blockchain
  //blockchainTmp = new Blockchain(count,req.body.blockchain,req.body.pattern);
  
  //blockchain[count] = blockchainTmp;
 
  //count++;

  //console.log(JSON.stringify(blockchain, null, 2));
  console.log("Chain: " + JSON.stringify(chaintmp, null, 2));
  res.send(JSON.stringify(chaintmp, null, 2));
});

router.get("/", function (req, res) {    
  
  res.send(SHA256("Hello to CashChain").toString());
});

app.use(router);

app.listen(3000, function () {
  console.log("CashChain server running on http://localhost:3000");
});

