# Обертка над dsc-js-sdk для блокчейна Decimal

## Автоматическая установка:

вариант 1. Скачать, перейти в папку cd dsc-evm-sdk и запустить скрипт setup.sh

вариант 2. Скачать, перейти в папку cd dsc-evm-sdk и запустить python setup.py


## Ручная установка:

1. git clone https://github.com/maxwell2010/dsc-evm-sdk.git
2. перейти в папку cd dsc-evm-sdk
3. git clone --branch master https://bitbucket.org/decimalteam/dsc-js-sdk.git
4. проверить в какой мы системе, если linux то выполняем команду sudo apt install nodejs npm, если на windows то соответственно установить nodejs для windows. На момент тестирования у меня была 20 версия.
5. перейти в папку cd dsc-js-sdk
6. инициализировать пакеты npm install
7. вернуться в предыдущую папку
8. установить pip3 install py_mini_racer


## Использование:

```python
import asyncio
from dsc_python import DecimalSDK

sdk = DecimalSDK()

async def main():
    response = await sdk.token_by_symbol('mintcandy') # Получение смарт-контракта токена MINTCANDY
    print(response)

if __name__ == "__main__":
    asyncio.run(main())
```

