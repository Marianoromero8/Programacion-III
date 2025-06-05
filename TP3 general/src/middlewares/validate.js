const validate = (schema, campo = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[campo]);
        if (error) {
            return res.status(400).json({
                success: false,
                error: error.details[0].message
            });
        }
        next();
    };
};

module.exports = validate;