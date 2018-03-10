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
  sensor: Sensor[];

  constructor(
    private router: Router,
    private nodeService: NodeService,
    private sensorService: SensorService,
  ) {}

  ngOnInit() {
    this.node = this.nodeService.getNodeData();
    //this.sensor = this.sensorService.getSensorData();

    this.loadLocationMap();
  }

  loadLocationMap(){
    var mapOptions = {
        zoom: 2,
        center: new google.maps.LatLng(50,50),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
      }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var infowindow = new google.maps.InfoWindow({});

    var markers = [];

    for (var i = 0; i < this.node.length; i++) {
      var marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.node[i].latitude,this.node[i].longitude),
      map: map,
      });

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', (function(node, marker, i) {
        var content =
            "<div class='info-card'>" +
            "<div class='info-card-heading'>" +
            node[i].nodeName +
            "</div>" +
            "<div class='info-card-subheading'>" +
            node[i].city + ', ' + node[i].state +
            ', ' + node[i].country +
            "</div>" +
            "<div class='info-card-bottom'>" +
            "<p>Some sensor stuff here</p>" +
            "</div>" +
            "</div>";
        // get Sensor data with node Id as param
        return function() {
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      })(this.node, marker, i));
    }

    var markerCluster = new MarkerClusterer(map, markers, {imagePath: "assets/img/m"});
  }

  loadHeatMap(){
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: new google.maps.LatLng(50,50),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

    var heatmapData = [];
    for (var i = 0; i < this.node.length; i++) {
      var latLng = new google.maps.LatLng(this.node[i].latitude,this.node[i].longitude);
      this.sensor = this.sensorService.getSensorDataByNode(this.node[i].nodeId);
      console.log(this.sensor;)
      /*
      var magnitude = ;
      var weightedLoc = {
        location: latLng,
        weight: Math.pow(2, magnitude)
      };
      heatmapData.push(weightedLoc);

    }
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      dissipating: false,
      map: map
    });
*/
  }
}
