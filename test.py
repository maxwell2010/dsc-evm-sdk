import time
import asyncio
from dsc_python import DecimalSDK

sdk = DecimalSDK()


async def main():
    start_time = time.perf_counter()
    response = await sdk.token_by_symbol('mintcandy')
    print(response)
    end_time = time.perf_counter()
    elapsed_time = end_time - start_time
    print(f"Время выполнения: {elapsed_time:.4f} секунд")

if __name__ == "__main__":
    asyncio.run(main())
