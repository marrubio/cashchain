var SHA256 = require("crypto-js/sha256");

class Block {

  constructor(data) {
      this.id = id;
      this.name = name; 
      this.nonce = 0;     
      this.hash =  SHA256(id+name).toString()
      this.parenthash
      this.data = data;
  }

  info() {
      return `${this.id} ${this.name}, ${this.proof}`;
  }
}

class Blockchain {

  constructor(id, name,pattern) {
      this.id = id;
      this.name = name;
      this.maximumNonce = 100000;  
      this.hash =  this.mine(pattern);
      this.count = 0;
      this.chain = [];            
  }

  add(block){
    this.chain[count] = block;
  }

  info() {
      return `${this.id} ${this.name}, ${this.hash}`;
  }

  mine(pattern){

    console.log("Minando Blockchain.....");
    for (var x = 0; x <= this.maximumNonce; x++) {
      
      var hashtmp = SHA256(this.id + this.name + x).toString();
      console.log("nonce: " + x + " hash:" + hashtmp);

      if(hashtmp.substring(0,pattern.length) === pattern){
        this.nonce = x;
        return hashtmp;
      }      
    }

  }
}



module.exports = Blockchain;