import { TableContainer, Table, TableCell, TableRow, TableBody, Typography, Grid } from '@mui/material'

import './searchResultsTable.css'

export function SearchTableData({ results }) {
    let modifiedResults = []
    for(let i = 0; i< results.length; i ++) {
        if(results[i].profile_path || results[i].backdrop_path) {
            modifiedResults.push(results[i])
        }
    }
    return (
        <div>
            <Grid>
                <Grid item>
                    <TableContainer className='table-container' sx={{ zIndex: 'tooltip', width: { md: '59.5%', xs: '62.5%' } }} component={Grid}>
                        <Table className='search-table'>
                            <TableBody sx={{ borderRadius: '10px' }}>
                                {modifiedResults?.map((res, id) => (
                                    <TableRow >
                                        <TableCell>
                                            <Grid>
                                                <Grid item container direction='row' onClick={() => {
                                                    if(res.media_type === 'person') {
                                                        window.location.href = `/search/person/${res.id}`
                                                    } else if(res.media_type === 'movie') {
                                                        window.location.href = `/search/movie/${res.id}`
                                                    } else if (res.media_type === 'tv') {
                                                        window.location.href = `/series/${res.id}`
                                                    }
                                                }}>
                                                    <img src={`https://image.tmdb.org/t/p/w200${res.profile_path || res.poster_path}`} alt='search-pic' className='search-image' />
                                                    <Typography className='name' sx={{ marginTop: { xs: '10px' } }}>{res.name || res.title}</Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    )
}