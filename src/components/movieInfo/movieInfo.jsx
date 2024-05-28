import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Card, CardContent, CardMedia, CardActionArea } from '@mui/material'
import { Star } from '@mui/icons-material'
import { SearchBar } from '../searchBar/searchBar'
import millify from 'millify'

import './movieInfo.css';

export function MovieInfo() {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [data, setData] = useState([])
    const [castData, setCastData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const params = useParams()
    useEffect(() => {
        const urls = [`${BASE_URL}/movie/${params.movie_id}`, `${BASE_URL}/movie/${params.movie_id}/credits`]
        const fetchPromises = urls.map(url => fetch(url))

        Promise.all(fetchPromises)
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then((data) => {
                setData(data[0])
                setCastData(data[1])
                setLoading(true)
            })
    }, [])
    return (
        <div className='home-page'>
            {isLoading ? (
                <div>
                    <SearchBar />
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Typography className='movie-title' fontSize={{ xs: '12vw', md: '60px' }}>{data.title}</Typography>
                            <Typography className='movie-subtitle'>{new Date(data.release_date).getFullYear()} {Math.floor(data.runtime / 60)}h {data.runtime % 60}min</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography className='rating-text'>IMBd Rating</Typography>
                            <Grid item container alignItems='center'>
                                <Star sx={{ color: 'gold', fontSize: '35px' }} />
                                <Typography className='vote-avg'>{Math.round((data.vote_average + Number.EPSILON) * 10) / 10} / 10</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container>
                            <Grid item xs={12} md={4}>
                                <img src={`https://image.tmdb.org/t/p/w1280${data.poster_path}`} alt={data.title} className='poster' />
                            </Grid>
                            <Grid xs={12} md={8}>
                                <Grid item marginLeft={{ xs: '0px', md: '20px' }}>
                                    <Typography className='overview-heading'>Overview:</Typography>
                                    <Typography className='overview-text'>{data.overview}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className='top-cast-text' marginLeft={{ xs: '0', md: '20px' }}>Top Cast:</Typography>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    {castData.cast.slice(0, 8).map((res) => (
                                                        <TableCell>
                                                            <CardActionArea onClick={() => window.location.href = `/search/person/${res.id}`}>
                                                                <Card className='cast-card'>
                                                                    <CardContent>
                                                                        <CardMedia
                                                                            component='img'
                                                                            image={`https://image.tmdb.org/t/p/w500${res.profile_path}`}
                                                                            className='profile-pic'
                                                                        />
                                                                    </CardContent>
                                                                    <CardContent>
                                                                        <Typography className='cast-name'>{res.name}</Typography>
                                                                        <Typography>as {res.character}</Typography>
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
                                <Grid item container marginLeft={{ xs: '0px', md: '20px' }}>
                                    <Grid item>
                                        <Typography className='box-office-text'>Gross Collection:</Typography>
                                        <Typography className='box-office'>${millify(data.revenue)}</Typography>
                                    </Grid>
                                    <Grid item marginLeft={{ xs: '0px', md: '30%' }}>
                                        <Typography className='budget-text'>Budget:</Typography>
                                        <Typography className='box-office'>${millify(data.budget)}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <div>
                    <h4>Loading</h4>
                </div>
            )}
        </div>
    )
}