"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Quiz = void 0;
var typeorm_1 = require("typeorm");
var Question_1 = require("./Question");
var Quiz = /** @class */ (function () {
    function Quiz() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Quiz.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Quiz.prototype, "title");
    __decorate([
        typeorm_1.Column()
    ], Quiz.prototype, "makerId");
    __decorate([
        typeorm_1.Column()
    ], Quiz.prototype, "description");
    __decorate([
        typeorm_1.Column()
    ], Quiz.prototype, "temps");
    __decorate([
        typeorm_1.Column()
    ], Quiz.prototype, "note");
    __decorate([
        typeorm_1.ManyToMany(function () { return Question_1.Question; }) // Set eager option to true
        ,
        typeorm_1.JoinTable()
    ], Quiz.prototype, "questions");
    Quiz = __decorate([
        typeorm_1.Entity()
    ], Quiz);
    return Quiz;
}());
exports.Quiz = Quiz;
