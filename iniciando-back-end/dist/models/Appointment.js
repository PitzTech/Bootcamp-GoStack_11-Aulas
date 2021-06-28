"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Appointment = /** @class */ (function () {
    function Appointment(_a) {
        var provider = _a.provider, date = _a.date;
        this.id = uuid_1.v4();
        this.provider = provider;
        this.date = date;
    }
    return Appointment;
}());
exports.default = Appointment;
