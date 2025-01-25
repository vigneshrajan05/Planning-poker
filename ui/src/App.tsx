import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const App = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [task, setTask] = useState<string | null>(null);
  const [votesRevealed, setVotesRevealed] = useState(false);
  const [participants, setParticipants] = useState<any[]>([]);
  const [vote, setVote] = useState<number | null>(null);

  const createRoom = () => {
    socket.emit('createRoom', ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
    });
  };

  const joinRoom = () => {
    const room = prompt('Enter Room ID:');
    if (room) {
      socket.emit('joinRoom', { roomId: room, name }, (response: any) => {
        if (response.success) {
          setRoomId(room);
        } else {
          alert(response.error);
        }
      });
    }
  };

  useEffect(() => {
    socket.on('updateRoom', (room) => {
      setTask(room.task);
      setVotesRevealed(room.votesRevealed);
      setParticipants(Object.values(room.participants));
    });

    return () => {
      socket.off('updateRoom');
    };
  }, []);

  const submitVote = (value: number) => {
    if (roomId) {
      setVote(value);
      socket.emit('vote', { roomId, vote: value });
    }
  };

  const revealVotes = () => {
    if (roomId) {
      socket.emit('revealVotes', roomId);
    }
  };

  return (
    <div>
      <h1>Planning Poker</h1>
      {!roomId ? (
        <div>
          <button onClick={createRoom}>Create Room</button>
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <div>
          <h2>Room ID: {roomId}</h2>
          <h3>Task: {task || 'No task assigned yet'}</h3>
          <h4>Participants:</h4>
          <ul>
            {participants.map((p, index) => (
              <li key={index}>{p.name || `Participant ${index + 1}`} - Vote: {votesRevealed ? p.vote : '?'}</li>
            ))}
          </ul>
          <div>
            {votesRevealed ? (
              <button onClick={() => setVote(null)}>Reset Votes</button>
            ) : (
              [1, 2, 3, 5, 8, 13].map((num) => (
                <button key={num} onClick={() => submitVote(num)}>{num}</button>
              ))
            )}
          </div>
          {participants.some((p) => p.role === 'moderator') && (
            <button onClick={revealVotes}>Reveal Votes</button>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
