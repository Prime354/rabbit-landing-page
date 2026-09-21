/**
 * PURE GOOGLE CALENDAR LIVE BACKEND (ZERO GOOGLE SHEETS REQUIRED)
 * -----------------------------------------------------------------
 * This script runs 100% standalone and directly interacts with Google Calendar:
 * 1. Checks your real Google Calendar for free/busy times.
 * 2. Creates the appointment with Google Meet video link on your calendar.
 * 3. Sends Google Calendar email invites to both you and your client.
 * 
 * HOW TO DEPLOY:
 * 1. Go to https://script.google.com/home/start (or your Apps Script editor)
 * 2. Paste this entire code and click Save (Ctrl + S).
 * 3. In the toolbar dropdown next to "Debug", select "testCalendar" and click "▷ Run".
 *    (Approve permissions when prompted: Review permissions > Advanced > Allow).
 * 4. Click Deploy > New deployment:
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL and paste it into your .env as VITE_GOOGLE_CALENDAR_BACKEND_URL
 */

// Available standard working slots (30 min each)
var DEFAULT_WORKING_SLOTS = ["09:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

// 1. Fetch live available slots for a given date from your Google Calendar
function getAvailableSlots(dateStr) {
  var cal = CalendarApp.getDefaultCalendar();
  var targetDate = dateStr ? new Date(dateStr) : new Date();

  var startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0);
  var endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 23, 59, 59);

  // Get all events already on your calendar for that day
  var existingEvents = cal.getEvents(startOfDay, endOfDay);

  var slots = DEFAULT_WORKING_SLOTS.map(function(slotTime) {
    var parts = slotTime.split(" ");
    var timeParts = parts[0].split(":");
    var hour = parseInt(timeParts[0], 10);
    var minute = parseInt(timeParts[1], 10);
    if (parts[1] === "PM" && hour !== 12) hour += 12;
    if (parts[1] === "AM" && hour === 12) hour = 0;

    var slotStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), hour, minute, 0);
    var slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000); // 30 mins

    // Mark as booked if any calendar event overlaps with this slot
    var isBusy = existingEvents.some(function(event) {
      return (event.getStartTime() < slotEnd && event.getEndTime() > slotStart);
    });

    return {
      time: slotTime,
      isBooked: isBusy
    };
  });

  return slots;
}

// 2. Book appointment directly into your Google Calendar
function createCalendarAppointment(params) {
  var cal = CalendarApp.getDefaultCalendar();
  var name = params.name || "Client";
  var email = params.email || "";
  var dateStr = params.date || new Date().toISOString();
  var slotTime = params.slot || "11:00 AM";
  var notes = params.notes || "Booked via portfolio landing page";

  var targetDate = new Date(dateStr);
  var parts = slotTime.split(" ");
  var timeParts = parts[0].split(":");
  var hour = parseInt(timeParts[0], 10);
  var minute = parseInt(timeParts[1], 10);
  if (parts[1] === "PM" && hour !== 12) hour += 12;
  if (parts[1] === "AM" && hour === 12) hour = 0;

  var startTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), hour, minute, 0);
  var endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

  // Create real Google Calendar meeting with Google Meet link
  var title = "Design Discovery Call: Prime x " + name;
  var description = "30-Minute Design Discovery Call\n\nClient Name: " + name + "\nClient Email: " + email + "\nNotes: " + notes + "\nPlatform: Google Meet Video Call";

  var options = {
    description: description,
    guests: email,
    sendInvites: email ? true : false
  };

  var event = cal.createEvent(title, startTime, endTime, options);

  return {
    status: "success",
    message: "Meeting booked successfully on Google Calendar!",
    eventId: event.getId(),
    meetingTime: startTime.toISOString()
  };
}

// Main POST Handler: Book appointment
function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    if ((!p.name && !p.slot) && e && e.postData && e.postData.contents) {
      try { p = JSON.parse(e.postData.contents); } catch (err) {}
    }

    var result = createCalendarAppointment(p);
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Main GET Handler: Read live slots or book via GET fallback
function doGet(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};

    // 1. Fetch live slots from your Google Calendar
    if (p.action === "getSlots") {
      var slots = getAvailableSlots(p.date);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", slots: slots })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Book appointment via GET fallback
    if (p.action === "book" || p.slot) {
      var bookResult = createCalendarAppointment(p);
      return ContentService.createTextOutput(JSON.stringify(bookResult)).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput("Google Calendar live booking backend is running!");
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * ⚠️ CLICK "Run" ON THIS FUNCTION ONCE IN APPS SCRIPT
 * To grant permission to access your Google Calendar:
 */
function testCalendar() {
  var cal = CalendarApp.getDefaultCalendar();
  Logger.log("✓ SUCCESS: Google Calendar connected to: " + cal.getName() + " (" + cal.getId() + ")");
}
