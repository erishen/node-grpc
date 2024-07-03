#!/bin/bash
PROTO_DIR=./protos
OUT_DIR=./generated

mkdir -p ${OUT_DIR}

protoc -I=${PROTO_DIR} \
  --js_out=import_style=commonjs,binary:${OUT_DIR} \
  --grpc_out=${OUT_DIR} \
  --plugin=protoc-gen-grpc=$(which grpc_tools_node_protoc_plugin) \
  ${PROTO_DIR}/*.proto
