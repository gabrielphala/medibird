class QueryBuilder {
    constructor(model) {
        this._model = model;
        this._find = null;
    };

    _getAllDocs = (condition) => (this._model.find(condition));

    _getSingleDoc = (condition) => (this._model.findOne(condition));

    _populate = (populate) => {
        if (!populate)
            return;

        populate.forEach(field => {
            this._find.populate(field[0], field[1]);
        })
    };

    _execFind = (query) => {
        const { find, select, populate, limit, skip, sort } = query;

        this._find = find;

        this._find.select(select);
        this._find.sort(sort);

        this._populate(populate);

        if (limit)
            this._find.limit(limit);

        if (skip)
            this._find.skip(skip);

        return this._find.exec();
    };

    add = (data) => this._model.create(data);

    exists = (condition) => this._model.exists(condition).exec();

    count = (condition) => new Promise((resolve, reject) => {
        this._model.where(condition).countDocuments((err, count) => {
            if (err == null)
                resolve(count);
            else
                reject('Something went wrong, try again later');
        });
    });

    find = (query) => this._execFind({
        find: this._getAllDocs(query.condition),
        select: query.select || '',
        populate: query.populate || null,
        limit: query.limit || null,
        skip: query.skip || null,
        sort: query.sort || { createdAt: -1 }
    });

    findOne = (query) => this._execFind({
        find: this._getSingleDoc(query.condition),
        select: query.select || '',
        populate: query.populate || null,
        limit: query.limit || null,
        skip: query.skip || null,
        sort: query.sort || { createdAt: -1 }
    });

    findWithOr = ({ condition, populate, limit, skip, sort = { createdAt: -1 }, select }) => {
        let find = this._model.findOne().or(condition);
        find.select(select);
        find.sort(sort);

        if (limit)
            find.limit(limit);

        if (skip)
            find.skip(skip);

        if (populate)
            populate.forEach(field => {
                find.populate(field[0], field[1]);
            })

        return find.select(select)
            .exec()
    }

    updateOne = (condition, data) => new Promise((resolve, reject) => {
        const update = this._model.updateOne(condition, data);

        if (update.nModified != 0)
            resolve(update);

        else
            reject('Something went wrong, try again later')
    });
};

module.exports = QueryBuilder;