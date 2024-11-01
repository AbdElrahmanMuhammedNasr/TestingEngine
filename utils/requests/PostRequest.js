const axios = require("axios");

async function createPostRequest(currentStage,requirementNextStage ) {
    const {url,requestBody} = currentStage
    const response = await axios({method: 'post',url: url , data:requestBody});
    console.log("start  ---------" + url + "-----------")
    console.log(response.data)
    console.log("end ---------" + url + "-----------")
    return generateNextMetaDataInput(response,requirementNextStage )
}


function  generateNextMetaDataInput(response , requirementNextStage = null){
    if(requirementNextStage == null){
        return {}
    }
    let next= {}
    for (const requirement of requirementNextStage) {
        const {type , value ,getFromPrevious} = requirement;
        if(getFromPrevious === true && type === "token"){
            next.token = response.data[value]
        }
    }
    return next;

}
module.exports = {
    createPostRequest,
};
