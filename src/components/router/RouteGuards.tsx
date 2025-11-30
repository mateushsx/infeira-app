import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { hasCompletedOnboarding } from '@/services/storage/user';

interface RouteWrapperProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: RouteWrapperProps) {
  if (!hasCompletedOnboarding()) {
    return <Navigate to="/onboarding" replace />;
  }
  return <>{children}</>;
}

export function OnboardingRoute({ children }: RouteWrapperProps) {
  if (hasCompletedOnboarding()) {
    return <Navigate to="/app" replace />;
  }
  return <>{children}</>;
}
