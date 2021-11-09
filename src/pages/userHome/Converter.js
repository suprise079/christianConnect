import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';

export default function FindLatLong (address) {

  Geocode.setApiKey("AIzaSyCMa_vpPCpxn1glVrky19L6x7x4dI4LW6k"); //Insert your Google Maps API here
  Geocode.enableDebug();

  var address = address;

  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)

  const loadData = async() => {
    await Geocode.fromAddress(address).then(
        response => {
          setLat(response.results[0].geometry.location.lat)
          setLong(response.results[0].geometry.location.lng)
        }
      )
    }
  
    loadData()
  console.log("passed naates", lat, long)
  return{lat, long}
    
}