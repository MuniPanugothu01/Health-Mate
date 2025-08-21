const opossum = require("opossum");
const { ConnectDB } = require("./db.js");
ConnectDB();
const options = {
  timeout: 5000, // if the db connection is take more than 5sec, then fails the connection
  errorThresholdPercentage: 50,
  resetTimeout: 100000,
};

// warp the BD function with the breakers
const breaker = new opossum(ConnectDB, options);

// optional: Events for logging
breaker.on("open", () =>
  console.warn("🚨 Circuit breaker OPEN: MongoDB connection is failing")
);
breaker.on("halfOpen", () =>
  console.log("🟡 Circuit breaker HALF-OPEN: Testing MongoDB again")
);
breaker.on("close", () =>
  console.log("✅ Circuit breaker CLOSED: MongoDB is healthy again")
);
breaker.on("fallback", () => console.log("Fallback called"));
breaker.fallback(() => {
  console.error("❌ DB unavailable. Returning fallback response.");
  return Promise.reject("Database connection failed");
});

module.exports = breaker;
