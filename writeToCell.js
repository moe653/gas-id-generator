function writeToCell(row, column, value) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.getRange(row, column).setValue(value);
    Logger.log(`行 ${row} 列 ${column} に値 '${value}' を書き込みました`);
}