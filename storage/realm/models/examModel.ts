export type ExamModeType = {
  id: string;
  name: string;
  examBoard: string;
};

export class ExamModel implements ExamModeType {
  static schema: Realm.ObjectSchema = {
    name: 'exam',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      examBoard: 'string',
    },
  };

  public id: string;
  public name: string;
  public examBoard: string;

  constructor(id: string, name: string, examBoard: string) {
    this.id = id;
    this.name = name;
    this.examBoard = examBoard;
  }

  static getModelName() {
    return ExamModel.schema.name;
  }
}
