import { DollarOutlined } from "@ant-design/icons";
import { Menu, Spin } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";

import CryptocurrencyCard from "./components/CryptocurrencyCard";

const App = () => {
    const [currencies, setCurrencies] = useState([]);

    const [currencyID, setCurrencyID] = useState(1);

    const [currencyInfo, setCurrencyInfo] = useState(null);

    const fetchCurrencies = () => {
        axios.get("http://127.0.0.1:8000/cryptocurrencies").then((response) => {
            const currenciesResponse = response.data;

            const menuItems = [
                {
                    label: "Список криптовалют",
                    key: "SubMenu",
                    icon: <DollarOutlined />,
                    children: currenciesResponse.map((curr) => {
                        return { key: curr.id, label: curr.name };
                    }),
                },
            ];

            setCurrencies(menuItems);
        });
    };

    const fetchCurrency = () => {
        axios
            .get(`http://127.0.0.1:8000/cryptocurrencies/${currencyID}`)
            .then((response) => {
                setCurrencyInfo(response.data);
            });
    };

    const onClick = (e) => {
        setCurrencyID(e.key);
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    useEffect(() => {
        setCurrencyInfo(null);
        fetchCurrency();
    }, [currencyID]);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="border-b border-gray-200">
                <Menu
                    onClick={onClick}
                    selectedKeys={[currencyID]}
                    mode="horizontal"
                    items={currencies}
                    className="w-full border-none"
                />
            </div>
            <div className="flex-grow flex items-center justify-center bg-gray-50">
                <div className="p-4">
                    {currencyInfo ? (
                        <CryptocurrencyCard currency={currencyInfo} />
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <Spin size="large" />
                            <p className="text-gray-500 font-medium">
                                Загрузка данных...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default App;
