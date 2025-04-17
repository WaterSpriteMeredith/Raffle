'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const raffleItems = [
  {
    id: 1,
    name: 'Audubon Family Membership',
    description: '1 Year Family Membership to Audubon Zoo, Aquarium, and Insectarium.',
    image: '/zoo.jpg',
  },
  {
    id: 2,
    name: '2 Hour Tattoo Session',
    description: 'Tattoo consult and 2-hour session at Catahoula Tattoo in MidCity.',
    image: '/tattoo.jpg',
  },
  {
    id: 3,
    name: 'Professional Photo Session',
    description: '1 hour golden hour photo session in City Park.',
    image: '/camera.jpg',
  },
];

const raffleEnd = new Date('2025-05-17T23:59:59');

export default function RafflePage() {
  const [totalTickets, setTotalTickets] = useState(0);
  const [ticketAllocation, setTicketAllocation] = useState({});
  const [deliveryOptIn, setDeliveryOptIn] = useState(false);
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [raffleClosed, setRaffleClosed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = raffleEnd - now;
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft('Raffle Closed');
        setRaffleClosed(true);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAllocationChange = (itemId: number, value: string) => {
    setTicketAllocation({
      ...ticketAllocation,
      [itemId]: parseInt(value) || 0,
    });
  };

  const handleSubmit = () => {
    const payload = {
      email,
      totalTickets,
      ticketAllocation,
      deliveryOptIn,
    };
    console.log('Submitting raffle entry:', payload);
    // Add Stripe/payment handling here
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Fae-Do-Do Raffle</h1>
      <p className="mb-6 text-lg font-medium text-red-600">Time left: {timeLeft}</p>

      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
        disabled={raffleClosed}
      />

      <Input
        type="number"
        placeholder="Number of tickets"
        value={totalTickets}
        onChange={(e) => setTotalTickets(parseInt(e.target.value))}
        className="mb-6"
        disabled={raffleClosed}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {raffleItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="mb-2">{item.description}</p>
              <Input
                type="number"
                placeholder="Tickets for this item"
                onChange={(e) => handleAllocationChange(item.id, e.target.value)}
                disabled={raffleClosed}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="my-6">
        <label className="flex items-center space-x-2">
          <Checkbox
            checked={deliveryOptIn}
            onCheckedChange={setDeliveryOptIn}
            disabled={raffleClosed}
          />
          <span>Donate for delivery if I win. We will deliver items won.</span>
        </label>
      </div>

      <Button onClick={handleSubmit} disabled={raffleClosed}>
        Submit and Pay
      </Button>
    </div>
  );
}
