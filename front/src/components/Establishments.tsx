import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEstablishments } from '../features/EstablishmentSlice';

interface User {
  id: number;
  username: string;
  role: string;
}

interface Review {
  id: number;
  qualityRating: number;
  serviceRating: number;
  environmentRating: number;
  comment: string;
}

interface Image {
  id: number;
  url: string;
}

interface Establishment {
  id: number;
  name: string;
  description: string;
  user: User;
  reviews: Review[];
  images: Image[];
}

const Establishments = () => {
  const dispatch = useAppDispatch();
  const establishments = useAppSelector((state) => state.establishments.establishments);

  useEffect(() => {
    dispatch(fetchEstablishments());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={2}>
        {establishments.map((establishment: Establishment) => (
          <Grid item xs={12} sm={6} md={4} key={establishment.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5">
                <RouterLink to={`/establishment/${establishment.id}`}>
                  {establishment.name}
                </RouterLink>
              </Typography>
              <Typography variant="body1">User: {establishment.user.username}</Typography>
              <Box component="img"
                src={establishment.images[0]?.url}
                alt={establishment.name}
                sx={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
              <Typography variant="body1">Number of reviews: {establishment.reviews.length}</Typography>
              {/* ...другие данные... */}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Establishments;
