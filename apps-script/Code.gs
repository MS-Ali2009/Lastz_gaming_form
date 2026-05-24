/**
 * Google Apps Script for Lastz Feedback Terminal
 * 
 * INSTRUCTIONS:
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code and update the DISCORD_WEBHOOK_URL.
 * 4. Deploy as a Web App (Excute as: Me, Who has access: Anyone).
 * 5. Copy the Web App URL and use it in your React frontend.
 */

const DISCORD_WEBHOOK_URL = "YOUR_DISCORD_WEBHOOK_URL_HERE";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append to Google Sheet
    sheet.appendRow([
      new Date(),
      data.allianceName,
      data.ign,
      data.powerLevel,
      data.role,
      data.problems,
      data.affectedMost,
      data.communication,
      data.improvements,
      data.unity,
      data.enjoyed,
      data.heard,
      data.leadership,
      data.concerns,
      data.finalMessage
    ]);
    
    // Send to Discord
    sendToDiscord(data);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendToDiscord(data) {
  const payload = {
    embeds: [{
      title: "🚀 New Feedback Received from " + data.ign,
      color: 0x7c3aed, // Neon Purple
      fields: [
        { name: "Alliance", value: data.allianceName || "N/A", inline: true },
        { name: "Role", value: data.role || "N/A", inline: true },
        { name: "Season 1 Enjoyed", value: data.enjoyed ? data.enjoyed.substring(0, 1024) : "N/A" },
        { name: "Key Suggestion", value: data.improvements ? data.improvements.substring(0, 1024) : "N/A" }
      ],
      timestamp: new Date().toISOString(),
      footer: { text: "Lastz Feedback Terminal" }
    }]
  };
  
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };
  
  UrlFetchApp.fetch(DISCORD_WEBHOOK_URL, options);
}

function doGet(e) {
  return ContentService.createTextOutput("Lastz Backend Terminal is Active");
}
