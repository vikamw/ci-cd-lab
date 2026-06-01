const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTests() {
    let options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.get('file://' + __dirname + '/../index.html');

        // Тест 1: заголовок существует
        await driver.findElement(By.id('title'));
        console.log("Тест 1 пройден");

        // Тест 2: поле ввода существует
        await driver.findElement(By.id('name'));
        console.log("Тест 2 пройден");

        // Тест 3: кнопка существует
        let button = await driver.findElement(By.id('submitBtn'));
        console.log("Тест 3 пройден");

        // Тест 4: текст кнопки
        let text = await button.getText();
        if (text !== 'Отправить') {
            throw new Error(`Неверный текст кнопки: "${text}"`);
        }
        console.log("Тест 4 пройден");

    } catch (err) {
        console.error("TEST FAILED:", err);
        process.exit(1);
    } finally {
        await driver.quit();
    }
}

runTests();
