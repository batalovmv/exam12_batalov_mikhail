import { useEffect } from 'react';

import { Box, Grid, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEstablishments } from '../features/establishmentSlice';

interface Establishment {
  id: number;
  name: string;
  description: string;
  
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
              <Typography variant="h5">{establishment.name}</Typography>
              <Typography variant="body1">{establishment.description}</Typography>
              {/* доп фина о заведении */}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Establishments;
