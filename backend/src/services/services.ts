type synonymsGroup = Set<string>;
const synonymsStorage: Array<synonymsGroup> = [];

export const addSynonyms = async (
  synonymsArr: Array<string>
): Promise<string[]> => {
  let synonymsGroupIdx: number = -1;
  for (const [index, word] of synonymsArr.entries()) {
    synonymsGroupIdx = getSynonymsGroupIdx(word);
    if (synonymsGroupIdx !== -1) {
      break;
    }
  }
  let synonymsGroup: string[];
  if (synonymsGroupIdx !== -1) {
    synonymsArr.forEach((word) => {
      synonymsStorage[synonymsGroupIdx].add(word);
    });
    synonymsGroup = Array.from(synonymsStorage[synonymsGroupIdx]);
  } else {
    const synonymsSet = new Set(synonymsArr);
    synonymsStorage.push(synonymsSet);
    const lastInsertedIdn = synonymsStorage.length - 1;
    synonymsGroup = Array.from(synonymsStorage[lastInsertedIdn]);
  }

  return synonymsGroup;
};

export const getSynonymsGroup = async (word: string) => {
  const synonymsGroupIdx = getSynonymsGroupIdx(word);
  if (synonymsGroupIdx !== -1) {
    return Array.from(synonymsStorage[synonymsGroupIdx]);
  }
  return [];
};

function getSynonymsGroupIdx(word: string): number {
  for (const [index, synonymsGroup] of synonymsStorage.entries()) {
    if (synonymsGroup.has(word)) {
      return index;
    }
  }

  return -1;
}
