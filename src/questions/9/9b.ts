type CompressedFile = {
  id: number;
  value: number | null;
  blocks: number;
  moved: boolean;
};

const getChecksum = (files: CompressedFile[]): number => {
  let checksum = 0;
  let blockCount = 0;

  for (let i = 0; i < files.length; i++) {
    let file = files[i];

    if (file.value === null) {
      blockCount += file.blocks;
    } else {
      for (let j = 0; j < file.blocks; j++) {
        checksum += file.value * blockCount;
        blockCount++;
      }
    }
  }

  return checksum;
};

const findLeftmostEmptySpace = (
  files: CompressedFile[],
  startingIndex: number,
  endingIndex: number,
  blockSize: number
): number | null => {
  for (let i = startingIndex; i <= endingIndex; i++) {
    if (files[i].value === null && files[i].blocks >= blockSize) {
      return i;
    }
  }

  return null;
};

const defrag = (files: CompressedFile[]): CompressedFile[] => {
  let startingIndex = 1;
  let endingIndex = files.length - 1;

  for (let i = endingIndex; i >= 0; i--) {
    const targetFile = files[i];

    if (targetFile.value === null || targetFile.moved) {
      endingIndex--;
      continue;
    }

    const destinationIndex = findLeftmostEmptySpace(
      files,
      startingIndex,
      endingIndex,
      targetFile.blocks
    );

    if (destinationIndex === null) {
      endingIndex--;
      continue;
    }

    if (destinationIndex === startingIndex) {
      startingIndex++;
    }

    files.splice(i, 1, {
      id: 0,
      value: null,
      blocks: targetFile.blocks,
      moved: false,
    });
    files.splice(destinationIndex, 0, targetFile);
    files[destinationIndex + 1].blocks -= targetFile.blocks;

    targetFile.moved = true;
    endingIndex--;
  }

  return files;
};

export default function (data: string): void {
  const files: CompressedFile[] = data.split("").map((blockSize, i) => {
    return {
      id: i,
      value: i % 2 === 0 ? i / 2 : null,
      blocks: parseInt(blockSize),
      moved: false,
    };
  });

  const defraggedFiles = defrag(files);

  const checksum = getChecksum(defraggedFiles);

  console.log(checksum);
}
