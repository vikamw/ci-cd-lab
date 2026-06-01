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

        let title = await driver.findElement(By.id('title'));
        console.log("Тест 1 пройден");

        let button = await driver.findElement(By.id('submitBtn'));
        console.log("Тест 2 пройден");

        let input = await driver.findElement(By.id('name'));
        console.log("Тест 3 пройден");

        let text = await button.getText();

        if (text !== 'Отправить') {
            throw new Error("Неверный текст кнопки");
        }

        console.log("Тест 4 пройден");

    } finally {
        await driver.quit();
    }
}

runTests();