# Egregore Kit
-----------------------

The Egregore Kit is a series of mathematical tools and algorithms to help detect and measure the nature of an [egregore zoo](https://en.wikipedia.org/wiki/Egregore).

## Install

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/hypercrowd/typescript-server-template)

`npm i -S https://github.com/PsySecGroup/egregore-kit.git` or `yarn add https://github.com/PsySecGroup/egregore-kit.git`

## Introduction

The Egregore Kit operates from the assumption that egregores are [state of matter](https://en.wikipedia.org/wiki/State_of_matter) shifts for matter made up of collectively shared contexts.  We create a space for each user, gather the HTTP REST requests of a user, and add those requests to the space.  This will establish shape, temperature (the difference between social from personal activity), and pressure (the difference between create and delete activity). The kit maps each user action that can be done in an application to a context axis and to a context axis:

![Context-Context Space](docs/Context-Content-Space.png "Content-Context Space")

### Axioms:

* Positive numbers on the context axis represent actions that target social context.
* Negative numbers on the context axis represent actions that target personal context.
* Positive numbers on the content axis represent actions that create content.
* Negative numbers on the content axis represent actions that destroy content.
* The content axis and the context axis are orthogonal to each other.
* Each application has REST endpoints the user uses HTTP requests to perform actions to the application.
* The REST endpoints should follow as many of the [HTTP 1.1 Request Method Standards](https://datatracker.ietf.org/doc/html/rfc7231#section-4) as possible, especially:
  * [Idempotency](https://datatracker.ietf.org/doc/html/rfc7231#section-4.2.2)
  * [Method Definitions](https://datatracker.ietf.org/doc/html/rfc7231#section-4.3)
    * Each **GET** methods is a positive number for either the content or the context axis.
    * Each **POST** methods is a positive number for either the content or the context axis.
    * Each **PUT** methods is a negative number for either the content or the context axis.
    * Each **DELETE** methods is a negative number for either the content or the context axis.
* Four vectors can be created from each point with the following properties:
  * _Context magnitude_, which is the position of the point on the context axis.
  * _Content magnitude_, which is the position of the point on the content axis.
  * _Angle_, which is established in the follow cases:
    * Social Create vector: `((Math.atan(Math.abs(contextPosition) / Math.abs(contentPosition)) * (180 / Math.PI)) / 360) || -1`
    * Personal Create vector: `((360 - Math.atan(Math.abs(contextPosition) / Math.abs(contentPosition)) * (180 / Math.PI)) / 360) || -1`
    * Personal Destroy vector: `((180 + Math.atan(Math.abs(contextPosition) / Math.abs(contentPosition)) * (180 / Math.PI)) / 360) || -1`
    * Social Destroy vector: `((180 - Math.atan(Math.abs(contextPosition) / Math.abs(contentPosition)) * (180 / Math.PI)) / 360) || -1`
* There should only be one point per orthogonal quadrant whose relevent axes position increases by 1 for each action performed:

![Context-Context Space](docs/Content-Context-Space-Example.png "Content-Context Space")

### Usage

```ts
import { HttpRequest, Space } from 'egregore-kit'

// Define what HTTP REST endpoints represent what quadrants in the Context-Content Space
const space = new Space({
  socialCreate: [
    new HttpRequest('POST', '/like'),
    new HttpRequest('POST', '/favorite'),
    new HttpRequest('POST', '/friendRequest')
    new HttpRequest('POST', '/comment'),
    new HttpRequest('POST', '/search'),
    new HttpRequest('POST', '/joinGroup'),
  ]
  personalCreate: [
    new HttpRequest('POST', '/video'),
    new HttpRequest('POST', '/post'),
    new HttpRequest('POST', '/settings'),
    new HttpRequest('POST', '/changePassword'),
  ]
  personalDestroy: [
    new HttpRequest('DELETE', '/video'),
    new HttpRequest('DELETE', '/post'),
    new HttpRequest('DELETE', '/comment'),
    new HttpRequest('PUT', '/video'),
    new HttpRequest('PUT', '/post'),
    new HttpRequest('PUT', '/comment'),
  ]
  socialDestroy: [
    new HttpRequest('POST', '/report'),
    new HttpRequest('POST', '/block'),
    new HttpRequest('POST', '/unfriend'),
  ]
})

// Populate the space with HTTP Requests
space.addRequests([
  new HttpRequest('POST', '/like', 1),
  new HttpRequest('POST', '/favorite', 2),
  new HttpRequest('POST', '/friendRequest', 3)
  new HttpRequest('POST', '/comment', 4),
  new HttpRequest('POST', '/like', 5),
  new HttpRequest('POST', '/favorite', 6),
  new HttpRequest('POST', '/friendRequest', 7)
  new HttpRequest('POST', '/comment', 8),
  new HttpRequest('POST', '/post', 9),
  new HttpRequest('POST', '/report', 10)
])

// Get the shape of the space
console.log(space.getShape())
```
## TODO

* Add temperature
* Add pressure