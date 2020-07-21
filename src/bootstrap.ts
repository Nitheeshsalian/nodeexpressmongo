const bcrypt = require("bcrypt");
import Users from "./models/users";

export class Bootstrap {

    public static async initialize() {
        await Bootstrap.createUser();
    }

    private static async createUser() {

        console.log("Creating/Updating a user");

        await Users.findOneAndUpdate({ username: "nitheesh" }, {
            username: "nitheesh",
            password: await bcrypt.hash("password", 10),
        }, { upsert: true, new: true });

        console.log("Finished creating/updating a user");

    }
}