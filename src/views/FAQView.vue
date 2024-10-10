<script setup>
import PageHeader from '@/components/PageHeader.vue'
import NaviBar from '@/components/NaviBar.vue'
</script>

<template>
  <PageHeader />
  <NaviBar />
  <div class="container my-5">
    <h2 class="mb-4">Frequently Asked Questions</h2>
    <div class="accordion" id="faqAccordion">
      <!-- FAQ Item 1 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="faqHeading1">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqCollapse1"
            aria-expanded="true"
            aria-controls="faqCollapse1"
          >
            What are the general requirements to immigrate to Australia?
          </button>
        </h2>
        <div
          id="faqCollapse1"
          class="accordion-collapse collapse show"
          aria-labelledby="faqHeading1"
          data-bs-parent="#faqAccordion"
        >
          <div class="accordion-body">
            To immigrate to Australia, you typically need to meet requirements related to age,
            language proficiency, skills, qualifications, and health and character checks. The
            specific criteria depend on the visa category you are applying for.
          </div>
        </div>
      </div>

      <!-- FAQ Item 2 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="faqHeading2">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqCollapse2"
            aria-expanded="false"
            aria-controls="faqCollapse2"
          >
            How can I improve my chances of getting an Australian visa?
          </button>
        </h2>
        <div
          id="faqCollapse2"
          class="accordion-collapse collapse"
          aria-labelledby="faqHeading2"
          data-bs-parent="#faqAccordion"
        >
          <div class="accordion-body">
            Improving your chances involves enhancing your qualifications, gaining relevant work
            experience, achieving a high score in the points-based system, obtaining proficiency in
            English, and ensuring all documentation is accurate and complete. Consulting with a
            migration agent can also provide personalized guidance.
          </div>
        </div>
      </div>

      <!-- FAQ Item 3 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="faqHeading3">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqCollapse3"
            aria-expanded="false"
            aria-controls="faqCollapse3"
          >
            What types of visas are available for migrating to Australia?
          </button>
        </h2>
        <div
          id="faqCollapse3"
          class="accordion-collapse collapse"
          aria-labelledby="faqHeading3"
          data-bs-parent="#faqAccordion"
        >
          <div class="accordion-body">
            Australia offers various visa types including Skilled Independent visas,
            Employer-Sponsored visas, Family visas, Student visas, and Business Innovation and
            Investment visas. Each visa type has its own set of requirements and eligibility
            criteria.
          </div>
        </div>
      </div>

      <!-- FAQ Item 4 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="faqHeading4">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqCollapse4"
            aria-expanded="false"
            aria-controls="faqCollapse4"
          >
            How long does the Australian immigration process take?
          </button>
        </h2>
        <div
          id="faqCollapse4"
          class="accordion-collapse collapse"
          aria-labelledby="faqHeading4"
          data-bs-parent="#faqAccordion"
        >
          <div class="accordion-body">
            The processing time varies depending on the visa type and individual circumstances. It
            can range from a few months for some temporary visas to over a year for certain
            permanent visas. It's important to apply well in advance and ensure all required
            documents are submitted promptly.
          </div>
        </div>
      </div>

      <!-- FAQ Item 5 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="faqHeading5">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqCollapse5"
            aria-expanded="false"
            aria-controls="faqCollapse5"
          >
            Can I bring my family when I immigrate to Australia?
          </button>
        </h2>
        <div
          id="faqCollapse5"
          class="accordion-collapse collapse"
          aria-labelledby="faqHeading5"
          data-bs-parent="#faqAccordion"
        >
          <div class="accordion-body">
            Yes, many Australian visas allow you to include family members such as your spouse and
            dependent children. Additional family members may be eligible to join you under certain
            conditions. It's important to specify all family members in your visa application.
          </div>
        </div>
      </div>

      <!-- Add more FAQ items as needed -->
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add any custom styles here */
</style>
