# Egregore Kit
-----------------------

The Egregore Kit is a collection of mathematical tools and algorithms to help detect and measure the behavior of an [egregore zoo](https://en.wikipedia.org/wiki/Egregore).  An [egregore](https://en.wikipedia.org/wiki/Egregore#Contemporary_usage) is an anthroposophic (objectively measurable spiritual domains) concept that describes the behavior of large numbers of humans when they are under the influence of a shared purpose.

## Install

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/hypercrowd/typescript-server-template)

* `npm i -S https://github.com/PsySecGroup/egregore-kit.git`
* `yarn add https://github.com/PsySecGroup/egregore-kit.git`

## Introduction

The Egregore Kit operates from the assumption that humans under the influence of a shared purpose form a "_networked material_" which facilitates the transmission of intentions, meanings, unconscious interests, contexts, and perceptions.  From this assumption, the Kit frames egregores as [states of matter](https://en.wikipedia.org/wiki/State_of_matter) of this networked material. These states of matter are formed via pressure (the sum of creation and deletion activity) and temperature (the sum of personal and social activity).  Temperature and pressure are derived from **context-content space** made of two axes (The _social-personal_ axis, and the _create-delete_ axis).  

![Content-Context Space](docs/Context-Content-Space.png "Content-Context Space")

Since the egregore is networked material, we have to create a Context-Content Space for every user within the egregore.  To build that space, we need to identify the HTTP REST endpoints of a web application and categorize them based on their contribution to social, personal, creation, and deletion activities.  Then we run a HTTP server access log through the Egregore Kit to discover egregore formations the web application is facilitiating.

### Axioms:

* The content axis and the context axis are orthogonal to each other.
* A web application has HTTP REST endpoints and these endpoints can be categorized as social, personal, creation, and/or deletion activity.
* An endpoint can be part of one or more activity categories.
* Positive numbers on the context axis represent actions that target social context.
* Negative numbers on the context axis represent actions that target personal context.
* Positive numbers on the content axis represent actions that create content.
* Negative numbers on the content axis represent actions that destroy content.
* The REST endpoints should follow as many of the [HTTP 1.1 Request Method Standards](https://datatracker.ietf.org/doc/html/rfc7231#section-4) as possible, especially:
  * [Idempotency](https://datatracker.ietf.org/doc/html/rfc7231#section-4.2.2)
  * [Method Definitions](https://datatracker.ietf.org/doc/html/rfc7231#section-4.3)
* Four vectors can be created from an accumulation of endpoint access:
  * _Context magnitude_, which is the position of the point on the context axis.
  * _Content magnitude_, which is the position of the point on the content axis.
  * _Type_, which is the kind of vector being represented (_socialCreate, personalCreate, personalDestroy, socialDestroy_)
* There should only be one vector per orthogonal quadrant.  For example:

![Context-Context Space](docs/Content-Context-Space-Example.png "Content-Context Space")

### Usage

#### CLI

* ```npm run cli --help```
* ```yarn cli --help```

#### TypeScript

```ts
import { HttpRequest, Space } from 'egregore-kit'

// Define what HTTP REST endpoints represent what quadrants in the Context-Content Space.
// Wildcards can be used for complex URIs
const space = new Space({
    social: [
      'POST /like/*',
      'POST /favorite/*',
      'POST /friendRequest/*',
      'POST /post/*/comment',
      'POST /search/*',
      'POST /joinGroup/*',
      'POST /report',
      'POST /block/*',
      'POST /unfriend/*'
    ],
    personal: [
      'POST /video',
      'POST /post',
      'POST /settings',
      'POST /changePassword',
    ],
    create: [
      'POST /video',
      'POST /post',
      'POST /post/*/comment',
      'POST /like/*',
      'POST /favorite/*',
      'POST /friendRequest/*',
      'POST /post/*/comment',
      'POST /search/*',
      'POST /joinGroup/*'
    ],
    destroy: [
      'DELETE /video/*',
      'POST /changePassword',
      'POST /settings',
      'DELETE /post/*',
      'DELETE /comment/*',
      'PUT /video/*',
      'PUT /post/*',
      'PUT /comment/*',
      'POST /report',
      'POST /block/*',
      'POST /unfriend/*'
    ]
  })

// Populate the space with HTTP Requests from methods, endpoints, and timestamps extracted from an Nginx or Apache log
// @TODO: Automated processing of these logs coming soon!
space.addRequests([
  new HttpRequest('POST', '/like/1', 1664661095644),
  new HttpRequest('POST', '/video', 1664661096644),
  new HttpRequest('POST', '/friendRequest/3', 1664661097644),
  new HttpRequest('POST', '/block/4', 1664661097644)
])

// Get an array of all HTTP Requests distributed across the Context-Context space
const points = space.getPoints()
/*
[
  { type: 0, content: 0, context: 1, time: 1 },
  { type: 0, content: 0, context: 1, time: 3 },
  { type: 0, content: 0, context: 1, time: 4 },
  { type: 1, content: 0, context: -1, time: 2 },
  { type: 2, content: 1, context: 0, time: 1 },
  { type: 2, content: 1, context: 0, time: 2 },
  { type: 2, content: 1, context: 0, time: 3 },
  { type: 3, content: -1, context: 0, time: 4 }
]
*/

// Sum together each content and context position into one vector per quadrant, calculate the angles between each point, and calculate the temperature and pressure of the networked material.  (In this example, 3 users, which is seen as the first parameter)
const vectors = space.getVectors(3)
/*
{
  temperature: 2,
  pressure: 2,
  vectors: [
    Vector { type: 0, x: 0, y: 3 },
    Vector { type: 1, x: 0, y: -1 },
    Vector { type: 2, x: 3, y: 0 },
    Vector { type: 3, x: -1, y: 0 }
  ],
  angles: [ 270, 18.43494882292201, 180, 71.56505117707799 ]
}
*/
```

## TODO

* Examples:
  * Calculating the vectors of a single user for each day of the week
  * Calculating the vectors of a cluster of users every 10 minutes
  * Calculating the vectors of different versions of an application for a cluster of users every hour
* Native cosine similarity comparisons
* CLI, pipe, and stream support
