import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { RecipeForm } from '../components/RecipeForm';
import { RecipeList } from '../components/RecipeList';
import { RecipePlayer } from '../components/RecipePlayer';

const IndexPage = () => {
  const [recipes, setRecipes] = useState([]);
  const db = getFirestore();

  const fetchRecipes = async () => {
    const querySnapshot = await getDocs(collection(db, 'recipes'));
    const recipesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRecipes(recipesData);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSaveRecipe = async (recipe) => {
    await addDoc(collection(db, 'recipes'), recipe);
    fetchRecipes();
  };

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        コーヒーレシピ管理
      </Typography>
      <Box mb={4}>
        <RecipeForm onSave={handleSaveRecipe} />
      </Box>
      <Box mb={4}>
        <RecipeList recipes={recipes} />
      </Box>
      <Box mb={4}>
        <RecipePlayer recipes={recipes} />
      </Box>
    </Container>
  );
};

export default IndexPage;
