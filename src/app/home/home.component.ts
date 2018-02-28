import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  isAuthenticated: boolean;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
      }
    );
  }

  // Modal Image Gallery
  /*expand(person) {
    document.getElementById("modal01").style.display = "block";

    if(person == "russell") {
      document.getElementById("img01").src = "assets/img/russell.png";
      document.getElementById("aboutMe").innerHTML = "Russell Lowry - Lowry is a senior Computer\
        Science major in the Computer Science Department at the University of Arkansas. His current\
        academic work includes Database Management and Mobile Programming. He will be primarily responsible\
        for the frontend and assist with backend software.";
    }
    else if(person == "kaylee") {
      document.getElementById("img01").src = "assets/img/kaylee.jpg";
      document.getElementById("aboutMe").innerHTML = "Kaylee Rauso– Rauso is a senior Computer Engineering major\
        in the Computer Science and Computer Engineering Department at the University of Arkansas. She has\
        completed Programming Paradigms, Circuits and Electronics, Database Management Systems, and Software\
        Engineering. She interned at Cerner Corporation as a software intern developing and updating front-end\
        implementations in Java for one of Cerner’s in-hospital solutions. She will be responsible for developing\
        the web application.";
    }
    else if(person == "brok") {
      document.getElementById("img01").src = "assets/img/brok.jpg";
      document.getElementById("aboutMe").innerHTML = "Brok Stafford - Stafford is a senior Computer Science major\
        in the Computer Science Department at the University of Arkansas. His current academic work includes Big\
        Data Management and Analytics, Computer Networks, and an honors thesis on the topic of dynamic 3D\
        network visualizations. He will be primarily responsible for the backend software including the Cassandra\
        database, MQTT broker, and the server APIs.";
    }
    else if(person == "keaten") {
      document.getElementById("img01").src = "assets/img/keaten.jpg";
      document.getElementById("aboutMe").innerHTML = "Keaten Stokke - Stokke is a senior Computer Engineering\
        major in the CSCE Department at the University of Arkansas. Relevant academic courses that have been\
        completed are Embedded Systems, Software Engineering, and Digital Systems Testing. Project responsibilities\
        include hardware setup, location planning, data retrieval, and website design.";
    }
    else if(person == "olivia") {
      document.getElementById("img01").src = "assets/img/olivia.png";
      document.getElementById("aboutMe").innerHTML = "Olivia Moses - Olivia is a Senior Computer Engineering\
        major at the University of Arkansas. She has experience with many group projects and working within\
        a group to complete a list of goals. She will be responsible for assisting with website design and\
        hardware configuration/setup.";
    }
    else if(person == "taylor") {
      document.getElementById("img01").src = "assets/img/Taylor.jpg";
      document.getElementById("aboutMe").innerHTML = "Taylor Whitaker - Whitaker is a Ph.D. candidate for\
      Computer Engineering at the University of Arkansas.";
    }
  }*/
}
