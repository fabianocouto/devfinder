module.exports = {
    async index(request, response){
        return response.json({
            version: '1.0.0',
        });
    }
}