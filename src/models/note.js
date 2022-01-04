var SHA256 = require("crypto-js/sha256");
const MaximumNonce = 100000;

class Note {

  constructor(requestAddr, toAddr, amount, sign) {      
      this.date = Date.now();
      this.requestAddr = requestAddr;
      this.toAddr = toAddr;
      this.amount = amount;
      this.sign = sign;
  }

}

module.exports = Note;
