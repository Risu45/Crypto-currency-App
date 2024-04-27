import { useEffect, useState } from "react";

// ... (your imports and function definition)

function Table() {
    const [coins, setCoins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const fetchCoinData = async () => {
        try {
          const response = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
          );
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          console.log('Fetched data:', data);
          setCoins(data);
        } catch (error) {
          console.error('Error fetching coin data:', error);
        }
      };
  
      fetchCoinData();
    }, []);
  
    const filteredCoins = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <div className='container'>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
  
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Market Cap</th>
              <th>Current Price</th>
              <th>Available Supply</th>
              <th>Volume (24hr)</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((val) => (
              <tr key={val.rank}>
                <td className='rank'>{val.rank+1}</td>
                <td className='log'>
                  <a href={val.websiteUrl}>
                    <img src={val.image
                    } alt="" />
                  </a>
                  <p>{val.name}</p>
                </td>
                <td className='symbol'>{val.symbol}</td>
                <td>${val.market_Cap}</td>
                <td>${val.current_pricetoFixed(2) }</td>
                <td>{val.circulating_supply }</td>
                <td>{val.total_volumetoFixed(0) }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Table;
  