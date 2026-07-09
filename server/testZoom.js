require("dotenv").config();

const { createZoomMeeting } = require("./services/zoomService");

(async () => {
  try {
    const meeting = await createZoomMeeting(
      "Zoom API Test",
      "2026-07-15T18:00:00"
    );

    console.log("Meeting Created Successfully!");
    console.log(meeting);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
})();