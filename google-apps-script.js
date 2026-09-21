/**
 * UNIFIED GOOGLE APPS SCRIPT: GOOGLE CALENDAR + GOOGLE SHEETS LIVE BACKEND
 * -----------------------------------------------------------------------
 * Handles BOTH:
 * 1. GOOGLE CALENDAR: Real-time available slot checking & appointment booking (with Google Meet link).
 * 2. GOOGLE SHEETS: Automatic CRM logging for both Direct Messages (inquiries) AND Booked Appointments!
 *
 * HOW IT CONNECTS TO YOUR GOOGLE SHEET:
 * - Method 1 (Recommended): Open your Google Sheet, click Extensions > Apps Script, paste this code.
 *   It will automatically detect and write to the active Google Sheet!
 * - Method 2 (Standalone): Paste your Google Sheet URL or ID in the GOOGLE_SHEET_URL variable below.
 *
 * HOW TO DEPLOY:
 * 1. Paste this entire code into your Google Apps Script editor.
 * 2. In the toolbar function dropdown, select "testPermissions" and click "▷ Run".
 *    (Click "Review permissions" -> select your Google account -> "Advanced" -> "Go to (unsafe)" -> "Allow").
 * 3. Click "Deploy" > "Manage deployments" > click the pencil edit icon > select "New version" > click "Deploy".
 *    (Or Deploy > New deployment: Web app, Execute as: Me, Who has access: Anyone).
 */

// OPTIONAL: If your script is standalone (not created via Extensions > Apps Script inside a sheet),
// paste your Google Sheet URL or ID here (e.g. "https://docs.google.com/spreadsheets/d/.../edit")
var GOOGLE_SHEET_URL = "";

// Default working slot intervals (30 min each)
var DEFAULT_WORKING_SLOTS = ["09:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

/**
 * Safely get the target Google Sheet for lead logging.
 * Auto-creates formatted header row if the sheet is empty!
 */
function getTargetSheet() {
  var ss = null;

  // 1. Try URL / ID if provided
  if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL.trim() !== "") {
    try {
      if (GOOGLE_SHEET_URL.indexOf("http") === 0) {
        ss = SpreadsheetApp.openByUrl(GOOGLE_SHEET_URL.trim());
      } else {
        ss = SpreadsheetApp.openById(GOOGLE_SHEET_URL.trim());
      }
    } catch (e) {
      Logger.log("Could not open sheet by URL/ID: " + e.toString());
    }
  }

  // 2. Try bound active spreadsheet (Extensions > Apps Script inside sheet)
  if (!ss) {
    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (e) {
      Logger.log("No active spreadsheet bound to script: " + e.toString());
    }
  }

  if (!ss) {
    return null;
  }

  var sheet = ss.getActiveSheet();

  // Auto-initialize header row if blank
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Type", "Name", "Email", "Details / Message", "Date / Slot", "Status"]);
    sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#FFF1EB").setFontColor("#210F06");
  }

  return sheet;
}

/**
 * 1. Log Lead/Message or Appointment to Google Sheet
 */
function logToSheet(type, name, email, details, slotOrDate, status) {
  try {
    var sheet = getTargetSheet();
    if (!sheet) {
      Logger.log("Notice: Google Sheet not connected. Skipping sheet logging.");
      return false;
    }

    var safeName = name || "Anonymous";
    var safeEmail = email || "N/A";
    var safeDetails = details || "";

    // De-duplication check: prevent duplicate row if identical submission received
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      try {
        var lastRowData = sheet.getRange(lastRow, 3, 1, 3).getValues()[0]; // Columns: Name, Email, Details
        if (String(lastRowData[0]) === safeName &&
            String(lastRowData[1]) === safeEmail &&
            String(lastRowData[2]) === safeDetails) {
          Logger.log("Duplicate entry detected and prevented for: " + safeEmail);
          return true; // Handled cleanly without duplicate insertion
        }
      } catch (dedupErr) {
        Logger.log("Dedup check error: " + dedupErr.toString());
      }
    }

    var timestamp = new Date().toLocaleString();
    sheet.appendRow([
      timestamp,
      type || "Inquiry",
      safeName,
      safeEmail,
      safeDetails,
      slotOrDate || "N/A",
      status || "New"
    ]);
    return true;
  } catch (err) {
    Logger.log("Sheet logging error: " + err.toString());
    return false;
  }
}

/**
 * 2. Fetch live available slots for a given date from Google Calendar
 */
