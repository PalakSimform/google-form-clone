import { put, takeLatest } from 'redux-saga/effects';
import { PostRequest } from '../../utilities/network';
import { ADD_QUESTION } from './action';
import { ADD_URL } from '../../utilities/network/config'

function* addFormDetailsRequest(actions) {

    try {
        const {id} = actions.params;
        const url = `${ADD_URL}/${id}`
        console.log('Printing saga request', id,actions.params)
        const response = yield PostRequest(url,actions.params)
        console.log('Saga response',response)
    }
    catch (error) {
        console.log(error)
    }
}


export function* watchAddFormDetailsRequest() {
    yield takeLatest(ADD_QUESTION, addFormDetailsRequest);
}

