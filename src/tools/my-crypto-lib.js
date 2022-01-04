// tools.js
// ========
// TODO: Code refactor
module.exports = {
    genkeys: function () {
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
    },

  };



