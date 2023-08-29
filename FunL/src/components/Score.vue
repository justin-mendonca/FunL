<template>
    <div class="imdb-score">
      <div class="score-container">
        <div class="score">{{ imdbScore }}</div>
        <div class="label">IMDb Score</div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      imdbScore: {
        type: Number,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .imdb-score {
    font-family: Arial, sans-serif;
    text-align: center;
  }
  
  .score-container {
    background-color: #f4f4f4;
    border-radius: 8px;
    padding: 10px;
  }
  
  .score {
    font-size: 24px;
    font-weight: bold;
    color: #ff9900;
  }
  
  .label {
    font-size: 14px;
    color: #333;
  }
  </style>