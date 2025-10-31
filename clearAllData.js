// --- シート内の全てのデータを削除 ---
function clearAllData() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();

    if (lastRow === 0 || lastCol === 0) {
        Logger.log("シートはすでに空です．");
        return;
    }

    // シート全体の内容を削除（書式は残す）
    sheet.getRange(1, 1, lastRow, lastCol).clearContent();

    Logger.log("シート内のすべてのデータを削除しました．");
}