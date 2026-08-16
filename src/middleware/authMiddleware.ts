import { isAuthenticated } from '../services/storageService';

export const PROTECTED_ROUTES = [
  'dashboard',
  'wizard',
  'editor',
  'upgrade',
  'account',
  'templates',
  'aitools',
  'docs'
];

export const PUBLIC_ROUTES = [
  'landing',
  'login',
  'about',
  'legal',
  'help'
];

export interface AuthCheckResult {
  authorized: boolean;
  targetPage: string;
  redirectPage?: string;
  reason?: string;
}

/**
 * Authentication & Authorization Route Guard Middleware
 * Validates session token and guards all protected workspace routes.
 */
export function checkRouteAuth(requestedPage: string): AuthCheckResult {
  const loggedIn = isAuthenticated();

  // If user is trying to access a protected page without logging in
  if (PROTECTED_ROUTES.includes(requestedPage) && !loggedIn) {
    return {
      authorized: false,
      targetPage: requestedPage,
      redirectPage: 'login',
      reason: 'Authentication Required: Please log in to access the PRD Builder workspace.'
    };
  }

  // If user is logged in and trying to view login page, redirect to dashboard
  if (requestedPage === 'login' && loggedIn) {
    return {
      authorized: true,
      targetPage: 'dashboard',
      redirectPage: 'dashboard',
      reason: 'Already Authenticated: Redirected to Dashboard Workspace.'
    };
  }

  return {
    authorized: true,
    targetPage: requestedPage
  };
}
