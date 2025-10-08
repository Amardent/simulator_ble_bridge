#!/bin/bash

# BLE Proxy Protobuf Code Generation Script
# This script generates Swift and JavaScript/TypeScript code from the protobuf schema
# Run this script whenever the proto file is updated

set -e

PROJECT_ROOT="/Users/ericfrank/ble_bridge"
PROTO_DIR="${PROJECT_ROOT}/proto"
PROTO_FILE="${PROTO_DIR}/ble_proxy.proto"

echo "🔧 Generating protobuf code from ble_proxy.proto..."

# Generate Swift code
echo "📦 Generating Swift code..."
protoc --proto_path="${PROTO_DIR}" \
  --swift_out="${PROJECT_ROOT}/server/Sources/Generated" \
  --swift_opt=Visibility=Public \
  --swift_opt=FileNaming=PathToUnderscores \
  "${PROTO_FILE}"

echo "✅ Swift code generated at server/Sources/Generated/ble_proxy.pb.swift"

# Generate JavaScript code
echo "📦 Generating JavaScript code..."
pbjs -t static-module -w commonjs \
  -o "${PROJECT_ROOT}/client/src/generated/ble_proxy.js" \
  "${PROTO_FILE}"

echo "✅ JavaScript code generated at client/src/generated/ble_proxy.js"

# Generate TypeScript definitions
echo "📦 Generating TypeScript definitions..."
pbts -o "${PROJECT_ROOT}/client/src/generated/ble_proxy.d.ts" \
  "${PROJECT_ROOT}/client/src/generated/ble_proxy.js"

echo "✅ TypeScript definitions generated at client/src/generated/ble_proxy.d.ts"

# Verify Swift compilation
echo "🔍 Verifying Swift code compiles..."
cd "${PROJECT_ROOT}/server"
swift build --target Generated > /dev/null 2>&1

echo "✅ Swift code verified"

# Verify TypeScript definitions
echo "🔍 Verifying TypeScript definitions..."
cd "${PROJECT_ROOT}/client"
tsc --noEmit src/generated/ble_proxy.d.ts

echo "✅ TypeScript definitions verified"

echo ""
echo "🎉 All protobuf code generated and verified successfully!"
echo ""
echo "Generated files:"
echo "  - server/Sources/Generated/ble_proxy.pb.swift"
echo "  - client/src/generated/ble_proxy.js"
echo "  - client/src/generated/ble_proxy.d.ts"
echo "  - client/src/generated/index.ts (barrel export)"
