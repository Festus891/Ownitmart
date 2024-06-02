// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {
  // Create jwt token
  const token = user.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIES_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true if using HTTPS in production
    sameSite: "None", // required for cross-site requests
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
