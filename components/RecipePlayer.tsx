import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

const RecipePlayer = ({ recipes }) => {
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (currentRecipe && currentStep < currentRecipe.pourIntervals.length) {
      const interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(interval);
      return () => clearInterval(interval);
    }
  }, [currentRecipe, currentStep]);

  useEffect(() => {
    if (currentRecipe && currentStep < currentRecipe.pourIntervals.length) {
      const stepTime = parseInt(currentRecipe.pourIntervals[currentStep].time, 10);
      if (currentTime >= stepTime) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }
  }, [currentTime, currentRecipe, currentStep]);

  const handleStart = (recipe) => {
    setCurrentRecipe(recipe);
    setCurrentStep(0);
    setCurrentTime(0);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const handleStop = () => {
    setCurrentRecipe(null);
    setCurrentStep(0);
    setCurrentTime(0);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        レシピプレーヤー
      </Typography>
      {recipes.map((recipe) => (
        <Button key={recipe.id} onClick={() => handleStart(recipe)} variant="contained" color="primary">
          {`レシピを再生: ${recipe.coffeeAmount}g, ${recipe.waterAmount}mL`}
        </Button>
      ))}
      {currentRecipe && (
        <Box mt={4}>
          <Typography variant="h6" component="h3">
            現在のアクション: {currentStep < currentRecipe.pourIntervals.length ? `注ぐ ${currentRecipe.pourIntervals[currentStep].amount}mL` : '完了'}
          </Typography>
          <Typography variant="h6" component="h3">
            経過時間: {currentTime}秒
          </Typography>
          <Button onClick={handleStop} variant="contained" color="secondary">
            停止
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default RecipePlayer;
