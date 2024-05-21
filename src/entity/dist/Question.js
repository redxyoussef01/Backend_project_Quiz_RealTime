"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Question = void 0;
var typeorm_1 = require("typeorm");
var Quiz_1 = require("./Quiz");
var Question = /** @class */ (function () {
    function Question() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Question.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Question.prototype, "qst");
    __decorate([
        typeorm_1.Column()
    ], Question.prototype, "option1");
    __decorate([
        typeorm_1.Column()
    ], Question.prototype, "option2");
    __decorate([
        typeorm_1.Column()
    ], Question.prototype, "option3");
    __decorate([
        typeorm_1.Column()
    ], Question.prototype, "option4");
    __decorate([
        typeorm_1.Column()
    ], Question.prototype, "answeris");
    __decorate([
        typeorm_1.ManyToOne(function () { return Quiz_1.Quiz; }, function (quiz) { return quiz.questions; })
    ], Question.prototype, "quiz");
    Question = __decorate([
        typeorm_1.Entity()
    ], Question);
    return Question;
}());
exports.Question = Question;
