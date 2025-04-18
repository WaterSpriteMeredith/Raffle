'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

// Mock data for participants (for now)
const participants = [
  { email: 'user1@example.com', tickets: 5, itemAllocation: { 1: 2, 2: 3 } },
  { email: 'user2@example.com', tickets: 3, itemAllocation: { 1: 1, 3: 2 } },
  // Add more participants as needed
];

const AdminPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDrawWinner = (itemId) => {
    const filteredParticipants = participants.filter(p => p.itemAllocation[itemId] > 0);
    const winner = filteredParticipants[Math.floor(Math.random() * filteredParticipants.length)];
    alert(`Winner: ${winner.email} for item ${itemId}`);
    // Here you can also trigger the email notification to the winner
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Raffle Entries</h2>
        <ul>
          {participants.map((participant, idx) => (
            <li key={idx} className="mb-4">
              <p>Email: {participant.email}</p>
              <p>Tickets: {participant.tickets}</p>
              <p>Item Allocation: {JSON.stringify(participant.itemAllocation)}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Draw Winners</h2>
        <div>
          {raffleItems.map((item) => (
            <Button key={item.id} onClick={() => handleDrawWinner(item.id)} className="mr-4">
              Draw Winner for {item.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
