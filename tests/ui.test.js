const { Builder, By } = require('selenium-webdriver');
const path = require('path');

async function runTests() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {

        const filePath = 'file://' + path.resolve(__dirname, '../index.html');

        await driver.get(filePath);

        // Тест 1
        let title = await driver.findElement(By.id('title'));
        console.log("Тест 1 пройден");

        // Тест 2
        let button = await driver.findElement(By.id('submitBtn'));
        console.log("Тест 2 пройден");

        // Тест 3
        let input = await driver.findElement(By.id('name'));
        console.log("Тест 3 пройден");

        // Тест 4
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