import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const questions = [
  {
    id: 'name',
    question: 'What is your name?',
    type: 'text',
  },
  {
    id: 'transportationMode',
    question: 'What is your primary mode of transportation?',
    type: 'select',
    options: ['Car', 'Public Transport', 'Bicycle', 'Walking'],
  },
  {
    id: 'energySaving',
    question: 'Do you use energy-efficient appliances at home?',
    type: 'boolean',
  },
  {
    id: 'recycling',
    question: 'How often do you recycle?',
    type: 'select',
    options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'],
  },
  {
    id: 'localFood',
    question: 'How often do you buy locally sourced food?',
    type: 'select',
    options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'],
  },
  {
    id: 'waterConservation',
    question: 'Do you actively try to conserve water?',
    type: 'boolean',
  },
  {
    id: 'renewableEnergy',
    question: 'Do you use any form of renewable energy at home?',
    type: 'boolean',
  },
  {
    id: 'plasticReduction',
    question: 'How often do you use reusable bags and containers?',
    type: 'select',
    options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never'],
  },
];

const SustainabilityQuestionnaire: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const calculateAchievements = (userAnswers: Record<string, string>) => {
    const achievements = [];

    if (userAnswers.transportationMode === 'Bicycle' || userAnswers.transportationMode === 'Walking') {
      achievements.push('Eco Commuter');
    }

    if (userAnswers.energySaving === 'true') {
      achievements.push('Energy Saver');
    }

    if (userAnswers.recycling === 'Always' || userAnswers.recycling === 'Often') {
      achievements.push('Recycling Champion');
    }

    if (userAnswers.localFood === 'Always' || userAnswers.localFood === 'Often') {
      achievements.push('Local Food Supporter');
    }

    if (userAnswers.waterConservation === 'true') {
      achievements.push('Water Warrior');
    }

    if (userAnswers.renewableEnergy === 'true') {
      achievements.push('Renewable Energy Adopter');
    }

    if (userAnswers.plasticReduction === 'Always' || userAnswers.plasticReduction === 'Often') {
      achievements.push('Plastic Reducer');
    }

    return achievements;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const achievements = calculateAchievements(answers);
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        name: answers.name,
        sustainabilityAnswers: answers,
        achievements: achievements,
        joinDate: new Date().toISOString(),
      });
      navigate('/profile');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-green-600">Sustainability Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        {questions.map(({ id, question, type, options }) => (
          <div key={id} className="mb-4">
            <label className="block mb-2 font-medium">{question}</label>
            {type === 'text' && (
              <input
                type="text"
                value={answers[id] || ''}
                onChange={(e) => handleChange(id, e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            )}
            {type === 'select' && (
              <select
                value={answers[id] || ''}
                onChange={(e) => handleChange(id, e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select an option</option>
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {type === 'boolean' && (
              <div>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value="true"
                    checked={answers[id] === 'true'}
                    onChange={() => handleChange(id, 'true')}
                    className="mr-2"
                    required
                  />
                  Yes
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="false"
                    checked={answers[id] === 'false'}
                    onChange={() => handleChange(id, 'false')}
                    className="mr-2"
                    required
                  />
                  No
                </label>
              </div>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SustainabilityQuestionnaire;