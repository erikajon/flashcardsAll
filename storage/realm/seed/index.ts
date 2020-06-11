import AsyncStorage from '@react-native-community/async-storage';

import {seed as seed1Function} from './202005071010_add_initial_seed';
import {getRealmInstance} from '..';

// seed version that the device should be on
const SEED_VERSION = 1;

// list of seeds to be performed
const seeds: {version: number; seedFunction: () => any}[] = [
  {version: 1, seedFunction: seed1Function},
];

export const seedRealmDB = async () => {
  // @TODO :: remove this when no longer needed
  // temp delete everything
  await AsyncStorage.removeItem('flashcardsSeedVersion');
  const realm = getRealmInstance();
  realm.write(() => {
    realm.deleteAll();
  });

  let storedSeedVersion = await AsyncStorage.getItem('flashcardsSeedVersion');
  if (SEED_VERSION.toString() !== storedSeedVersion) {
    // @TODO :: add some error reporting if seed version can't be converted to a number
    const currentSeedVersion = Number(storedSeedVersion) ?? 0;

    // get the relevant seeds to run (exclude seeds that have been run before)
    const seedsToRun = seeds.slice(currentSeedVersion, seeds.length);

    // run seeds
    await Promise.all(seedsToRun.map((e) => e.seedFunction()));

    // update the seed version to the latest one
    await AsyncStorage.setItem(
      'flashcardsSeedVersion',
      SEED_VERSION.toString(),
    );
  }

  return;
};
