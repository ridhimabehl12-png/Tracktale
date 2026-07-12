const XLSX = require('xlsx');
// Simulate a realistic SMS sheet like LP_SMS_Spring27_RICHA.xlsx might look
const data = [
  { "Style Code": "022284", "Description": "Arley Cotton Jersey Midi Dress", "Category": "Knit Dresses", "Units": 3000 },
  { "Style Code": "022424", "Description": "Ashlee Button Front Pullover", "Category": "LillyLounge", "Units": 2300 },
  { "Style Code": "", "Description": "SUBTOTAL", "Category": "", "Units": 5300 },  // junk row
  { "Style Code": "023130", "Description": "Aubra 5\" Short", "Category": "LillyLounge", "Units": 1850 },
];
const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
XLSX.writeFile(wb, "/tmp/test_sms.xlsx");

// Now parse it back the way the app does
const wb2 = XLSX.read(require('fs').readFileSync("/tmp/test_sms.xlsx"), { type: "buffer" });
const rows = XLSX.utils.sheet_to_json(wb2.Sheets[wb2.SheetNames[0]], { defval: "" });
console.log("Total rows parsed:", rows.length);
const keys = Object.keys(rows[0]);
const findKey = (cands) => keys.find(k => cands.some(c => k.toLowerCase().replace(/[^a-z0-9]/g, "").includes(c)));
const codeKey = findKey(["stylecode", "style", "code"]);
console.log("Detected code column:", codeKey);
const valid = rows.filter(r => String(r[codeKey]).trim() !== "");
console.log("Rows with a style code:", valid.length, "(should be 3, junk row dropped)");
