# Step 2: Generate Protobuf Code for Swift and JavaScript

## Objective
Generate type-safe protobuf code for both Swift (server) and JavaScript/TypeScript (React Native client), and verify the generated code compiles correctly.

## Prerequisites
- Step 1: Protobuf schema is finalized and validated

## Technical Details

### Directory Structure
```
/Users/ericfrank/ble_bridge/
├── proto/
│   └── ble_proxy.proto
├── server/
│   └── Sources/
│       └── Generated/
│           └── ble_proxy.pb.swift
└── client/
    └── src/
        └── generated/
            ├── ble_proxy.js
            ├── ble_proxy.d.ts
            └── index.ts
```

### Swift Code Generation
- Use `swift-protobuf` plugin
- Generate into `server/Sources/Generated/`
- Ensure Visibility: Public for all types
- Enable File Naming: PathToUnderscores

### JavaScript/TypeScript Generation
- Use `protobufjs` with static module output
- Generate TypeScript definitions
- Create barrel export index.ts
- Ensure CommonJS compatibility for React Native

### Configuration Files

#### `.protorc` (protobufjs config)
```json
{
  "target": "static-module",
  "wrap": "commonjs",
  "create": true,
  "encode": true,
  "decode": true,
  "verify": true,
  "convert": true,
  "delimited": true,
  "beautify": true,
  "comments": true,
  "es6": false
}
```

## Acceptance Criteria
- [ ] Swift code generates without errors
- [ ] Swift code compiles in isolation (swift build)
- [ ] JavaScript code generates without errors
- [ ] TypeScript definitions are present
- [ ] All message types are exported
- [ ] Enum values are accessible
- [ ] Encoder/decoder methods are available
- [ ] Generated code is checked into git (for reproducibility)
- [ ] Generation script is documented

## Testing Instructions
```bash
# Generate Swift code
cd /Users/ericfrank/ble_bridge
protoc --proto_path=proto \
  --swift_out=server/Sources/Generated \
  --swift_opt=Visibility=Public \
  --swift_opt=FileNaming=PathToUnderscores \
  proto/ble_proxy.proto

# Verify Swift compilation
cd server
swift build --target Generated

# Generate JavaScript/TypeScript
cd /Users/ericfrank/ble_bridge
pbjs -t static-module -w commonjs --es6 \
  --null-defaults \
  -o client/src/generated/ble_proxy.js \
  proto/ble_proxy.proto

pbts -o client/src/generated/ble_proxy.d.ts \
  client/src/generated/ble_proxy.js

# Create barrel export
cat > client/src/generated/index.ts << 'EOF'
import * as BleProxy from './ble_proxy';
export default BleProxy;
export * from './ble_proxy';
EOF

# Verify TypeScript compilation
cd client
npx tsc --noEmit src/generated/ble_proxy.d.ts
```

## Dependencies
- protoc (v3.0+)
- swift-protobuf (Swift Package)
- protobufjs (npm package)
- protobufjs-cli (npm global)
- TypeScript compiler

## Risks/Blockers
- Swift Package Manager integration for swift-protobuf
- React Native Metro bundler may need protobuf runtime
- Large generated files may impact bundle size
- Need to ensure int64 fields are handled correctly in JavaScript

## Recommended Agent
build-automation-specialist

## Estimated Time
1 hour
