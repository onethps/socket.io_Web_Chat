const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require('express')
const cors = require('cors')

const app = express()

const httpServer = createServer(app);

const io = new Server(httpServer, { cors: {
        origin: true
    } });

app.use(express.json())
app.use(cors());


app.get('/rooms/:id', (req, res) => {
    const {id:roomId} = req.params
    const obj = {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages')]
    }

    res.send(obj)
});


const rooms = new Map()

app.post('/', (req, res) => {
    const {roomId, userName} = req.body
    const { id } = req.params
    if (!rooms.has(roomId)) {
        rooms.set(
            roomId,
            new Map([
                ['users', new Map()],
                ['messages', []]
            ])
        )
    }

    res.send('OK')
})


io.on("connection", (socket) => {
    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id, userName)
        /// values -> get UserName instead of socket.id

        const users =  [...rooms.get(roomId).get('users').values()]
        socket.to(roomId).emit('ROOM:JOINED', users)
    })



    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users =  [...value.get('users').values()]
                socket.to(roomId).emit('ROOM:LEAVE', users)
            }
        })
    })

    console.log('user connected', socket.id)

});

httpServer.listen(3000);