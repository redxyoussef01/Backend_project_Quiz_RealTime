"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Quiz_1 = require("./entity/Quiz");
var Account_1 = require("./entity/Account");
var bcrypt = require("bcrypt");
var Question_1 = require("./entity/Question");
var Note_1 = require("./entity/Note");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
module.exports = function (app, AppDataSource, io) {
    var _this = this;
    app.post("/createqst", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var QstRepo_1, QuizRepo, _a, title, description, makerId, temps, note, questions, newQuiz, savedQuiz_1, promises, error_1;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    QstRepo_1 = AppDataSource.getRepository(Question_1.Question);
                    QuizRepo = AppDataSource.getRepository(Quiz_1.Quiz);
                    _a = req.body, title = _a.title, description = _a.description, makerId = _a.makerId, temps = _a.temps, note = _a.note, questions = _a.questions;
                    newQuiz = new Quiz_1.Quiz();
                    newQuiz.title = title;
                    newQuiz.description = description;
                    newQuiz.makerId = makerId;
                    newQuiz.temps = temps;
                    newQuiz.note = note;
                    return [4 /*yield*/, QuizRepo.save(newQuiz)];
                case 1:
                    savedQuiz_1 = _b.sent();
                    promises = questions.map(function (questionData) { return __awaiter(_this, void 0, void 0, function () {
                        var qst, option1, option2, option3, option4, answeris, newQst;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    qst = questionData.qst, option1 = questionData.option1, option2 = questionData.option2, option3 = questionData.option3, option4 = questionData.option4, answeris = questionData.answeris;
                                    newQst = new Question_1.Question();
                                    newQst.qst = qst;
                                    newQst.option1 = option1;
                                    newQst.option2 = option2;
                                    newQst.option3 = option3;
                                    newQst.option4 = option4;
                                    newQst.answeris = answeris;
                                    newQst.quiz = savedQuiz_1; // Associate the question with the quiz
                                    return [4 /*yield*/, QstRepo_1.save(newQst)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    _b.sent();
                    res
                        .status(201)
                        .json({ message: "Quiz and questions created successfully" });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error("Error creating quiz and questions:", error_1);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.put("/updateQuiz/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var quizId, quizRepo, quiz, questionRepo, _a, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    quizId = parseInt(req.params.id);
                    quizRepo = AppDataSource.getRepository(Quiz_1.Quiz);
                    return [4 /*yield*/, quizRepo.findOne({
                            where: isNaN(quizId) ? { id: null } : { id: quizId },
                            relations: ["questions"]
                        })];
                case 1:
                    quiz = _b.sent();
                    quiz.title = req.body.title;
                    quiz.description = req.body.description;
                    quiz.temps = req.body.temps;
                    quiz.note = req.body.note;
                    questionRepo = AppDataSource.getRepository(Question_1.Question);
                    _a = quiz;
                    return [4 /*yield*/, questionRepo.find({
                            where: { id: typeorm_1.In(req.body.questions) }
                        })];
                case 2:
                    _a.questions = _b.sent();
                    return [4 /*yield*/, quizRepo.save(quiz)];
                case 3:
                    _b.sent();
                    res.status(200).json({ message: "Quiz updated successfully", quiz: quiz });
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    console.error("Error updating quiz:", error_2);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    app["delete"]("/deleteQuiz/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var quizId, quizRepo, quiz, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    quizId = parseInt(req.params.id);
                    quizRepo = AppDataSource.getRepository(Quiz_1.Quiz);
                    return [4 /*yield*/, quizRepo.findOne({
                            where: isNaN(quizId) ? { id: null } : { id: quizId }
                        })];
                case 1:
                    quiz = _a.sent();
                    if (!quiz) {
                        return [2 /*return*/, res.status(404).json({ error: "Quiz not found" })];
                    }
                    return [4 /*yield*/, quizRepo.remove(quiz)];
                case 2:
                    _a.sent();
                    res.status(200).json({ message: "Quiz deleted successfully", quiz: quiz });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error deleting quiz:", error_3);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.get("/listQuiz", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var quizRepo, quizzes, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    quizRepo = AppDataSource.getRepository(Quiz_1.Quiz);
                    return [4 /*yield*/, quizRepo.find({ relations: ["questions"] })];
                case 1:
                    quizzes = _a.sent();
                    res.status(200).json(quizzes);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error("Error listing quizzes:", error_4);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.get("/getQuiz/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var quizId, quizRepo, quiz, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    quizId = req.params.id;
                    quizRepo = AppDataSource.getRepository(Quiz_1.Quiz);
                    return [4 /*yield*/, quizRepo.findOne(quizId, { relations: ["questions"] })];
                case 1:
                    quiz = _a.sent();
                    if (!quiz) {
                        return [2 /*return*/, res.status(404).json({ error: "Quiz not found" })];
                    }
                    res.status(200).json(quiz);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error("Error getting quiz:", error_5);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    //CRUD QUESTION
    app.post("/createqst", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var QstRepo, newQst, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    QstRepo = AppDataSource.getRepository(Question_1.Question);
                    newQst = new Question_1.Question();
                    newQst.qst = req.body.qst;
                    newQst.option1 = req.body.option1;
                    newQst.option2 = req.body.option2;
                    newQst.option3 = req.body.option3;
                    newQst.option4 = req.body.option4;
                    newQst.answeris = req.body.answeris;
                    return [4 /*yield*/, QstRepo.save(newQst)];
                case 1:
                    _a.sent();
                    res.status(202).json({ message: "Qst created successfuly" });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.error("Error creating question:", error_6);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.put("/updateQuestion/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var qstId, qstRepo, qst, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    qstId = parseInt(req.params.id);
                    qstRepo = AppDataSource.getRepository(Question_1.Question);
                    return [4 /*yield*/, qstRepo.findOne({
                            where: isNaN(qstId) ? { id: null } : { id: qstId }
                        })];
                case 1:
                    qst = _a.sent();
                    qst.qst = req.body.qst;
                    qst.option1 = req.body.option1;
                    qst.option2 = req.body.option2;
                    qst.option3 = req.body.option3;
                    qst.option4 = req.body.option4;
                    qst.isanswer = req.body.isanswer;
                    return [4 /*yield*/, qstRepo.save(qst)];
                case 2:
                    _a.sent();
                    res.status(200).json({ message: "Question updated successfully", qst: qst });
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _a.sent();
                    console.error("Error updating Question:", error_7);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app["delete"]("/deleteQuestion/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var qstId, qstRepo, qst, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    qstId = parseInt(req.params.id);
                    qstRepo = AppDataSource.getRepository(Question_1.Question);
                    return [4 /*yield*/, qstRepo.findOne({
                            where: isNaN(qstId) ? { id: null } : { id: qstId }
                        })];
                case 1:
                    qst = _a.sent();
                    if (!qst) {
                        return [2 /*return*/, res.status(404).json({ error: "Question not found" })];
                    }
                    return [4 /*yield*/, qstRepo.remove(qst)];
                case 2:
                    _a.sent();
                    res.status(200).json({ message: "Question deleted successfully", qst: qst });
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _a.sent();
                    console.error("Error deleting Question:", error_8);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.get("/listQuestion", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var qstRepo, qsts, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    qstRepo = AppDataSource.getRepository(Question_1.Question);
                    return [4 /*yield*/, qstRepo.find({ relations: ["quiz"] })];
                case 1:
                    qsts = _a.sent();
                    res.status(200).json(qsts);
                    return [3 /*break*/, 3];
                case 2:
                    error_9 = _a.sent();
                    console.error("Error listing questions:", error_9);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.get("/listQuestion/:quizId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var quizId, qstRepo, qsts, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    quizId = req.params.quizId;
                    qstRepo = AppDataSource.getRepository(Question_1.Question);
                    return [4 /*yield*/, qstRepo.find({
                            where: { quiz: { id: quizId } },
                            relations: ["quiz"]
                        })];
                case 1:
                    qsts = _a.sent();
                    res.status(200).json(qsts);
                    return [3 /*break*/, 3];
                case 2:
                    error_10 = _a.sent();
                    console.error("Error listing questions:", error_10);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // CRUD Note
    app.post("/createNote", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, quizId, userId, NoteRepo, newNt, qzRepo, myquiz, UserRepo, myuser, error_11;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, quizId = _a.quizId, userId = _a.userId;
                    NoteRepo = AppDataSource.getRepository(Note_1.Note);
                    newNt = new Note_1.Note();
                    newNt.note = req.body.note;
                    qzRepo = AppDataSource.getRepository(Quiz_1.Quiz);
                    return [4 /*yield*/, qzRepo.findOne({
                            where: isNaN(quizId) ? { id: null } : { id: quizId }
                        })];
                case 1:
                    myquiz = _b.sent();
                    if (!myquiz) {
                        return [2 /*return*/, res.status(404).json({ error: "Quiz not found" })];
                    }
                    newNt.quiz = myquiz;
                    UserRepo = AppDataSource.getRepository(User_1.User);
                    return [4 /*yield*/, UserRepo.findOne({
                            where: isNaN(userId) ? { id: null } : { id: userId }
                        })];
                case 2:
                    myuser = _b.sent();
                    if (!myuser) {
                        return [2 /*return*/, res.status(404).json({ error: "User not found" })];
                    }
                    newNt.user = myuser;
                    return [4 /*yield*/, NoteRepo.save(newNt)];
                case 3:
                    _b.sent();
                    // Emit a 'noteCreated' event to notify connected clients
                    io.emit("noteCreated", newNt);
                    res.status(202).json({ message: "Note created successfuly" });
                    return [3 /*break*/, 5];
                case 4:
                    error_11 = _b.sent();
                    console.error("Error creating Note:", error_11);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    app.put("/updateNote/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var noteId, NtRepo, mynote, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    noteId = parseInt(req.params.id);
                    NtRepo = AppDataSource.getRepository(Note_1.Note);
                    return [4 /*yield*/, NtRepo.findOne({
                            where: isNaN(noteId) ? { id: null } : { id: noteId }
                        })];
                case 1:
                    mynote = _a.sent();
                    mynote.note = req.body.note;
                    mynote.user = req.body.user;
                    mynote.quiz = req.body.quiz;
                    return [4 /*yield*/, NtRepo.save(mynote)];
                case 2:
                    _a.sent();
                    res.status(200).json({ message: "Note updated successfully", mynote: mynote });
                    return [3 /*break*/, 4];
                case 3:
                    error_12 = _a.sent();
                    console.error("Error updating Note:", error_12);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app["delete"]("/deleteNote/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var NtId, NtRepo, mynote, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    NtId = parseInt(req.params.id);
                    NtRepo = AppDataSource.getRepository(Note_1.Note);
                    return [4 /*yield*/, NtRepo.findOne({
                            where: isNaN(NtId) ? { id: null } : { id: NtId }
                        })];
                case 1:
                    mynote = _a.sent();
                    if (!mynote) {
                        return [2 /*return*/, res.status(404).json({ error: "Note not found" })];
                    }
                    return [4 /*yield*/, NtRepo.remove(mynote)];
                case 2:
                    _a.sent();
                    res.status(200).json({ message: "Note deleted successfully", mynote: mynote });
                    return [3 /*break*/, 4];
                case 3:
                    error_13 = _a.sent();
                    console.error("Error deleting Note:", error_13);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.get("/listNote", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var NtRepo, notes, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    NtRepo = AppDataSource.getRepository(Note_1.Note);
                    return [4 /*yield*/, NtRepo.find({ relations: ["quiz", "user"] })];
                case 1:
                    notes = _a.sent();
                    // Return the formatted notes
                    res.status(200).json(notes);
                    return [3 /*break*/, 3];
                case 2:
                    error_14 = _a.sent();
                    // Handle errors
                    console.error("Error listing notes:", error_14);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    //Account:
    app.post("/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, password, trimmedEmail, trimmedPassword, account, passwordMatch, response, error_15;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, email = _a.email, password = _a.password;
                    trimmedEmail = email.trim();
                    trimmedPassword = password.trim();
                    return [4 /*yield*/, AppDataSource.manager.findOne(Account_1.Account, {
                            where: { email: trimmedEmail }
                        })];
                case 1:
                    account = _b.sent();
                    if (!account) {
                        return [2 /*return*/, res.status(401).json({ error: "Invalid credentials" })];
                    }
                    return [4 /*yield*/, bcrypt.compare(trimmedPassword, account.password)];
                case 2:
                    passwordMatch = _b.sent();
                    if (!passwordMatch) {
                        return [2 /*return*/, res
                                .status(401)
                                .json({ error: "Invalid credentials - Password mismatch" })];
                    }
                    response = {
                        message: "Login successful",
                        userId: account.id,
                        type: account.type
                    };
                    res.status(200).json(response);
                    return [3 /*break*/, 4];
                case 3:
                    error_15 = _b.sent();
                    console.error("Error during login:", error_15.message);
                    res
                        .status(500)
                        .json({ error: "Internal Server Error", details: error_15.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.post("/students", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, password, firstName, lastName, trimmedPassword, hashedPassword, existingAccount, newAccount, accountRepository, newStudent, studentRepository, error_16;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.body, email = _a.email, password = _a.password, firstName = _a.firstName, lastName = _a.lastName;
                    trimmedPassword = password.trim();
                    return [4 /*yield*/, bcrypt.hash(trimmedPassword, 10)];
                case 1:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, AppDataSource.manager.findOne(Account_1.Account, {
                            where: { email: email }
                        })];
                case 2:
                    existingAccount = _b.sent();
                    if (existingAccount) {
                        // Email already exists, return an error response
                        return [2 /*return*/, res.status(400).json({ error: "Email already exists" })];
                    }
                    newAccount = new Account_1.Account();
                    newAccount.email = email;
                    newAccount.password = hashedPassword;
                    newAccount.type = "student";
                    accountRepository = AppDataSource.getRepository(Account_1.Account);
                    return [4 /*yield*/, accountRepository.save(newAccount)];
                case 3:
                    _b.sent();
                    newStudent = new User_1.User();
                    newStudent.firstName = firstName;
                    newStudent.lastName = lastName;
                    // Fetch the group based on the provided groupId
                    newStudent.account = newAccount;
                    studentRepository = AppDataSource.getRepository(User_1.User);
                    return [4 /*yield*/, studentRepository.save(newStudent)];
                case 4:
                    _b.sent();
                    res.status(201).json(newStudent); // 201 indicates successful creation
                    return [3 /*break*/, 6];
                case 5:
                    error_16 = _b.sent();
                    console.error("Error during registration:", error_16.message);
                    res
                        .status(500)
                        .json({ error: "Internal Server Error", details: error_16.message });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    app.put("/user/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var userId, userRepository, existingUser, error_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    userId = parseInt(req.params.id, 10);
                    userRepository = AppDataSource.getRepository(User_1.User);
                    return [4 /*yield*/, AppDataSource.manager.findOne(User_1.User, {
                            where: { id: userId }
                        })];
                case 1:
                    existingUser = _a.sent();
                    // Check if the student exists
                    if (!existingUser) {
                        return [2 /*return*/, res.status(404).json({ error: "user not found" })];
                    }
                    // Update the student properties based on the request body
                    existingUser.firstName = req.body.firstName || existingUser.firstName;
                    existingUser.lastName = req.body.lastName || existingUser.lastName;
                    // Save the updated student to the database
                    return [4 /*yield*/, userRepository.save(existingUser)];
                case 2:
                    // Save the updated student to the database
                    _a.sent();
                    res.json(existingUser);
                    return [3 /*break*/, 4];
                case 3:
                    error_17 = _a.sent();
                    console.error("Error updating student:", error_17.message);
                    res
                        .status(500)
                        .json({ error: "Internal Server Error", details: error_17.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.get("/users", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var professeurs, error_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, AppDataSource.manager.find(User_1.User, {
                            relations: ["account"]
                        })];
                case 1:
                    professeurs = _a.sent();
                    res.status(200).json(professeurs);
                    return [3 /*break*/, 3];
                case 2:
                    error_18 = _a.sent();
                    console.error("Error fetching users:", error_18);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.post("/professeur", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, nom, prenom, email, password, hashedPassword, existingAccount, newAccount, accountRepository, savedAccount, newProfesseur, professeurRepository, error_19;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.body, nom = _a.nom, prenom = _a.prenom, email = _a.email, password = _a.password;
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 1:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, AppDataSource.manager.findOne(Account_1.Account, {
                            where: { email: email }
                        })];
                case 2:
                    existingAccount = _b.sent();
                    if (existingAccount) {
                        // Email already exists, return an error response
                        return [2 /*return*/, res.status(400).json({ error: "Email already exists" })];
                    }
                    newAccount = new Account_1.Account();
                    newAccount.email = email;
                    newAccount.password = hashedPassword;
                    newAccount.type = "Professeur";
                    accountRepository = AppDataSource.getRepository(Account_1.Account);
                    return [4 /*yield*/, accountRepository.save(newAccount)];
                case 3:
                    savedAccount = _b.sent();
                    newProfesseur = new User_1.User();
                    newProfesseur.firstName = nom;
                    newProfesseur.lastName = prenom;
                    newProfesseur.account = savedAccount;
                    professeurRepository = AppDataSource.getRepository(User_1.User);
                    return [4 /*yield*/, professeurRepository.save(newProfesseur)];
                case 4:
                    _b.sent();
                    res.status(201).json({ message: "Professeur created successfully" });
                    return [3 /*break*/, 6];
                case 5:
                    error_19 = _b.sent();
                    console.error("Error creating Professeur:", error_19);
                    res.status(500).json({ error: "Internal server error" });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
};
