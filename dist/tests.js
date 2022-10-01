var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// tests/index.ts
var import_uvu5 = require("uvu");

// tests/httpRequest.ts
var import_uvu = require("uvu");
var assert = __toESM(require("uvu/assert"));

// src/httpRequest.ts
var import_easy_match = __toESM(require("easy-match"));
var HttpRequest = class {
  constructor(method, endpoint, time = 0) {
    if (typeof method === "string") {
      this.method = method;
      this.endpoint = endpoint;
      this.time = time;
    } else {
      this.method = method.method;
      this.endpoint = method.endpoint;
      this.time = method.time || 0;
    }
  }
  isMatch(query) {
    return (0, import_easy_match.default)([this.method], [query.method]).ismatch && (0, import_easy_match.default)([this.endpoint], [query.endpoint]).ismatch;
  }
};

// src/vector.ts
var Vector = class {
  constructor(point) {
    this.type = point.type;
    this.content = point.content;
    this.context = point.context;
  }
};

// src/quadrantPoint.ts
var QuadrantPoint = class {
  constructor(type, content = 0, context = 0, time = 0) {
    if (typeof type === "number") {
      this.type = type;
      this.content = content;
      this.context = context;
      this.time = time;
    } else {
      const json = type;
      this.type = json.type;
      this.content = json.content;
      this.context = json.context;
      this.time = json.time;
    }
  }
  addContext(value = 1) {
    this.context += value;
  }
  addContent(value = 1) {
    this.content += value;
  }
  toVector() {
    return new Vector(this);
  }
};

// src/space.ts
var isNegativeZero = require("is-negative-zero");
var PI_RADIAN = 180 / Math.PI;
function requestSearch(list, request) {
  return list.find((endpoint) => request.isMatch(endpoint)) !== void 0;
}
function getDegrees(a, b, offset = 360) {
  const slope = (b.context - a.context) / (b.content - a.content);
  const degree = Math.atan(slope) * PI_RADIAN;
  let angle = degree % 360;
  if (angle < 0) {
    angle += offset;
  } else if (isNegativeZero(angle)) {
    angle = 180;
  }
  return angle;
}
var Space = class {
  constructor(endpoints2) {
    this.points = {
      [0 /* socialCreate */]: [],
      [1 /* personalCreate */]: [],
      [2 /* personalDestroy */]: [],
      [3 /* socialDestroy */]: []
    };
    const social = typeof endpoints2.social[0] !== "string" ? endpoints2.social : endpoints2.social.map((endpoint) => {
      const parts = endpoint.split(" ");
      return new HttpRequest(parts[0], parts[1]);
    });
    const personal = typeof endpoints2.personal[0] !== "string" ? endpoints2.personal : endpoints2.personal.map((endpoint) => {
      const parts = endpoint.split(" ");
      return new HttpRequest(parts[0], parts[1]);
    });
    const create = typeof endpoints2.create[0] !== "string" ? endpoints2.create : endpoints2.create.map((endpoint) => {
      const parts = endpoint.split(" ");
      return new HttpRequest(parts[0], parts[1]);
    });
    const destroy = typeof endpoints2.destroy[0] !== "string" ? endpoints2.destroy : endpoints2.destroy.map((endpoint) => {
      const parts = endpoint.split(" ");
      return new HttpRequest(parts[0], parts[1]);
    });
    this.endpoints = {
      social,
      personal,
      create,
      destroy
    };
  }
  addRequests(requests) {
    for (const request of requests) {
      if (requestSearch(this.endpoints.social, request)) {
        this.points[0 /* socialCreate */].push(new QuadrantPoint(0 /* socialCreate */, 0, 1, request.time));
      }
      if (requestSearch(this.endpoints.personal, request)) {
        this.points[1 /* personalCreate */].push(new QuadrantPoint(1 /* personalCreate */, 0, -1, request.time));
      }
      if (requestSearch(this.endpoints.create, request)) {
        this.points[2 /* personalDestroy */].push(new QuadrantPoint(2 /* personalDestroy */, 1, 0, request.time));
      }
      if (requestSearch(this.endpoints.destroy, request)) {
        this.points[3 /* socialDestroy */].push(new QuadrantPoint(3 /* socialDestroy */, -1, 0, request.time));
      }
    }
  }
  getPoints() {
    return [
      ...this.points[0 /* socialCreate */],
      ...this.points[1 /* personalCreate */],
      ...this.points[2 /* personalDestroy */],
      ...this.points[3 /* socialDestroy */]
    ];
  }
  _reduce(points) {
    if (points.length === 0) {
      return false;
    }
    let content = 0;
    let context = 0;
    for (const point of points) {
      context += point.context;
      content += point.content;
    }
    const result = new QuadrantPoint(points[0].type, content, context).toVector();
    return result;
  }
  getVectors(users) {
    const vectors = [
      this._reduce(this.points[0 /* socialCreate */]),
      this._reduce(this.points[1 /* personalCreate */]),
      this._reduce(this.points[2 /* personalDestroy */]),
      this._reduce(this.points[3 /* socialDestroy */])
    ].filter((vector) => vector !== false);
    const result = {
      temperature: 0,
      pressure: 0,
      vectors,
      angles: []
    };
    for (let i = 0, len = result.vectors.length; i < len; i++) {
      const vector = result.vectors[i];
      const nextVector = result.vectors[i + 1] === void 0 ? result.vectors[0] : result.vectors[i + 1];
      result.angles.push(getDegrees(vector, nextVector, 360 - i * 90));
      result.temperature += vector.context;
      result.pressure += vector.content;
    }
    result.temperature /= users;
    result.pressure /= users;
    return result;
  }
};

