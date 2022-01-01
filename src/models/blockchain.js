var SHA256 = require("crypto-js/sha256");
const MaximumNonce = 100000;
const Block = require('./block.js');

class Blockchain {

  constructor(id, name, pattern) {
      this.id = id;
      this.name = name;      
      this.pattern = pattern;
      this.hash =  this.mineChain(pattern);
      this.count = 0;
      this.datablock= [];      
      this.add(new Block(this.hash, pattern, "Genesis Block"));            
  }

  add(block){    
    this.datablock[this.count] = block;    
    this.count++;
  }

  info() {
      return this.hash;
  }

  mineChain(pattern){

    console.log("Blockchain mining.....");
    for (var x = 0; x <= MaximumNonce; x++) {
      
      var hashtmp = SHA256(this.id + this.name + x).toString();
      

      if(hashtmp.substring(0,pattern.length) === pattern){
        this.nonce = x;
        console.log("Chain mined nonce: " + x + " hash:" + hashtmp);
        return hashtmp;
      }      
    }

  }
}



module.exports = Blockchain;
