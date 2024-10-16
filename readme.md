# Обертка над dsc-js-sdk для блокчейна Decimal

## Автоматическая установка:

вариант 1. Скачать, перейти в папку cd dsc-evm-sdk и запустить скрипт setup.sh

вариант 2. Скачать, перейти в папку cd dsc-evm-sdk и запустить python setup.py


## Ручная установка:

1. ```git clone https://github.com/maxwell2010/dsc-evm-sdk.git```
2. перейти в папку ```cd dsc-evm-sdk```
3. ```git clone --branch master https://bitbucket.org/decimalteam/dsc-js-sdk.git```
4. проверить в какой мы системе, если linux то выполняем команду ```sudo apt install nodejs npm```, если на windows то соответственно установить nodejs для windows. На момент тестирования у меня была 20 версия.
5. перейти в папку ```cd dsc-js-sdk```
6. инициализировать пакеты ```npm install```
7. вернуться в предыдущую папку ```cd ..```
8. установить библиотеку web3, ```pip3 install web3```



# Взаимодействие:
## Импортирование:

```python
import asyncio
from dsc_python import DecimalSDK
```

## Вызов нужной функции:

```python
import asyncio
from dsc_python import DecimalSDK

sdk = DecimalSDK()
mnemonic = 'ваша сид фраза'


async def main():
    response = await sdk.token_by_symbol('mintcandy') # Получение адреса смарт-контракта токена MINTCANDY
    print(response)
if __name__ == "__main__":
    asyncio.run(main())
```

Переводим 1000 DEL другому участнику
```python
await sdk.send_del('0x40900a48273644768c09183e00e43528c17a29f6', 1000000, mnemonic) 
``` 

Переводим 1000000 MINTCANDY другому участнику, где '0x4E8118E97586A60e5d71e45811E512546bCD52Ce' - адрес смарт-контракта mintcandy
```python
await sdk.transfer_token('0x4E8118E97586A60e5d71e45811E512546bCD52Ce', '0x40900a48273644768c09183e00e43528c17a29f6', 1000000, mnemonic) 
await sdk.transfer_token_symbol('mintcandy', '0x40900a48273644768c09183e00e43528c17a29f6', 1000000, mnemonic) 
``` 

Сжигание
```python
await sdk.burn_del(1000, mnemonic) 
await sdk.burn_token('0x4E8118E97586A60e5d71e45811E512546bCD52Ce', 1000, mnemonic) 
await sdk.burn_token_symbol('mintcandy', 1000, mnemonic) 
``` 

Получаем баланс DEL
```python
await sdk.balance_del('0x40900a48273644768c09183e00e43528c17a29f6') 
``` 

Делегируем 66666666 mintcandy в валидатор MintCandy
```python
await sdk.delegation_token_symbol('0x7a3585a25792e01f0e623881c96f8c1b36a75fbf', 'mintcandy', 66666666, 0, mnemonic) 
``` 

Покупаем mintcandy на 1000 DEL, где '0x4E8118E97586A60e5d71e45811E512546bCD52Ce' - адрес смарт-контракта mintcandy
```python
await sdk.buy_del_for_token('0x4E8118E97586A60e5d71e45811E512546bCD52Ce', 1000, mnemonic) 
await sdk.buy_del_for_token_symbol('mintcandy', 1000, mnemonic) 
``` 

Продаем 1000000 mintcandy
```python
await sdk.sell_del_for_token('mintcandy', 1000000, mnemonic)
await sdk.sell_del_for_token_symbol('mintcandy', 1000000, mnemonic)
```
