import { AppDataSource } from "./data-source";
import { Quiz } from "./entity/Quiz"
import { User } from "./entity/User"
import { Question } from "./entity/Question"
import * as express from 'express';
import { Request, Response } from 'express'
import { error } from "console";
import { In } from "typeorm";
const { getRepository }= require("typeorm")
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.listen(4000,()=>{
    console.log("server running on 4000")
}
app.post('/createQz', async(req: Request, res: Response)=>{
    try{

        const QuizRepo = AppDataSource.getRepository(Quiz);
   
    const newQz = new Quiz();
    newQz.title = req.body.title;
    newQz.makerId = req.body.makerId;
    newQz.userId = req.body.userId;
    newQz.description = req.body.description;
    newQz.temps = req.body.temps;
    newQz.note = req.body.note;
    const questionRepo = AppDataSource.getRepository(Question);
    newQz.questions = await questionRepo.find({ where: { id: In(req.body.questions) } });
    await QuizRepo.save(newQz);


    res.status(202).json({message: "Quiz created successfuly"});
    }catch (error) {
        console.error('Error creating User:', error);
        res.status(500).json({error: "Internal server error"});
}
});
app.put('/updateQuiz/:id', async (req: Request, res: Response) => {
    try {
        const quizId = parseInt(req.params.id);
        const quizRepo = AppDataSource.getRepository(Quiz);
        const quiz = await quizRepo.findOne({where: isNaN(quizId) ? { id: null } : { id: quizId },relations: ['questions'] , })
        quiz.title = req.body.title;
        quiz.description = req.body.description;
        quiz.temps = req.body.temps;
        quiz.note = req.body.note;
        const questionRepo = AppDataSource.getRepository(Question);
        quiz.questions = await questionRepo.find({ where: { id: In(req.body.questions) } });
        await quizRepo.save(quiz);
        res.status(200).json({ message: 'Quiz updated successfully', quiz });
    } catch (error) {
        console.error('Error updating quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.delete('/deleteQuiz/:id', async (req: Request, res: Response) => {
    try {
        const quizId = parseInt(req.params.id);
        const quizRepo = AppDataSource.getRepository(Quiz);
        const quiz = await quizRepo.findOne({where: isNaN(quizId) ? { id: null } : { id: quizId } })
        if(!quiz){
            return res.status(404).json({ error: 'Quiz not found' });
        }
        await quizRepo.remove(quiz)
        res.status(200).json({ message: 'Quiz deleted successfully', quiz });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/listQuiz', async (req, res) => {
    try {
        const quizRepo = AppDataSource.getRepository(Quiz);
        const quizzes = await quizRepo.find();
        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error listing quizzes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
