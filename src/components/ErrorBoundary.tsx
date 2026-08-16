import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Copy, Check, ShieldAlert } from 'lucide-react';
import { logError, getSystemLogs } from '../services/loggerService';
import { copyToClipboard } from '../services/exportService';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copiedLog: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
    copiedLog: false
  };

  public static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    logError('ErrorBoundaryComponent', error, { componentStack: errorInfo.componentStack });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  private handleCopyDiagnostics = () => {
    const logs = getSystemLogs();
    const payload = JSON.stringify({
      error: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      systemLogs: logs.slice(0, 10)
    }, null, 2);

    copyToClipboard(payload).then(() => {
      this.setState({ copiedLog: true });
      setTimeout(() => this.setState({ copiedLog: false }), 2000);
    });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--bg-main)' }}>
          <div className="canvas-card" style={{ maxWidth: '640px', width: '100%', padding: '40px', borderRadius: '24px', textAlign: 'center', cursor: 'default' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <AlertTriangle size={28} />
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Application Exception Caught
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
              PRD Studio encountered an unexpected runtime exception. The error has been captured in the system diagnostic logs.
            </p>

            <div style={{ background: '#0F172A', color: '#F8FAFC', padding: '16px', borderRadius: '12px', textAlign: 'left', fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.6, overflowX: 'auto', marginBottom: '24px', maxHeight: '180px' }}>
              <strong>Error:</strong> {this.state.error?.message || 'Unknown Exception'}
              <br /><br />
              <strong>Stack Trace:</strong>
              <pre style={{ margin: 0, opacity: 0.8, whiteSpace: 'pre-wrap' }}>
                {this.state.error?.stack || this.state.errorInfo?.componentStack || 'No stack trace available.'}
              </pre>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={this.handleReset} style={{ padding: '10px 20px', fontSize: '13px' }}>
                <RefreshCw size={15} /> Reload Application
              </button>

              <button className="btn-secondary" onClick={this.handleCopyDiagnostics} style={{ padding: '10px 20px', fontSize: '13px' }}>
                {this.state.copiedLog ? <Check size={15} color="#10B981" /> : <Copy size={15} />}
                {this.state.copiedLog ? 'Diagnostics Copied!' : 'Copy Error Diagnostics'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
