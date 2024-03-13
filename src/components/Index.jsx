import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [noDataFound, setNoDataFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage, setCitiesPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage, citiesPerPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        {
          params: {
            countryIds: "IN",
            limit: citiesPerPage,
            offset: (currentPage - 1) * citiesPerPage,
            namePrefix: searchQuery,
          },
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key":
              "4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe",
          },
        }
      );
      const responseData = response.data.data;
      setCities(responseData);
      setNoDataFound(responseData.length === 0);

      const totalCount = response.data.metadata.totalCount;
      setTotalPages(Math.ceil(totalCount / citiesPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    setCurrentPage(1);
    fetchData();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePerPageChange = (e) => {
    setCitiesPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const displayedCities = cities.slice(
    (currentPage - 1) * citiesPerPage,
    currentPage * citiesPerPage
  );

  console.log("display cities", displayedCities);

  return (
    <div className="table-container">
      <div className="dropdown-container">
        <label htmlFor="perPage">Records Per Page:</label>
        <select
          id="perPage"
          value={citiesPerPage}
          onChange={handlePerPageChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleSearchClick={handleSearchClick}
      />
      {loading ? (
        <p className="loading">Loading...</p>
      ) : noDataFound ? (
        <p className="noData-found">No result found</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Place Name</th>
                <th>Country</th>
                <th>Flag</th>
              </tr>
            </thead>
            <tbody>
              {displayedCities.map((city, index) => (
                <tr key={city.id}>
                  <td>{(currentPage - 1) * citiesPerPage + index + 1}</td>
                  <td>{city.name}</td>
                  <td>{city.country}</td>
                  <td>
                    <img
                      src={`https://flagcdn.com/w40/${city.countryCode.toLowerCase()}.png`}
                      alt={`${city.country} Flag`}
                      className="flag"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
