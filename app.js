const { create } = require("ipfs-http-client");
const fs = require("fs")
const INFURA_ID="2a15b63867984bb1a260256e3b572773";
const INFURA_SECRET_KEY="6f99ed7ba2ff4149b2a614c88b3c043d"
const auth = 'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');
async function ipfsClient() {
    const ipfs = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
              headers: {
               authorization: auth, 
           },
        }
    );
    return ipfs;
}


async function saveText() {
    let ipfs = await ipfsClient();

    let result = await ipfs.add(`welcome ${new Date()}`);
    console.log(result);
}

async function saveFile() {

    let ipfs = await ipfsClient();

    let data = fs.readFileSync("./package.json")
    let options = {
        warpWithDirectory: false,
        progress: (prog) => console.log(`Saved :${prog}`)
    }
    let result = await ipfs.add(data, options);
    console.log(result)
}
saveFile()

async function getData(hash) {
    let ipfs = await ipfsClient();

    let asyncitr = ipfs.cat(hash)

    for await (const itr of asyncitr) {

        let data = Buffer.from(itr).toString()
        console.log(data)
    }
}

