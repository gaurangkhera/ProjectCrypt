"use client"

import { SettingsTabs } from '@/components/SettingsTabs';
import { useState } from 'react';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams()
  const id = params.id

  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const handleAddQuestion = () => {
    setShowAddQuestion(true);
  };

  return (
    <div className="min-h-screen p-8">
        <SettingsTabs huntId={id as string} />
    </div>
  );
};

export default Page;
