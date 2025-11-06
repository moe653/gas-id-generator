function doGet() {
    return HtmlService.createHtmlOutputFromFile('index');
}

function getOrCreateCode(userInput) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    let lastRow = sheet.getLastRow();

    // --- 入力値を半角英数字に統一 ---
    userInput = String(userInput)
        .trim()
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) =>
        String.fromCharCode(s.charCodeAt(0) - 0xfee0)
        )
        .replace(/\s/g, ""); // 全角・半角スペースを含め，すべて削除

    let aValues = [];
    let bValues = [];

    // --- データが存在する場合のみ取得 ---
    if (lastRow > 0) {
        aValues = sheet.getRange(1, 1, lastRow).getValues().flat().map(String);
        bValues = sheet.getRange(1, 2, lastRow).getValues().flat().map(String);
    }

    // --- 1. 既存のA列に一致するか確認 ---
    const index = aValues.indexOf(userInput);
    if (index != -1) {
        // 見つかった場合 → 対応するB列の値を返す
        return bValues[index];
    }

    // --- 2. 被らない乱数を生成 ---
    let newCode;
    do {
        newCode = generateRandomCode(5);
    } while (bValues.includes(newCode));

    // --- 3. 新しい行にA列とB列を書き込む ---
    const lock = LockService.getDocumentLock();
    if (lock.tryLock(1 * 1000)) {
        lastRow = sheet.getLastRow();
        const newRow = lastRow + 1;
        writeToRow(newRow, [userInput, newCode]);


        // ちょっと待つ
        Utilities.sleep(5 * 1000);
        
        // ロック開放
        lock.releaseLock();
    }

    return newCode;
}

// --- テスト関数 ---
function test_getOrCreateCode() {
    const input = 1234; // テスト用入力
    const result = getOrCreateCode(input);
    Logger.log(`入力: ${input} → 出力: ${result}`);
}
