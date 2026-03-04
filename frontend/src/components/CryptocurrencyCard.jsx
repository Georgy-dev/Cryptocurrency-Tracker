import { Card } from "antd";

function CryptocurrencyCard({ currency }) {
    return (
        <Card
            title={
                <div className="flex items-center gap-3">
                    <img
                        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
                        alt={currency.name}
                        className="w-8 h-8"
                    />
                    <span className="text-xl font-bold">
                        {currency.name}
                    </span>{" "}
                </div>
            }
            style={{ width: 350 }}
            className="shadow-lg"
        >
            <div className="text-4xl font-extrabold tracking-tight text-slate-900">
                $
                {currency.quote.USD.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                })}
            </div>

            <div
                className={`text-lg font-semibold mt-1 ${
                    currency.quote.USD.percent_change_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
                }`}
            >
                {currency.quote.USD.percent_change_24h > 0 ? "▲" : "▼"}{" "}
                {Math.abs(currency.quote.USD.percent_change_24h).toFixed(2)}%
                <span className="text-slate-400 text-sm ml-1">(24ч)</span>
            </div>

            <div className="my-5 border-t border-slate-100"></div>

            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-sm uppercase font-medium">
                        Капитализация
                    </span>
                    <span className="text-base font-bold text-slate-700">
                        $
                        {(
                            currency.quote.USD.market_cap / 1_000_000_000
                        ).toFixed(3)}{" "}
                        млрд
                    </span>
                </div>

                <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-sm uppercase font-medium">
                        Объем (24ч)
                    </span>
                    <span className="text-base font-bold text-slate-700">
                        $
                        {(
                            currency.quote.USD.volume_24h / 1_000_000_000
                        ).toFixed(4)}{" "}
                        млрд
                    </span>
                </div>

                <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-sm uppercase font-medium">
                        Ранг CMC
                    </span>
                    <span className="px-2 py-1 bg-slate-100 rounded text-sm font-bold text-slate-600">
                        #{currency.cmc_rank}
                    </span>
                </div>
            </div>
        </Card>
    );
}

export default CryptocurrencyCard;
