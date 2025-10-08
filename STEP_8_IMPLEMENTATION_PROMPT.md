# Step 8 Implementation Prompt: Vapor HTTP Server Setup

## Context

You are implementing **Step 8** of a 15-step BLE Proxy system that enables React Native apps in iOS Simulator to communicate with physical BLE peripherals via a macOS server.

### Project Background

**What it does:** React Native apps running in simulators can't access Bluetooth hardware. This system provides a localhost HTTP/WebSocket server that proxies BLE operations to CoreBluetooth on macOS.

**Communication:** All client-server messages use protobuf3 binary format.

### Completed Work (Steps 1-7)

**Phase 1: Protocol & Code Generation** ✅
- Step 1-2: Protobuf schema defined and Swift/JS code generated

**Phase 2: Swift BLE Core Implementation** ✅ (Completed 2025-10-06)
- Step 3: BLE scanning for peripherals
- Step 4: Connection management and service/characteristic discovery
- Step 5: Read operations with timeout handling
- Step 6: Write operations and notification monitoring
- Step 7: RSSI reading and comprehensive error handling

**Current State:**
- ✅ BLEManager class complete (public, thread-safe, all operations implemented)
- ✅ BLEError struct with toProto() method for HTTP error responses
- ✅ Generated protobuf types (all use `Bleproxy_V1_` prefix)
- ✅ Test infrastructure (8 test suites, all passing)
- ✅ CLI tools for manual testing (ble-scan, ble-rssi-test, etc.)
- ✅ Package.swift configured with BLEProxy and Generated modules

**Location:** `/Users/ericfrank/ble_bridge/server/`

## Your Task: Implement Step 8

**Objective:** Set up Vapor web framework, implement HTTP protobuf request/response handling, and create the `/v1/health` endpoint as the foundation for the BLE proxy server.

**Strategy:** Build incrementally in phases:
1. **Phase 1 (Minimum Viable):** Basic Vapor setup + health endpoint working
2. **Phase 2 (Edge Cases):** Error handling, request validation, logging
3. **Phase 3 (Production Ready):** Signal handling, startup checks, configuration

## Implementation Instructions

### Required Reading

**Read these files first** to understand context and requirements:
1. `/Users/ericfrank/ble_bridge/process/step-08.md` - Complete step requirements
2. `/Users/ericfrank/ble_bridge/process/README.md` - Project overview and Step 7 learnings
3. `/Users/ericfrank/ble_bridge/server/Package.swift` - Current package configuration
4. `/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEError.swift` - Error handling infrastructure

### Phase 1: Minimum Viable Implementation (30-45 min)

**Goal:** Get a basic Vapor server running with health endpoint responding with protobuf.

#### 1.1 Update Package.swift

**File:** `/Users/ericfrank/ble_bridge/server/Package.swift`

Add Vapor dependency to existing package (do NOT replace existing configuration):
- Add Vapor package dependency (~4.89.0)
- Add `ble-proxy-server` executable product
- Add `BLEProxyServer` target with dependencies on BLEProxy, Generated, and Vapor

**Important:** Keep all existing targets (BLEProxy, Generated, test targets, CLI tools).

#### 1.2 Create Server Entry Point

**File:** `/Users/ericfrank/ble_bridge/server/Sources/BLEProxyServer/main.swift`

Create basic Vapor application entry point:
- Import Vapor
- Use `@main` attribute
- Detect environment
- Bootstrap logging
- Create Application instance
- Call configure() and run()

#### 1.3 Create Configuration

**File:** `/Users/ericfrank/ble_bridge/server/Sources/BLEProxyServer/configure.swift`

Configure server with REQUIRED settings:
- Bind to `127.0.0.1` ONLY (not 0.0.0.0)
- Port: 5050
- Register routes
- Log configuration info

#### 1.4 Create Routes

**File:** `/Users/ericfrank/ble_bridge/server/Sources/BLEProxyServer/routes.swift`

