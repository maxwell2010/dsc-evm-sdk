import json
from py_mini_racer import py_mini_racer
import asyncio

class DecimalSDK:
    def __init__(self):
        """
        Инициализация SDK с JavaScript кодом.

        :param js_code: Строка с JavaScript кодом.
        """
        # Загрузка JavaScript кода из файла
        self.ctx = py_mini_racer.MiniRacer()
        with open('./dsc-js-sdk/js_sdk_query.js', 'r') as js_file:
            js_code = js_file.read()
        self.ctx.eval(js_code)

    async def send_del(self, to: str, amount: float, mnemonic: str) -> dict:
        """
        Отправка DEL токенов.

        :param to: Адрес получателя.
        :param amount: Сумма для отправки.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, self.ctx.call, "sendDEL", to, amount, mnemonic)
        return json.loads(result)

    async def burn_del(self, amount: float, mnemonic: str) -> dict:
        """
        Сжигание DEL токенов.

        :param amount: Сумма для сжигания.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, self.ctx.call, "burndDEL", amount, mnemonic)
        return json.loads(result)

    async def token_by_symbol(self, symbol: str) -> dict:
        """
        Получение адреса токена по символу.

        :param symbol: Символ токена.
        :return: Результат выполнения функции.
        """
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, self.ctx.call, "TokenBySymbol", symbol)
        return json.loads(result)

    async def transfer_token(self, token_address: str, to: str, amount: float, mnemonic: str) -> dict:
        """
        Перевод токенов.

        :param token_address: Адрес токена.
        :param to: Адрес получателя.
        :param amount: Сумма для перевода.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, self.ctx.call, "TransferToken", token_address, to, amount, mnemonic)
        return json.loads(result)

    async def delegation_del(self, validator: str, days: int, amount: float, mnemonic: str) -> dict:
        """
        Делегирование DEL токенов.

        :param validator: Адрес валидатора.
        :param days: Количество дней.
        :param amount: Сумма для делегирования.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, self.ctx.call, "DelegationDEL", validator, days, amount, mnemonic)
        return json.loads(result)

# Пример использования
async def main():
    sdk = DecimalSDK()
    response = await sdk.send_del('0xRecipientAddress', 10, 'ваша мнемоническая фраза')
    print(response)

if __name__ == "__main__":
    asyncio.run(main())
