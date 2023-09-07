type synonymsGroup = Set<string>;
let synonymsStorage: Array<synonymsGroup> = [];

export const addSynonyms = async (
  synonymsArr: Array<string>
): Promise<string[]> => {
  let synonymsGroupIdx: number = -1;
  let synonymsGroupIdxSet = new Set<number>();
  for (const [_, word] of synonymsArr.entries()) {
    synonymsGroupIdx = getSynonymsGroupIdx(word);
    if (synonymsGroupIdx !== -1) {
      synonymsGroupIdxSet.add(synonymsGroupIdx);
    }
  }
  if (synonymsGroupIdxSet.size > 0) {
    synonymsStorage = rearrangeSynonymsStorage(synonymsGroupIdxSet);
    const lastSynonymsGroupIdx = synonymsStorage.length - 1;
    synonymsArr.forEach((word) => {
      synonymsStorage[lastSynonymsGroupIdx].add(word);
    });
    console.log(synonymsStorage);
    return Array.from(synonymsStorage[lastSynonymsGroupIdx]);
  }

  const synonymsSet = new Set(synonymsArr);
  synonymsStorage.push(synonymsSet);
  const lastInsertedIdn = synonymsStorage.length - 1;
  console.log(synonymsStorage);

  return Array.from(synonymsStorage[lastInsertedIdn]);
};

export const getSynonymsGroup = async (word: string) => {
  const synonymsGroupIdx = getSynonymsGroupIdx(word);
  if (synonymsGroupIdx !== -1) {
    return Array.from(synonymsStorage[synonymsGroupIdx]);
  }
  return [];
};

//check if a word exists in current synonyms storage
function getSynonymsGroupIdx(word: string): number {
  for (const [index, synonymsGroup] of synonymsStorage.entries()) {
    if (synonymsGroup.has(word)) {
      return index;
    }
  }

  return -1;
}
// put synonyms words in current synonyms storage in the same group
function rearrangeSynonymsStorage(
  synonymsGroupIdxSet: Set<number>
): Array<synonymsGroup> {
  const synonymsGroupIdxArr = Array.from(synonymsGroupIdxSet);
  const emptySet = new Set<string>();
  const newSynonymsGroup = synonymsGroupIdxArr.reduce(
    (accSet: Set<string>, cur: number) => {
      return new Set([...synonymsStorage[cur], ...accSet]);
    },
    emptySet
  );
  synonymsStorage = synonymsStorage.filter((_, i) => {
    return !synonymsGroupIdxArr.includes(i);
  });
  synonymsStorage.push(newSynonymsGroup);

  return synonymsStorage;
}

export const getAllSynonyms = async () => {
  return synonymsStorage.map((synonymsGroup) => {
    return Array.from(synonymsGroup);
  });
};
