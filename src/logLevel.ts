import { decodeEnum } from 'ts-decoder';

const allLogLevels = ['error', 'warn', 'info', 'debug'];

export type LogLevel = 'warn' | 'debug' | 'error' | 'info';

export const decodeLogLevel = decodeEnum<LogLevel>(allLogLevels);
