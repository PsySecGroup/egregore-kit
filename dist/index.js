var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  HttpRequest: () => HttpRequest,
  Space: () => Space
});
module.exports = __toCommonJS(src_exports);

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
  constructor(endpoints) {
    this.points = {
      [0 /* socialCreate */]: [],
      [1 /* personalCreate */]: [],
      [2 /* personalDestroy */]: [],
      [3 /* socialDestroy */]: []
    };
    const social = typeof endpoints.social[0] !== "string" ? endpoints.social : endpoints.social.map((endpoint) => {
      const parts = endpoint.split(" ");
      return new HttpRequest(parts[0], parts[1]);
    });
    const personal = typeof endpoints.personal[0] !== "string" ? endpoints.personal : endpoints.personal.map((endpoint) => {
      const parts = endpoint.split(" ");
      return new HttpRequest(parts[0], parts[1]);
    });
    const create = typeof endpoints.create[0] !== "string" ? endpoints.create : endpoints.create.map((endpoint) => {
      const parts = endpoint.split(" ");
      return new HttpRequest(parts[0], parts[1]);
    });
    const destroy = typeof endpoints.destroy[0] !== "string" ? endpoints.destroy : endpoints.destroy.map((endpoint) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HttpRequest,
  Space
});
//# sourceMappingURL=index.js.map