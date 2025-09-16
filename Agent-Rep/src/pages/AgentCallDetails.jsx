import React from 'react';
import GlobalTable from '../components/GlobalTable/GlobalTable';

const AgentCallDetails = () => {
  const callData = [
    {
      id: 1,
      question: "Greeting & Introduction",
      agentResponse: "Good morning, this is John from",
      clientResponse: "Hi, I'm having trouble y re...",
      category: "Completed",
      score: 10,
      aiComment: "Agent greeted profession..."
    },
    {
      id: 2,
      question: "Problem Identification",
      agentResponse: "I'm sorry to hear that. Can you pl...",
      clientResponse: "Sure, the order ID is 12345.",
      category: "Completed",
      score: 10,
      aiComment: "Agent showed empathy a..."
    },
    {
      id: 3,
      question: "Problem Identification",
      agentResponse: "I'm sorry to hear that. Can you pl...",
      clientResponse: "Sure, the order ID is 12345.",
      category: "Completed",
      score: 10,
      aiComment: "Agent showed empathy a..."
    },
    {
      id: 4,
      question: "Problem Identification",
      agentResponse: "I'm sorry to hear that. Can you pl...",
      clientResponse: "Sure, the order ID is 12345.",
      category: "Completed",
      score: 10,
      aiComment: "Agent showed empathy a..."
    },
    {
      id: 5,
      question: "Problem Identification",
      agentResponse: "I'm sorry to hear that. Can you pl...",
      clientResponse: "Sure, the order ID is 12345.",
      category: "Completed",
      score: 10,
      aiComment: "Agent should have reassur..."
    },
    {
      id: 6,
      question: "Follow-up on Urgency",
      agentResponse: "(No follow-up was made)",
      clientResponse: "--",
      category: "Omitted",
      score: 0,
      aiComment: "Agent showed empathy a..."
    },
    {
      id: 7,
      question: "Apology for Delay",
      agentResponse: "I apologize for the inconvenienc...",
      clientResponse: "--",
      category: "Partially",
      score: 5,
      aiComment: "Apology was made but co..."
    }
  ];

  const columns = [
    {
      key: 'id',
      title: 'No',
      align: 'center',
      width: 'w-16'
    },
    {
      key: 'question',
      title: 'Question',
      align: 'start',
      textColor: 'text-gray-900'
    },
    {
      key: 'agentResponse',
      title: 'Agent Response',
      type: 'conversation',
      showAvatar: true,
      avatarBgClass: 'bg-teal-100',
      avatarTextClass: 'text-teal-600',
      getInitials: () => 'A',
      align: 'start',
      textColor: 'text-gray-900'
    },
    {
      key: 'clientResponse',
      title: 'Client Response',
      type: 'conversation',
      showAvatar: true,
      avatarBgClass: 'bg-blue-100',
      avatarTextClass: 'text-blue-600',
      getInitials: () => 'C',
      align: 'start',
      textColor: 'text-gray-900'
    },
    {
      key: 'category',
      title: 'Category',
      type: 'category',
      align: 'center'
    },
    {
      key: 'score',
      title: 'Score',
      type: 'score',
      align: 'center'
    },
    {
      key: 'aiComment',
      title: 'AI Comment',
      align: 'start',
      textColor: 'text-gray-600'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">CALL-001</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <GlobalTable
          data={callData}
          columns={columns}
          showActions={false}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default AgentCallDetails;