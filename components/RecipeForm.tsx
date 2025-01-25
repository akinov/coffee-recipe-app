import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const RecipeForm = ({ onSave }) => {
  const [coffeeAmount, setCoffeeAmount] = useState('');
  const [waterAmount, setWaterAmount] = useState('');
  const [initialWater, setInitialWater] = useState('');
  const [bloomTime, setBloomTime] = useState('');
  const [pourIntervals, setPourIntervals] = useState([{ time: '', amount: '' }]);

  const handleAddInterval = () => {
    setPourIntervals([...pourIntervals, { time: '', amount: '' }]);
  };

  const handleIntervalChange = (index, field, value) => {
    const newIntervals = [...pourIntervals];
    newIntervals[index][field] = value;
    setPourIntervals(newIntervals);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipe = {
      coffeeAmount,
      waterAmount,
      initialWater,
      bloomTime,
      pourIntervals,
    };
    await addDoc(collection(getFirestore(), 'recipes'), recipe);
    onSave(recipe);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="コーヒーの量 (g)"
        value={coffeeAmount}
        onChange={(e) => setCoffeeAmount(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="お湯の量 (mL)"
        value={waterAmount}
        onChange={(e) => setWaterAmount(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="最初のお湯の量 (mL)"
        value={initialWater}
        onChange={(e) => setInitialWater(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="蒸らし時間 (秒)"
        value={bloomTime}
        onChange={(e) => setBloomTime(e.target.value)}
        fullWidth
        margin="normal"
      />
      {pourIntervals.map((interval, index) => (
        <Box key={index} display="flex" alignItems="center">
          <TextField
            label={`注ぐ時間 (秒) ${index + 1}`}
            value={interval.time}
            onChange={(e) => handleIntervalChange(index, 'time', e.target.value)}
            margin="normal"
          />
          <TextField
            label={`注ぐ量 (mL) ${index + 1}`}
            value={interval.amount}
            onChange={(e) => handleIntervalChange(index, 'amount', e.target.value)}
            margin="normal"
          />
        </Box>
      ))}
      <Button onClick={handleAddInterval} variant="contained" color="primary">
        インターバルを追加
      </Button>
      <Button type="submit" variant="contained" color="primary">
        保存
      </Button>
    </Box>
  );
};

export default RecipeForm;
