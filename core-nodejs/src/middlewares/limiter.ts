import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Limit each IP to 100 requests per windowMs
  handler: (req, res) => {
    res.status(429).json({
      error: "Too Many Requests",
      message: "Too many requests from this IP, please try again later.",
      statusCode: StatusCodes.TOO_MANY_REQUESTS
    });
  }
});
