const users = [];


const addUser = ({ id, name, room }) => {

    name = name.trim().toLowerCase();
    email = email.trim().toLowerCase();

    const existingUser = user.find((user) => user.room === room && user.name === name);

    if (existingUser) {
        return { error: 'Username is taken' };
    } else {
        const user = { id, name, room };
        users.push(user);
        return { user };
    }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.slice(index, 1)[0];
    }

}

const getUser = (id) => users.find((user) => user.id === id);

const getUserInRoom = (room) => users.filter((user) => user.room = room);

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
};