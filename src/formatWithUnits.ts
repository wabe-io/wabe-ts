export const formatWithUnits =
  (units: [exponent: number, unit: string][]) =>
  (val: number): string => {
    const sortedUnits = units
      .map(([exponent, unit]) => [Math.pow(10, exponent), unit] as const)
      .sort((a, b) => b[0] - a[0]);

    const bestUnit = sortedUnits.find(
      ([threshold]) => threshold <= Math.abs(val),
    );

    if (!bestUnit) return String(Math.floor(val));

    const finalVal = bestUnit[0] === 0 ? val : val / bestUnit[0];

    return `${finalVal >= 0 ? Math.floor(finalVal) : Math.ceil(finalVal)}${
      bestUnit[1]
    }`;
  };

export const formatWithFinancialUnits = formatWithUnits([
  [-2, 'c'],
  [0, ''],
  [3, 'K'],
  [6, 'M'],
  [9, 'B'],
]);

export const formatWithScientificUnits = formatWithUnits([
  [-12, 'n'],
  [-9, 'p'],
  [-6, 'μ'],
  [-3, 'm'],
  [0, ''],
  [3, 'K'],
  [6, 'M'],
  [9, 'G'],
  [12, 'T'],
  [15, 'P'],
]);
