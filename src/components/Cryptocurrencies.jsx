import React, { useState, useEffect } from "react";
import millify from "millify";
import { Row, Col, Card, Input } from "antd";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useGetCryptosQuery } from "../services/CryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 50;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  if (isFetching) return <Loader/>;
  return (
    <>
    {!simplified && (<div className="search-crypto">
        <Input
          placeholder="search cryptocoin"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>)}
      

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col className="crypto-card" xs={24} sm={12} lg={6} key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
