import { Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingWelcome } from '@/pages/onboarding/components/OnboardingWelcome';
import { NameInputForm } from '@/pages/onboarding/components/NameInputForm';

export default function OnboardingPage() {
  return (
    <Routes>
      <Route index element={<OnboardingWelcome />} />
      <Route path="name" element={<NameInputForm />} />
      <Route path="*" element={<Navigate to="/onboarding" replace />} />
    </Routes>
  );
}
