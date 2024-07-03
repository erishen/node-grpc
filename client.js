const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// 加载 proto 文件
const PROTO_PATH = path.join(__dirname, 'protos', 'helloworld.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// 创建 gRPC 客户端
function main() {
  const client = new helloProto.Greeter('localhost:50051', grpc.credentials.createInsecure());
  client.sayHello({ name: 'Erishen' }, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Greeting:', response.message);
    }
  });
}

main();
