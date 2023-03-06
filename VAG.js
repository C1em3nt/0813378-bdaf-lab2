const bip39 = require('bip39')
const hdmkey = require('ethereumjs-wallet')

const getMatchAddress= (_pre) => {
    const regex = new RegExp(`^0x${_pre}`)
    //console.log(regex)
    while(true){
        let mnemonic = bip39.generateMnemonic()
        let seed = bip39.mnemonicToSeedSync(mnemonic)
        let hdWallet = hdmkey.hdkey.fromMasterSeed(seed)
        let keyPair = hdWallet.derivePath("m/44'/60'/0'/0/0")
        let wallet = keyPair.getWallet()
        let address = wallet.getChecksumAddressString()

        //console.log("generated address: " + address)

        if(regex.test(address)){
            let privateKey = wallet.getPrivateKeyString()
            console.log("Done.\n")
            //return wallet
            return{
                address,
                privateKey,
                mnemonic
            };
        }
    }


};

const readline = require('readline');

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const r = read;
r.question('Prefix: ', function (input) {
    let prefix = String(input)
    //prefix = prefix.replace(/(\r\n|\n|\r)/gm, '')
    const regex = /^[0-9a-fA-F]+$/;
    if (!regex.test(input)) {
      console.log('Wrong Format!');
      process.exit(0)
    }

    let wallet = getMatchAddress(prefix)
    let address = wallet.address
    let privateKey = wallet.privateKey
    let mnemonic = wallet.mnemonic
    console.log('Address: '+ address)
    console.log('PrivateKey: '+ privateKey)
    console.log('Mnemonic: '+ mnemonic)

    const valid = bip39.validateMnemonic(mnemonic);
    console.log(valid); 
    process.exit(0)
});
