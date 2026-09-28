import { test } from "node:test";
import assert from "node:assert/strict";
import { classify, ncrCity, parseCsvLine, titleCase } from "./mca.ts";

test("classify", () => {
  assert.deepEqual(classify("U15499MH2005PTC123456", "Manufacturing (Food stuffs)", "X"), { service: "manufacturing", categories: ["food_beverage"] });
  assert.deepEqual(classify("U10790MH2019PTC123456", "Manufacturing (Food stuffs)", "X"), { service: "manufacturing", categories: ["food_beverage"] });
  assert.equal(classify("U15200MH2019PTC123456", "Manufacturing (Leather & products thereof)", "X"), null);
  assert.deepEqual(classify("U24240GA2001PTC000001", "Manufacturing (Metals & Chemicals, and products thereof)", "X")?.categories, ["skincare_beauty"]);
  assert.equal(classify("U25200MH2019PTC123456", "Manufacturing (Metals & Chemicals, and products thereof)", "ACME ARMS PVT LTD"), null);
  assert.equal(classify("U25200MH2001PTC123456", "Manufacturing (Metals & Chemicals, and products thereof)", "ACME POLYMERS PVT LTD")?.service, "packaging");
  assert.equal(classify("U63020GA2004PTC000001", "Transport, storage and Communications", "X")?.service, "logistics");
  assert.equal(classify("U74999GA2010PTC000001", "Business Services", "X"), null);
  assert.equal(classify("L15499DL1990PLC000001", "Manufacturing (Food stuffs)", "RELIANCE INFOTEK LIMITED"), null);
  assert.equal(classify("U52100GA2004PTC000001", "Trading", "SAS TRADERS"), null);
  assert.equal(classify("U52100MH2019PTC000001", "Transport, storage and Communications", "X")?.service, "logistics");
  assert.equal(classify("U71200GA2004PTC000001", "Real Estate and Renting", "X"), null);
  assert.equal(classify("U71200MH2019PTC000001", "Business Services", "X")?.service, "testing");
});

test("parseCsvLine", () => {
  assert.deepEqual(parseCsvLine('"A","B, C",NA,"say ""hi"""'), ["A", "B, C", "NA", 'say "hi"']);
  assert.deepEqual(parseCsvLine(""), [""]);
});

test("titleCase", () => {
  assert.equal(titleCase("CRUNCHY FOODS (INDIA) PRIVATE LIMITED"), "Crunchy Foods (INDIA) Private Limited");
  assert.equal(titleCase("ABC LOGISTICS LLP"), "Abc Logistics LLP");
});

test("ncrCity", () => {
  assert.equal(ncrCity("Delhi", "OKHLA PHASE II NEW DELHI"), "Delhi");
  assert.equal(ncrCity("Haryana", "PLOT 5, SECTOR 18, GURGAON Haryana INDIA"), "Gurugram");
  assert.equal(ncrCity("Uttar Pradesh", "KNOWLEDGE PARK III, GREATER NOIDA"), "Greater Noida");
  assert.equal(ncrCity("Uttar Pradesh", "C-56 SECTOR 62 NOIDA"), "Noida");
  assert.equal(ncrCity("Uttar Pradesh", "SITE IV SAHIBABAD INDUSTRIAL AREA"), "Ghaziabad");
  assert.equal(ncrCity("Uttar Pradesh", "CIVIL LINES KANPUR"), null);
  assert.equal(ncrCity("Haryana", "SECTOR 3 PANCHKULA"), null);
});
