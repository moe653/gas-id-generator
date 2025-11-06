function writeToRow(row, values) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    // values は配列で渡す（例: ["input", "code"]）
    sheet.getRange(row, 1, 1, values.length).setValues([values]);
    Logger.log(`行 ${row} に値 ${JSON.stringify(values)} を書き込みました`);
}
