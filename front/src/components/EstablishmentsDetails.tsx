import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { fetchEstablishment } from "../features/establishmentSlice";

 const EstablishmentDetails = () => {
  const { id: rawId } = useParams<{ id: string }>();
  const id = rawId ?? '';
  const dispatch = useAppDispatch();

  const establishment = useAppSelector((state) => state.establishments.establishments).find(est => est.id === +id);

  useEffect(() => {
    if (!establishment) {
      dispatch(fetchEstablishment(+id));
    }
  }, [dispatch, id, establishment]);

  if (!establishment) {
    return <div>Loading or not established found...</div>;  
  }

   return (
     <Box sx={{ flexGrow: 1, m: 2, display: 'flex', justifyContent: 'center' }}>
       <Grid container spacing={2} justifyContent="center">
         <Grid item xs={12} sm={8} md={6}>
           <Paper sx={{ p: 2 }}>
             <Typography variant="h5" sx={{ marginBottom: 2 }}>{establishment.name}</Typography>
             <Typography variant="body1" sx={{ marginBottom: 2 }}>User: {establishment.user.username}</Typography>
             <Box
               component="img"
               src={establishment.images[0]?.url}
               alt={establishment.name}
               sx={{ width: '100%', height: 'auto', objectFit: 'cover', marginBottom: 2 }}
             />
             {/* Показать все отзывы */}
             {establishment.reviews.map((review, i) =>
               <Typography variant="body1" key={i} sx={{ marginBottom: 2 }}>
                 Review {i + 1}: {review.comment}
               </Typography>
             )}
           </Paper>
         </Grid>
       </Grid>
     </Box>
   );
};

export default EstablishmentDetails;