// tests/httpRequest.ts
(0, import_uvu.test)("HTTP Request: Construct", async () => {
  const request = new HttpRequest("GET", "/test", 100);
  assert.equal(request.method, "GET");
  assert.equal(request.endpoint, "/test");
  assert.equal(request.time, 100);
});
(0, import_uvu.test)("HTTP Request: String match pass", async () => {
  const request = new HttpRequest("GET", "/test");
  const query = new HttpRequest("GET", "/test");
  assert.equal(request.isMatch(query), true);
});
(0, import_uvu.test)("HTTP Request: String match fail", async () => {
  const request = new HttpRequest("GET", "/test");
  const query = new HttpRequest("GET", "/beep");
  assert.equal(request.isMatch(query), false);
});
(0, import_uvu.test)("HTTP Request: Right wildcard pass", async () => {
  const request = new HttpRequest("GET", "/post/88594");
  const query = new HttpRequest("GET", "/post/*");
  assert.equal(request.isMatch(query), true);
});
(0, import_uvu.test)("HTTP Request: Right wildcard fail", async () => {
  const request = new HttpRequest("GET", "/video/88594");
  const query = new HttpRequest("GET", "/post/*");
  assert.equal(request.isMatch(query), false);
});
(0, import_uvu.test)("HTTP Request: Inner wildcard pass", async () => {
  const request = new HttpRequest("GET", "/post/88594/log");
  const query = new HttpRequest("GET", "/post/*/log");
  assert.equal(request.isMatch(query), true);
});
(0, import_uvu.test)("HTTP Request: Inner wildcard fail", async () => {
  const request = new HttpRequest("GET", "/video/88594/log");
  const query = new HttpRequest("GET", "/post/*/log");
  assert.equal(request.isMatch(query), false);
});
(0, import_uvu.test)("HTTP Request: Load from JSON", async () => {
  const request = new HttpRequest({
    method: "GET",
    endpoint: "/test",
    time: 100
  });
  assert.equal(request.method, "GET");
  assert.equal(request.endpoint, "/test");
  assert.equal(request.time, 100);
});

// tests/quadrantPoint.ts
var import_uvu2 = require("uvu");
var assert2 = __toESM(require("uvu/assert"));
(0, import_uvu2.test)("Quadrant Points: Construct", async () => {
  const point = new QuadrantPoint(0 /* socialCreate */);
  assert2.equal(point.content, 0);
  assert2.equal(point.context, 0);
  assert2.equal(point.type, 0 /* socialCreate */);
});
(0, import_uvu2.test)("Quadrant Points: Construct from JSON", async () => {
  const point = new QuadrantPoint({
    type: 0 /* socialCreate */,
    context: 10,
    content: 20
  });
  assert2.equal(point.content, 20);
  assert2.equal(point.context, 10);
  assert2.equal(point.type, 0 /* socialCreate */);
});
(0, import_uvu2.test)("Quadrant Points: Modify", async () => {
  const point = new QuadrantPoint(0 /* socialCreate */, 30, 100);
  point.addContent(30);
  point.addContext(100);
  assert2.equal(point.content, 60);
  assert2.equal(point.context, 200);
  assert2.equal(point.type, 0 /* socialCreate */);
});

