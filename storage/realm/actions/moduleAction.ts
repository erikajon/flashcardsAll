import Realm from 'realm';
import {ModuleModel} from '../models/moduleModel';
import type {ModuleModeType} from '../models/moduleModel';

export type ModuleActionType = {
  saveModule(payload: ModuleModeType): Promise<ModuleModel>;
  getAllModulesByExamId(examId: string): Realm.Results<ModuleModel>;
  resetProgress(): void;
  updateLastRevisedDate(moduleId: number): Promise<void>;
};

export const moduleActions = (realmInstance: Realm) => ({
  saveModule: (payload: ModuleModeType): Promise<ModuleModel> => {
    return new Promise((resolve, reject) => {
      try {
        realmInstance.write(() => {
          resolve(
            realmInstance.create<ModuleModel>(
              ModuleModel.getModelName(),
              payload,
              true,
            ),
          );
        });
      } catch (err) {
        console.log('err', err);
        return reject(err);
      }
    });
  },

  getAllModulesByExamId: (examId: string): Realm.Results<ModuleModel> => {
    let allModules = realmInstance.objects<ModuleModel>(
      ModuleModel.getModelName(),
    );
    try {
      return allModules.filtered(`examId = "${examId}"`);
    } catch (err) {
      console.log('err', err);
      return err;
    }
  },

  updateLastRevisedDate: (moduleId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        realmInstance.write(() => {
          let [module] = realmInstance.objects<ModuleModel>(
            ModuleModel.getModelName(),
          ).filtered('id == $0', moduleId);
          module.lastRevised = new Date();
          resolve()
        });
      } catch (err) {
        console.log('err', err);
        return reject(err);
      }
    });
  },

  resetProgress: () => {
    try {
      realmInstance.write(() => {
        const allFlashcards = realmInstance.objects<ModuleModel>(
          ModuleModel.getModelName(),
        );
        allFlashcards.update('lastRevised', undefined);
      });
    } catch (err) {
      console.log('err', err);
    }
  },
});
