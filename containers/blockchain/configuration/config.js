//var readFileSync = require('fs').readFileSync;
var resolve = require('path').resolve;
var fs = require("fs");
const basePath = resolve(__dirname, './certs');
const readCryptoFile = filename => fs.readFileSync(resolve(basePath, filename)).toString();
const config = {
  channelName: 'mychannel',
  channelConfig: fs.readFileSync(resolve(__dirname, 'channel.tx')),
  chaincodeId: 'bcfit',
  chaincodeVersion: '1',
  chaincodePath: 'bcfit',
  rabbitmq: 'amqps://admin:QVLCAOEFPOFZCBNN@portal-ssl828-47.bmix-dal-yp-3b5897fd-e047-4fc0-849e-5d4a6f7c8a41.159276422.composedb.com:19383/bmix-dal-yp-3b5897fd-e047-4fc0-849e-5d4a6f7c8a41',
  redisUrl: 'rediss://admin:ZIXCXRIOPEHFVLTY@portal912-43.bmix-dal-yp-5f8361a7-d9da-4330-a859-df904e29d2db.159276422.composedb.com:19384',
  orderer: {
    hostname: 'orderer0',
    url: 'grpc://orderer0:7050',
    pem: readCryptoFile('ordererOrg.pem')
  },
  peers: [{
    peer: {
      hostname: 'shop-peer',
      url: 'grpc://shop-peer:7051',
      eventHubUrl: 'grpc://shop-peer:7053',
      pem: readCryptoFile('shopOrg.pem'),
      userKeystoreDBName: 'seller_db',
      userKeystoreDBUrl: 'http://ca-datastore:5984',
      stateDBName: 'member_db',
      stateDBUrl: 'http://shop-statedb:5984',
      org: 'org.ShopOrg',
      userType: 'seller'
    },
    ca: {
      hostname: 'shop-ca',
      url: 'http://shop-ca:7054',
      mspId: 'ShopOrgMSP',
      caName: 'shop-org'
    },
    admin: {
      key: readCryptoFile('Admin@shop-org-key.pem'),
      cert: readCryptoFile('Admin@shop-org-cert.pem')
    }
  }, {
    peer: {
      hostname: 'fitcoin-peer',
      url: 'grpc://fitcoin-peer:7051',
      pem: readCryptoFile('fitcoinOrg.pem'),
      userKeystoreDBName: 'user_db',
      userKeystoreDBUrl: 'http://ca-datastore:5984',
      stateDBName: 'member_db',
      stateDBUrl: 'http://fitcoin-statedb:5984',
      eventHubUrl: 'grpc://fitcoin-peer:7053',
      org: 'org.FitCoinOrg',
      userType: 'user'
    },
    ca: {
      hostname: 'fitcoin-ca',
      url: 'http://fitcoin-ca:7054',
      mspId: 'FitCoinOrgMSP',
      caName: 'fitcoin-org'
    },
    admin: {
      key: readCryptoFile('Admin@fitcoin-org-key.pem'),
      cert: readCryptoFile('Admin@fitcoin-org-cert.pem')
    }
  }]
};
if(process.env.LOCALCONFIG) {
  config.orderer.url = 'grpc://localhost:7050';
  config.peers[0].peer.url = 'grpc://localhost:7051';
  config.peers[0].peer.eventHubUrl = 'grpc://localhost:7053';
  config.peers[0].ca.url = 'https://localhost:7054';
  config.peers[0].peer.userKeystoreDBUrl = 'http://localhost:5984';
  config.peers[0].peer.stateDBUrl = 'http://localhost:9984';
  config.peers[1].peer.url = 'grpc://localhost:8051';
  config.peers[1].peer.eventHubUrl = 'grpc://localhost:8053';
  config.peers[1].ca.url = 'https://localhost:8054';
  config.peers[1].peer.userKeystoreDBUrl = 'http://localhost:5984';
  config.peers[1].peer.stateDBUrl = 'http://localhost:8984';
  config.rabbitmq = 'amqp://localhost:5672?heartbeat=60';
  config.redisHost = 'localhost';
  config.iotDashUrl = 'https://think-iot-processor.mybluemix.net/steps?message=';
}
//export default config;
fs.writeFile("./config.json", JSON.stringify(config), (err) => {
  if(err) {
    console.error(err);
    return;
  }
  console.log("File has been created");
});