Register health endpoint:
- `GET /v1/health` → HealthController.health

#### 1.5 Create Health Controller

**File:** `/Users/ericfrank/ble_bridge/server/Sources/BLEProxyServer/Controllers/HealthController.swift`

Implement health endpoint:
- Import Vapor, SwiftProtobuf, Generated
- Create `Bleproxy_V1_HealthResponse` message
- Set version = "1.0.0", ready = true
- Serialize to protobuf binary
- Return Response with:
  - Status: 200 OK
  - Content-Type: application/x-protobuf
  - Body: serialized protobuf data

#### 1.6 Test Phase 1

```bash
cd /Users/ericfrank/ble_bridge/server
swift build
swift run ble-proxy-server

# In another terminal:
curl -v http://127.0.0.1:5050/v1/health --output /tmp/health.bin

# Verify protobuf response
protoc --decode=bleproxy.v1.HealthResponse \
  --proto_path=/Users/ericfrank/ble_bridge/proto \
  /Users/ericfrank/ble_bridge/proto/ble_proxy.proto \
  < /tmp/health.bin
```

**Expected output:**
```
version: "1.0.0"
ready: true
```

**Stop here if Phase 1 doesn't work.** Fix issues before proceeding.

### Phase 2: Edge Cases & Error Handling (15-30 min)

**Goal:** Make the server robust against common errors.

#### 2.1 Create Protobuf Helpers

**File:** `/Users/ericfrank/ble_bridge/server/Sources/BLEProxyServer/Extensions/ProtobufExtensions.swift`

Create convenience extensions:
- `HTTPMediaType.protobuf` constant
- `Request.decodeProto<T>()` - decode protobuf from request body
- `Response.proto<T>()` - create protobuf response
- `Response.error(BLEError)` - create error response using BLEError.toProto()

**Important:** Import BLEProxy module to access BLEError.

#### 2.2 Add Error Handling

Update HealthController:
- Wrap serialization in try/catch
- Log errors before returning
- Return appropriate HTTP status codes

Add middleware for:
- Request logging (method, path, duration)
- Error catching and formatting

#### 2.3 Add Request Validation

For protobuf endpoints (future):
- Verify Content-Type header
- Check request body exists
- Handle malformed protobuf gracefully

#### 2.4 Test Phase 2

Test error scenarios:
```bash
# Test wrong endpoint
curl -v http://127.0.0.1:5050/v1/wrong

# Test from external IP (should fail - localhost only)
curl -v http://<your-ip>:5050/v1/health

# Verify content-type
curl -I http://127.0.0.1:5050/v1/health
```

### Phase 3: Production Readiness (15-30 min)

**Goal:** Make the server suitable for development use.

#### 3.1 Signal Handling

Add graceful shutdown:
- Handle SIGINT (Ctrl+C)
- Handle SIGTERM
- Log shutdown message
- Clean up resources

**Pattern:** See existing CLI tools for signal handling examples.

#### 3.2 Startup Checks

