<template>
  <div class="map-wrapper">
    <div class="location-list" :class="{ 'is-collapsed': isCollapsed }">
      <button class="toggle-button btn btn-primary" @click="toggleList">
        {{ isCollapsed ? 'Expand List' : 'Collapse List' }}
      </button>
      <ul v-if="!isCollapsed">
        <li v-for="location in locations" :key="location.id" @click="getRoute(location)">
          {{ location.name }}
        </li>
      </ul>
      <div id="calculated-area" v-if="!isCollapsed"></div>
    </div>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, toRefs } from 'vue'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import * as turf from '@turf/turf'

// Import Mapbox CSS
import 'mapbox-gl/dist/mapbox-gl.css'

// Mapbox Access Token
mapboxgl.accessToken =
  'pk.eyJ1IjoieWloYW5zaGFuZzAiLCJhIjoiY20yMTgxYTFiMGVkOTJ4cHBibXFxeWUyeCJ9.tz62NGGroUP2pLZRc3z5lQ'

// Reference to the map container
const mapContainer = ref(null)

// Define reactive state
const state = reactive({
  userLocation: null,
  isCollapsed: false,
  locations: [
    {
      id: 1,
      name: 'Melbourne Immigration Office - Central',
      coordinates: [144.9631, -37.8136]
    },
    {
      id: 2,
      name: 'Melbourne Immigration Office - East',
      coordinates: [145.015, -37.82]
    },
    {
      id: 3,
      name: 'Melbourne Immigration Office - South',
      coordinates: [144.98, -37.82]
    },
    {
      id: 4,
      name: 'Melbourne Immigration Office - West',
      coordinates: [144.9, -37.81]
    },
    {
      id: 5,
      name: 'Melbourne Immigration Office - North',
      coordinates: [145.07, -37.8]
    }
  ]
})

// Destructure state for easier access
const { locations, userLocation, isCollapsed } = toRefs(state)

// Define map instance
let map

// Toggle function to collapse/expand the list
function toggleList() {
  state.isCollapsed = !state.isCollapsed
}

// Initialize map on component mount
onMounted(() => {
  // Create the map instance
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.9631, -37.8136],
    zoom: 12
  })

  // Add navigation controls to the map
  map.addControl(new mapboxgl.NavigationControl())

  // When the map has loaded
  map.on('load', () => {
    // Get the user's current location
    getUserLocation()

    // Add markers for the predefined locations
    addLocationMarkers()
  })

  // Set initial message in the calculated area
  document.getElementById('calculated-area').innerHTML = `
      Click on a location name to get details
    `
})

// Clean up map instance on component unmount
onBeforeUnmount(() => {
  if (map) map.remove()
})

// Function to get user's current location
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = [position.coords.longitude, position.coords.latitude]
        // Center the map on the user's location
        map.setCenter(userLocation.value)
        // Add a marker for the user's location
        new mapboxgl.Marker({ color: 'blue' })
          .setLngLat(userLocation.value)
          .setPopup(new mapboxgl.Popup().setHTML('<h3>My Location</h3>'))
          .addTo(map)
      },
      (error) => {
        console.error('Failed to get user location:', error)
        alert('Unable to retrieve your location. Please check your browser settings.')
      }
    )
  } else {
    alert('Your browser does not support geolocation.')
  }
}

// Function to add markers for predefined locations
function addLocationMarkers() {
  locations.value.forEach((location) => {
    new mapboxgl.Marker({ color: 'red' })
      .setLngLat(location.coordinates)
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3>`))
      .addTo(map)
  })
}

// Function to get and display route from user location to selected location
async function getRoute(location) {
  if (!userLocation.value) {
    alert('Please allow access to your location first.')
    return
  }

  const start = userLocation.value
  const end = location.coordinates

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`

  try {
    const response = await axios.get(url)
    const data = response.data

    if (data.routes && data.routes.length) {
      const route = data.routes[0].geometry

      // Remove existing route if any
      if (map.getSource('route')) {
        map.getSource('route').setData({
          type: 'Feature',
          properties: {},
          geometry: route
        })
      } else {
        // Add a new route layer to the map
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        })
      }

      // Adjust the map view to fit the route
      const bounds = new mapboxgl.LngLatBounds(start, start)
      route.coordinates.forEach((coord) => {
        bounds.extend(coord)
      })
      map.fitBounds(bounds, { padding: 50 })

      // Display distance and estimated driving time
      const distance = data.routes[0].distance / 1000 // Convert to kilometers
      const duration = data.routes[0].duration / 60 // Convert to minutes
      document.getElementById('calculated-area').innerHTML = `
          <p>Distance: <strong>${distance.toFixed(2)} km</strong>, Estimated Driving Time: <strong>${duration.toFixed(2)} minutes</strong></p>
        `
    } else {
      alert('Route not found.')
    }
  } catch (error) {
    console.error('Failed to get route:', error)
    alert('Unable to retrieve the route. Please try again later.')
  }
}
</script>

<style scoped>
.map-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
}
.map-container {
  flex: 1;
  width: 100%;
  height: 100vh;
}

.location-list {
  width: 300px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 8px;
}

.location-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.location-list li {
  padding: 8px;
  margin-bottom: 5px;
  background-color: #e6f7ff;
  cursor: pointer;
  border-radius: 4px;
}

.location-list li:hover {
  background-color: #bae7ff;
}

#calculated-area {
  margin-top: 15px;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
}
</style>
