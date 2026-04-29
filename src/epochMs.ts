export type EpochMs = number & { readonly __brand: 'wabe-epochms' };

export const EpochMs = (val: number) => val as EpochMs;
