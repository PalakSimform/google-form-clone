import { put, takeLatest } from 'redux-saga/effects';
import { PostRequest } from '../../utilities/network';
import { ADD_QUESTION } from './action';

function* addFormDetailsRequest(actions) {

    try {
        const {id} = actions.params;
        console.log('Printing saga request', actions)
        const response = yield PostRequest(id,actions.params)
        console.log('Saga response',response)
    }
    catch (error) {
        console.log(error)
    }
}


export function* watchAddFormDetailsRequest() {
    yield takeLatest(ADD_QUESTION, addFormDetailsRequest);
}

