import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("React ErrorBoundary caught an unhandled error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public handleReload = () => {
    localStorage.removeItem('aiprd_prds'); // Reset cached PRDs if corrupt
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-main, #F8FAFC)',
          color: 'var(--text-primary, #0F172A)',
          padding: '24px',
          fontFamily: 'sans-serif'
        }}>
          <div style={{
            maxWidth: '560px',
            width: '100%',
            background: 'var(--bg-card, #FFFFFF)',
            padding: '36px',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid var(--border-color, #E2E8F0)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#FEE2E2',
              color: '#DC2626',
              fontSize: '28px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              ⚠️
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '10px' }}>
              Unexpected State Recovery
            </h2>

            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6, marginBottom: '24px' }}>
              The application encountered a temporary layout conflict while rendering. Click below to recover your workspace instantly.
            </p>

            {this.state.error && (
              <div style={{
                background: '#F1F5F9',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '12px',
                fontFamily: 'monospace',
                color: '#475569',
                textAlign: 'left',
                marginBottom: '24px',
                overflowX: 'auto'
              }}>
                {this.state.error.toString()}
              </div>
            )}

            <button
              onClick={this.handleReload}
              style={{
                background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                color: 'white',
                border: 'none',
                fontWeight: 700,
                fontSize: '14px',
                padding: '12px 28px',
                borderRadius: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
              }}
            >
              Reset Cache & Recover Workspace
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
