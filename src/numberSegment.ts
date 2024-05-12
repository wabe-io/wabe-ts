export interface NumberSegment {
  start: number;
  end: number;
}

export const mergeOverlappingNumberSegments = (
  segments: NumberSegment[],
): NumberSegment[] => {
  const indexesToIgnore: number[] = [];

  const sortedSegments = segments.sort((sa, sb) => sa.start - sb.start);

  for (let index = 0; index < sortedSegments.length; index++) {
    const element = sortedSegments[index];

    for (let subIx = index + 1; subIx < sortedSegments.length; subIx++) {
      const otherElement = sortedSegments[subIx];

      if (indexesToIgnore.indexOf(subIx) === -1) {
        // If there is some kind of overlap
        if (
          element.start <= otherElement.start &&
          element.end + 1 >= otherElement.start
        ) {
          // Ignore the original element
          indexesToIgnore.push(subIx);
          element.end =
            element.end > otherElement.end ? element.end : otherElement.end;
        }
      }
    }
  }

  return sortedSegments.filter((_, ix) => indexesToIgnore.indexOf(ix) === -1);
};

export const verifyNumberSegment = (segment: NumberSegment) => {
  return (
    !isNaN(segment.start) && !isNaN(segment.end) && segment.start <= segment.end
  );
};

export const mergeNumberSegments = (
  segment: NumberSegment,
  into: NumberSegment[],
): NumberSegment[] => {
  return mergeOverlappingNumberSegments([...into, segment]);
};

export const getNumberSegmentLength = (segment: NumberSegment) =>
  segment.end - segment.start + 1;
