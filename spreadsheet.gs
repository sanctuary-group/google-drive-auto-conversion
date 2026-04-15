/**
 * スプレッドシート作成モジュール
 * パースされた請求書データからGoogle Spreadsheetを作成する
 */

/**
 * 取引台帳に1エントリを追記
 * @param {Object} entry - parseLedgerEntry()の戻り値
 */
function appendToLedger(entry) {
  if (!CFG.ledger.spreadsheetId) {
    throw new Error('CFG.ledger.spreadsheetId が未設定です。createLedgerSpreadsheet() を実行してください');
  }

  var ss = SpreadsheetApp.openById(CFG.ledger.spreadsheetId);
  var sheet = ss.getSheetByName(CFG.ledger.sheetName) || ss.getActiveSheet();

  var row = [
    Utilities.formatDate(entry.processedAt, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss'),
    entry.fileName,
    entry.fileLink,
    entry.docType,
    entry.vendor || '',
    entry.issueDate || '',
    entry.docNumber || '',
    entry.total || '',
    entry.subtotal || '',
    entry.tax || '',
    entry.paymentDueDate || '',
    entry.contentSummary || '',
    entry.rawText || '',
    entry.status,
  ];

  sheet.appendRow(row);

  // 金額列（合計8, 小計9, 消費税10）をカンマ区切り表示に
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 8, 1, 3).setNumberFormat('#,##0');

  console.log('台帳に追記: ' + entry.fileName +
              ' (' + entry.docType + ' / ' + (entry.vendor || '取引先未検出') +
              ' / ' + (entry.total || '金額未検出') + ')');
}
