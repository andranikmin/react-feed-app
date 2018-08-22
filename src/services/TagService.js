import Server from "../server/Server";

class TagService extends Server {
    constructor(path = "/tags") {
        super(path);
    }

    getTagsData() {
        const path = '';
        return this.send({ path });
    }
}

export default new TagService();
