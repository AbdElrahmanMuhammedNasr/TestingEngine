const {createGetRequest} = require("./GetRequest");
const {createPostRequest} = require("./PostRequest");

async function createRequestManager(currentStage,requirementNextStage){
    const {method} = currentStage
    if(method.trim().toLowerCase() === 'get'){
        return await createGetRequest(currentStage,requirementNextStage)
    }
    if(method.trim().toLowerCase() === 'post'){
        return await createPostRequest(currentStage,requirementNextStage)
    }
}

module.exports = {
    createRequestManager
};