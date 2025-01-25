import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

interface Participant {
    id: string;
    name?: string;
    role: 'moderator' | 'participant';
    vote: number | null;
}

interface Room {
    participants: Record<string, Participant>;
    votesRevealed: boolean;
    task: string | null;
}

const rooms: Record<string, Room> = {}; // In-memory storage for rooms

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('createRoom', (callback: (data: { roomId: string }) => void) => {
        const roomId = uuidv4();
        rooms[roomId] = { participants: {}, votesRevealed: false, task: null };
        socket.join(roomId);
        rooms[roomId].participants[socket.id] = { id: socket.id, role: 'moderator', vote: null };
        callback({ roomId });
    });

    socket.on('joinRoom', ({ roomId, name }: { roomId: string; name: string }, callback: (response: { success: boolean; error?: string }) => void) => {
        if (rooms[roomId]) {
            socket.join(roomId);
            rooms[roomId].participants[socket.id] = { id: socket.id, role: 'participant', vote: null, name };
            io.to(roomId).emit('updateRoom', rooms[roomId]);
            callback({ success: true });
        } else {
            callback({ success: false, error: 'Room not found' });
        }
    });

    socket.on('vote', ({ roomId, vote }: { roomId: string; vote: number }) => {
        if (rooms[roomId] && rooms[roomId].participants[socket.id]) {
            rooms[roomId].participants[socket.id].vote = vote;
            io.to(roomId).emit('updateRoom', rooms[roomId]);
        }
    });

    socket.on('revealVotes', (roomId: string) => {
        if (rooms[roomId]) {
            rooms[roomId].votesRevealed = true;
            io.to(roomId).emit('updateRoom', rooms[roomId]);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        for (const roomId in rooms) {
            if (rooms[roomId].participants[socket.id]) {
                delete rooms[roomId].participants[socket.id];
                if (Object.keys(rooms[roomId].participants).length === 0) {
                    delete rooms[roomId];
                } else {
                    io.to(roomId).emit('updateRoom', rooms[roomId]);
                }
            }
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});