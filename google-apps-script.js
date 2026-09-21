/**
 * GOOGLE APPS SCRIPT FOR RABBIT LANDING PAGE
 * -------------------------------------------
 * This script receives form inquiries from your landing page and logs them into your Google Sheet.
 * 
 * HOW TO SET THIS UP (Takes 2 minutes):
 * 1. Open Google Sheets (https://sheets.new)
 * 2. In row 1, add these headers:
 *    A1: Timestamp | B1: Name | C1: Email | D1: Service | E1: Budget | F1: Message
 * 3. In the top menu, click Extensions > Apps Script
 * 4. Delete any code in the editor, and paste this entire file content.
 * 5. Click the blue "Deploy" button (top right) > "New deployment"
 * 6. Click the gear icon next to "Select type" > choose "Web app"
 * 7. Configure:
 *    - Description: Landing Page Inquiries
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone (Important: so your website visitors can submit)
 * 8. Click "Deploy", copy the "Web app URL" (ends in /exec)
 * 9. Paste that URL into your `.env` file as:
 *    VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/.../exec
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    var timestamp = new Date();
    var name = data.name || '';
    var email = data.email || '';
    var service = data.service || '';
    var budget = data.budget || '';
    var message = data.message || '';

    // Append row to the sheet
    sheet.appendRow([timestamp, name, email, service, budget, message]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'success', message: 'Row added successfully' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Google Sheets Webhook is active and listening for POST requests.");
}
