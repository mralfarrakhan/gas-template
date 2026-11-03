/**
 * Main Google Apps Script entry point.
 * Provides onOpen menu, dialog/sidebar handlers, standalone web app doGet(), and sample server RPC functions.
 */

/**
 * Automatically creates custom menu when the Google Sheet is opened.
 */
export function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Apps Script App")
    .addItem("Open Dialog", "openDialog")
    .addItem("Open Sidebar", "openSidebar")
    .addToUi();
}

/**
 * Opens a modal dialog in Google Sheets.
 */
export function openDialog() {
  const html = HtmlService.createHtmlOutputFromFile("Index")
    .setWidth(800)
    .setHeight(600)
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setTitle("Apps Script App");

  SpreadsheetApp.getUi().showModalDialog(html, "Apps Script App");
}

/**
 * Opens a sidebar in Google Sheets.
 */
export function openSidebar() {
  const html =
    HtmlService.createHtmlOutputFromFile("Index").setTitle("Apps Script App");

  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Web App entry point for standalone deployments.
 */
export function doGet(_e: GoogleAppsScript.Events.DoGet) {
  return HtmlService.createHtmlOutputFromFile("Index")
    .setTitle("Apps Script App")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Sample RPC function callable via google.script.run.getAppInfo()
 */
export function getAppInfo() {
  return {
    version: typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "1.0.0",
    userEmail: Session.getActiveUser().getEmail() || "anonymous",
    timeZone: Session.getScriptTimeZone(),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Sample RPC function callable via google.script.run.sayHello(name)
 */
export function sayHello(name: string): string {
  return `Hello, ${name || "World"}! Received at ${new Date().toLocaleTimeString()}`;
}
