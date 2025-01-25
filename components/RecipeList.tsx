import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, 'recipes'));
    const recipesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRecipes(recipesData);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        保存されたレシピ
      </Typography>
      <List>
        {recipes.map((recipe) => (
          <ListItem key={recipe.id}>
            <ListItemText
              primary={`コーヒーの量: ${recipe.coffeeAmount}g, お湯の量: ${recipe.waterAmount}mL`}
              secondary={`最初のお湯の量: ${recipe.initialWater}mL, 蒸らし時間: ${recipe.bloomTime}秒`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RecipeList;
