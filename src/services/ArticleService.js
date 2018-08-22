import Server from "../server/Server";

class ArticleService extends Server {
    constructor(path = "/articles") {
        super(path);
    }

    getArticleData(id) {
        const path = `/${id}`;

        return this.send({ path });
    }

    deleteArticle(id) {
        const path = `/${id}`;

        const options = {
            method: 'DELETE',
        };
        
        return this.send({ path, options });
    }

    getArticlesData(tag, page) {
        const path = `?limit=10&offset=${page*10}${tag}`;

        return this.send({ path });
    }

    setFavorite(slug, method) {
        const path = `/${slug}/favorite`;
        const options = {
            method
        };
        
        return this.send({ path, options });
    }

    getProfileArticleData(user, page) {
        const path = `?author=${user}&limit=10&offset=${page*10}`;

        return this.send({ path });
    }

    getProfileFavoritesArticleData(user) {
        const path = `?favorited=${user}&limit=10&offset=0`;

        return this.send({ path });
    }

    publishArticle(fields) {
        const path = '';
        const body = {
            article: {
                'body': fields.articleBody,
                'description': fields.articleDesc,
                'tagList': [fields.articleTags],
                'title': fields.articleTitle,
            }
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(body)
        };

        return this.send({ path, options });
    }
}

export default new ArticleService();
