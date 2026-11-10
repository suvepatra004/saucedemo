import { google } from "googleapis";
import type { Reporter, TestCase, TestResult } from "@playwright/test/reporter";

class GoogleSheetReporter implements Reporter {
  private results = new Map<string, { status: string; executedAt: string }>();

  private readonly spreadsheetId = process.env.GOOGLE_SHEET_ID;

  private readonly sheetName = "Test Coverage";

  onTestEnd(test: TestCase, result: TestResult) {
    const match = test.title.match(/\[(TC_\d+)\]/);

    if (!match) {
      console.warn(`Missing TC ID: ${test.title}`);
      return;
    }

    const statusMap: Record<string, string> = {
      passed: "PASSED",
      failed: "FAILED",
      timedOut: "FAILED",
      skipped: "SKIPPED",
      interrupted: "INTERRUPTED",
    };

    this.results.set(match[1], {
      status: statusMap[result.status] ?? "UNKNOWN",
      executedAt: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    });
  }

  async onEnd() {
    if (!this.spreadsheetId) {
      throw new Error("GOOGLE_SHEET_ID is missing");
    }

    if (this.results.size === 0) return;

    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `'${this.sheetName}'!A:A`,
    });

    const rows = response.data.values ?? [];
    const rowMap = new Map<string, number>();

    rows.forEach((row, index) => {
      if (row[0]) {
        rowMap.set(String(row[0]).trim(), index + 1);
      }
    });

    const updates = [];

    for (const [testId, result] of this.results) {
      const rowNumber = rowMap.get(testId);

      if (!rowNumber) {
        console.warn(`Not found in sheet: ${testId}`);
        continue;
      }

      updates.push({
        range: `'${this.sheetName}'!D${rowNumber}:E${rowNumber}`,
        values: [[result.status, result.executedAt]],
      });
    }

    if (!updates.length) return;

    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: this.spreadsheetId,
      requestBody: {
        valueInputOption: "RAW",
        data: updates,
      },
    });

    console.log(`Updated ${updates.length} test cases in Google Sheets`);
  }
}

export default GoogleSheetReporter;
