<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">Wagashi</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link active" aria-current="page"
              >Products</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link">Orders</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupons" class="nav-link">Coupons</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/articles" class="nav-link">Articles</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
