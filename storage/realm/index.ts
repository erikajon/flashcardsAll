import Realm from 'realm';
import models from './models';
import {
  ModuleActionType,
  moduleActions as createdModuleActions,
} from './actions/moduleAction';
import {
  ExamActionType,
  examActions as createdExamActions,
} from './actions/examAction';
import {
  FlashcardActionType,
  flashcardActions as createdFlashcardActions,
} from './actions/flashcardAction';

const realmInstance = new Realm({
  schema: models,
  // @TODO :: remove this once the first development is done
  deleteRealmIfMigrationNeeded: true,
});

export const getRealmInstance = () => realmInstance;

export const moduleActions: ModuleActionType = createdModuleActions(
  realmInstance,
);

export const examActions: ExamActionType = createdExamActions(realmInstance);

export const flashcardActions: FlashcardActionType = createdFlashcardActions(
  realmInstance,
);
