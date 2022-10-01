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
var PI_RADIAN = 180 / Math.PI;
function getDegrees(rise, run) {
  return Math.atan(Math.abs(rise) / Math.abs(run)) * PI_RADIAN;
}
var Vector = class {
  constructor(point) {
    this.type = point.type;
    this.content = point.content;
    this.context = point.context;
    const degree = getDegrees(this.context, this.content);
    switch (point.type) {
      case 0 /* socialCreate */:
        this.angle = degree;
        break;
      case 1 /* personalCreate */:
        this.angle = this.content === 0 ? 0 : 360 - degree;
        break;
      case 2 /* personalDestroy */:
        this.angle = this.content === 0 ? 270 : 180 + degree;
        break;
      case 3 /* socialDestroy */:
        this.angle = this.content === 0 ? 180 : 180 - degree;
        break;
    }
  }
};

// src/quadrantPoint.ts
var QuadrantPoint2 = class {
  constructor(type, content = 0, context = 0) {
    if (typeof type === "number") {
      this.type = type;
      this.content = content;
      this.context = context;
    } else {
      const json = type;
      this.type = json.type;
      this.content = json.content;
      this.context = json.context;
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
  const point = new QuadrantPoint2(0 /* socialCreate */);
  assert2.equal(point.content, 0);
  assert2.equal(point.context, 0);
  assert2.equal(point.type, 0 /* socialCreate */);
});
(0, import_uvu2.test)("Quadrant Points: Construct from JSON", async () => {
  const point = new QuadrantPoint2({
    type: 0 /* socialCreate */,
    context: 10,
    content: 20
  });
  assert2.equal(point.content, 20);
  assert2.equal(point.context, 10);
  assert2.equal(point.type, 0 /* socialCreate */);
});
(0, import_uvu2.test)("Quadrant Points: Modify", async () => {
  const point = new QuadrantPoint2(0 /* socialCreate */, 30, 100);
  point.addContent(30);
  point.addContext(100);
  assert2.equal(point.content, 60);
  assert2.equal(point.context, 200);
  assert2.equal(point.type, 0 /* socialCreate */);
});

// tests/space.ts
var import_uvu3 = require("uvu");
var assert3 = __toESM(require("uvu/assert"));
(0, import_uvu3.test)("Space", async () => {
  assert3.ok(true);
});

// tests/vector.ts
var import_uvu4 = require("uvu");
var assert4 = __toESM(require("uvu/assert"));
(0, import_uvu4.test)("Vector: To 1/1 Vector", async () => {
  const socialCreate = new QuadrantPoint2(0 /* socialCreate */, 1, 1);
  const personalCreate = new QuadrantPoint2(1 /* personalCreate */, 1, 1);
  const personalDestroy = new QuadrantPoint2(2 /* personalDestroy */, 1, 1);
  const socialDestroy = new QuadrantPoint2(3 /* socialDestroy */, 1, 1);
  const socialCreateVector = socialCreate.toVector();
  const personalCreateVector = personalCreate.toVector();
  const personalDestroyVector = personalDestroy.toVector();
  const socialDestroyVector = socialDestroy.toVector();
  assert4.equal(socialCreateVector.content, 1);
  assert4.equal(socialCreateVector.context, 1);
  assert4.equal(socialCreateVector.type, 0 /* socialCreate */);
  assert4.equal(socialCreateVector.angle, 45);
  assert4.equal(personalCreateVector.content, 1);
  assert4.equal(personalCreateVector.context, 1);
  assert4.equal(personalCreateVector.type, 1 /* personalCreate */);
  assert4.equal(personalCreateVector.angle, 315);
  assert4.equal(personalDestroyVector.content, 1);
  assert4.equal(personalDestroyVector.context, 1);
  assert4.equal(personalDestroyVector.type, 2 /* personalDestroy */);
  assert4.equal(personalDestroyVector.angle, 225);
  assert4.equal(socialDestroyVector.content, 1);
  assert4.equal(socialDestroyVector.context, 1);
  assert4.equal(socialDestroyVector.type, 3 /* socialDestroy */);
  assert4.equal(socialDestroyVector.angle, 135);
});
(0, import_uvu4.test)("Vector: To 1/0 Vector", async () => {
  const socialCreate = new QuadrantPoint2(0 /* socialCreate */, 1, 0);
  const personalCreate = new QuadrantPoint2(1 /* personalCreate */, 1, 0);
  const personalDestroy = new QuadrantPoint2(2 /* personalDestroy */, 1, 0);
  const socialDestroy = new QuadrantPoint2(3 /* socialDestroy */, 1, 0);
  const socialCreateVector = socialCreate.toVector();
  const personalCreateVector = personalCreate.toVector();
  const personalDestroyVector = personalDestroy.toVector();
  const socialDestroyVector = socialDestroy.toVector();
  assert4.equal(socialCreateVector.content, 1);
  assert4.equal(socialCreateVector.context, 0);
  assert4.equal(socialCreateVector.type, 0 /* socialCreate */);
  assert4.equal(socialCreateVector.angle, 0);
  assert4.equal(personalCreateVector.content, 1);
  assert4.equal(personalCreateVector.context, 0);
  assert4.equal(personalCreateVector.type, 1 /* personalCreate */);
  assert4.equal(personalCreateVector.angle, 360);
  assert4.equal(personalDestroyVector.content, 1);
  assert4.equal(personalDestroyVector.context, 0);
  assert4.equal(personalDestroyVector.type, 2 /* personalDestroy */);
  assert4.equal(personalDestroyVector.angle, 180);
  assert4.equal(socialDestroyVector.content, 1);
  assert4.equal(socialDestroyVector.context, 0);
  assert4.equal(socialDestroyVector.type, 3 /* socialDestroy */);
  assert4.equal(socialDestroyVector.angle, 180);
});
(0, import_uvu4.test)("Vector: To 0/1 Vector", async () => {
  const socialCreate = new QuadrantPoint2(0 /* socialCreate */, 0, 1);
  const personalCreate = new QuadrantPoint2(1 /* personalCreate */, 0, 1);
  const personalDestroy = new QuadrantPoint2(2 /* personalDestroy */, 0, 1);
  const socialDestroy = new QuadrantPoint2(3 /* socialDestroy */, 0, 1);
  const socialCreateVector = socialCreate.toVector();
  const personalCreateVector = personalCreate.toVector();
  const personalDestroyVector = personalDestroy.toVector();
  const socialDestroyVector = socialDestroy.toVector();
  assert4.equal(socialCreateVector.content, 0);
  assert4.equal(socialCreateVector.context, 1);
  assert4.equal(socialCreateVector.type, 0 /* socialCreate */);
  assert4.equal(socialCreateVector.angle, 90);
  assert4.equal(personalCreateVector.content, 0);
  assert4.equal(personalCreateVector.context, 1);
  assert4.equal(personalCreateVector.type, 1 /* personalCreate */);
  assert4.equal(personalCreateVector.angle, 0);
  assert4.equal(personalDestroyVector.content, 0);
  assert4.equal(personalDestroyVector.context, 1);
  assert4.equal(personalDestroyVector.type, 2 /* personalDestroy */);
  assert4.equal(personalDestroyVector.angle, 270);
  assert4.equal(socialDestroyVector.content, 0);
  assert4.equal(socialDestroyVector.context, 1);
  assert4.equal(socialDestroyVector.type, 3 /* socialDestroy */);
  assert4.equal(socialDestroyVector.angle, 180);
});
(0, import_uvu4.test)("Vector: To 100/1 Vector", async () => {
  const socialCreate = new QuadrantPoint2(0 /* socialCreate */, 100, 1);
  const personalCreate = new QuadrantPoint2(1 /* personalCreate */, 100, 1);
  const personalDestroy = new QuadrantPoint2(2 /* personalDestroy */, 100, 1);
  const socialDestroy = new QuadrantPoint2(3 /* socialDestroy */, 100, 1);
  const socialCreateVector = socialCreate.toVector();
  const personalCreateVector = personalCreate.toVector();
  const personalDestroyVector = personalDestroy.toVector();
  const socialDestroyVector = socialDestroy.toVector();
  assert4.equal(socialCreateVector.content, 100);
  assert4.equal(socialCreateVector.context, 1);
  assert4.equal(socialCreateVector.type, 0 /* socialCreate */);
  assert4.equal(socialCreateVector.angle, 0.5729386976834859);
  assert4.equal(personalCreateVector.content, 100);
  assert4.equal(personalCreateVector.context, 1);
  assert4.equal(personalCreateVector.type, 1 /* personalCreate */);
  assert4.equal(personalCreateVector.angle, 359.42706130231653);
  assert4.equal(personalDestroyVector.content, 100);
  assert4.equal(personalDestroyVector.context, 1);
  assert4.equal(personalDestroyVector.type, 2 /* personalDestroy */);
  assert4.equal(personalDestroyVector.angle, 180.5729386976835);
  assert4.equal(socialDestroyVector.content, 100);
  assert4.equal(socialDestroyVector.context, 1);
  assert4.equal(socialDestroyVector.type, 3 /* socialDestroy */);
  assert4.equal(socialDestroyVector.angle, 179.4270613023165);
});
(0, import_uvu4.test)("Vector: To 1/100 Vector", async () => {
  const socialCreate = new QuadrantPoint2(0 /* socialCreate */, 1, 100);
  const personalCreate = new QuadrantPoint2(1 /* personalCreate */, 1, 100);
  const personalDestroy = new QuadrantPoint2(2 /* personalDestroy */, 1, 100);
  const socialDestroy = new QuadrantPoint2(3 /* socialDestroy */, 1, 100);
  const socialCreateVector = socialCreate.toVector();
  const personalCreateVector = personalCreate.toVector();
  const personalDestroyVector = personalDestroy.toVector();
  const socialDestroyVector = socialDestroy.toVector();
  assert4.equal(socialCreateVector.content, 1);
  assert4.equal(socialCreateVector.context, 100);
  assert4.equal(socialCreateVector.type, 0 /* socialCreate */);
  assert4.equal(socialCreateVector.angle, 89.42706130231652);
  assert4.equal(personalCreateVector.content, 1);
  assert4.equal(personalCreateVector.context, 100);
  assert4.equal(personalCreateVector.type, 1 /* personalCreate */);
  assert4.equal(personalCreateVector.angle, 270.57293869768347);
  assert4.equal(personalDestroyVector.content, 1);
  assert4.equal(personalDestroyVector.context, 100);
  assert4.equal(personalDestroyVector.type, 2 /* personalDestroy */);
  assert4.equal(personalDestroyVector.angle, 269.42706130231653);
  assert4.equal(socialDestroyVector.content, 1);
  assert4.equal(socialDestroyVector.context, 100);
  assert4.equal(socialDestroyVector.type, 3 /* socialDestroy */);
  assert4.equal(socialDestroyVector.angle, 90.57293869768348);
});

// tests/index.ts
import_uvu5.test.run();
//# sourceMappingURL=tests.js.map