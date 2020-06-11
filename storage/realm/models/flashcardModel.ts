export type FlashcardAnswerType = 'none' | 'correct' | 'incorrect';

export type FlashcardModeType = {
  id: number;
  answer?: string;
  answerImage?: string;
  question?: string;
  questionImage?: string;
  answerType: FlashcardAnswerType;
  moduleId: number;
};

export class FlashcardModel implements FlashcardModeType {
  static schema: Realm.ObjectSchema = {
    name: 'flashcard',
    primaryKey: 'id',
    properties: {
      id: 'int',
      answer: 'string?',
      answerImage: 'string?',
      question: 'string?',
      questionImage: 'string?',
      answerType: 'string',
      moduleId: 'int',
    },
  };

  public id: number;
  public answer?: string;
  public answerImage?: string;
  public question?: string;
  public questionImage?: string;
  public answerType: FlashcardAnswerType;
  public moduleId: number;

  constructor(
    id: number,
    answerType: FlashcardAnswerType,
    moduleId: number,
    answer?: string,
    answerImage?: string,
    question?: string,
    questionImage?: string,
  ) {
    this.id = id;
    this.answer = answer;
    this.answerImage = answerImage;
    this.question = question;
    this.questionImage = questionImage;
    this.answerType = answerType;
    this.moduleId = moduleId;
  }

  static getModelName() {
    return FlashcardModel.schema.name;
  }
}
