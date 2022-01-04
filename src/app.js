

var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");

const Blockchain = require('./models/blockchain.js');
const Block = require('./models/block.js');

//var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

const {
  randomBytes
} = require('crypto');

const secp256k1 = require('secp256k1')



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();
let blockchain = [];
let blockchaincount = 0;

// Create a new blockchain
router.post("/blockchain", function (req, res) {

  console.log("creating chain: " + req.body.blockchain + " pattern: " + req.body.pattern);

  blockchainTmp = new Blockchain(blockchaincount, req.body.blockchain, req.body.pattern);

  blockchain[blockchaincount] = blockchainTmp;

  blockchaincount++;

  res.send(JSON.stringify(blockchainTmp, null, 2));
});



//Create a new block
router.post("/block", function (req, res) {

  console.log("creating block for chain: " + req.body.blockchainhash);

  console.log("Looking for chain: " + req.body.blockchainhash);
  var chaintmp;
  for (var x = 0; x <= blockchaincount; x++) {
    if (blockchain[x].hash === req.body.blockchainhash) {
      chaintmp = blockchain[x];
      break;
    }
  }
  if (chaintmp === null) res.status(404).send("Blockchain not found");

  parenthash = chaintmp.datablock[chaintmp.count - 1].hash;
  newblock = new Block(parenthash, chaintmp.pattern, req.body.data);
  chaintmp.add(newblock);

  console.log("Chain: " + JSON.stringify(chaintmp, null, 2));
  res.send(JSON.stringify(chaintmp, null, 2));
});


//Generate hash from message
router.post("/hash", function (req, res) {

  hash = SHA256(req.body.message).toString();
  console.log("Hash: " + hash);
  res.send("Hash: " + hash);
});



//Generate Public key
router.post("/publickey", function (req, res) {

  console.log("===== Generating public key =====");

  prvKeyIn = req.body.privateKey;

  // Encode the String
  console.log("PrivateKey readed: " + prvKeyIn.toString('base64'));

  prvKeyInEnc = Buffer.from(prvKeyIn, 'base64');

  // get the public key in a compressed format
  pubKey = secp256k1.publicKeyCreate(prvKeyInEnc);
  pubKeyHex = Buffer.from(pubKey).toString('hex');
  pubKeyB64 = Buffer.from(pubKey).toString('Base64');


  console.log("Public key: " + pubKeyHex);
  let pubKeyHash = SHA256(pubKey); // sha256 hash of the public key
  console.log("Public key Hash: " + pubKeyHash);

  let address = "0x" + pubKeyHex; // rightmost 160 bits/20 bytes of the hash
  console.log("Public key address: " + address);

  response = "PrivateKey Base64: " + prvKeyIn + "\n";
  response += "PublicKey Hex: " + pubKeyHex + "\n";
  response += "PublicKey Base64: " + pubKeyB64 + "\n";
  response += "Address: " + address;

  res.send(response);

});

//Generate Public/private key
router.get("/newkeys", function (req, res) {

  console.log("===== Generating new keys =====");

  let privKey;
  do {
    privKey = randomBytes(32)
  } while (!secp256k1.privateKeyVerify(privKey))


  pubKey = secp256k1.publicKeyCreate(privKey);
  pubKeyHex = Buffer.from(pubKey).toString('hex');
  pubKeyB64 = Buffer.from(pubKey).toString('Base64');

  console.log("Public key: " + pubKeyHex);

  let pubKeyHash = SHA256(pubKey);
  console.log("Public key Hash: " + pubKeyHash);

  let address = "0x" + pubKeyHex;
  console.log("Public key address: " + address);

  response = "PrivateKey Hex: " + privKey.toString('hex') + "\n";
  response = "PrivateKey Base64: " + privKey.toString('Base64') + "\n";
  response += "PublicKey Hex: " + pubKeyHex + "\n";
  response += "PublicKey Base64: " + pubKeyB64 + "\n";
  response += "Address: " + address;

  res.send(response);

});


router.get("/", function (req, res) {

  res.send(SHA256("Hello to CashChain").toString());
});


app.use(router);


app.listen(3000, function () {
  console.log("CashChain server running on http://localhost:3000");
});

