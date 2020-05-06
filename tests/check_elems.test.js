const Differencify = require("differencify");
const differencify = new Differencify({ mismatchThreshold: 0 });
let urlToTest = "http://127.0.0.1:8080/";

describe("Zadanie", () => {
  const timeout = 30000;
  let page;

  beforeAll(async () => {
    await differencify.launchBrowser({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const target = differencify.init({ chain: false });
    page = await target.newPage();
    await page.goto(urlToTest);
    await page.waitFor(1000);
  }, timeout);
  afterAll(async () => {
    await differencify.cleanup();
  });

  it("94% dla widoku do 360px", async () => {
    await page.setViewport({width: 300, height: 600})
    const div = await page.$eval("div", elem => {
      return getComputedStyle(elem).width === "282px";
    });
    expect(div).toBe(true);
  }, timeout);

  it("96% dla widoku do 768px", async () => {
    await page.setViewport({width: 760, height: 600})
    const div = await page.$eval("div", elem => {
      return getComputedStyle(elem).width === "729.594px";
    });
    expect(div).toBe(true);
  }, timeout);

  it("720px dla widoku do 1024px", async () => {
    await page.setViewport({width: 1000, height: 600})
    const div = await page.$eval("div", elem => {
      return getComputedStyle(elem).width === "720px";
    });
    expect(div).toBe(true);
  }, timeout);

  it("996px dla widoku powyżej 1024px", async () => {
    await page.setViewport({width: 1200, height: 600})
    const div = await page.$eval("div", elem => {
      return getComputedStyle(elem).width === "996px";
    });
    expect(div).toBe(true);
  }, timeout);
});
