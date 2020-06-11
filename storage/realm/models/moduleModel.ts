export type ModuleModeType = {
  id: number;
  name: string;
  examId: string;
  lastRevised?: Date;
};

export class ModuleModel implements ModuleModeType {
  static schema: Realm.ObjectSchema = {
    name: 'module',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      examId: 'string',
      lastRevised: 'date?',
    },
  };

  public id: number;
  public name: string;
  public examId: string;
  public lastRevised?: Date;

  constructor(id: number, name: string, examId: string, lastRevised?: Date) {
    this.id = id;
    this.name = name;
    this.examId = examId;
    this.lastRevised = lastRevised;
  }

  static getModelName() {
    return ModuleModel.schema.name;
  }
}
