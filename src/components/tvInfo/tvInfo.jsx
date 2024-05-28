import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Card, CardContent, CardMedia, CardActionArea } from '@mui/material'
import { Star } from '@mui/icons-material'
import { SearchBar } from '../searchBar/searchBar'

import './tvInfo.css';

export function TVInfo() {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [data, setData] = useState([])
    const [castData, setCastData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const params = useParams()
    useEffect(() => {
        const urls = [`${BASE_URL}/series/${params.series_id}`, `${BASE_URL}/series/${params.series_id}/credits`]
        const fetchPromises = urls.map(url => fetch(url))

        Promise.all(fetchPromises)
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then((data) => {
                setData(data[0])
                setCastData(data[1])
                setLoading(true)
            })
    }, [])
    useEffect(() => {
    }, [])
    return (
        <div className='home-page'>
            {isLoading ? (
                <div>
                    <SearchBar />
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Typography className='series-title' fontSize={{ xs: '12vw', md: '60px' }}>{data.name}</Typography>
                            <Typography className='series-subtitle'>{new Date(data.first_air_date).getFullYear()} - {new Date(data.last_air_date).getFullYear()}</Typography>
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
                                                            <CardActionArea>
                                                                <Card className='cast-card'>
                                                                    <CardContent onClick={() => window.location.href = `/search/person/${res.id}`}>
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