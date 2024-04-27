import React, { useState, useEffect } from 'react'


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
  }, [searchQuery]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='container'>
      <div class="d-flex justify-content-center">
        <form class=" Text=center my-2" role="search">
          <input
            className="form-control  "
            type="search"
            placeholder="Search"
            style={{ width: "220px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
        </form>
      </div>

      <table className=" container table table-dark">
        <thead>
          <tr>
            <td>index</td>

            <td>name</td>
            <td>symbol
            </td>
            <td>market_Cap</td>
            <td>current_price</td>
           
          </tr>
          </thead>
        <tbody>
          {(searchQuery.trim() === '' ? coins : filteredCoins).map((coin, index) => (
            <tr key={index}>
              <th scope="row">{index}</th>

              <td><a href="" ><img src={coin.image} alt="" style={{ height: "17vh", width: "6vw" }} /></a>
                <p>{coin.name}</p></td>
              <td>{coin.symbol}</td>
              <td>{coin.market_cap}</td>
              <td>{coin.current_price}</td>

            </tr>
          ))}
          {/* {filteredCoins && filteredCoins.map((coin, index) => (
  <tr key={index}>
    <th scope="row">{index + 1}</th>
    <td>{coin.name}</td>
    <td>{coin.symbol}</td>
    <td>{coin.current_price}</td>
  </tr>
))}  */}
       </tbody>
      </table>
    </div>
  )
}

export default Table