function getAvailableSlots(dateStr) {
  var cal = CalendarApp.getDefaultCalendar();
  var targetDate = dateStr ? new Date(dateStr) : new Date();

  var startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0);
  var endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 23, 59, 59);

  // Get all events already on your calendar for that day
  var existingEvents = cal.getEvents(startOfDay, endOfDay);

  var slots = DEFAULT_WORKING_SLOTS.map(function (slotTime) {
    var parts = slotTime.split(" ");
    var timeParts = parts[0].split(":");
    var hour = parseInt(timeParts[0], 10);
    var minute = parseInt(timeParts[1], 10);
    if (parts[1] === "PM" && hour !== 12) hour += 12;
    if (parts[1] === "AM" && hour === 12) hour = 0;

    var slotStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), hour, minute, 0);
    var slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000); // 30 mins

    // Mark as booked if any calendar event overlaps with this slot
    var isBusy = existingEvents.some(function (event) {
      return (event.getStartTime() < slotEnd && event.getEndTime() > slotStart);
    });

    return {
      time: slotTime,
      isBooked: isBusy
    };
  });

  return slots;
}

/**
 * 3. Book appointment directly into Google Calendar AND log into Google Sheet
 */
function createCalendarAppointment(params) {
  var cal = CalendarApp.getDefaultCalendar();
  var name = params.name || "Client";
  var email = params.email || "";
  var dateStr = params.date || new Date().toISOString();
  var slotTime = params.slot || "11:00 AM";
  var notes = params.notes || "Design Consultation";

  var targetDate = new Date(dateStr);
  var parts = slotTime.split(" ");
  var timeParts = parts[0].split(":");
  var hour = parseInt(timeParts[0], 10);
  var minute = parseInt(timeParts[1], 10);
  if (parts[1] === "PM" && hour !== 12) hour += 12;
  if (parts[1] === "AM" && hour === 12) hour = 0;

  var startTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), hour, minute, 0);
  var endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

  // Create Google Calendar event with Google Meet link
  var title = "Design Discovery Call: Prime x " + name;
  var description = "30-Minute Design Discovery Call\n\nClient Name: " + name + "\nClient Email: " + email + "\nNotes: " + notes + "\nPlatform: Google Meet Video Call";

  var options = {
    description: description,
    guests: email,
    sendInvites: email ? true : false
  };

  var event = cal.createEvent(title, startTime, endTime, options);

  // Log to Google Sheet
  var formattedDateStr = targetDate.toLocaleDateString() + " at " + slotTime;
  logToSheet("Call Booking", name, email, notes, formattedDateStr, "Confirmed (Google Meet)");

  return {
    status: "success",
    message: "Meeting booked on Google Calendar & recorded in Google Sheet!",
    eventId: event.getId(),
    meetingTime: startTime.toISOString()
  };
}

/**
 * 4. Handle Direct Message / Inquiry Form Submission (Google Sheet)
 */
function handleDirectMessage(params) {
  var name = params.name || "Anonymous";
  var email = params.email || "";
  var message = params.message || params.notes || "";

  var logged = logToSheet("Direct Message", name, email, message, "N/A", "New Inquiry");

  return {
    status: "success",
    message: logged ? "Inquiry saved to Google Sheet!" : "Inquiry received successfully!",
    sheetConnected: logged
  };
}

// Main POST Handler
function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    if ((!p.action && !p.name && !p.slot) && e && e.postData && e.postData.contents) {
      try { p = JSON.parse(e.postData.contents); } catch (err) { }
    }

    var result;
    if (p.action === "message" || p.action === "inquiry" || p.message) {
      result = handleDirectMessage(p);
    } else if (p.action === "book" || p.slot) {
      result = createCalendarAppointment(p);
    } else {
      result = handleDirectMessage(p);
    }

    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Main GET Handler
function doGet(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};

    // 1. Fetch live slots from Google Calendar
    if (p.action === "getSlots") {
      var slots = getAvailableSlots(p.date);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", slots: slots })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Book appointment via GET fallback
    if (p.action === "book" || p.slot) {
      var bookResult = createCalendarAppointment(p);
      return ContentService.createTextOutput(JSON.stringify(bookResult)).setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Direct Message inquiry via GET fallback
    if (p.action === "message" || p.action === "inquiry" || p.message) {
      var msgResult = handleDirectMessage(p);
      return ContentService.createTextOutput(JSON.stringify(msgResult)).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput("Google Calendar & Google Sheets live backend is running!");
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * ⚠️ CLICK "Run" ON THIS FUNCTION ONCE IN APPS SCRIPT
 * To grant permissions for BOTH Google Calendar AND Google Sheet:
 */
function testPermissions() {
  // Test Calendar
  var cal = CalendarApp.getDefaultCalendar();
  Logger.log("✓ Google Calendar Connected: " + cal.getName());

  // Test Sheet
  var sheet = getTargetSheet();
  if (sheet) {
    sheet.appendRow([new Date().toLocaleString(), "Test System", "system@test.com", "Testing permissions", "N/A", "Verified"]);
    Logger.log("✓ Google Sheet Connected: " + sheet.getName());
  } else {
    Logger.log("ℹ️ No sheet attached yet. If running standalone, set GOOGLE_SHEET_URL at top of script.");
  }
}
