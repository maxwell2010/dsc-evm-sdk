#!/bin/bash

# Клонирование репозитория
git clone --branch master https://bitbucket.org/decimalteam/dsc-js-sdk.git
cd dsc-js-sdk

# Проверка операционной системы
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo apt install -y nodejs npm
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Установите Node.js вручную для macOS."
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo "Установите Node.js вручную для Windows."
else
    echo "Неизвестная операционная система. Установите Node.js вручную."
fi

# Установка зависимостей
npm install

# Возврат в предыдущую папку
cd ..

# Скачивание Python SDK
curl -O https://raw.githubusercontent.com/maxwell2010/dsc-evm-sdk/main/dsc-python.py

# Установка зависимостей Python
pip3 install py_mini_racer

echo "Установка завершена!"
