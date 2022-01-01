var SHA256 = require("crypto-js/sha256");
const MaximumNonce = 100000;

class Block {

  constructor(parenthash,pattern,data) {      
      this.date = Date.now(); 
      this.nonce = 0;           
      this.parenthash = parenthash;
      this.data = data;      
      this.hash =  this.mineBlock(pattern)
  }

  info() {
      return `${this.date} ${this.parenthash}, ${this.data}`;
  }

  mineBlock(pattern){

    console.log("Block mining.....");
    for (var i = 0; i <= MaximumNonce; i++) {
      
      var blockhash = SHA256(i + this.date + this.parenthash + this.data).toString();
      //console.log("Block nonce: " + i + " hash:" + blockhash);

      if(blockhash.substring(0,pattern.length) === pattern){
        this.nonce = i;
        console.log("block mined nonce: " + i + " hash:" + blockhash);
        return blockhash;
      }      
    }
  }

}

module.exports = Block;
