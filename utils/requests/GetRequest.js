const axios = require('axios');

async function createGetRequest(currentStage, requirementNextStage) {
    let {url, currentInput = null} = currentStage;
    if (currentInput !== null) {
        const {loopedValues = null} = currentInput;
        if (loopedValues !== null) {
            for (const value of loopedValues) {
                const response = await axios({
                    method: 'get',
                    url: url.replaceAll("{id}", value),
                    headers: createRequestAuthorizationHeaders(currentInput)
                });
                console.log("start ---------" + url + "-----------")
                console.log(response.data)
                console.log("end ---------" + url + "-----------")
            }
            return;
        }
    }
    const response = await axios({method: 'get', url: url, headers: createRequestAuthorizationHeaders(currentInput)});
    console.log("start ---------" + url + "-----------")
    console.log(response.data)
    console.log("end ---------" + url + "-----------")
    return generateNextMetaDataInput(currentInput, response, requirementNextStage);

}


function generateNextMetaDataInput(currentInput, response, requirementNextStage) {
    let next = {}
    for (const requirement of requirementNextStage) {
        const {type, value, getFromPrevious} = requirement;
        let loopIterations;
        if (getFromPrevious === true && type === "token") {
            const {token = null} = currentInput
            next.token = token
        }
        if (getFromPrevious === false && type === "isRequestLoop") {
            next.isRequestLoop = value
        }
        if (getFromPrevious === false && type === "loopTime") {
            if (value === true) {
                loopIterations = value === 'ALL' ? response.data.length : value;
            } else {
                loopIterations = 1;
            }
            next.loopTime = loopIterations;
        }
        if (getFromPrevious === false && type === "loopedName") {
            next.loopedValues = response.data.map(d => d[value]).slice(0, loopIterations);
        }
    }

    // const  {isRequestLoop, loopTime , loopedName  } = nextMetaDataInput;
    // let loopIterations;
    // if(isRequestLoop === true){
    //     loopIterations = loopTime ==='ALL' ? response.data.length : loopTime;
    // }else {
    //      loopIterations = 1;
    // }
    // let data = response.data.map(d => d[loopedName]).slice(0, loopIterations);
    //
    // const next= {
    //         "isRequestLoop": isRequestLoop,
    //         "loopTime": loopIterations,
    //         "loopedName": loopedName,
    //         "loopedValues": data
    //
    // }
    return next;

}

function createRequestAuthorizationHeaders(currentInput) {
    const {token = null} = currentInput
    if (token != null) {
        const headers = {
            Authorization: `Bearer ${token}`,
            'x-api-key': '638142a5-3c49-4408-b925-843049c52ee4',
            'Content-Type': 'application/json', // Add any other headers if needed
        };

        return headers
    }


}

module.exports = {
    createGetRequest,
};

