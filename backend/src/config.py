from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    COIN_MARKET_CAP_API_KEY: str

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()