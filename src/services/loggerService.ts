export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'EXCEPTION';

export interface SystemLogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  module: string;
  message: string;
  stack?: string;
  metadata?: Record<string, any>;
}

const LOGS_STORAGE_KEY = 'aiprd_system_logs';
const MAX_LOG_ITEMS = 100;

export function getSystemLogs(): SystemLogEntry[] {
  try {
    const raw = localStorage.getItem(LOGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Failed to read system logs from localStorage', e);
  }
  return [];
}

export function logEvent(level: LogLevel, module: string, message: string, stack?: string, metadata?: Record<string, any>): SystemLogEntry {
  const now = new Date();
  const timestamp = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + now.toLocaleTimeString();
  
  const newEntry: SystemLogEntry = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp,
    level,
    module,
    message,
    stack: stack || (new Error().stack),
    metadata
  };

  // Console output
  if (level === 'ERROR' || level === 'EXCEPTION') {
    console.error(`[${level}] [${module}] ${message}`, stack, metadata);
  } else if (level === 'WARN') {
    console.warn(`[${level}] [${module}] ${message}`, metadata);
  } else {
    console.log(`[${level}] [${module}] ${message}`, metadata);
  }

  try {
    const existing = getSystemLogs();
    const updated = [newEntry, ...existing].slice(0, MAX_LOG_ITEMS);
    localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to persist system log to localStorage', e);
  }

  return newEntry;
}

export function logInfo(module: string, message: string, metadata?: Record<string, any>): SystemLogEntry {
  return logEvent('INFO', module, message, undefined, metadata);
}

export function logWarn(module: string, message: string, metadata?: Record<string, any>): SystemLogEntry {
  return logEvent('WARN', module, message, undefined, metadata);
}

export function logError(module: string, error: Error | unknown, metadata?: Record<string, any>): SystemLogEntry {
  const errObj = error instanceof Error ? error : new Error(String(error));
  return logEvent('ERROR', module, errObj.message, errObj.stack, metadata);
}

export function clearSystemLogs(): void {
  try {
    localStorage.removeItem(LOGS_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear system logs', e);
  }
}

// Global exception listeners initialization
export function setupGlobalExceptionHandling(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event) => {
    logEvent(
      'EXCEPTION',
      'GlobalErrorListener',
      event.message || 'Uncaught Global Error',
      event.error?.stack || `${event.filename}:${event.lineno}:${event.colno}`,
      { filename: event.filename, line: event.lineno, col: event.colno }
    );
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const msg = reason instanceof Error ? reason.message : String(reason);
    const stack = reason instanceof Error ? reason.stack : undefined;
    logEvent('EXCEPTION', 'UnhandledPromiseRejection', `Promise Rejected: ${msg}`, stack);
  });
}
