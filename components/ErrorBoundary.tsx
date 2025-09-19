
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Met à jour l'état pour que le prochain rendu affiche l'interface de secours.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Vous pouvez également journaliser l'erreur vers un service de rapport d'erreurs
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback === undefined ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 p-4">
            <div className="text-center text-red-400 border border-red-400/30 bg-red-500/10 rounded-lg p-6">
                <h2 className="font-bold text-lg mb-2">Oops! Something went wrong.</h2>
                <p className="text-sm">An error occurred in this section. Please try refreshing the page.</p>
            </div>
        </div>
      ) : this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
