import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import './styles.scss'
import { FaSearch } from 'react-icons/fa';

export default function SearchInput({ fetchData }) {
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const savedSearchInput = localStorage.getItem('searchInput');
        if (savedSearchInput) {
            setSearchInput(savedSearchInput);
        }
    }, []);

    const onSearch = () => {
        const currentSearch = localStorage.getItem('searchInput');
        currentSearch !== searchInput && fetchData(searchInput);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(searchInput);
            localStorage.setItem('searchInput', searchInput);
        }
    };

    return (
        <div className='box'>
            <InputGroup className="search">
                <FormControl
                    placeholder="Search City or Postcode"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </InputGroup>
            <Button className="search-btn" onClick={onSearch}>
                    <FaSearch />
                    {' '}
                    Search
                </Button>
        </div>

    );
}