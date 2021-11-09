// import { Map, GoogleApiWrapper } from 'google-maps-react'
// import FindLatLong from './Converter';
// import {Marker } from 'google-maps-react';
// import React, { useState, useEffect } from 'react';

// const MapDraw = () => {
  
//     const {lat, long} = FindLatLong("45 Ditton Ave, Auckland Park, Johannesburg, 2092, South Africa")
//     const [fellowships, setFellowships] = useState([])
//     const [curLoc, setCurLoc]= useState({})
//     console.log("received nates", lat, long)
//     const mapStyles = {
//       width: '400px',
//       height: '400px',
//     };

//     // setCurrentLocation() 
//     navigator.geolocation.getCurrentPosition((position) => {
//         setCurLoc({
//             center: [position.coords.latitude, position.coords.longitude],
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//         });
//     })
    

    

//     // useEffect(() => {

//     //     var temp = []
//     //     const dbQuery = query(collection(f))

//     // })
    
  
//     return (
//       <Map
//         google={this.prop.google}
//         zoom={8}
//         style={mapStyles}
//         initialCenter={{ lat: lat, lng: long}}
//       >
//           {console.log("mapLatitude",lat)}
//           {console.log("mapLongitude", long)}
//         <Marker position={{ lat: lat, lng: long}} />
//       </Map>
      
//     );
// }
  
// export default GoogleApiWrapper({
//     apiKey: "AIzaSyCMa_vpPCpxn1glVrky19L6x7x4dI4LW6k"
//   })(MapDraw);

import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Geocode from 'react-geocode';
import {Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '400px'
};

export class MapDraw extends Component {
  constructor(props){
    super(props)

    this.state = {
      lat: 0,
      long: 0,
      fellowships:[],
      center: [],
      curLat:-25.7478676,
      curLong:28.2292712,
      makers:[]
    }
  }

  componentWillMount() {
    this.setCurrentLocation();
  }

  MakeMaker (address){
    Geocode.setApiKey("AIzaSyCMa_vpPCpxn1glVrky19L6x7x4dI4LW6k"); //Insert your Google Maps API here
    Geocode.enableDebug();
    
    var arr = []
    this.props.addresses.map((fs) => {
      Geocode.fromAddress(fs)
      .then(
        response => {
          console.log("state",response.results[0].geometry.location.lat)
          arr.push({lat: response.results[0].geometry.location.lat, lng: response.results[0].geometry.location.lng})
        }
      )
      .catch((err) => {
        alert("err occured!!")
        console.log(err)
      })
    })
    this.setState({makers:arr})
  }

   // Get Current Location Coordinates
   setCurrentLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                center: [position.coords.latitude, position.coords.longitude],
                curLat: position.coords.latitude,
                curLong: position.coords.longitude
            });
        });
    }
  } 
  // setCurrentLocation = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     this.setState({
  //         center: [position.coords.latitude, position.coords.longitude],
  //         curLat: position.coords.latitude,
  //         curLong: position.coords.longitude
  //     });
  //     console.log("state",this.state)
  //   });
  // }

  
  
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        center={this.state.center}
        initialCenter={{ lat: this.state.curLat, lng: this.state.curLong}}
        style={mapStyles}
      >
        {this.MakeMaker("45 Ditton Ave, Auckland Park, Johannesburg, 2092, South Africa")}
        {
          this.state.makers.map(maker => {
            return (
              <Marker
                lat={maker.lat}
                lng={maker.long}
              />
            )
          })
        }
        <Marker
            lat={this.state.lat}
            lng={this.state.long}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCMa_vpPCpxn1glVrky19L6x7x4dI4LW6k'
})(MapDraw);