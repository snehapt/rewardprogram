const express = require("express");
const cors = require('cors')

const PORT = process.env.PORT || 3010;

const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use(cors())

const customerTransactions = [
    {
        date: '12/10/2022',
        customerId: 7768546,
        amount: 120
    },
    {
        date: '12/15/2022',
        customerId: 7768546,
        amount: 60
    },
    {
        date: '01/05/2023',
        customerId: 7768546,
        amount: 150
    },
    {
        date: '01/15/2023',
        customerId: 7768546,
        amount: 60
    },
    {
        date: '02/01/2023',
        customerId: 7768546,
        amount: 60
    },
    {
        date: '12/11/2022',
        customerId: 9938658,
        amount: 101
    },
    {
        date: '12/16/2022',
        customerId: 9938658,
        amount: 61
    },
    {
        date: '02/08/2023',
        customerId: 9938658,
        amount: 55
    },

];

app.get("/api/getTransactions", (req, res) => {
    res.json({ transactions: customerTransactions });
});