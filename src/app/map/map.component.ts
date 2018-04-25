import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Node, NodeService, Sensor, SensorService } from '../shared';

import { } from '@types/googlemaps';

import * as MarkerClusterer from 'node-js-marker-clusterer';

@Component({
  selector: 'app-map-page',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  node: Node[];
  sensor: Sensor[] = [];

  constructor(
    private router: Router,
    private nodeService: NodeService,
    private sensorService: SensorService
  ) {}

  ngOnInit() {
    this.nodeService.getNodeData().then((data: Node[]) => {
      this.node = data;
      this.loadLocationMap();
    });
    //this.sensor = this.sensorService.getSensorData();
  }

  loadLocationMap(){

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(0,0),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        styles:
        [{
            "featureType": "landscape.man_made",
            "stylers": [{
                "color": "#eaeaea"
              }]
          },{
            "featureType": "landscape.natural",
            "stylers": [{
                "color": "#dfedd3"
              }]
          },{
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
              }]
          },{
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
              }]
          },{
            "featureType": "road.local",
            "stylers": [{
                "visibility": "off"
              }]
          },{
            "featureType": "transit",
            "stylers": [{
                "visibility": "simplified"
              }]
          },{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#caf0fe"
              }]
          }]
      });

    var infowindow = new google.maps.InfoWindow({});

    var markers = [];

    this.node.forEach(element => {
      var marker = new google.maps.Marker({
      position: new google.maps.LatLng(element.latitude,element.longitude),
      icon: "assets/img/map-marker.png",
      map: map,
      });

      markers.push(marker);

      this.sensorService.getSensorDataByNode(element.nodeId).then((data: Sensor[]) => {
        this.sensor = data
      }).then(() => {
        google.maps.event.addListener(marker, 'click', (function(node, sensor, marker) {
          var cardBottom;

          if (typeof sensor[0] == 'undefined') {
            cardBottom =
              "This node does not have any associated sensor readings!";
          }
          else {
            cardBottom =
              "Altitude: " + sensor[0].altitude + " m (meters)<br>" +
              "Humidity: " + sensor[0].humidity + " RH (relative humidity)<br>" +
              "Pressure: " + sensor[0].pressure + " hPa (hectoPascal)<br>" +
              "Temperature: " + sensor[0].temp + " &#8457 (Fahrenheit)<br>";
          }

          var content =
              "<div class='info-card'>" +
              "<div class='info-card-heading'>" +
              element.nodeName +
              "</div>" +
              "<div class='info-card-subheading'>" +
              element.city + ', ' + element.state +
              ', ' + element.country +
              "</div>" +
              "<div class='info-card-bottom'>" +
              "<p>" +
              cardBottom
              "</p>" +
              "</div>" +
              "</div>";
          return function() {
            infowindow.setContent(content);
            infowindow.open(map, marker);
          }
        })(this.node, this.sensor, marker));
      });
    })

    var markerCluster = new MarkerClusterer(map, markers, {imagePath: "assets/img/m"});
  }


  loadHeatMap(sensorType: string){
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: new google.maps.LatLng(50,50),
          styles:
          [{
              "featureType": "landscape.man_made",
              "stylers": [{
                  "color": "#eaeaea"
                }]
            },{
              "featureType": "landscape.natural",
              "stylers": [{
                  "color": "#dfedd3"
                }]
            },{
              "featureType": "road.arterial",
              "elementType": "labels",
              "stylers": [{
                  "visibility": "off"
                }]
            },{
              "featureType": "road.highway",
              "elementType": "labels",
              "stylers": [{
                  "visibility": "off"
                }]
            },{
              "featureType": "road.local",
              "stylers": [{
                  "visibility": "off"
                }]
            },{
              "featureType": "transit",
              "stylers": [{
                  "visibility": "simplified"
                }]
            },{
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [{
                  "color": "#caf0fe"
                }]
            }]
        });

    var heatmapData = [];
    this.node.forEach(element => {
      var latLng = new google.maps.LatLng(element.latitude,element.longitude);
      this.sensorService.getSensorDataByNode(element.nodeId).then((data: Sensor[]) => {
        this.sensor = data
      }).then(() => {
        if (typeof this.sensor[0] !== 'undefined') {
          var magnitude;
          if (sensorType == "altitude") {
            magnitude = this.sensor[0].altitude;
          }
          else if (sensorType == "humidity") {
            magnitude = this.sensor[0].humidity;
          }
          else if (sensorType == "pressure") {
            magnitude = this.sensor[0].pressure;
          }
          else {
            magnitude = this.sensor[0].temp;
          }
          console.log("magnitude is " + magnitude);
          var weightedLoc = {
            location: latLng,
            weight: Math.pow(1.5, magnitude)
          };
          heatmapData.push(weightedLoc);

          var heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            dissipating: true,
            radius: 30,
            map: map
          });
        }
      });
    })

  }
}
