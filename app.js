/*
  xLights Support Zoom Dashboard
  Support status is intentionally ONLINE every day.

  EDIT THESE VALUES to connect the dashboard to your actual Zoom room.
*/

const CONFIG = {
  zoomUrl: "https://zoom.us/j/175 801 909",
  meetingId: "175 801 909",
  passcode: "255600",
  roomName: "Christmas Light Enthusiasts"
};

const PACIFIC_TZ = "America/Los_Angeles";

const $ = id => document.getElementById(id);

function formatTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC_TZ,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }).format(date);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function updateClock() {
  const now = new Date();
  $("clock").textContent = formatTime(now);
  $("date").textContent = formatDate(now);
  $("footerDate").textContent = formatDate(now);
}

function initZoom() {
  $("joinZoom").href = CONFIG.zoomUrl;
  $("roomJoin").href = CONFIG.zoomUrl;
  $("meetingId").textContent = CONFIG.meetingId;
  $("passcode").textContent = CONFIG.passcode;
  $("roomName").textContent = CONFIG.roomName;

  const configured =
    CONFIG.zoomUrl &&
    !CONFIG.zoomUrl.includes("YOUR_MEETING_ID") &&
    CONFIG.meetingId &&
    !CONFIG.meetingId.includes("YOUR");

  if (configured) {
    $("configNotice").style.display = "none";
  }

  $("copyMeeting").addEventListener("click", async () => {
    if (!CONFIG.meetingId || CONFIG.meetingId.includes("YOUR")) {
      $("copyMeeting").textContent = "Add Meeting ID First";
      setTimeout(() => $("copyMeeting").textContent = "Copy Meeting ID", 1600);
      return;
    }

    try {
      await navigator.clipboard.writeText(CONFIG.meetingId);
      $("copyMeeting").textContent = "Copied!";
      setTimeout(() => $("copyMeeting").textContent = "Copy Meeting ID", 1600);
    } catch {
      $("copyMeeting").textContent = CONFIG.meetingId;
    }
  });
}

initZoom();
updateClock();
setInterval(updateClock, 1000);