Add configuration validation:
- Verify binding to localhost only (not 0.0.0.0)
- Check port availability
- Log server URL on startup
- Verify BLEManager can be instantiated (just check, don't start yet)

#### 3.3 Enhanced Logging

Add structured logging:
- Server startup: version, host, port
- Request logging: method, path, status, duration
- Error logging: error type, message, stack trace
- Shutdown logging: reason, duration

#### 3.4 Configuration File (Optional)

Consider config.json for:
- Server port (default: 5050)
- Log level
- Request timeout
- Max request size

#### 3.5 Final Testing

Complete acceptance criteria:
- [ ] Swift package builds successfully
- [ ] Server starts on 127.0.0.1:5050
- [ ] /v1/health endpoint responds
- [ ] Response uses application/x-protobuf content-type
- [ ] Response body is valid protobuf HealthResponse
- [ ] HealthResponse.ready is true
- [ ] HealthResponse.version is set
- [ ] Server logs startup information
- [ ] Server only binds to localhost (not 0.0.0.0)
- [ ] Graceful shutdown on SIGINT/SIGTERM

## Agent Usage

Use the **swift-backend-engineer** agent for this implementation:

```
I need to implement Step 8 of the BLE Proxy server. Use the @swift-backend-engineer agent to:

1. Read /Users/ericfrank/ble_bridge/process/step-08.md for complete requirements
2. Update Package.swift to add Vapor dependency
3. Create Sources/BLEProxyServer/ directory with:
   - main.swift (entry point)
   - configure.swift (server configuration)
   - routes.swift (endpoint registration)
   - Controllers/HealthController.swift (health endpoint)
4. Implement Phase 1 (minimum viable)
5. Test with curl and protoc
6. If Phase 1 works, proceed to Phase 2 (error handling)
7. Then Phase 3 (production readiness)
8. Run final tests to verify all acceptance criteria

Use the existing BLEError.toProto() method from Step 7 for error responses.
All protobuf types use Bleproxy_V1_ prefix (e.g., Bleproxy_V1_HealthResponse).
```

After implementation, use **project-manager** agent to validate:

```
Use the @project-manager agent to validate Step 8 implementation:

1. Verify all acceptance criteria from step-08.md are met
2. Check that implementation follows project.md requirements (localhost only, protobuf, logging)
3. Ensure Package.swift changes don't break existing functionality
4. Validate error handling uses BLEError from Step 7
5. Confirm server is ready for Step 9 (BLE operation endpoints)
```

## Critical Success Factors

### Must Have:
1. ✅ Localhost-only binding (127.0.0.1) - SECURITY REQUIREMENT
2. ✅ Protobuf binary responses (not JSON)
3. ✅ Health endpoint working and verified with protoc
4. ✅ Graceful shutdown
5. ✅ No breaking changes to existing Package.swift targets

### Must Avoid:
1. ❌ Binding to 0.0.0.0 (security risk)
2. ❌ JSON responses instead of protobuf
3. ❌ Breaking existing BLEProxy or test targets
4. ❌ Skipping localhost binding verification

## Key Technical Details from Steps 3-7

### Protobuf Types (from Step 2)
- All generated types use `Bleproxy_V1_` prefix
- Import: `import Generated`
- Example: `Bleproxy_V1_HealthResponse`, `Bleproxy_V1_Error`
- Enum cases use camelCase: `.poweredOn`, `.errorUnknown`

### Error Handling (from Step 7)
- BLEError wraps `Bleproxy_V1_BleErrorCode` enum
- Convert to protobuf: `bleError.toProto()` → `Bleproxy_V1_Error`
- Error codes 0-699: match react-native-ble-plx
- Error codes 1000+: server-specific
  - 1000: `ERROR_SERVER_ERROR`
  - 1001: `ERROR_SERVER_TIMEOUT` (use for HTTP timeouts)
- Code 3: `ERROR_OPERATION_TIMED_OUT` (BLE layer, don't use in HTTP)

### BLEManager (from Steps 3-7)
- Location: `/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEManager.swift`
- Public class, can be instantiated in Step 9
- All operations async with Result-based completions
- Thread-safe (background queue)
- **Don't instantiate yet** - just verify it exists for Step 9

## Testing Checklist

After implementation, verify:

```bash
# 1. Build succeeds
cd /Users/ericfrank/ble_bridge/server
swift build
# Expected: Build succeeds with no errors

# 2. Server starts
swift run ble-proxy-server
# Expected: Logs show "BLE Proxy Server configured on 127.0.0.1:5050"

# 3. Health endpoint responds
curl -v http://127.0.0.1:5050/v1/health --output /tmp/health.bin
# Expected: HTTP 200, Content-Type: application/x-protobuf

# 4. Protobuf decodes correctly
protoc --decode=bleproxy.v1.HealthResponse \
  --proto_path=/Users/ericfrank/ble_bridge/proto \
  /Users/ericfrank/ble_bridge/proto/ble_proxy.proto \
  < /tmp/health.bin
# Expected: version: "1.0.0", ready: true

# 5. Localhost-only binding
curl -v http://<your-external-ip>:5050/v1/health
# Expected: Connection refused (server only listens on 127.0.0.1)

# 6. Graceful shutdown
# In server terminal, press Ctrl+C
# Expected: Logs show shutdown message, server exits cleanly

# 7. Existing tests still pass
swift test
# Expected: All existing tests pass (BLEManagerTests, WriteMonitorTests, RSSITests)

# 8. CLI tools still work
swift run ble-scan
# Expected: Starts scanning (Ctrl+C to stop)
```

## Success Criteria

Step 8 is complete when:

1. ✅ All 10 acceptance criteria from step-08.md are met
2. ✅ curl + protoc verification succeeds
3. ✅ Server only binds to localhost (verified by external connection failure)
4. ✅ Existing tests still pass (no regressions)
5. ✅ Existing CLI tools still work
6. ✅ Server logs are informative
7. ✅ Documentation updated (step-08.md completion notes)

**Do not proceed to Step 9 until all criteria are met.**

## Next Steps After Completion

Once Step 8 is verified complete:

1. Update `/Users/ericfrank/ble_bridge/process/step-08.md`:
   - Mark all acceptance criteria as complete
   - Add completion notes section with implementation details
   - Document any deviations or learnings

2. Update `/Users/ericfrank/ble_bridge/process/README.md`:
   - Change Step 8 status to "✅ Complete"
   - Add completion date
   - Add "Step 8 Key Learnings" section

3. Update `/Users/ericfrank/ble_bridge/project.md`:
   - Update milestone 4 progress

4. Prepare for Step 9:
   - Step 9 will add BLE operation endpoints (scan, connect, read, write, discover, rssi)
   - BLEManager will be instantiated in configure.swift
   - Each endpoint will call corresponding BLEManager method
   - Error responses will use Response.error(BLEError)

## Questions to Ask If Stuck

1. **Build fails?**
   - Did you add Vapor to dependencies array?
   - Did you create BLEProxyServer target?
   - Did you keep existing targets?

2. **Server won't start?**
   - Is port 5050 already in use? (`lsof -i :5050`)
   - Did you bind to "127.0.0.1" not "localhost"?
   - Check server logs for errors

3. **Health endpoint 404?**
   - Did you register route in routes.swift?
   - Is path exactly "v1/health" (no leading slash in route)?
   - Is server actually running?

4. **Protobuf decode fails?**
   - Is Content-Type "application/x-protobuf"?
   - Did you use correct message type (Bleproxy_V1_HealthResponse)?
   - Check proto file path in protoc command

5. **Server binds to all interfaces?**
   - Did you set hostname = "127.0.0.1" in configure.swift?
   - Verify with `netstat -an | grep 5050`

## Reference Files

**Must read:**
- `/Users/ericfrank/ble_bridge/process/step-08.md` - Complete requirements
- `/Users/ericfrank/ble_bridge/server/Package.swift` - Current configuration
- `/Users/ericfrank/ble_bridge/proto/ble_proxy.proto` - Protobuf schema

**Helpful context:**
- `/Users/ericfrank/ble_bridge/process/README.md` - Step 7 learnings
- `/Users/ericfrank/ble_bridge/server/Sources/BLEProxy/BLEError.swift` - Error handling
- `/Users/ericfrank/ble_bridge/server/Sources/BLEScanTool/main.swift` - Signal handling example

## Time Estimate

- Phase 1 (Minimum Viable): 30-45 minutes
- Phase 2 (Edge Cases): 15-30 minutes
- Phase 3 (Production Ready): 15-30 minutes
- Testing & Validation: 15 minutes

**Total: ~1.5-2 hours**

Good luck! Remember: minimum viable first, then iterate. Don't over-engineer Phase 1.
