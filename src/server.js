const app = require("./app");
const http = require("http");

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);

const io = require("socket.io").listen(server);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

server.on("listening", () => {
    console.log(
        `server is listening for requests on port ${server.address().port}`
    );
});

io.on("connection", function(socket) {
    console.log("a user is connected");

    // disconnect
    socket.on("disconnect", function() {
        console.log("a user disconnected");
    });

    // checked item
    socket.on("new item", function(item) {
        console.log("item: " + item);
    });

    // add item
    socket.on("add item", function(data) {
        io.sockets.emit("new item", { item: data });
    });

    // delete item
    socket.on("delete item", function() {
        io.sockets.emit("deleted item", { msg: "list updated, pls refresh" });
    });

    // marked as purchased
    socket.on("purchased item", function() {
        io.sockets.emit("marked item", {
            msg: "Changes have been made. Please refresh."
        });
    });
});
