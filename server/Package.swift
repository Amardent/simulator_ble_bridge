// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "BLEProxyServer",
    platforms: [
        .macOS(.v13)
    ],
    products: [
        .library(
            name: "Generated",
            targets: ["Generated"]
        ),
        .library(
            name: "BLEProxy",
            targets: ["BLEProxy"]
        ),
        .executable(
            name: "ble-scan",
            targets: ["BLEScanTool"]
        ),
        .executable(
            name: "ble-write-monitor-test",
            targets: ["BLEWriteMonitorTool"]
        ),
        .executable(
            name: "ble-fi-test",
            targets: ["BLEFiTestTool"]
        ),
        .executable(
            name: "ble-rssi-test",
            targets: ["BLERSSITool"]
        ),
        .executable(
            name: "ble-amdt-test",
            targets: ["BLEAMDTTestTool"]
        ),
        .executable(
            name: "ble-device-info-test",
            targets: ["BLEDeviceInfoTool"]
        ),
        .executable(
            name: "ble-proxy-server",
            targets: ["BLEProxyServer"]
        ),
    ],
    dependencies: [
        .package(url: "https://github.com/apple/swift-protobuf.git", from: "1.27.0"),
        .package(url: "https://github.com/vapor/vapor.git", from: "4.89.0"),
    ],
    targets: [
        .target(
            name: "Generated",
            dependencies: [
                .product(name: "SwiftProtobuf", package: "swift-protobuf"),
            ],
            path: "Sources/Generated"
        ),
        .target(
            name: "BLEProxy",
            dependencies: [
                .target(name: "Generated"),
                .product(name: "SwiftProtobuf", package: "swift-protobuf"),
            ],
            path: "Sources/BLEProxy"
        ),
        .testTarget(
            name: "BLEProxyTests",
            dependencies: [
                .target(name: "BLEProxy"),
                .target(name: "Generated"),
                .target(name: "BLEProxyServer"),
                .product(name: "Vapor", package: "vapor"),
                .product(name: "XCTVapor", package: "vapor"),
            ],
            path: "Tests/BLEProxyTests"
        ),
        .executableTarget(
            name: "BLEScanTool",
            dependencies: [
                .target(name: "BLEProxy"),
                .target(name: "Generated"),
            ],
            path: "Sources/BLEScanTool"
        ),
        .executableTarget(
            name: "BLEWriteMonitorTool",
            dependencies: [
                .target(name: "BLEProxy"),
                .target(name: "Generated"),
            ],
            path: "Sources/BLEWriteMonitorTool"
        ),
        .executableTarget(
            name: "BLEFiTestTool",
            dependencies: [
                .target(name: "BLEProxy"),
                .target(name: "Generated"),
            ],
            path: "Sources/BLEFiTestTool"
        ),
        .executableTarget(
            name: "BLERSSITool",
            dependencies: [
                .target(name: "BLEProxy"),
                .target(name: "Generated"),
            ],
            path: "Sources/BLERSSITool"
        ),
        .executableTarget(
            name: "BLEAMDTTestTool",
            dependencies: [
                .target(name: "BLEProxy"),
                .target(name: "Generated"),
            ],
            path: "Sources/BLEAMDTTestTool"
        ),
        .executableTarget(
            name: "BLEDeviceInfoTool",
            dependencies: [
                .target(name: "BLEProxy"),
                .target(name: "Generated"),
            ],
            path: "Sources/BLEDeviceInfoTool"
        ),
        .executableTarget(
            name: "BLEProxyServer",
            dependencies: [
                .target(name: "BLEProxy"),
                .target(name: "Generated"),
                .product(name: "Vapor", package: "vapor"),
            ],
            path: "Sources/BLEProxyServer"
        ),
    ]
)
