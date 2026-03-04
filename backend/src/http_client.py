from aiohttp import ClientSession
# Сессия, которая будет подключаться к сайту и забирать оттуда данные

from async_lru import alru_cache

class HttpClient:
    def __init__(self, base_url: str, api_key: str):
        # base_url - адрес из документации
        self._session = ClientSession(
            base_url = base_url,
            headers = {
                'X-CMC_PRO_API_KEY': api_key,
            }
        )

baseUrl = 'pro-api.coinmarketcap.com'

class CoinMarketCapHttpClient(HttpClient):
    # Получить все
    @alru_cache
    async def get_listings(self):
        async with self._session.get('/v1/cryptocurrency/listings/latest') as response:
            result = await response.json()

            return result["data"]

    # Получить данные об одной криптовалюте
    @alru_cache
    async def get_currency(self, currency_id: int):
        async with self._session.get(
                '/v2/cryptocurrency/quotes/latest',
            params = {"id": currency_id}
        ) as response:
            result = await response.json()

            return result["data"][str(currency_id)]