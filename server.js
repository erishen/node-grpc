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

// 实现 SayHello RPC 方法
function sayHello(call, callback) {
  callback(null, { message: 'Hello ' + call.request.name });
}

// 创建和启动 gRPC 服务器
function main() {
  const server = new grpc.Server();
  server.addService(helloProto.Greeter.service, { sayHello: sayHello });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server running at http://0.0.0.0:50051');
  });
}

main();
