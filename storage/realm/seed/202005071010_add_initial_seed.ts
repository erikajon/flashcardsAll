import {moduleActions, examActions, flashcardActions} from '..';
import modules from '../../../data/modules.json';
import exams from '../../../data/exams.json';
import flashcards from '../../../data/flashcards.json';

export const seed = async () => {
  return Promise.all([
    ...exams.map((exam: any) => {
      examActions.saveExam({
        id: exam.exam_id,
        name: exam.name,
        examBoard: exam.exam_board,
      });
    }),
    ...modules.map((module: any) => {
      moduleActions.saveModule({
        id: module.module_id,
        name: module.module_name,
        examId: module.exam,
      });
    }),
    ...flashcards.map((card: any) => {
      flashcardActions.saveFlashcard({
        id: card.id,
        answer: card.answer.toString(), // ensuring that numerical answers are stringified
        answerImage: card.answer_img,
        question: card.question.toString(), // ensuring that numerical answers are stringified
        questionImage: card.question_img,
        moduleId: card.module,
        answerType: 'none',
      });
    }),
  ]);
};
