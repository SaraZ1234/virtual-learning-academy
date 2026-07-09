const axios = require("axios");

/**
 * Get Zoom Access Token
 */
const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
      {},
      {
        auth: {
          username: process.env.ZOOM_CLIENT_ID,
          password: process.env.ZOOM_CLIENT_SECRET,
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Zoom Token Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Create Zoom Meeting
 */
const createZoomMeeting = async (
  topic,
  start_time,
  duration = 60
) => {
  try {
    const token = await getAccessToken();

    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type: 2,
        start_time,
        duration,
        timezone: "Asia/Karachi",
        settings: {
          join_before_host: false,
          waiting_room: true,
          approval_type: 2,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Zoom Meeting Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = {
  createZoomMeeting,
};