// tests/space.ts
var import_uvu3 = require("uvu");
var assert3 = __toESM(require("uvu/assert"));
var endpoints = {
  social: [
    new HttpRequest("POST", "/like/*"),
    new HttpRequest("POST", "/favorite/*"),
    new HttpRequest("POST", "/friendRequest/*"),
    new HttpRequest("POST", "/post/*/comment"),
    new HttpRequest("POST", "/search/*"),
    new HttpRequest("POST", "/joinGroup/*"),
    new HttpRequest("POST", "/report"),
    new HttpRequest("POST", "/block/*"),
    new HttpRequest("POST", "/unfriend/*")
  ],
  personal: [
    new HttpRequest("POST", "/video"),
    new HttpRequest("POST", "/post"),
    new HttpRequest("POST", "/settings"),
    new HttpRequest("POST", "/changePassword")
  ],
  create: [
    new HttpRequest("POST", "/video"),
    new HttpRequest("POST", "/post"),
    new HttpRequest("POST", "/post/*/comment"),
    new HttpRequest("POST", "/like/*"),
    new HttpRequest("POST", "/favorite/*"),
    new HttpRequest("POST", "/friendRequest/*"),
    new HttpRequest("POST", "/post/*/comment"),
    new HttpRequest("POST", "/search/*"),
    new HttpRequest("POST", "/joinGroup/*")
  ],
  destroy: [
    new HttpRequest("DELETE", "/video/*"),
    new HttpRequest("POST", "/changePassword"),
    new HttpRequest("POST", "/settings"),
    new HttpRequest("DELETE", "/post/*"),
    new HttpRequest("DELETE", "/comment/*"),
    new HttpRequest("PUT", "/video/*"),
    new HttpRequest("PUT", "/post/*"),
    new HttpRequest("PUT", "/comment/*"),
    new HttpRequest("POST", "/report"),
    new HttpRequest("POST", "/block/*"),
    new HttpRequest("POST", "/unfriend/*")
  ]
};
(0, import_uvu3.test)("Space: Get Points", async () => {
  const space = new Space(endpoints);
  space.addRequests([
    new HttpRequest("POST", "/like/1", 1),
    new HttpRequest("POST", "/video", 2),
    new HttpRequest("POST", "/friendRequest/3", 3),
    new HttpRequest("POST", "/block/4", 4)
  ]);
  const points = space.getPoints();
  assert3.equal(points.length, 8);
  assert3.equal(points[0].type, 0);
  assert3.equal(points[0].content, 0);
  assert3.equal(points[0].context, 1);
  assert3.equal(points[0].time, 1);
  assert3.equal(points[1].type, 0);
  assert3.equal(points[1].content, 0);
  assert3.equal(points[1].context, 1);
  assert3.equal(points[1].time, 3);
  assert3.equal(points[2].type, 0);
  assert3.equal(points[2].content, 0);
  assert3.equal(points[2].context, 1);
  assert3.equal(points[2].time, 4);
  assert3.equal(points[3].type, 1);
  assert3.equal(points[3].content, 0);
  assert3.equal(points[3].context, -1);
  assert3.equal(points[3].time, 2);
  assert3.equal(points[4].type, 2);
  assert3.equal(points[4].content, 1);
  assert3.equal(points[4].context, 0);
  assert3.equal(points[4].time, 1);
  assert3.equal(points[5].type, 2);
  assert3.equal(points[5].content, 1);
  assert3.equal(points[5].context, 0);
  assert3.equal(points[5].time, 2);
  assert3.equal(points[6].type, 2);
  assert3.equal(points[6].content, 1);
  assert3.equal(points[6].context, 0);
  assert3.equal(points[6].time, 3);
  assert3.equal(points[7].type, 3);
  assert3.equal(points[7].content, -1);
  assert3.equal(points[7].context, 0);
  assert3.equal(points[7].time, 4);
});
(0, import_uvu3.test)("Space: Get Vectors 1", async () => {
  const space = new Space(endpoints);
  space.addRequests([
    new HttpRequest("POST", "/like/1", 1),
    new HttpRequest("POST", "/video", 2),
    new HttpRequest("POST", "/friendRequest/3", 3),
    new HttpRequest("POST", "/block/4", 4)
  ]);
  const shape = space.getVectors(1);
  assert3.equal(shape.temperature, 2);
  assert3.equal(shape.pressure, 2);
  assert3.equal(shape.vectors.length, 4);
  assert3.equal(shape.angles.length, 4);
  assert3.equal(shape.vectors[0].type, 0);
  assert3.equal(shape.vectors[0].content, 0);
  assert3.equal(shape.vectors[0].context, 3);
  assert3.equal(shape.angles[0], 270);
  assert3.equal(shape.vectors[1].type, 1);
  assert3.equal(shape.vectors[1].content, 0);
  assert3.equal(shape.vectors[1].context, -1);
  assert3.equal(shape.angles[1], 18.43494882292201);
  assert3.equal(shape.vectors[2].type, 2);
  assert3.equal(shape.vectors[2].content, 3);
  assert3.equal(shape.vectors[2].context, 0);
  assert3.equal(shape.angles[2], 180);
  assert3.equal(shape.vectors[3].type, 3);
  assert3.equal(shape.vectors[3].content, -1);
  assert3.equal(shape.vectors[3].context, 0);
  assert3.equal(shape.angles[3], 71.56505117707799);
});
(0, import_uvu3.test)("Space: Get Vectors 1", async () => {
  const space = new Space(endpoints);
  space.addRequests([
    new HttpRequest("POST", "/like/1", 1),
    new HttpRequest("POST", "/video", 2),
    new HttpRequest("POST", "/friendRequest/3", 3)
  ]);
  const shape = space.getVectors(1);
  assert3.equal(shape.temperature, 1);
  assert3.equal(shape.pressure, 3);
  assert3.equal(shape.vectors.length, 3);
  assert3.equal(shape.angles.length, 3);
  assert3.equal(shape.vectors[0].type, 0);
  assert3.equal(shape.vectors[0].content, 0);
  assert3.equal(shape.vectors[0].context, 2);
  assert3.equal(shape.angles[0], 270);
  assert3.equal(shape.vectors[1].type, 1);
  assert3.equal(shape.vectors[1].content, 0);
  assert3.equal(shape.vectors[1].context, -1);
  assert3.equal(shape.angles[1], 18.43494882292201);
  assert3.equal(shape.vectors[2].type, 2);
  assert3.equal(shape.vectors[2].content, 3);
  assert3.equal(shape.vectors[2].context, 0);
  assert3.equal(shape.angles[2], 146.30993247402023);
});
(0, import_uvu3.test)("Space: Get Points from JSON endpoints", async () => {
  const space = new Space({
    social: [
      "POST /like/*",
      "POST /favorite/*",
      "POST /friendRequest/*",
      "POST /post/*/comment",
      "POST /search/*",
      "POST /joinGroup/*",
      "POST /report",
      "POST /block/*",
      "POST /unfriend/*"
    ],
    personal: [
      "POST /video",
      "POST /post",
      "POST /settings",
      "POST /changePassword"
    ],
    create: [
      "POST /video",
      "POST /post",
      "POST /post/*/comment",
      "POST /like/*",
      "POST /favorite/*",
      "POST /friendRequest/*",
      "POST /post/*/comment",
      "POST /search/*",
      "POST /joinGroup/*"
    ],
    destroy: [
      "DELETE /video/*",
      "POST /changePassword",
      "POST /settings",
      "DELETE /post/*",
      "DELETE /comment/*",
      "PUT /video/*",
      "PUT /post/*",
      "PUT /comment/*",
      "POST /report",
      "POST /block/*",
      "POST /unfriend/*"
    ]
  });
  space.addRequests([
    new HttpRequest("POST", "/like/1", 1),
    new HttpRequest("POST", "/video", 2),
    new HttpRequest("POST", "/friendRequest/3", 3),
    new HttpRequest("POST", "/block/4", 4)
  ]);
  const points = space.getPoints();
  assert3.equal(points.length, 8);
  assert3.equal(points[0].type, 0);
  assert3.equal(points[0].content, 0);
  assert3.equal(points[0].context, 1);
  assert3.equal(points[0].time, 1);
  assert3.equal(points[1].type, 0);
  assert3.equal(points[1].content, 0);
  assert3.equal(points[1].context, 1);
  assert3.equal(points[1].time, 3);
  assert3.equal(points[2].type, 0);
  assert3.equal(points[2].content, 0);
  assert3.equal(points[2].context, 1);
  assert3.equal(points[2].time, 4);
  assert3.equal(points[3].type, 1);
  assert3.equal(points[3].content, 0);
  assert3.equal(points[3].context, -1);
  assert3.equal(points[3].time, 2);
  assert3.equal(points[4].type, 2);
  assert3.equal(points[4].content, 1);
  assert3.equal(points[4].context, 0);
  assert3.equal(points[4].time, 1);
  assert3.equal(points[5].type, 2);
  assert3.equal(points[5].content, 1);
  assert3.equal(points[5].context, 0);
  assert3.equal(points[5].time, 2);
  assert3.equal(points[6].type, 2);
  assert3.equal(points[6].content, 1);
  assert3.equal(points[6].context, 0);
  assert3.equal(points[6].time, 3);
  assert3.equal(points[7].type, 3);
  assert3.equal(points[7].content, -1);
  assert3.equal(points[7].context, 0);
  assert3.equal(points[7].time, 4);
});

