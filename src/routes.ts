import { Quiz } from "./entity/Quiz";
import { Account } from "./entity/Account";
const bcrypt = require("bcrypt");
import { Question } from "./entity/Question";
import { Note } from "./entity/Note";
import { Request, Response } from "express";
import { In } from "typeorm";
import { User } from "./entity/User";
import { Enroll } from "./entity/Enroll";

module.exports = function (app, AppDataSource) {
  app.post("/createqst", async (req, res) => {
    try {
      const QstRepo = AppDataSource.getRepository(Question);
      const QuizRepo = AppDataSource.getRepository(Quiz);

      const { title, description, makerId, temps, note, questions } = req.body;

      // Create a new quiz
      const newQuiz = new Quiz();
      newQuiz.title = title;
      newQuiz.description = description;
      newQuiz.makerId = makerId;
      newQuiz.temps = temps;
      newQuiz.note = note;

      // Save the quiz to get its ID
      const savedQuiz = await QuizRepo.save(newQuiz);

      // Create questions and associate them with the quiz
      const promises = questions.map(async (questionData) => {
        const { qst, option1, option2, option3, option4, answeris } =
          questionData;
        const newQst = new Question();
        newQst.qst = qst;
        newQst.option1 = option1;
        newQst.option2 = option2;
        newQst.option3 = option3;
        newQst.option4 = option4;
        newQst.answeris = answeris;
        newQst.quiz = savedQuiz; // Associate the question with the quiz
        await QstRepo.save(newQst);
      });

      await Promise.all(promises);

      res
        .status(201)
        .json({ message: "Quiz and questions created successfully" });
    } catch (error) {
      console.error("Error creating quiz and questions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.put("/updateQuiz/:id", async (req: Request, res: Response) => {
    try {
      const quizId = parseInt(req.params.id);
      const quizRepo = AppDataSource.getRepository(Quiz);
      const quiz = await quizRepo.findOne({
        where: isNaN(quizId) ? { id: null } : { id: quizId },
        relations: ["questions"],
      });
      quiz.title = req.body.title;
      quiz.description = req.body.description;
      quiz.temps = req.body.temps;
      quiz.note = req.body.note;
      const questionRepo = AppDataSource.getRepository(Question);
      quiz.questions = await questionRepo.find({
        where: { id: In(req.body.questions) },
      });
      await quizRepo.save(quiz);
      res.status(200).json({ message: "Quiz updated successfully", quiz });
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.delete("/deleteQuiz/:id", async (req: Request, res: Response) => {
    try {
      const quizId = parseInt(req.params.id);
      const quizRepo = AppDataSource.getRepository(Quiz);
      const quiz = await quizRepo.findOne({
        where: isNaN(quizId) ? { id: null } : { id: quizId },
      });
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      await quizRepo.remove(quiz);
      res.status(200).json({ message: "Quiz deleted successfully", quiz });
    } catch (error) {
      console.error("Error deleting quiz:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.get("/listQuiz", async (req, res) => {
    try {
      const quizRepo = AppDataSource.getRepository(Quiz);
      const quizzes = await quizRepo.find({ relations: ["questions"] });
      res.status(200).json(quizzes);
    } catch (error) {
      console.error("Error listing quizzes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/getQuiz/:id", async (req, res) => {
    try {
      const quizId = req.params.id;
      const quizRepo = AppDataSource.getRepository(Quiz);
      const quiz = await quizRepo.findOne(quizId, { relations: ["questions"] });
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.status(200).json(quiz);
    } catch (error) {
      console.error("Error getting quiz:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  //CRUD QUESTION
  app.post("/createqst", async (req: Request, res: Response) => {
    try {
      const QstRepo = AppDataSource.getRepository(Question);

      const newQst = new Question();
      newQst.qst = req.body.qst;
      newQst.option1 = req.body.option1;
      newQst.option2 = req.body.option2;
      newQst.option3 = req.body.option3;
      newQst.option4 = req.body.option4;
      newQst.answeris = req.body.answeris;
      await QstRepo.save(newQst);

      res.status(202).json({ message: "Qst created successfuly" });
    } catch (error) {
      console.error("Error creating question:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.put("/updateQuestion/:id", async (req: Request, res: Response) => {
    try {
      const qstId = parseInt(req.params.id);
      const qstRepo = AppDataSource.getRepository(Question);
      const qst = await qstRepo.findOne({
        where: isNaN(qstId) ? { id: null } : { id: qstId },
      });
      qst.qst = req.body.qst;
      qst.option1 = req.body.option1;
      qst.option2 = req.body.option2;
      qst.option3 = req.body.option3;
      qst.option4 = req.body.option4;
      qst.isanswer = req.body.isanswer;
      await qstRepo.save(qst);
      res.status(200).json({ message: "Question updated successfully", qst });
    } catch (error) {
      console.error("Error updating Question:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.delete("/deleteQuestion/:id", async (req: Request, res: Response) => {
    try {
      const qstId = parseInt(req.params.id);
      const qstRepo = AppDataSource.getRepository(Question);
      const qst = await qstRepo.findOne({
        where: isNaN(qstId) ? { id: null } : { id: qstId },
      });
      if (!qst) {
        return res.status(404).json({ error: "Question not found" });
      }
      await qstRepo.remove(qst);
      res.status(200).json({ message: "Question deleted successfully", qst });
    } catch (error) {
      console.error("Error deleting Question:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.get("/listQuestion", async (req, res) => {
    try {
      const qstRepo = AppDataSource.getRepository(Question);
      const qsts = await qstRepo.find({ relations: ["quiz"] });
      res.status(200).json(qsts);
    } catch (error) {
      console.error("Error listing questions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/listQuestion/:quizId", async (req, res) => {
    try {
      const quizId = req.params.quizId;
      const qstRepo = AppDataSource.getRepository(Question);
      const qsts = await qstRepo.find({
        where: { quiz: { id: quizId } },
        relations: ["quiz"],
      });
      res.status(200).json(qsts);
    } catch (error) {
      console.error("Error listing questions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  // CRUD Note

  app.post("/createNote", async (req: Request, res: Response) => {
    try {
      const { quizId, userId } = req.body;
      const NoteRepo = AppDataSource.getRepository(Note);
      const newNt = new Note();
      newNt.note = req.body.note;
      const qzRepo = AppDataSource.getRepository(Quiz);
      const myquiz = await qzRepo.findOne({
        where: isNaN(quizId) ? { id: null } : { id: quizId },
      });
      if (!myquiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      newNt.quiz = myquiz;
      const UserRepo = AppDataSource.getRepository(User);
      const myuser = await UserRepo.findOne({
        where: isNaN(userId) ? { id: null } : { id: userId },
      });
      if (!myuser) {
        return res.status(404).json({ error: "User not found" });
      }
      newNt.user = myuser;
      await NoteRepo.save(newNt);
      res.status(202).json({ message: "Note created successfully" });
    } catch (error) {
      console.error("Error creating Note:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.put("/updateNote/:id", async (req: Request, res: Response) => {
    try {
      const noteId = parseInt(req.params.id);
      const NtRepo = AppDataSource.getRepository(Note);
      const mynote = await NtRepo.findOne({
        where: isNaN(noteId) ? { id: null } : { id: noteId },
      });
      mynote.note = req.body.note;
      mynote.user = req.body.user;
      mynote.quiz = req.body.quiz;
      await NtRepo.save(mynote);
      res.status(200).json({ message: "Note updated successfully", mynote });
    } catch (error) {
      console.error("Error updating Note:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.delete("/deleteNote/:id", async (req: Request, res: Response) => {
    try {
      const NtId = parseInt(req.params.id);
      const NtRepo = AppDataSource.getRepository(Note);
      const mynote = await NtRepo.findOne({
        where: isNaN(NtId) ? { id: null } : { id: NtId },
      });
      if (!mynote) {
        return res.status(404).json({ error: "Note not found" });
      }
      await NtRepo.remove(mynote);
      res.status(200).json({ message: "Note deleted successfully", mynote });
    } catch (error) {
      console.error("Error deleting Note:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.get("/listNote", async (req, res) => {
    try {
      // Get the repository for the Note entity
      const NtRepo = AppDataSource.getRepository(Note);

      // Retrieve all notes with their associated quizzes and users
      const notes = await NtRepo.find({ relations: ["quiz", "user"] });

      // Return the formatted notes
      res.status(200).json(notes);
    } catch (error) {
      // Handle errors
      console.error("Error listing notes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  //Account:

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      // Trim the email and password values
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      // Find the account based on the trimmed email
      const account = await AppDataSource.manager.findOne(Account, {
        where: { email: trimmedEmail },
      });
      if (!account) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(
        trimmedPassword,
        account.password
      );
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ error: "Invalid credentials - Password mismatch" });
      }

      const response = {
        message: "Login successful",
        userId: account.id,
        type: account.type,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error during login:", error.message);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  });

  app.post("/students", async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Trim the password before hashing
      const trimmedPassword = password.trim();

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

      // Check if the email already exists in the database
      const existingAccount = await AppDataSource.manager.findOne(Account, {
        where: { email },
      });

      if (existingAccount) {
        // Email already exists, return an error response
        return res.status(400).json({ error: "Email already exists" });
      }

      // Create a new account entity
      const newAccount = new Account();
      newAccount.email = email;
      newAccount.password = hashedPassword;

      newAccount.type = "student";

      // Save the new account to the Account repository
      const accountRepository = AppDataSource.getRepository(Account);
      await accountRepository.save(newAccount);

      // Create a new student entity
      const newStudent = new User();
      newStudent.firstName = firstName;
      newStudent.lastName = lastName;
      // Fetch the group based on the provided groupId

      newStudent.account = newAccount;

      // Save the new student to the database
      const studentRepository = AppDataSource.getRepository(User);
      await studentRepository.save(newStudent);

      res.status(201).json(newStudent); // 201 indicates successful creation
    } catch (error) {
      console.error("Error during registration:", error.message);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  });
  app.put("/user/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const userRepository = AppDataSource.getRepository(User);

      // Fetch the student by ID
      const existingUser = await AppDataSource.manager.findOne(User, {
        where: { id: userId },
      });

      // Check if the student exists
      if (!existingUser) {
        return res.status(404).json({ error: "user not found" });
      }

      // Update the student properties based on the request body
      existingUser.firstName = req.body.firstName || existingUser.firstName;
      existingUser.lastName = req.body.lastName || existingUser.lastName;

      // Save the updated student to the database
      await userRepository.save(existingUser);

      res.json(existingUser);
    } catch (error) {
      console.error("Error updating student:", error.message);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  });

  app.get("/users", async (req, res) => {
    try {
      // Fetch all Professeurs from the database

      const professeurs = await AppDataSource.manager.find(User, {
        relations: ["account"],
      });

      res.status(200).json(professeurs);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/professeur", async (req, res) => {
    try {
      const { nom, prenom, email, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingAccount = await AppDataSource.manager.findOne(Account, {
        where: { email },
      });

      if (existingAccount) {
        // Email already exists, return an error response
        return res.status(400).json({ error: "Email already exists" });
      }
      // Create a new Account
      const newAccount = new Account();
      newAccount.email = email;
      newAccount.password = hashedPassword;
      newAccount.type = "Professeur";
      // Save the Account to the database
      const accountRepository = AppDataSource.getRepository(Account);
      const savedAccount = await accountRepository.save(newAccount);

      // Create a new Professeur and associate it with the saved Account
      const newProfesseur = new User();
      newProfesseur.firstName = nom;
      newProfesseur.lastName = prenom;
      newProfesseur.account = savedAccount;

      // Save the Professeur to the database
      const professeurRepository = AppDataSource.getRepository(User);
      await professeurRepository.save(newProfesseur);

      res.status(201).json({ message: "Professeur created successfully" });
    } catch (error) {
      console.error("Error creating Professeur:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Enroll CRUD Operations
  app.post("/enroll", async (req: Request, res: Response) => {
    try {
      const { userId, quizId } = req.body;
      const enrollRepo = AppDataSource.getRepository(Enroll);
      const userRepo = AppDataSource.getRepository(User);
      const quizRepo = AppDataSource.getRepository(Quiz);

      // Check if user and quiz exist
      const user = await userRepo.findOne({
        where: { id: userId }
      });
      const quiz = await quizRepo.findOne({
        where: { id: quizId }
      });

      if (!user || !quiz) {
        return res.status(404).json({ error: "User or Quiz not found" });
      }

      // Check if enrollment already exists
      const existingEnroll = await enrollRepo.findOne({
        where: { user: { id: userId }, quiz: { id: quizId } }
      });

      if (existingEnroll) {
        return res.status(400).json({ error: "User is already enrolled in this quiz" });
      }

      // Create new enrollment
      const newEnroll = new Enroll();
      newEnroll.user = user;
      newEnroll.quiz = quiz;
      newEnroll.isCompleted = false;
      newEnroll.score = 0;
      newEnroll.attempts = 0;

      const savedEnroll = await enrollRepo.save(newEnroll);
      res.status(201).json({ message: "Enrollment created successfully", enroll: savedEnroll });
    } catch (error) {
      console.error("Error creating enrollment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/enrollments", async (req: Request, res: Response) => {
    try {
      const enrollRepo = AppDataSource.getRepository(Enroll);
      const enrollments = await enrollRepo.find({
        relations: ["user", "quiz"]
      });
      res.status(200).json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/enrollments/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const enrollRepo = AppDataSource.getRepository(Enroll);
      const enrollments = await enrollRepo.find({
        where: { user: { id: userId } },
        relations: ["quiz"]
      });
      res.status(200).json(enrollments);
    } catch (error) {
      console.error("Error fetching user enrollments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/enrollments/:id", async (req: Request, res: Response) => {
    try {
      const enrollId = parseInt(req.params.id);
      const enrollRepo = AppDataSource.getRepository(Enroll);
      const enrollment = await enrollRepo.findOne({
        where: { id: enrollId },
        relations: ["user", "quiz"]
      });

      if (!enrollment) {
        return res.status(404).json({ error: "Enrollment not found" });
      }

      // Update enrollment fields
      if (req.body.score !== undefined) enrollment.score = req.body.score;
      if (req.body.isCompleted !== undefined) {
        enrollment.isCompleted = req.body.isCompleted;
        if (req.body.isCompleted) {
          enrollment.completedAt = new Date();
        }
      }
      if (req.body.attempts !== undefined) enrollment.attempts = req.body.attempts;

      const updatedEnroll = await enrollRepo.save(enrollment);
      res.status(200).json({ message: "Enrollment updated successfully", enroll: updatedEnroll });
    } catch (error) {
      console.error("Error updating enrollment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/enrollments/:id", async (req: Request, res: Response) => {
    try {
      const enrollId = parseInt(req.params.id);
      const enrollRepo = AppDataSource.getRepository(Enroll);
      const enrollment = await enrollRepo.findOne({
        where: { id: enrollId }
      });

      if (!enrollment) {
        return res.status(404).json({ error: "Enrollment not found" });
      }

      await enrollRepo.remove(enrollment);
      res.status(200).json({ message: "Enrollment deleted successfully" });
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
