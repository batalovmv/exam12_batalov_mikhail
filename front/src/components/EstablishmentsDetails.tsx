import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { Box, Button, Grid, Paper, TextField, TextareaAutosize, Typography } from "@mui/material";
import { CreateReviewDto, createReview, deleteReview, fetchEstablishment } from "../features/EstablishmentSlice";



export const EstablishmentDetails = () => {
  const { id: rawId } = useParams<{ id: string }>();
  const id = rawId ?? '';
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.users.user); 
  const establishment = useAppSelector((state) => state.establishments.establishments).find(est => est.id === +id);
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState('');
  const [qualityRating, setQualityRating] = useState<number | null>(null);
  const [serviceRating, setServiceRating] = useState<number | null>(null);
  const [environmentRating, setEnvironmentRating] = useState<number | null>(null);

  useEffect(() => {
    if (!establishment) {
      dispatch(fetchEstablishment(+id));
    }
  }, [dispatch, id, establishment]);

  if (!establishment) {
    return <div>Loading or not established found...</div>;
  }

  const averageRating = establishment.reviews.reduce((prev, curr) => {
    const currAverageRating = (curr.qualityRating + curr.serviceRating + curr.environmentRating) / 3;
    return prev + currAverageRating;
  }, 0) / establishment.reviews.length;

  const handleAddReview = () => {
    if (qualityRating && serviceRating && environmentRating && currentUser && establishment) {
      const reviewData: CreateReviewDto = {
        comment: reviewText,
        qualityRating: qualityRating,
        serviceRating: serviceRating,
        environmentRating: environmentRating,
        userId: currentUser.id,
        establishmentId: establishment.id
      };

      dispatch(createReview(reviewData));

      setReviewText('');
      setQualityRating(null);
      setServiceRating(null);
      setEnvironmentRating(null);
      navigate('/establishments');
    }
  };
  const handleDeleteReview = (reviewId: number) => {
    dispatch(deleteReview(reviewId));
  };


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
            <Typography variant="body1" sx={{ marginBottom: 2 }}>Average Rating: {averageRating.toFixed(1)}</Typography>
            {establishment.reviews.slice().sort((a, b) => b.id - a.id).map((review, i) => {
              const averageRating = (review.qualityRating + review.serviceRating + review.environmentRating) / 3;

              return (
                <Box key={i}>
                  <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    Review {i + 1}: {review.comment} - Average Rating: {averageRating.toFixed(1)}
                  </Typography>
                  {currentUser?.role === 'admin' && (
                    <Button onClick={() => handleDeleteReview(review.id)}>Delete Review</Button>
                  )}
                </Box>
              );
            })}
            <TextareaAutosize
              minRows={6}
              placeholder="Add a review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              style={{ width: '100%', height: 'auto' }} 
            />
            <Box mt={1}>
              <TextField
                fullWidth
                type="number"
                value={qualityRating || ''}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 1 && val <= 5) {
                    setQualityRating(val);
                  } else {
                    alert("Please enter a Quality Rating value between 1 and 5");
                  }
                }}
                label="Quality Rating"
                inputProps={{ min: 1, max: 5 }}
              />
            </Box>
            <Box mt={1}>
              <TextField
                fullWidth
                type="number"
                value={serviceRating || ''}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 1 && val <= 5) {
                    setServiceRating(val);
                  } else {
                    alert("Please enter a Service Rating value between 1 and 5");
                  }
                }}
                label="Service Rating"
                inputProps={{ min: 1, max: 5 }}
              />
            </Box>
            <Box mt={1}>
              <TextField
                fullWidth
                type="number"
                value={environmentRating || ''}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 1 && val <= 5) {
                    setEnvironmentRating(val);
                  } else {
                    alert("Please enter an Environment Rating value between 1 and 5");
                  }
                }}
                label="Environment Rating"
                inputProps={{ min: 1, max: 5 }}
              />
            </Box>
            <Button onClick={handleAddReview}>Submit Review</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EstablishmentDetails;