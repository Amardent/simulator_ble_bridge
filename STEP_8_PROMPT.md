# Implement Step 8: Vapor HTTP Server + Health Endpoint

## Context

BLE Proxy server project. Steps 1-7 complete (protobuf schema, BLE core implementation). Now implementing HTTP server layer.

**Location:** `/Users/ericfrank/ble_bridge/server/`

## Task

Read `@process/step-08.md` and implement Vapor HTTP server with `/v1/health` endpoint.

Use `@swift-backend-engineer` agent to:

1. Add Vapor dependency to existing `Package.swift` (keep all existing targets)
2. Create `Sources/BLEProxyServer/` with:
   - `main.swift` - Vapor app entry point
   - `configure.swift` - Bind to 127.0.0.1:5050
   - `routes.swift` - Register health endpoint
   - `Controllers/HealthController.swift` - Return `Bleproxy_V1_HealthResponse` protobuf
3. Test with curl and verify protobuf response
4. Verify localhost-only binding

After implementation, use `@project-manager` agent to validate all acceptance criteria from `step-08.md` are met.

## Key Requirements

- Bind to `127.0.0.1` only (not 0.0.0.0)
- Return protobuf binary (not JSON)
- Use `Bleproxy_V1_` prefix for all protobuf types
- Don't break existing targets

## Test

```bash
swift run ble-proxy-server
curl http://127.0.0.1:5050/v1/health --output /tmp/health.bin
protoc --decode=bleproxy.v1.HealthResponse --proto_path=../proto ../proto/ble_proxy.proto < /tmp/health.bin
```

Expected: `version: "1.0.0"` and `ready: true`
