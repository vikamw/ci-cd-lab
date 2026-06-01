const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTests() {

    let options = new chrome.Options();

    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {

        await driver.get('file://' + __dirname + '/../index.html');

        await driver.findElement(By.id('title'));
        console.log("Тест 1 OK");

        await driver.findElement(By.id('name'));
        console.log("Тест 2 OK");

        let button = await driver.findElement(By.id('submitBtn'));
        console.log("Тест 3 OK");

        let text = await button.getText();

        if (text.trim() !== 'Отправить') {
            throw new Error("Неверный текст кнопки");
        }

        console.log("Тест 4 OK");

    } catch (err) {
        console.error("TEST FAILED:", err);
        process.exit(1);
    } finally {
        await driver.quit();
    }
}

runTests();