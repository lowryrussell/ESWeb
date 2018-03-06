import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Node, NodeService, SensorService } from '../shared';

import { } from '@types/googlemaps';

@Component({
  selector: 'app-map-page',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  node: Node[];

  constructor(
    private router: Router,
    private nodeService: NodeService,
    private sensorService: SensorService
  ) {}

  ngOnInit() {
    this.node = this.nodeService.getNodeData();
    console.log(this.node);

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
      content: this.node[i]
      });

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        var content =
            "<div class='info-card'>" +
            "<div class='info-card-heading'>" +
            marker.content.nodeName +
            "</div>" +
            "<div class='info-card-subheading'>" +
            marker.content.city + ', ' + marker.content.state +
            ', ' + marker.content.country +
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
      })(marker, i));
    }

    var markerCluster = new MarkerClusterer(map, markers, {imagePath: "assets/img/m"});
  }

  loadHeatMap(){

  }
}
