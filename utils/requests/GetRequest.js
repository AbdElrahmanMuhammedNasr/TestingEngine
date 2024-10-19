const axios = require('axios');

async function createGetRequest(currentStage) {
    let {method, url,currentInput  = null } = currentStage;
    if(currentInput !== null ){
        const  {loopedValues} = currentInput;
            for(const value of loopedValues){
                const response = await axios({
                    method: 'get',
                    url: url.replaceAll("{id}" ,value),
                });
                console.log(response.data)
            }
            return null;
    }
    else {
        const response = await axios({method: method.toLowerCase(),url: url});
        return generateNextMetaDataInput(response , currentStage.nextMetaDataInput)
    }


}


function  generateNextMetaDataInput(response , nextMetaDataInput){
    const  {isRequestLoop, loopTime , loopedName  } = nextMetaDataInput;
    let loopIterations;
    if(isRequestLoop === true){
        loopIterations = loopTime ==='ALL' ? response.data.length : loopTime;
    }else {
         loopIterations = 1;
    }
    let data = response.data.map(d => d[loopedName]).slice(0, loopIterations);

    const next= {
            "isRequestLoop": isRequestLoop,
            "loopTime": loopIterations,
            "loopedName": loopedName,
            "loopedValues": data

    }
    return next;

}



module.exports = {
    createGetRequest,
};

