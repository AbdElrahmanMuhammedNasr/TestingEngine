const {createGetRequest} = require("./GetRequest");

async function createRequestManager(currentStage){
    const {method} = currentStage
    if(method.trim().toLowerCase() === 'get'){
        return await createGetRequest(currentStage)
    }
}

module.exports = {
    createRequestManager
};