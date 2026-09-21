/**
 * GOOGLE APPS SCRIPT FOR RABBIT LANDING PAGE (V3 - UNIVERSAL)
 * -----------------------------------------------------------
 * This script accepts inquiries via BOTH POST and GET requests.
 * 
 * STEP 1: If your script is inside the sheet (Extensions > Apps Script), leave SHEET_URL empty.
 *         If your script was created from script.google.com, paste your Google Sheet URL between the quotes below.
 */

var SHEET_URL = ""; // Optional: Paste your full Google Sheet URL here if needed (e.g. "https://docs.google.com/spreadsheets/d/.../edit")

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

function handleInquiry(e) {
  var sheet = getTargetSheet();
  var p = (e && e.parameter) ? e.parameter : {};

  // If parameters weren't in URL/form-encoded, check JSON postData
  if ((!p.name && !p.email) && e && e.postData && e.postData.contents) {
    try {
      p = JSON.parse(e.postData.contents);
    } catch (err) {
      // ignore
    }
  }

  var timestamp = p.timestamp || new Date().toLocaleString();
  var name = p.name || 'Anonymous';
  var email = p.email || 'No email';
  var service = p.service || 'General';
  var budget = p.budget || 'N/A';
  var message = p.message || '';

  sheet.appendRow([timestamp, name, email, service, budget, message]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "success", message: "Inquiry saved successfully!" })
  ).setMimeType(ContentService.MimeType.JSON);
}

// Accepts POST submissions from landing page form
function doPost(e) {
  try {
    return handleInquiry(e);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Accepts GET submissions as a 100% fail-safe backup
function doGet(e) {
  try {
    if (e && e.parameter && (e.parameter.name || e.parameter.email)) {
      return handleInquiry(e);
    }
    return ContentService.createTextOutput("Google Sheets Webhook is active and ready to log inquiries!");
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * ⚠️ IMPORTANT: CLICK "Run" ON THIS FUNCTION ONCE IN APPS SCRIPT
 * This forces Google to prompt you: "Authorization Required" -> Click "Review Permissions" -> "Allow"
 */
function testSheet() {
  var sheet = getTargetSheet();
  sheet.appendRow([new Date().toLocaleString(), "Test Client", "test@domain.com", "Brand Identity", "$3k - $5k", "Testing connection"]);
  Logger.log("SUCCESS! A test row was added to your sheet.");
}
