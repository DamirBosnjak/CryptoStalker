import express from 'express';
import axios from 'axios';

const app = express();
const port=3000;

app.use(express.static('public'));

app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
    try{
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets",{
            params: {
                vs_currency: 'usd',
                order: "market_cap_desc",
                per_page: 50,
                lang: "en",
                sparkline: false,
                price_change_percentage: "24h"
            }
        });
        res.render("index.ejs", {coins: response.data});
    } catch(error){
        console.error(error);
        res.status(500).send("Error fetching data");
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});