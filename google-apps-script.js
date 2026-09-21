/**
 * GOOGLE APPS SCRIPT FOR RABBIT LANDING PAGE
 * -------------------------------------------
 * 
 * WHY DATA MIGHT NOT BE REFLECTING:
 * 1. "Who has access" MUST be set to "Anyone" (NOT "Only myself").
 *    - In Apps Script, click: Deploy > Manage deployments
 *    - Click the pencil icon (Edit)
 *    - Under "Who has access", change to: Anyone
 *    - Click Deploy!
 * 
 * 2. FIRST-TIME AUTHORIZATION:
 *    - Click "Run" on testSheet() below once to approve Google Drive & Sheet permissions.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Extract parameters from form submission
    var p = (e && e.parameter) ? e.parameter : {};
    
    // Fallback if sent as JSON payload
    if ((!p.name && !p.email) && e && e.postData && e.postData.contents) {
      try {
        p = JSON.parse(e.postData.contents);
      } catch (err) {
        // keep p as is
      }
    }

    var timestamp = p.timestamp || new Date().toLocaleString();
    var name = p.name || 'Anonymous';
    var email = p.email || 'No email provided';
    var service = p.service || 'General';
    var budget = p.budget || 'Not specified';
    var message = p.message || '';

    // Append the row to your Google Sheet
    sheet.appendRow([timestamp, name, email, service, budget, message]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'success', message: 'Row added' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Google Sheets Webhook is active! If you see this, your deployment is working properly.");
}

// Helper function: Run this inside Apps Script editor to authorize sheet permissions
function testSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([new Date().toLocaleString(), "Test Name", "test@domain.com", "Brand Identity", "$3k - $5k", "Test connection row"]);
  Logger.log("Test row successfully added!");
}
