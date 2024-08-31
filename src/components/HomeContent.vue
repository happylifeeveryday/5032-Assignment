<script setup></script>

<template>
  <div class="container-fluid p-0">
    <div class="row p-md-5 m-md-2 p-3 m-3" style="margin: 0; padding: 0">
      <div class="col-md-8 offset-md-2 col-12">
        <div class="text-center h2 mb-4">News and Updates</div>
        <div class="row">
          <div class="col-md-4 d-none d-md-flex text-center p-4">
            <img
              class="img-fluid"
              src="../assets/home.jpg"
              alt="Home Image"
              style="border-radius: 20px"
            />
          </div>
          <div class="col-md-8 col-12 d-flex flex-column justify-content-center">
            <div class="my-3 my-md-0">
              <div class="h4 text-center mb-3">Immigrant Population</div>
              <p>
                The number of foreigners immigrating to Australia is increasing year by year, with
                Indians and Chinese making up the largest majority.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-8 offset-md-2 col-12 text-center mb-5">
        <div class="h2 mb-4">About Us</div>
        <p>
          We are committed to helping immigrant families adapt to their new lives as quickly as
          possible.
        </p>
      </div>

      <div class="col-md-8 offset-md-2 col-12 text-center">
        <div class="h2 mb-4">Contact Information</div>
        <p>Phone Number: 0484 925 981</p>
        <p>Email: yihanshang@gmail.com</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

div {
  font-family: 'Inter', sans-serif;
  color: white;
}

p {
  font-family: 'Inter', sans-serif;
  margin: 0;
}

.h2,
.h4 {
  font-weight: bold;
}

.img-fluid {
  border-radius: 20px;
  max-width: 100%;
  height: auto;
}

@media (max-width: 575.98px) {
  .h2 {
    font-size: 1.5rem;
  }

  .h4 {
    font-size: 1.25rem;
  }

  .p-md-5 {
    padding: 1.5rem !important;
  }

  .m-md-2 {
    margin: 1rem !important;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .h2 {
    font-size: 1.75rem;
  }

  .h4 {
    font-size: 1.5rem;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .h2 {
    font-size: 2rem;
  }

  .h4 {
    font-size: 1.75rem;
  }
}

@media (min-width: 1400px) {
  .h2 {
    font-size: 2.25rem;
  }

  .h4 {
    font-size: 2rem;
  }
}
</style>
