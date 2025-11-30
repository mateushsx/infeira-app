import { createBrowserRouter, Navigate } from 'react-router-dom';
import { hasCompletedOnboarding } from '@/services/storage/user';
import { Layout } from '@/components/layout/Layout';
import { OnboardingLayout } from '@/components/layout/OnboardingLayout';
import {
  ProtectedRoute,
  OnboardingRoute,
} from '@/components/router/RouteGuards';
import LandingPage from '@/pages/landing';
import OnboardingPage from '@/pages/onboarding';
import DashboardPage from '@/pages/dashboard';
import ProductsPage from '@/pages/products';
import SalesPage from '@/pages/sales';
import ReportPage from '@/pages/report';

export const router = createBrowserRouter([
  {
    path: '/',
    element: hasCompletedOnboarding() ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <LandingPage />
    ),
  },
  {
    path: '/onboarding/*',
    element: (
      <OnboardingRoute>
        <OnboardingLayout>
          <OnboardingPage />
        </OnboardingLayout>
      </OnboardingRoute>
    ),
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <Layout>
          <Navigate to="/dashboard" replace />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Layout>
          <DashboardPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/products',
    element: (
      <ProtectedRoute>
        <Layout>
          <ProductsPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/sales/*',
    element: (
      <ProtectedRoute>
        <Layout>
          <SalesPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/report',
    element: (
      <ProtectedRoute>
        <Layout>
          <ReportPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
]);
