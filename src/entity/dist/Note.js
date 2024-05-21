"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Note = void 0;
var typeorm_1 = require("typeorm");
var Quiz_1 = require("./Quiz");
var User_1 = require("./User");
var Note = /** @class */ (function () {
    function Note() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Note.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Note.prototype, "note");
    __decorate([
        typeorm_1.ManyToOne(function () { return Quiz_1.Quiz; }, function (quiz) { return quiz.id; })
    ], Note.prototype, "quiz");
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.id; })
    ], Note.prototype, "user");
    Note = __decorate([
        typeorm_1.Entity()
    ], Note);
    return Note;
}());
exports.Note = Note;
