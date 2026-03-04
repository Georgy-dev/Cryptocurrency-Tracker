from src.config import settings
from src.http_client import CoinMarketCapHttpClient

cmc_client = CoinMarketCapHttpClient(
    base_url = 'https://pro-api.coinmarketcap.com',
    api_key = settings.COIN_MARKET_CAP_API_KEY
)