import { Grid, Stack, Typography, Input } from '@mui/material'
import { useEffect, useState } from 'react';

import './searchBar.css';
import { SearchTableData } from './searchResultsTable';

export function SearchBar() {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [query, setQuery] = useState("")
    const [searchData, setSeachData] = useState([])
    useEffect(() => {
        fetchSearchData()
    }, [query])
    const fetchSearchData = () => {
        if(query === "") return setSeachData([])
        fetch(`${BASE_URL}/search/${query}`).then(res => res.json())
        .then((data) => {
            setSeachData(data.results.slice(0, 5))
        })
        .catch(err => console.log(err.message))
    }
    
    return (
        <Grid className='header' container>
            <Stack direction='row' alignItems='center' spacing={3} width='100%'>
                <Grid item className='logo-box' onClick={() => window.location.href = '/'}>
                    <Typography className='logo-text'>
                        IMBd
                    </Typography>
                </Grid>
                <Grid item xs={10} md={8}>
                    <Input placeholder='Search IMBd' autoFocus className='search-bar' fullWidth disableUnderline id='searchBar' type='text' onChange={(e) => setQuery(e.target.value)} autoComplete='off'/>
                    <SearchTableData results={searchData}/>
                </Grid>
            </Stack>
        </Grid>
    )
}