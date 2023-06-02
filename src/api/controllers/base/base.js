module.exports = (class BaseController {
    constructor(wrap) {
        this.res_wrap = wrap;
    }

    render = (path, title) => (req, res) => {
        res.render(path, {
            page: {
                title
            },
            query: req.query
        });
    };

    logout = (req, res) => {
        res.clearCookie('fi_user')

        return res.redirect('/login')
    }

    wrap = (service_method) => (req, res) => {
        this.res_wrap(async (response) => {
            return await service_method(response, req.body)
        }, res)
    }

    wrap_with_store = (service_method) => (req, res) => {
        this.res_wrap(async (response) => {
            return await service_method(response, req.body, req.store || {})
        }, res)
    }

    wrap_with_request = (service_method) => (req, res) => {
        this.res_wrap(async (response) => {
            return await service_method(response, req.body, req || {})
        }, res)
    }
});