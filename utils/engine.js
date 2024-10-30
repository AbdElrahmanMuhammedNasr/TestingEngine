const {createRequestManager} = require("./requests/RequestManager");

async function startTest(input) {
    const metaData = {
        initialState: 1
    };

    console.log(input);
    console.log('------------- startTest ---------------- ')
    for (const element of input) {
        let currentStage = input.find(i => i.order === metaData.initialState)
        let nextStage = input.find(i => i.order === metaData.initialState+1)
        let requirementNextStage = nextStage ? nextStage.requirement : null;
        let nextMetaDataInput;
        nextMetaDataInput = await createRequestManager(currentStage,requirementNextStage);
        if (currentStage.isEnd === true) {
            return;
        }else {
            metaData.initialState = metaData.initialState + 1
            let nextStage = input.find(i => i.order === metaData.initialState)
            if (!nextStage.currentInput) {
                nextStage.currentInput = {};
            }
            Object.assign(nextStage.currentInput, nextMetaDataInput);
        }

    }

}

module.exports = {
    startTest,
};