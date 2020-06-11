import Realm from 'realm';
import {FlashcardModel} from '../models/flashcardModel';
import type {FlashcardModeType} from '../models/flashcardModel';

export type FlashcardActionType = {
  saveFlashcard(payload: FlashcardModeType): Promise<FlashcardModel>;
  getAll(): Realm.Results<FlashcardModel>;
  getAllByModuleId(moduleId: number): Realm.Results<FlashcardModel>;
  updateFlashcard(payload: Partial<FlashcardModeType>): Promise<FlashcardModel>;
  resetProgress(): void;
};

export const flashcardActions = (realmInstance: Realm) => ({
  saveFlashcard: (payload: FlashcardModeType): Promise<FlashcardModel> => {
    return new Promise((resolve, reject) => {
      try {
        realmInstance.write(() => {
          resolve(
            realmInstance.create<FlashcardModel>(
              FlashcardModel.getModelName(),
              payload,
            ),
          );
        });
      } catch (err) {
        console.log('err', err);
        return reject(err);
      }
    });
  },

  updateFlashcard: (payload: Partial<FlashcardModeType>) => {
    return new Promise((resolve, reject) => {
      try {
        realmInstance.write(() => {
          resolve(
            realmInstance.create<FlashcardModel>(
              FlashcardModel.getModelName(),
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

  getAllByModuleId: (moduleId: number): Realm.Results<FlashcardModel> => {
    let allFlashcards = realmInstance.objects<FlashcardModel>(
      FlashcardModel.getModelName(),
    );
    try {
      return allFlashcards.filtered(`moduleId = "${moduleId}"`);
    } catch (err) {
      console.log('err', err);
      return err;
    }
  },

  getAll: (): Realm.Results<FlashcardModel> => {
    return realmInstance.objects<FlashcardModel>(FlashcardModel.getModelName());
  },

  resetProgress: () => {
    try {
      realmInstance.write(() => {
        const allFlashcards = realmInstance.objects<FlashcardModel>(
          FlashcardModel.getModelName(),
        );
        allFlashcards.update('answerType', 'none');
      });
    } catch (err) {
      console.log('err', err);
    }
  },
});
