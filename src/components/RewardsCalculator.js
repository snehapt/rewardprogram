import React, { useEffect, useState } from 'react';

const RewardCalculator = (props) => {
    const { customerId, amount, month } = props
    const [transactions, setTransactions] = useState([]);
    const [rewards, setRewards] = useState({ rewardsPerMonth: {}, rewardsTotal: {} });

    useEffect(() => {
        fetch("http://localhost:3010/api/getTransactions")
            .then((res) => res.json())
            .then((data) => {
                setTransactions(data.transactions);
            });
    }, []);

    useEffect(() => {
        const rewards = calculateRewards();
        setRewards(rewards)
    }, [transactions])

    const addTransaction = (customerId, amount, month) => {
        setTransactions([...transactions, { customerId, amount, month }]);
    };

    const calculateRewards = () => {
        const rewardsPerMonth = {};
        const rewardsTotal = {};
        const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        transactions.forEach(transaction => {
            const { customerId, amount, date } = transaction;
            const month = monthArr[new Date(date).getMonth()];
            if (!rewardsPerMonth[month]) {
                rewardsPerMonth[month] = {};
            }
            if (!rewardsPerMonth[month][customerId]) {
                rewardsPerMonth[month][customerId] = 0;
            }

            if (amount > 100) {
                rewardsPerMonth[month][customerId] += 2 * (amount - 100) + 50;
            } else if (amount > 50) {
                rewardsPerMonth[month][customerId] += amount - 50;
            }
        });

        Object.keys(rewardsPerMonth).forEach(month => {
            const currentMonth = rewardsPerMonth[month]
            Object.keys(currentMonth).forEach(customerId => {
                if (!rewardsTotal[customerId]) {
                    rewardsTotal[customerId] = 0
                }
                rewardsTotal[customerId] += currentMonth[customerId];
            });

        })

        return { rewardsPerMonth, rewardsTotal };
    };



    return (
        <div>
            <h1>Reward Calculator</h1>
            <div className='rewards-wrapper'>

                <div className='rewards-wrapper-box'>
                    <h2>Rewards earned per month</h2>

                    {Object.entries(rewards.rewardsPerMonth).map(([month, customers]) => (
                        <div key={month}>
                            <h3>
                                {month}
                            </h3>
                            <table className="table-rewards">
                                <thead>
                                    <tr>
                                        <th>
                                            Customer Id
                                        </th>
                                        <th>
                                            Reward Points
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(customers).map(([customerId, rewards]) => (
                                        <tr key={customerId}>
                                            <td>
                                                {customerId}
                                            </td>
                                            <td>
                                                {rewards}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>

                <div className='rewards-wrapper-box'>
                    <h2>Rewards earned total</h2>


                    <div>

                        <table className="table-rewards">
                            <thead>
                                <tr>
                                    <th>
                                        Customer Id
                                    </th>
                                    <th>
                                        Reward Points
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(rewards.rewardsTotal).map(([customerId, rewards]) => (
                                    <tr key={customerId}>
                                        <td>
                                            {customerId}
                                        </td>
                                        <td>
                                            {rewards}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default RewardCalculator;