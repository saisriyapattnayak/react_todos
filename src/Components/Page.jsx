import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './index.css'

function Page() {
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [error, setError] = useState('');



    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/todos`)
            .then((response) => {
                setData(response.data);
                setFilterData(response.data);
                console.log("Data fetched successfully");
            })
            .catch(() => {
                alert(`Something Went Wrong`);
                console.log("Error fetching data");
            });
    }, []);



    const handleSearch = (e) => {
        let value = (e.target.value);
        setSearchData(value)
        if (value.trim() === '') {
            setFilterData(data);
            setError('');
        } else {

            console.log("hiiiiiiiiii");

        }

    };



    const handleSearchClick = () => {
        if (searchData.trim() === '') {
            setFilterData(data);
            setError('Please search for something');
        } else {
            const results = data.filter((item) =>
                item.title.toLowerCase().includes(searchData.toLowerCase())
            );
            if (results.length === 0) {
                setError('No titles found');

            } else {
                setError('');
            }
            setFilterData(results);
        }
    };

    return (
        <div className='mainDiv'>
            <input className='inputOne'
                placeholder='Search....'
                value={searchData}
                onChange={handleSearch}

            />
            <button className='button' onClick={handleSearchClick}>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h1 className='heading'>Todo List</h1>
            <div className='filteredDataDiv'>
                {filterData.map((item) => (
                    <h3 className='titel' key={item.id}>{item.id}:-{item.title}</h3>
                ))}
            </div>


        </div>
    );
}

export default Page;
