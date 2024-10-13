# Обертка над dsc-js-sdk для блокчейна Decimal

## Автоматическая установка:

1. Скачать и запустить скрипт setup.sh


## Ручная установка:

1. git clone --branch master https://bitbucket.org/decimalteam/dsc-js-sdk.git
2. проверить в какой мы системе, если linux то выполняем команду sudo apt install nodejs npm, если на windows то соответственно установить nodejs для windows. На момент тестирования у меня была 20 версия.
3. перейти в папку cd dsc-js-sdk
5. инициализировать пакеты npm install
6. вернуться в предыдущую папку
7. скачать [https://github.com/maxwell2010/dsc-evm-sdk/blob/main/js_sdk_query.js](https://github.com/maxwell2010/dsc-evm-sdk/blob/main/js_sdk_query.js) 
8. скачать [https://github.com/maxwell2010/dsc-evm-sdk/blob/main/dsc-python.py](https://github.com/maxwell2010/dsc-evm-sdk/blob/main/dsc-python.py)
9. установить pip3 install py_mini_racer


## Использование:

```python
async def main():
    # Загрузка JavaScript кода из файла
    with open('./js_sdk_query.js', 'r') as js_file:
        js_code = js_file.read()

    sdk = DecimalSDK(js_code)
    response = await sdk.send_del('0xRecipientAddress', 10, 'ваша мнемоническая фраза')
    print(response)

if __name__ == "__main__":
    asyncio.run(main())
```

