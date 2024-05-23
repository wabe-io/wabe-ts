import { describe, it } from 'mocha';
import * as chai from 'chai';
import {
  formatWithFinancialUnits,
  formatWithScientificUnits,
  formatWithUnits,
} from '../formatWithUnits';

const expect = chai.expect;

describe('formatWithUnits', () => {
  it('returns a string when no units provoded', () => {
    expect(formatWithUnits([])(42)).to.eq('42');
  });

  it('chops decimals off', () => {
    expect(formatWithUnits([])(42.2)).to.eq('42');
  });

  it('returns the same unit when only one given', () => {
    expect(formatWithUnits([[0, 'X']])(42)).to.eq('42X');
    expect(formatWithUnits([[0, 'X']])(-42)).to.eq('-42X');
  });

  it('returns the appropiate unit on a positive scale', () => {
    const units = [
      [6, 'm'],
      [0, 'u'],
      [2, 'c'],
      [1, 'd'],
      [3, 'k'],
    ] as [number, string][];
    expect(formatWithUnits(units)(1)).to.eq('1u');
    expect(formatWithUnits(units)(2)).to.eq('2u');
    expect(formatWithUnits(units)(3)).to.eq('3u');
    expect(formatWithUnits(units)(11)).to.eq('1d');
    expect(formatWithUnits(units)(21)).to.eq('2d');
    expect(formatWithUnits(units)(111)).to.eq('1c');
    expect(formatWithUnits(units)(1111)).to.eq('1k');
    expect(formatWithUnits(units)(1000)).to.eq('1k');
    expect(formatWithUnits(units)(63_000_000)).to.eq('63m');
  });

  it('returns the appropiate unit on a positive scale with decimals', () => {
    const units = [
      [0, 'x'],
      [-2, 'c'],
      [-3, 'm'],
    ] as [number, string][];
    expect(formatWithUnits(units)(1)).to.eq('1x');
    expect(formatWithUnits(units)(0.55)).to.eq('55c');
  });

  it('returns the appropiate unit on a negative scale', () => {
    const units = [
      [0, 'u'],
      [1, 'd'],
      [2, 'c'],
      [3, 'k'],
      [6, 'm'],
    ] as [number, string][];
    expect(formatWithUnits(units)(-1)).to.eq('-1u');
    expect(formatWithUnits(units)(-11)).to.eq('-1d');
    expect(formatWithUnits(units)(-111)).to.eq('-1c');
    expect(formatWithUnits(units)(-1111)).to.eq('-1k');
    expect(formatWithUnits(units)(-1000)).to.eq('-1k');
    expect(formatWithUnits(units)(-6456789)).to.eq('-6m');
  });

  it('returns no unit when no lower unit is given', () => {
    expect(formatWithUnits([[2, 'X']])(2)).to.eq('2');
    expect(formatWithUnits([[1, 'X']])(22)).to.eq('2X');
  });
});

describe('formatWithFinancialUnits', () => {
  it('works', () => {
    expect(formatWithFinancialUnits(0.33)).to.eq('33c');
    expect(formatWithFinancialUnits(42)).to.eq('42');
    expect(formatWithFinancialUnits(77_234_555)).to.eq('77M');
    expect(formatWithFinancialUnits(10_000_000_001)).to.eq('10B');
  });
});

describe('formatWithScientificUnits', () => {
  it('works', () => {
    expect(formatWithScientificUnits(0.000000023)).to.eq('23p');
    expect(formatWithScientificUnits(0.000023)).to.eq('23μ');
    expect(formatWithScientificUnits(0.343)).to.eq('343m');
    expect(formatWithScientificUnits(22)).to.eq('22');
    expect(formatWithScientificUnits(4566)).to.eq('4K');
    expect(formatWithScientificUnits(4566444)).to.eq('4M');
    expect(formatWithScientificUnits(4566444444)).to.eq('4G');
  });
});
