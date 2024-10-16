import asyncio
import json
import subprocess
import os


class Helpers:
    def __init__(self):
        """
        Инициализация вспомогательных функций.
        """

    async def bigInt(self, value: str):
        try:
            return int(value, 16)
        except:
            return 0


class DecimalSDK:
    def __init__(self):
        """
        Инициализация SDK с JavaScript кодом.
        """
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.js_file = os.path.join(current_dir, 'main.js')  # Путь к вашему JavaScript файлу

    async def call_js_function(self, action: str, *args) -> dict:
        process = await asyncio.create_subprocess_exec(
            'node', self.js_file, action, *(str(arg) for arg in args),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        stdout, stderr = await process.communicate()

        if process.returncode != 0:
            print(f"!Error: {stderr.decode()}")
            return {"success": False, "data": stderr.decode()}

        if not stdout.decode():
            print("No output from JS function")
            return {"success": False, "data": "No output from JS function"}

        try:
            # return {"success": True, "data": stdout.decode()}
            return json.loads(stdout.decode())
        except json.JSONDecodeError as e:
            print(f"JSON Decode Error: {e} - Output: {stdout.decode()}")
            return {"success": False, "data": "Invalid JSON response"}

    async def token_by_symbol(self, symbol: str) -> dict:
        """ +
        Получение контракт адреса токена по символу.

        :param symbol: Тикер токена.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('TokenBySymbol', symbol.lower())

    async def send_del(self, to: str, amount: float, mnemonic: str) -> dict:
        """ +
        Отправка DEL токенов.

        :param to: Адрес получателя.
        :param amount: Сумма для отправки.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('sendDEL', to, str(amount), mnemonic)

    async def burn_del(self, amount: float, mnemonic: str) -> dict:
        """ +
        Сжигание DEL токенов.

        :param amount: Сумма для сжигания.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('burnDEL', str(amount), mnemonic)

    async def balance_del(self, address: str) -> dict:
        """ +
        Баланс DEL в 10^18.

        :param address: EVM кошелек.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('balanceDEL', str(address))

    async def transfer_token(self, token_address: str, to: str, amount: float, mnemonic: str) -> dict:
        """ +
        Перевод токенов.

        :param token_address: Адрес токена.
        :param to: Адрес получателя.
        :param amount: Сумма для перевода.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('TransferToken', token_address, to, str(amount), mnemonic)

    async def transfer_from_token(self, token_address: str, from_address: str, to: str, amount: float, mnemonic: str) -> dict:
        """
        Перевод токенов от одного адреса к другому.

        :param token_address: Адрес токена.
        :param from_address: Адрес отправителя.
        :param to: Адрес получателя.
        :param amount: Сумма для перевода.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('TransferFromToken', token_address, from_address, to, str(amount), mnemonic)

    async def transfer_token_symbol(self, symbol: str, to: str, amount: float, mnemonic: str) -> dict:
        """ +
        Перевод токенов.

        :param symbol: Тикер токена.
        :param to: Адрес получателя.
        :param amount: Сумма для перевода.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('TransferTokenSymbol', symbol, to, str(amount), mnemonic)

    async def burn_token(self, token_address: str, amount: float, mnemonic: str) -> dict:
        """ +
        Сжигание токенов.

        :param token_address: Адрес токена.
        :param amount: Сумма для сжигания.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('BurnToken', token_address, str(amount), mnemonic)

    async def burn_token_symbol(self, symbol: str, amount: float, mnemonic: str) -> dict:
        """ +
        Сжигание токенов.

        :param symbol: Тикер токена.
        :param amount: Сумма для сжигания.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('BurnTokenSymbol', symbol, str(amount), mnemonic)

    async def approve_token(self, token_address: str, spender: str, amount: float, mnemonic: str) -> dict:
        """
        Одобрение токенов.

        :param token_address: Адрес токена.
        :param spender: Адрес, которому разрешено тратить токены.
        :param amount: Сумма для одобрения.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('ApproveToken', token_address, spender, str(amount), mnemonic)

    async def buy_del_for_token(self, token_address: str, amount: float, mnemonic: str) -> dict:
        """ +
        Покупка токенов за DEL.

        :param token_address: Адрес токена.
        :param amount: Сумма для покупки.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('BuyDelForToken', token_address, str(amount), mnemonic)

    async def buy_del_for_token_symbol(self, symbol: str, amount: float, mnemonic: str) -> dict:
        """ +
        Покупка токенов за DEL по тикеру.

        :param symbol: Символ токена.
        :param amount: Сумма для покупки.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('BuyDelForTokenSymbol', symbol.lower(), str(amount), mnemonic)

    async def sell_del_for_token(self, token_address: str, amount: float, mnemonic: str) -> dict:
        """ +
        Продажа токенов за DEL.

        :param token_address: Адрес токена.
        :param amount: Сумма для продажи.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('SellDelForToken', token_address, str(amount), mnemonic)

    async def sell_del_for_token_symbol(self, symbol: str, amount: float, mnemonic: str) -> dict:
        """ +
        Продажа токенов за DEL по тикеру.

        :param symbol: Символ токена.
        :param amount: Сумма для продажи.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('SellDelForTokenSymbol', symbol.lower(), str(amount), mnemonic)

    async def convert_token_to_token(self, token_address1: str, token_address2: str, amount: float, mnemonic: str) -> dict:
        """
        Конвертация токенов.

        :param token_address1: Адрес первого токена.
        :param token_address2: Адрес второго токена.
        :param amount: Сумма для конвертации.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('ConvertTokenToToken', token_address1, token_address2, str(amount), mnemonic)

    async def convert_token_to_token_symbol(self, token_symbol1: str, token_symbol2: str, amount: float, mnemonic: str) -> dict:
        """
        Конвертация токенов по тикеру.

        :param token_symbol1: Тикер первого токена.
        :param token_symbol2: Тикер второго токена.
        :param amount: Сумма для конвертации.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('ConvertTokenToTokenSymbol', token_symbol1, token_symbol2, str(amount), mnemonic)

    async def delegation_del(self, validator: str, days: int, amount: float, mnemonic: str) -> dict:
        """ +
        Делегирование DEL.

        :param validator: Адрес валидатора.
        :param days: Количество дней для холда, если <= 0 то стандартное делегирование.
        :param amount: Сумма для делегирования.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('delegationDEL', validator, int(days), str(amount), mnemonic)

    async def delegation_token_approve(self, validator: str, token_address: str, days: int, amount: float, mnemonic: str) -> dict:
        """
        Одобрение токена для делегирования.

        :param validator: Адрес валидатора.
        :param token_address: Адрес токена.
        :param days: Количество дней.
        :param amount: Сумма для одобрения.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('DelegationTokenApprove', validator, token_address, str(days), str(amount), mnemonic)

    async def delegation_token_permit(self, validator: str, token_address: str, days: int, amount: float, mnemonic: str) -> dict:
        """
        Разрешение токена для делегирования.

        :param validator: Адрес валидатора.
        :param token_address: Адрес токена.
        :param days: Количество дней.
        :param amount: Сумма для разрешения.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('DelegationToken', validator, token_address, str(days), str(amount), mnemonic)

    async def delegation_token_symbol(self, validator: str, symbol: str, amount: float, days: int, mnemonic: str) -> dict:
        """ +
        Разрешение токена для делегирования.

        :param validator: Адрес валидатора.
        :param symbol: Тикер токена.
        :param days: Количество дней.
        :param amount: Сумма для разрешения.
        :param mnemonic: Мнемоническая фраза.
        :return: Результат выполнения функции.
        """
        return await self.call_js_function('DelegationTokenSymbol', validator, symbol, int(days), str(amount),
                                           mnemonic)


async def main():
    sdk = DecimalSDK()
    response = await sdk.token_by_symbol('mintcandy')
    print('response', response)

    # response = await sdk.send_del('0xRecipientAddress', 10, 'your mnemonic here')
    # print('response', response)

if __name__ == "__main__":
    asyncio.run(main())
