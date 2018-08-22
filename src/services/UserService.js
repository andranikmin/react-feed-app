import Server from "../server/Server";

class UserService extends Server {
    constructor() {
        super();
    }

    checkLogin(email, password) {
        const path = '/users/login';
        const body = {
            user: {
                email,
                password
            }
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(body)
        };

        return this.send({ path, options });
    }

    register(username, email, password) {
        const path = '/users';
        const body = {
            user: {
                username,
                email,
                password
            }
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(body)
        };

        return this.send({ path, options });
    }

    getProfileData(user) {
        const path = `/profiles/${user}`;
       
        return this.send({ path });
    }

    getProfile() {
        const path = '/user';
       
        return this.send({ path });
    }
}

export default new UserService();
