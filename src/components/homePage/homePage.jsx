import { useState, useEffect } from 'react'
import { Stack, Typography, Grid, Input, Card, CardContent, CardMedia, Table, TableContainer, TableCell, TableRow, TableHead, CardActionArea } from '@mui/material'
import { Star } from '@mui/icons-material'

import './homePage.css';
import { SearchBar } from '../searchBar/searchBar';

export function HomePage() {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [movieData, setMovieData] = useState([])
    const [TVData, setTVData] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const urls = [`${BASE_URL}/homepage/top10movies`, `${BASE_URL}/homepage/top10tv`]
        const fetchPromises = urls.map(url => fetch(url))

        Promise.all(fetchPromises)
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then((data) => {
                setMovieData(data[0])
                setTVData(data[1])
                setLoading(true)
            })
    }, [])

    return (
        <div className='home-page'>
            {isLoading ? (
                <div>
                    <SearchBar />
                    <Grid container>
                        <Grid item container>
                            <Typography className='top-20-text'>
                                Top 10 movies of this week
                            </Typography>
                        </Grid>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {movieData.results.slice(0, 10).map((res, i) => (
                                            <TableCell>
                                                <CardActionArea onClick={() => {
                                                    window.location.href = `/movie/${res.id}`
                                                }}>
                                                    <Card className='top-10-card'>
                                                        <CardMedia
                                                            component='img'
                                                            image={`https://image.tmdb.org/t/p/w1280${res.poster_path}`}
                                                            height='300px'
                                                        />
                                                        <CardContent>
                                                            <Grid display='flex'>
                                                                <Grid item container alignItems='center' marginLeft={-0.5}>
                                                                    <Star sx={{ color: '#F9D001' }} />
                                                                    <Typography fontSize='20px' marginLeft={1}>
                                                                        {Math.round((res.vote_average + Number.EPSILON) * 10) / 10}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Typography variant='h6'>
                                                                {i + 1}. {res.title}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </CardActionArea>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid container>
                        <Grid item container>
                            <Typography className='top-20-text'>
                                Top 10 TV shows of this week
                            </Typography>
                        </Grid>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {TVData.results.slice(0, 10).map((res, i) => (
                                            <TableCell>
                                                <Card className='top-10-card'>
                                                    <CardActionArea onClick={() => {
                                                        window.location.href = `/series/${res.id}`
                                                    }}>
                                                        <CardMedia
                                                            component='img'
                                                            image={`https://image.tmdb.org/t/p/w1280${res.poster_path}`}
                                                            height='300px'
                                                        />
                                                        <CardContent>
                                                            <Stack direction='row' alignItems='center' spacing={1} marginLeft={-0.5}>
                                                                <Star sx={{ color: '#F9D001' }} />
                                                                <Typography fontSize='20px'>
                                                                    {Math.round((res.vote_average + Number.EPSILON) * 10) / 10}
                                                                </Typography>
                                                            </Stack>
                                                            <Typography variant='h6'>
                                                                {i + 1}. {res.name}
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                </div>
            ) : (
                <div>
                    <Typography color='white'>Loading</Typography>
                </div>
            )}
        </div>
    )
}