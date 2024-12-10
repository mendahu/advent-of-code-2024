class DefraggerState {
  private inProgress: boolean = true;
  private checksum: number = 0;

  private diskMapIndex: number = 0;
  private rearDiskMapIndex: number = 0;
  private blockCount: number = 0;

  constructor(private data: string) {
    this.rearDiskMapIndex = this.data.length - 1;
  }

  public isInProgress(): boolean {
    return this.inProgress;
  }

  public getChecksum(): number {
    return this.checksum;
  }

  private reWriteFileSize(index: number, value: number): void {
    this.data = this.data.slice(0, index) + value + this.data.slice(index + 1);
  }

  private addChecksum(value: number): void {
    const checksumValue = value * this.blockCount;
    this.checksum += checksumValue;
    this.blockCount++;
  }

  public writeNextBlock(): void {
    if (this.diskMapIndex > this.rearDiskMapIndex) {
      this.inProgress = false;
      return;
    }

    if (this.diskMapIndex % 2 === 0) {
      // write block from front

      let fileSize = parseInt(this.data[this.diskMapIndex]);
      const fileNumber = this.diskMapIndex / 2;
      this.addChecksum(fileNumber);
      fileSize--;
      this.reWriteFileSize(this.diskMapIndex, fileSize);

      if (fileSize <= 0) {
        this.diskMapIndex++;
      }
    } else {
      // write block from rear

      let emptySpaceSize = parseInt(this.data[this.diskMapIndex]);

      if (emptySpaceSize <= 0) {
        this.diskMapIndex++;
        return;
      } else {
        emptySpaceSize--;
        this.reWriteFileSize(this.diskMapIndex, emptySpaceSize);
      }

      let fileSize = parseInt(this.data[this.rearDiskMapIndex]);
      const fileNumber = this.rearDiskMapIndex / 2;
      this.addChecksum(fileNumber);
      fileSize--;
      this.reWriteFileSize(this.rearDiskMapIndex, fileSize);

      if (fileSize <= 0) {
        this.rearDiskMapIndex -= 2;
      }
    }
  }

  public printData() {
    console.log(this.data);
  }
}

const defrag = (data: string): number => {
  const defragger = new DefraggerState(data);

  while (defragger.isInProgress()) {
    defragger.writeNextBlock();
  }

  return defragger.getChecksum();
};

export default function (data: string): void {
  const checksum = defrag(data);

  console.log(checksum);
}
