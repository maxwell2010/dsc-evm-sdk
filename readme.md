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

```js
const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
const decimalWallet = new Wallet(mnemonic);

//DecimalNetworks.devnet - is devnet
//DecimalNetworks.testnet - is testnet
//DecimalNetworks.mainnet - is mainnet
const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.mainnet);

//To work with Decimal contracts, they need to be initialized
//You can initialize all contracts at once, or individually
//If you forgot to initialize the contact before using the function, it will be initialized automatically during the execution of the function
//To speed up the sdk, we recommend doing this in advance
await decimalEVM.connect(); // initializes all contacts
//or
await decimalEVM.connect('contract-center') // initializes only contract-center contact
await decimalEVM.connect('token-center') // initializes only token-center contact
await decimalEVM.connect('nft-center') // initializes only nft-center contact
await decimalEVM.connect('delegation') // initializes only delegation contact (delegation token)
await decimalEVM.connect('delegation-nft') // initializes only delegation-nft contact (delegation nft)
await decimalEVM.connect('master-validator') // initializes only master-validator contact (master node)
await decimalEVM.connect('multi-call') // initializes only multi-call contact (multi send)
await decimalEVM.connect('multi-sig') // initializes only multi-sig contact
```

## DEL
