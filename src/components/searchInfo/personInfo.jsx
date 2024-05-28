import { Grid, Typography, Table, TableContainer, TableHead, TableRow, TableCell, Card, CardContent, CardMedia, CardActionArea } from '@mui/material'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'


import { SearchBar } from "../searchBar/searchBar";
import './personInfo.css'

const BASE_URL = process.env.REACT_APP_BASE_URL
export function PersonInfo() {
    const params = useParams()
    const [personInfo, setPersonInfo] = useState([])
    const [personFilmography, setPersonFimography] = useState([])
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        const urls = [`${BASE_URL}/person/${params.person_id}`, `${BASE_URL}/person/${params.person_id}/filmography`]
        const fetchPromises = urls.map(url => fetch(url))

        Promise.all(fetchPromises)
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then((data) => {
                setPersonInfo(data[0])
                setPersonFimography(data[1])
                setLoading(true)
            })
    }, [])
    return (
        <div className='home-page'>
            {isLoading ? (
                <div>
                    <SearchBar />
                    <Grid container>
                        <Grid item>
                            <Typography className='person-name'>{personInfo.name}</Typography>
                        </Grid>
                        <Grid item container >
                            <Grid item xs={12} md={3}>
                                <img src={`https://image.tmdb.org/t/p/w1280${personInfo.profile_path}`} className='profile' />
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Typography className='overview-heading' sx={{ marginLeft: { xs: '0px', md: '10px' }, marginBottom: '10px' }}>Biography:</Typography>
                                <Typography className='overview-text' sx={{ marginLeft: { md: '10px' }, height: '450px', overflowY: 'scroll' }}>{personInfo.biography}</Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Grid item>
                                    <Typography className='overview-heading'>Famous Filmography:</Typography>
                                </Grid>
                                <Grid item>
                                    <TableContainer component={Grid}>
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    {personFilmography.cast.slice(0, 10).map((res) => (
                                                        <TableCell>
                                                            <CardActionArea onClick={() => window.location.href = `/movie/${res.id}`}>
                                                                <Card sx={{ width: '250px', height: '250px' }}>
                                                                    <CardMedia
                                                                        component='img'
                                                                        image={`https://image.tmdb.org/t/p/w1280/${res.backdrop_path}`}
                                                                    />
                                                                    <CardContent>
                                                                        <Typography variant='h5'>{res.character}</Typography>
                                                                        <Typography>in {res.title}</Typography>
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
                <h3>Loading</h3>
            )}
        </div>
    )
}