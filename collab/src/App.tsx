/*import React, { useState } from "react";

const App: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div className="container">
            <h1>Hello from React Extension!</h1>
            <p>You've clicked the button {count} times.</p>
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>
                Click me
            </button>
        </div>
    );
};

export default App;
*/

import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const API_KEY = "0GHP0YROOTHOI3LB";
const ENDPOINT = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=NGN&apikey=${API_KEY}`;

type ChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        //backgroundColor: string;
        tension: number;
    }[];
};

const ExchangeRateChart = () => {
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [],
    });
    const [currentRate, setCurrentRate] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(ENDPOINT)
            .then((response) => response.json())
            .then((result) => {
                const timeSeries = result["Time Series FX (Daily)"];
                const dates = Object.keys(timeSeries).slice(0, 7).reverse();
                const rates = dates.map((date) =>
                    parseFloat(timeSeries[date]["4. close"])
                );

                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: "USD to NGN Exchange Rate",
                            data: rates,
                            borderColor: "rgb(75, 192, 192)",
                            tension: 0.1,
                        },
                    ],
                });

                // Set the current rate (most recent data point)
                setCurrentRate(rates[rates.length - 1]);

                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setError("Failed to fetch data");
                setLoading(false);
            });
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "USD to NGN Exchange Rate (Last 7 Days)",
            },
        },
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-3xl mx-auto p-4 border rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
                USD to NGN Exchange Rate
            </h2>
            <div className="mb-4">
                <Line options={options} data={chartData} />
            </div>
            {currentRate && (
                <div className="text-center text-xl font-bold">
                    Current Rate: 1 USD = {currentRate.toFixed(2)} NGN
                </div>
            )}
        </div>
    );
};

export default ExchangeRateChart;
