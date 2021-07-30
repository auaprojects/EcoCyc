
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo2.png" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">EcoCyc</h2>

  <p align="center">
    Public repository for EcoCyc, a submission for the IBM Call for Code 2021
    <br />
    <br />
    <a href="https://youtu.be/qUR4NXnaEDk">View Demo</a>
    ·
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#what-is-EcoCyc">What is EcoCyc</a>
    </li>
    <li>
      <a href="#description">Description</a>
      <ul>
        <li><a href="#problem">What's the problem?</a></li>
        <li><a href="#how-can-technology-help">How can technology help</a></li>
      </ul>
    </li>
    <li><a href="#demo-video">Demo Video</a></li>
    <li><a href="#solution-architecture">Solution Architecture</a></li>
    <li><a href="#project-roadmap">Project Roadmap</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisite">Prerequisite</a></li>
        <li><a href="#run">Run</a></li>
      </ul>
    </li>
    <li><a href="#built-with">Built With</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## What is EcoCyc

EcoCyc is a cross-platform app aimed at connecting people with recycling professionals, while educating them on the merits and best practices of recycling. EcoCyc allows recycling professionals to collect recyclable waste directly from users' locations. With the Covid-19 pandemic, human movements and interactions must be reduced. The user can create a collection request depending on the address and the schedule he has defined. The waste collector can then connect to the application in order to select the requests for the collections that have been created. At the request creation, the user can choose the date and time he would like the pick up to be done. The application is available for free on PlayStore. For the moment only the Android version is available. But we plan to deploy a web version and an iOS version.

## Description

### What's the problem?

In Kenya and particularly in Nairobi, huge quantities of waste are endangering residents' health and their natural environment. Nairobi's seven million inhabitants produce more than 3,000 tonnes of waste a day. Lots of it ends up on the side of the road, in rivers, or is burned. 
Waste not only dominates the streetscape, but poses a threat to the environment and people's health. Due to the lacking of recycling facilities, a lot of waste is lost in nature and contributes greatly to environmental degradation. There is no platform or strategy allowing different people to connect with recycling professionals.

### How can technology help

- Connect people and recycling professionals through a mobile application that will be accessible free of charge to all.
- Encourages people to recycle by making it easier for them to manage their waste. This translates into the establishment of a pick up system where people do not have to move.
- Implementing a solution for the greatest number of people, that's why we offer a cross-platform solution (Web, Android, iOS).
- Educate people on the importance of recycling by recycling professionals through digital posts and flyers that can be shared on EcoCyc.

EcoCyc uses IBM Cloudant NoSQL database service to store all application data. Communication between Cloudant and the ionic front-end is handled using IBM's Cloud Functions service. Using the IBM cloud Service we have created the REST APIs necessary for the proper functioning of EcoCyc.


## Demo Video

[![Watch the video](https://i.ytimg.com/vi/qUR4NXnaEDk/0.jpg)](https://youtu.be/qUR4NXnaEDk)


## Solution Architecture

<p align="center">
  <img src="images/structure.PNG" alt="architecture">
</p>

1.	The user interacts with EcoCyc mobile application.
2.	The Ionic app communicates with the back-end APIs.
3.	The backend API is defined in Cloud Functions APIs.
4.	Cloud Functions API forwards the request to Cloud Functions.
5.	The back end stores and retrieves information on material that is provided by users in an IBM Cloudant NoSQL database.


This is an example of how to list things you need to use the software and how to install them.


## Project Roadmap

<p align="center">
  <img src="images/roadmap.png" alt="roadmap">
</p>



## Getting Started

### Prerequisite

* Download & install <a href="https://nodejs.org/en/">Nodejs</a>
* Install <a href="https://ionicframework.com/">Ionic</a> and [Capacitor](https://capacitorjs.com/)
* Install [Angular](https://angular.io/)

### Run

* Clone the project
  ```sh
  git clone https://github.com/auaprojects/EcoCyc.git
  ```
* npm install
  ```sh
  npm install
  ```
* run the project on a bowser
  ```sh
  ionic serve
  ```

## Built With

1. Ionic
2. Capacitor
3. Angular
4. Nodejs
5. Typescript
6. IBM Cloudant
7. IBM Cloud Functions

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


