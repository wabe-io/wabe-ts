export class Measure {
  private static counter = 0;
  private startTime: number;
  private lastTick: number;
  private label: string | undefined;
  private logger: (text: string) => void;

  constructor(
    logger: (text: string) => void,
    params?: { showStart?: boolean; label?: string },
  ) {
    this.logger = logger;
    this.startTime = Date.now();
    this.lastTick = this.startTime;
    this.label = params?.label ?? `MEASURE ${Measure.counter++}`;
    if (params?.showStart) {
      this.logger(`${[this.label]} Starting...`);
    }
  }

  public next = () => {
    const now = Date.now();
    const elapsed = now - this.lastTick;
    const { label } = this;
    this.logger(`${[label]} +${elapsed.toLocaleString()}ms`);
    this.lastTick = now;
  };

  public stop = () => {
    const now = Date.now();
    const elapsed = now - this.startTime;
    const elapsedPartial = now - this.lastTick;
    const { label } = this;

    if (this.lastTick === this.startTime) {
      this.logger(`${[label]} ${elapsed.toLocaleString()}ms`);
    } else {
      this.logger(
        `${[
          label,
        ]} +${elapsedPartial.toLocaleString()}ms | ${elapsed.toLocaleString()}ms`,
      );
    }
  };
}
