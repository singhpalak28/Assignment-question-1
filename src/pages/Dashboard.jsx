import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const timestampsData = timestamps.results;// Extract timestamps data from the imported JSON
  const numOrders = mockData.results.length;// Calculate the number of orders

  const handleSearch = (e) => {
    setSearchText(e.target.value); // Update the searchText state when the user types in the search bar
  };

  const handleOrderSelect = (selectedOrder) => {
    const selectedOrderTimestamps = timestampsData.find(
      (timestamp) => timestamp["&order"] === selectedOrder["&id"]
    );

    setSelectedOrderDetails(selectedOrder);
    setSelectedOrderTimeStamps(selectedOrderTimestamps);
  };

  const filteredOrders = mockData.results.filter((order) =>
  order["&id"].toLowerCase().includes(searchText.toLowerCase())
);

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${numOrders} orders`} /> 
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={handleSearch}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={filteredOrders} timestamps={timestampsData} currency={currency} onOrderSelect={handleOrderSelect}/>
      </div>
    </div>
  );
};

export default Dashboard;
