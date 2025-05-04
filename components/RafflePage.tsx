'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

const raffleItems = [
  { id: 1, name: 'Audubon Family Membership', description: '1 Year Family Membership to Audubon Zoo, Aquarium, and Insectarium.', image: '/zoo.jpg' },
  { id: 2, name: '2 Hour Tattoo Session', description: 'Tattoo consult and 2-hour session at Catahoula Tattoo in MidCity.', image: '/tattoo.jpg' },
  { id: 3, name: 'Professional Photo Session', description: '1 hour golden hour photo session in City Park.', image: '/camera.jpg' },
];

const raffleEnd = new Date('2025-05-17T23:59:59');

export default function RafflePage() {
  const [totalTickets, setTotalTickets] = useState(0);
  const [ticketAllocation, setTicketAllocation] = useState({});
  const [deliveryOptIn, setDeliveryOptIn] = useState(false);
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [raffleClosed, setRaffleClosed] = useState(false);
  const [winnerTicket, setWinnerTicket] = useState<number | null>(null);
  const [showWinnerImage, setShowWinnerImage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = raffleEnd.getTime() - now.getTime();
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

  const handleAllocationChange = (itemId, value) => {
    setTicketAllocation({ ...ticketAllocation, [itemId]: parseInt(value) || 0 });
  };

  const handleSubmit = () => {
    const payload = {
      email,
      totalTickets,
      ticketAllocation,
      deliveryOptIn,
    };
    console.log('Submitting raffle entry:', payload);
  };

  const revealWinner = () => {
    // Selecting a winner from allocated tickets
    const allocatedTickets = Object.entries(ticketAllocation)
      .flatMap(([itemId, ticketCount]) => Array(ticketCount).fill(itemId));

    if (allocatedTickets.length > 0) {
      const winnerItem = allocatedTickets[Math.floor(Math.random() * allocatedTickets.length)];
      setWinnerTicket(parseInt(winnerItem));
      setShowWinnerImage(true);
    } else {
      alert("No tickets allocated to determine a winner.");
    }
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
        onChange={(e) => setTotalTickets(parseInt(e.target.value) || 0)}
        className="mb-6"
        disabled={raffleClosed}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {raffleItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-2 rounded" />
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
          <Checkbox checked={deliveryOptIn} onChange={(e) => setDeliveryOptIn(e.target.checked)} disabled={raffleClosed} />
          <span>Donate for delivery if I win. Items will be delivered to winners.</span>
        </label>
      </div>

      <Button onClick={handleSubmit} disabled={raffleClosed}>Submit and Pay</Button>

      {/* Button to reveal the winner */}
      <Button onClick={revealWinner} disabled={raffleClosed || winnerTicket !== null} className="mt-6">
        Reveal Winner
      </Button>

      {/* Display Winner's Ticket Number and Image */}
      {showWinnerImage && winnerTicket !== null && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold text-green-600">Winning Item ID: {winnerTicket}</h2>
          <img src="/faedodoticket.png" alt="Winning Ticket" className="mx-auto mt-4" />
        </div>
      )}
    </div>
  );
}
