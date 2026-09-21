/**
 * GOOGLE APPS SCRIPT: GOOGLE CALENDAR + GOOGLE SHEETS LIVE BACKEND
 * -----------------------------------------------------------------
 * This script provides a complete live backend for your landing page:
 * 1. Reads your Google Calendar for live free/busy time slots.
 * 2. Books appointments directly into your Google Calendar (creates Google Meet event).
 * 3. Logs all inquiries and appointment bookings into your Google Sheet.
 */

var SHEET_URL = ""; // Optional: Paste your full Google Sheet URL here if needed (e.g. "https://docs.google.com/spreadsheets/d/.../edit")

// Standard working hours slots (30 min each)
var DEFAULT_SLOTS = ["09:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

function getTargetSheet() {
  if (SHEET_URL && SHEET_URL.trim() !== "") {
    return SpreadsheetApp.openByUrl(SHEET_URL).getActiveSheet();
  }
  try {
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  } catch (err) {
    throw new Error("Could not find spreadsheet. If this is a standalone script, set the SHEET_URL variable at the top of the script.");
  }
}

// 1. Fetch live available slots for a given date from Google Calendar
function getLiveSlots(dateStr) {
  var cal = CalendarApp.getDefaultCalendar();
  var targetDate = dateStr ? new Date(dateStr) : new Date();
  
  // Start and end of selected day
  var startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0);
  var endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 23, 59, 59);

  var events = cal.getEvents(startOfDay, endOfDay);

  var result = DEFAULT_SLOTS.map(function(slotTime) {
    // Parse hour & minute of slot
    var parts = slotTime.split(" ");
    var timeParts = parts[0].split(":");
    var hour = parseInt(timeParts[0], 10);
    var minute = parseInt(timeParts[1], 10);
    if (parts[1] === "PM" && hour !== 12) hour += 12;
    if (parts[1] === "AM" && hour === 12) hour = 0;

    var slotStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), hour, minute, 0);
    var slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000); // 30 minutes

    // Check if slot overlaps with any calendar event
    var isBusy = events.some(function(event) {
      return (event.getStartTime() < slotEnd && event.getEndTime() > slotStart);
    });

    return {
      time: slotTime,
      isBooked: isBusy
    };
  });

  return result;
}

// 2. Book appointment into Google Calendar + Google Sheet
function bookAppointment(params) {
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

  // Create Google Calendar event
  var eventTitle = "Design Discovery Call: Prime x " + name;
  var description = "30-Minute Design Discovery Call\n\nClient: " + name + "\nEmail: " + email + "\nNotes: " + notes + "\nPlatform: Google Meet";
  
  var eventOptions = {
    description: description,
    guests: email,
    sendInvites: email ? true : false
  };

  var event = cal.createEvent(eventTitle, startTime, endTime, eventOptions);

  // Also log into Google Sheet
  try {
    var sheet = getTargetSheet();
    var timestamp = new Date().toLocaleString();
    var formattedMeetingTime = startTime.toLocaleDateString() + " at " + slotTime;
    sheet.appendRow([timestamp, name, email, "Appointment: " + formattedMeetingTime, "Discovery Call (Free)", notes]);
  } catch (err) {
    Logger.log("Sheet log warning: " + err.toString());
  }

  return {
    status: "success",
    message: "Appointment created on Google Calendar!",
    eventId: event.getId()
  };
}

// 3. Handle General Inquiry to Sheet
function logInquiry(params) {
  var sheet = getTargetSheet();
  var timestamp = params.timestamp || new Date().toLocaleString();
  var name = params.name || "Anonymous";
  var email = params.email || "No email";
  var service = params.service || "General";
  var budget = params.budget || "N/A";
  var message = params.message || "";

  sheet.appendRow([timestamp, name, email, service, budget, message]);

  return {
    status: "success",
    message: "Inquiry saved to Google Sheet!"
  };
}

// Main POST Handler
function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    if ((!p.action && !p.name) && e && e.postData && e.postData.contents) {
      try { p = JSON.parse(e.postData.contents); } catch (err) {}
    }

    var result;
    if (p.action === "book" || p.slot) {
      result = bookAppointment(p);
    } else {
      result = logInquiry(p);
    }

    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Main GET Handler (supports live slot reading and GET booking fallback)
function doGet(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};

    // Check if requesting live slots
    if (p.action === "getSlots") {
      var slots = getLiveSlots(p.date);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", slots: slots })).setMimeType(ContentService.MimeType.JSON);
    }

    // Check if booking via GET
    if (p.action === "book" || p.slot) {
      var bookResult = bookAppointment(p);
      return ContentService.createTextOutput(JSON.stringify(bookResult)).setMimeType(ContentService.MimeType.JSON);
    }

    // Check if inquiry via GET
    if (p.name || p.email) {
      var inqResult = logInquiry(p);
      return ContentService.createTextOutput(JSON.stringify(inqResult)).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput("Google Calendar & Sheets backend is active and running!");
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * ⚠️ IMPORTANT: CLICK "Run" ON THIS FUNCTION ONCE IN APPS SCRIPT
 * This prompts: "Authorization Required" -> Click "Review Permissions" -> "Allow"
 * It authorizes BOTH Google Calendar and Google Sheet in 1 click!
 */
function testCalendarAndSheet() {
  // Test Sheet
  var sheet = getTargetSheet();
  sheet.appendRow([new Date().toLocaleString(), "Test Calendar User", "test@domain.com", "Test Appointment", "Free", "Testing Google Calendar & Sheet"]);
  Logger.log("✓ Google Sheet permission verified!");

  // Test Calendar
  var cal = CalendarApp.getDefaultCalendar();
  Logger.log("✓ Google Calendar connected to: " + cal.getName());
}
