<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Card from 'primevue/card'
</script>

<template>
  <div class="about">
    <Card class="card">
      <template #title> FAQs </template>
      <template #content>
        <Accordion :multiple="true" :activeIndex="[0]" class="accordion">
          <AccordionTab header="How do I report a bug?">
            <p>
              FunL is still in beta testing and relies on users like you to identify bugs or issues that detract from your experience! If you want to bring something to our attention, please email us at bugs@funl.com.
            </p>
          </AccordionTab>
          <AccordionTab header="Can I use FunL on my smart TV?">
            <p>
              Currently FunL is not supported on smart TVs. However, we are in the process of developing a TV-compatible app and will share updates on this endeavor on our socials!
            </p>
          </AccordionTab>
          <AccordionTab header="Who will win the 'HP Take the Wheel' fantasy football league this year?">
            <p>
              Justin will win, obviously. Casso is a snake and Kris should just buy stock in FantasyPros at this point.
            </p>
          </AccordionTab>
        </Accordion>
      </template>
    </Card>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .card {
    width: 80%;
  }
  .accordion {
    width: 100%;
  }
}
</style>
