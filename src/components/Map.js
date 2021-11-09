import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {MdLocationOn} from "react-icons/md";
// import

const AnyReactComponent = ({ object }) => <div>{object}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: -26.18,
      lng:  28.00
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '35vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCMa_vpPCpxn1glVrky19L6x7x4dI4LW6k" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={-26.184520}
            lng={ 28.003930}
            object= {<MdLocationOn size="2em" color="red"/>}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;