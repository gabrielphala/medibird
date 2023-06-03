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

    admin_sign_out = (req, res) => {
        res.clearCookie('med_admin')

        return res.redirect('/a/sign-in')
    }

    sign_out = (req, res) => {
        res.clearCookie('med_user')
        res.clearCookie('med_admin')

        return res.redirect('/sign-in')
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