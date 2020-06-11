import Realm from 'realm';
import {ExamModel} from '../models/examModel';
import type {ExamModeType} from '../models/examModel';

export type ExamActionType = {
  saveExam(payload: ExamModeType): Promise<ExamModel>;
  getAll(): Realm.Results<ExamModel>;
};

export const examActions = (realmInstance: Realm) => ({
  saveExam: (payload: ExamModeType): Promise<ExamModel> => {
    return new Promise((resolve, reject) => {
      try {
        realmInstance.write(() => {
          resolve(
            realmInstance.create<ExamModel>(
              ExamModel.getModelName(),
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

  getAll: (): Realm.Results<ExamModel> => {
    return realmInstance.objects<ExamModel>(ExamModel.getModelName());
  },
});
