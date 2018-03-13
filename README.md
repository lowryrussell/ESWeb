# EarthSense: Web app

An application which will provide a user interface to display data from the EarthSense network and manage it

# Running the node server
npm install
sudo npm install -g @angular/cli
ng serve
navigate to "http://localhost:4200/"

# Building the project
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

# Local to VM development
To launch on VM and make accessible
  ng serve --host 0.0.0.0
  navigate to 10.9.1.100:4200

# Functional specifications

## Functionalities
* Internet access
* Access to the EarthSense's network
* Interactive map
* Display data in charts and graphs
* Management panel for nodes and users
* Login and authentication system

## Requirements
* Cross-platform

# Technologies retained
* HTML
  - Define content
* CSS
  - Define style
* TypeScript
  - Define functionality
* AngularJS
  - Define routing

# Structure of the application
* app
  * auth
  * home
  * profile
  * settings
  * shared
* assets
* environments

## app: global
* app.component.html
  - header (shared/layout/header), router (@angular/router), and footer (shared/layout/footer)
  - Defines global content for web app
* app.component.ts
  - Defines functionality for initializing app
* app.module.ts
  - Defines components included in the application
* index.ts
  - Access these files from higher level modules

**Note that pages and components in pages follow this same structure**
* component.HTML
  - Define view content
* component.CSS
  - Define style of view
* component.ts
  - Define functionality of view
* module.ts
  - Define what is imported to current view such as libraries and other components

### auth - Registering and logging in
### profile - Information about the user logged in
### settings - Web application settings
### shared - HTML, CSS, or TS components that are reused on multiple views, imported into module.ts

## assets
  - .gitkeep and .npmignore files

## environments
  - Choose prod vs dev environment
  - To change the API URL to a local server, edit `environment.ts` and change `api_url` to the local server's URL (i.e. `localhost:3000/api`)
