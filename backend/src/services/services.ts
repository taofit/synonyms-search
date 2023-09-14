type synonymsGroup = Set<string>;
//each synonymsGroup stores a group of synonyms words
let synonymsStorage: Array<synonymsGroup> = [];

export const addSynonyms = async (
  synonymsArr: Array<string>
): Promise<{ status: string; msg: string }> => {
  let synonymsGroupIdx: number;
  //synonymsGroupIdxSet stores all the index of synonymsGroup that contain the synonyms word sent from client
  const synonymsGroupIdxSet = new Set<number>();
  for (const word of synonymsArr) {
    synonymsGroupIdx = getSynonymsGroupIdx(word);
    if (synonymsGroupIdx !== -1) {
      synonymsGroupIdxSet.add(synonymsGroupIdx);
    }
  }
  //which means some synonyms words sent from client exist in the backend 
  if (synonymsGroupIdxSet.size > 0) {
    const newSynonymsGroup = getSynonymsInGroup(synonymsGroupIdxSet);
    synonymsStorage = synonymsStorage.filter((_, i): boolean => {
      return !synonymsGroupIdxSet.has(i);
    });
    synonymsStorage.push(newSynonymsGroup);
    const lastSynonymsGroupIdx = synonymsStorage.length - 1;
    synonymsArr.forEach((word: string) => {
      synonymsStorage[lastSynonymsGroupIdx].add(word);
    });

    return {
      status: "success",
      msg: "successfully add synonyms",
    };
  }

  const synonymsSet = new Set(synonymsArr);
  synonymsStorage.push(synonymsSet);
  const lastInsertedIdn = synonymsStorage.length - 1;

  return {
    status: "success",
    msg: "successfully add synonyms",
  };
};

export const editSynonyms = async (
  word: string,
  synonymsList: Array<string>
) => {
  const baseWordSynonymsGroupIdx = getSynonymsGroupIdx(word);
  if (baseWordSynonymsGroupIdx === -1) {
    return { status: "error", msg: `word:"${word}" not found in the system` };
  }
  const synonymsGroup = new Set<string>();
  for (const w of synonymsList) {
    synonymsGroup.add(w);
  }
  synonymsGroup.add(word);

  const synonymsOtherGroupIdxSet = new Set<number>();
  for (const word of synonymsGroup) {
    const groupIdx = getSynonymsGroupIdx(word);
    if (isWordFromOtherGroup(baseWordSynonymsGroupIdx, groupIdx)) {
      synonymsOtherGroupIdxSet.add(groupIdx);
    }
  }

  const newSynonymsGroup = getSynonymsInGroup(synonymsOtherGroupIdxSet);
  synonymsStorage[baseWordSynonymsGroupIdx] = new Set([
    ...synonymsGroup,
    ...newSynonymsGroup,
  ]);
  synonymsStorage = synonymsStorage.filter((_, i): boolean => {
    return !synonymsOtherGroupIdxSet.has(i);
  });

  return {
    status: "success",
    msg: `successfully update synonyms for word: "${word}"`,
  };
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

function isWordFromOtherGroup(
  baseWordSynonymsGroupIdx: number,
  groupIdx: number
): boolean {
  if (groupIdx !== -1 && groupIdx !== baseWordSynonymsGroupIdx) {
    return true;
  }
  return false;
}

function getSynonymsInGroup(synonymsGroupIdxSet: Set<number>): Set<string> {
  const synonymsGroupIdxArr = Array.from(synonymsGroupIdxSet);
  const emptySet = new Set<string>();
  const newSynonymsGroup = synonymsGroupIdxArr.reduce(
    (accSet: Set<string>, cur: number): Set<string> => {
      return new Set([...synonymsStorage[cur], ...accSet]);
    },
    emptySet
  );

  return newSynonymsGroup;
}

export const getAllSynonyms = async () => {
  return synonymsStorage.map((synonymsGroup) => {
    return Array.from(synonymsGroup);
  });
};
