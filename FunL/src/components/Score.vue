<template>
  <div class="imdb-score">
    <div :class="['score-container', getColorClass()]">
      <div class="score">{{ imdbScore }}</div>
      <div class="label">IMDb Score</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  imdbScore: {
    type: Number,
    required: true
  }
})

const getColorClass = () => {
  switch (true) {
    case props.imdbScore >= 80:
      return 'high-score'
    case props.imdbScore >= 50:
      return 'medium-score'
    default:
      return 'low-score'
  }
}
</script>

<style scoped>
.imdb-score {
  font-family: var(font-family);
  text-align: center;
}

.score-container {
  border-radius: 8px;
  padding: 10px;
  font-size: 24px;
  font-weight: bold;
}

.high-score {
  background-color: #c3e6c5;
  color: #43a047;
}

.medium-score {
  background-color: #ffe0b3;
  color: #ff9800;
}

.low-score {
  background-color: #f7c4c2;
  color: #e53935;
}

.label {
  font-size: 1rem;
  color: var(--surface-ground);
}
</style>