// tests/vector.ts
var import_uvu4 = require("uvu");
var assert4 = __toESM(require("uvu/assert"));
(0, import_uvu4.test)("Vector: To 1/1 Vector", async () => {
  const socialCreate = new QuadrantPoint(0 /* socialCreate */, 1, 1);
  const personalCreate = new QuadrantPoint(1 /* personalCreate */, 1, 1);
  const personalDestroy = new QuadrantPoint(2 /* personalDestroy */, 1, 1);
  const socialDestroy = new QuadrantPoint(3 /* socialDestroy */, 1, 1);
  const socialCreateVector = socialCreate.toVector();
  const personalCreateVector = personalCreate.toVector();
  const personalDestroyVector = personalDestroy.toVector();
  const socialDestroyVector = socialDestroy.toVector();
  assert4.equal(socialCreateVector.content, 1);
  assert4.equal(socialCreateVector.context, 1);
  assert4.equal(socialCreateVector.type, 0 /* socialCreate */);
  assert4.equal(personalCreateVector.content, 1);
  assert4.equal(personalCreateVector.context, 1);
  assert4.equal(personalCreateVector.type, 1 /* personalCreate */);
  assert4.equal(personalDestroyVector.content, 1);
  assert4.equal(personalDestroyVector.context, 1);
  assert4.equal(personalDestroyVector.type, 2 /* personalDestroy */);
  assert4.equal(socialDestroyVector.content, 1);
  assert4.equal(socialDestroyVector.context, 1);
  assert4.equal(socialDestroyVector.type, 3 /* socialDestroy */);
});
(0, import_uvu4.test)("Vector: To 1/0 Vector", async () => {
  const socialCreate = new QuadrantPoint(0 /* socialCreate */, 1, 0);
  const personalCreate = new QuadrantPoint(1 /* personalCreate */, 1, 0);
  const personalDestroy = new QuadrantPoint(2 /* personalDestroy */, 1, 0);
  const socialDestroy = new QuadrantPoint(3 /* socialDestroy */, 1, 0);
  const socialCreateVector = socialCreate.toVector();
  const personalCreateVector = personalCreate.toVector();
  const personalDestroyVector = personalDestroy.toVector();
  const socialDestroyVector = socialDestroy.toVector();
  assert4.equal(socialCreateVector.content, 1);
  assert4.equal(socialCreateVector.context, 0);
  assert4.equal(socialCreateVector.type, 0 /* socialCreate */);
  assert4.equal(personalCreateVector.content, 1);
  assert4.equal(personalCreateVector.context, 0);
  assert4.equal(personalCreateVector.type, 1 /* personalCreate */);
  assert4.equal(personalDestroyVector.content, 1);
  assert4.equal(personalDestroyVector.context, 0);
  assert4.equal(personalDestroyVector.type, 2 /* personalDestroy */);
  assert4.equal(socialDestroyVector.content, 1);
  assert4.equal(socialDestroyVector.context, 0);
  assert4.equal(socialDestroyVector.type, 3 /* socialDestroy */);
});
(0, import_uvu4.test)("Vector: To 0/1 Vector", async () => {
  const socialCreate = new QuadrantPoint(0 /* socialCreate */, 0, 1);
  const personalCreate = new QuadrantPoint(1 /* personalCreate */, 0, 1);
  const personalDestroy = new QuadrantPoint(2 /* personalDestroy */, 0, 1);
  const socialDestroy = new QuadrantPoint(3 /* socialDestroy */, 0, 1);
  const socialCreateVector = socialCreate.toVector();
  const personalCreateVector = personalCreate.toVector();
  const personalDestroyVector = personalDestroy.toVector();
  const socialDestroyVector = socialDestroy.toVector();
  assert4.equal(socialCreateVector.content, 0);
  assert4.equal(socialCreateVector.context, 1);
  assert4.equal(socialCreateVector.type, 0 /* socialCreate */);
  assert4.equal(personalCreateVector.content, 0);
  assert4.equal(personalCreateVector.context, 1);
  assert4.equal(personalCreateVector.type, 1 /* personalCreate */);
  assert4.equal(personalDestroyVector.content, 0);
  assert4.equal(personalDestroyVector.context, 1);
  assert4.equal(personalDestroyVector.type, 2 /* personalDestroy */);
  assert4.equal(socialDestroyVector.content, 0);
  assert4.equal(socialDestroyVector.context, 1);
  assert4.equal(socialDestroyVector.type, 3 /* socialDestroy */);
});
(0, import_uvu4.test)("Vector: To 100/1 Vector", async () => {
  const socialCreate = new QuadrantPoint(0 /* socialCreate */, 100, 1);
  const personalCreate = new QuadrantPoint(1 /* personalCreate */, 100, 1);
  const personalDestroy = new QuadrantPoint(2 /* personalDestroy */, 100, 1);
  const socialDestroy = new QuadrantPoint(3 /* socialDestroy */, 100, 1);
  const socialCreateVector = socialCreate.toVector();
  const personalCreateVector = personalCreate.toVector();
  const personalDestroyVector = personalDestroy.toVector();
  const socialDestroyVector = socialDestroy.toVector();
  assert4.equal(socialCreateVector.content, 100);
  assert4.equal(socialCreateVector.context, 1);
  assert4.equal(socialCreateVector.type, 0 /* socialCreate */);
  assert4.equal(personalCreateVector.content, 100);
  assert4.equal(personalCreateVector.context, 1);
  assert4.equal(personalCreateVector.type, 1 /* personalCreate */);
  assert4.equal(personalDestroyVector.content, 100);
  assert4.equal(personalDestroyVector.context, 1);
  assert4.equal(personalDestroyVector.type, 2 /* personalDestroy */);
  assert4.equal(socialDestroyVector.content, 100);
  assert4.equal(socialDestroyVector.context, 1);
  assert4.equal(socialDestroyVector.type, 3 /* socialDestroy */);
});
(0, import_uvu4.test)("Vector: To 1/100 Vector", async () => {
  const socialCreate = new QuadrantPoint(0 /* socialCreate */, 1, 100);
  const personalCreate = new QuadrantPoint(1 /* personalCreate */, 1, 100);
  const personalDestroy = new QuadrantPoint(2 /* personalDestroy */, 1, 100);
  const socialDestroy = new QuadrantPoint(3 /* socialDestroy */, 1, 100);
  const socialCreateVector = socialCreate.toVector();
  const personalCreateVector = personalCreate.toVector();
  const personalDestroyVector = personalDestroy.toVector();
  const socialDestroyVector = socialDestroy.toVector();
  assert4.equal(socialCreateVector.content, 1);
  assert4.equal(socialCreateVector.context, 100);
  assert4.equal(socialCreateVector.type, 0 /* socialCreate */);
  assert4.equal(personalCreateVector.content, 1);
  assert4.equal(personalCreateVector.context, 100);
  assert4.equal(personalCreateVector.type, 1 /* personalCreate */);
  assert4.equal(personalDestroyVector.content, 1);
  assert4.equal(personalDestroyVector.context, 100);
  assert4.equal(personalDestroyVector.type, 2 /* personalDestroy */);
  assert4.equal(socialDestroyVector.content, 1);
  assert4.equal(socialDestroyVector.context, 100);
  assert4.equal(socialDestroyVector.type, 3 /* socialDestroy */);
});

// tests/index.ts
import_uvu5.test.run();
//# sourceMappingURL=tests.js.map