import { ADD_QUESTION, ADD_QUESTION_SUCCESS, ADD_QUESTION_FAILED } from './action'


const initialState = {
    isFetching: false,
    response: {
        questions: [{ questionText: "Question", questionType: "radio", options: [{ optionText: "Option 1" }], open: true, required: false }],
        questionType: "radio",
        doc_name: "Untitled form"
    }
}

const addFormReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_QUESTION:
            return {
                ...state, isFetching: true
            };
        case ADD_QUESTION_SUCCESS:
            return {
                ...state, response: action.results, isFetching: false
            };
        case ADD_QUESTION_FAILED:
            return {
                ...state, isFetching: false
            };
        default:
            return state;
    }
}

export default addFormReducer;