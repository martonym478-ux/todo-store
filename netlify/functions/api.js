const serverless = require("serverless-http");
const { app, connectDB } = require("../../server");

const proxy = serverless(app);

exports.handler = async (event, context) => {
  try {
    if (!process.env.JWT_SECRET || !process.env.MONGODB_URI) {
      return {
        statusCode: 500,
        body: "Missing environment variables"
      };
    }

    await connectDB();
    return await proxy(event, context);
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: "Internal server error"
    };
  }
};