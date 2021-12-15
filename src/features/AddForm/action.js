export const ADD_QUESTION = "ADD_QUESTION"
export const ADD_QUESTION_SUCCESS = "ADD_QUESTION_SUCCESS"
export const ADD_QUESTION_FAILED = "ADD_QUESTION_FAILED"


export const addQuestionAction = (params) => {
    return { type: ADD_QUESTION, params }
}


export const addQuestionSuccessAction = (results) => {
    return { type: ADD_QUESTION_SUCCESS, results }
}

export const addQuestionFailedAction = () => {
    return { type: ADD_QUESTION_FAILED }
}