import { useDispatch } from 'react-redux'
import { addQuestionAction } from './action';
import React, { useState, useEffect } from 'react'
import "../../components/Question_Form/Question_Form.css"
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import Select from '@material-ui/core/Select';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ShortTextIcon from '@material-ui/icons/ShortText';
import SubjectIcon from '@material-ui/icons/Subject';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { BsQuestionSquare, BsTrash, BsFileText } from "react-icons/bs";
import { IconButton, MenuItem, Typography } from '@material-ui/core';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";
import { useParams } from "react-router";
import { Link } from 'react-router-dom'
import uuid from "react-uuid";

function AddForm() {
    const [formId, setFormId] = useState('');
    const dispatch = useDispatch()
    const [documentName, setDocName] = useState("untitled Document");
    const [questions, setQuestions] = useState([]);
    const [errorMessage,setErrorMessage] = useState([])
    const { id } = useParams();

    useEffect(() => {
        const newQuestion = { questionText: "Question", answer: false, answerKey: "", questionType: "radio", options: [{ optionText: "Option 1" }], open: true, required: false }

        setQuestions([...questions, newQuestion])
        if (!id) {
            setFormId(uuid());
        }
    }, [])

    // useEffect(() => {
    //     async function data_adding() {
    //         var request = await axios.get(`http://localhost:9000/data/${id}`);
    //         var question_data = request.data.questions;
    //         console.log(question_data)
    //         var doc_name = request.data.document_name
    //         setDocName(doc_name)
    //         setQuestions(question_data)
    //         dispatch({
    //             type: actionTypes.SET_DOC_NAME,
    //             doc_name: doc_name

    //         })
    //         dispatch({
    //             type: actionTypes.SET_QUESTIONS,
    //             questions: question_data

    //         })
    //     }

    //     data_adding()
    // }, [])

    function changeQuestion(text, i) {
        const newQuestion = [...questions];
        newQuestion[i].questionText = text;
        setQuestions(newQuestion);
        console.log(newQuestion)
    }

    function addQuestionType(i, type) {
        const qs = [...questions];
        console.log(type);
        qs[i].questionType = type;
        setQuestions(qs);
    }

    function changeOptionValue(text, i, j) {
        const optionQuestions = [...questions];
        optionQuestions[i].options[j].optionText = text;

        setQuestions(optionQuestions);
    }

    function removeOption(i, j) {
        const RemoveOptionQuestion = [...questions];
        if (RemoveOptionQuestion[i].options.length > 1) {
            RemoveOptionQuestion[i].options.splice(j, 1);
            setQuestions(RemoveOptionQuestion);
            console.log(i + "__" + j);
        }
    }

    function addOption(i) {
        const optionsOfQuestion = [...questions];
        if (optionsOfQuestion[i].options.length < 5) {
            optionsOfQuestion[i].options.push({ optionText: "Option " + (optionsOfQuestion[i].options.length + 1) })
        } else {
            alert("Max  5 options ");
        }
        setQuestions(optionsOfQuestion)
    }

    function addMoreQuestionField() {
        setQuestions([...questions, { questionText: "Question", questionType: "radio", options: [{ optionText: "Option 1" }], open: true, required: false }])
    }

    function deleteQuestion(i) {
        let qs = [...questions];
        if (questions.length > 1) {
            qs.splice(i, 1);
        }
        setQuestions(qs)
    }


    function dispatchAddQuestion() {
        const payload = {
            id: formId,
            "document_name": documentName,
            "questions": questions
        }
        var error = [];
        if(!payload.document_name){

               error = ['Document name is required' ]   
        }
        payload.questions.forEach((ques)=> {
            if(!ques.questionText || !ques.questionType || !ques.options){
              error = [...error,'One or more elements are empty. Please enter value']
            }
            ques.options.forEach((options) => {
                if(!options.optionText){
                    if(!error.includes('Enter option text'))
                   error = [...error,'Enter option text']
                }
            })
        })
        setErrorMessage(error)
        if(error.length === 0){
            
           
            dispatch(addQuestionAction(payload))
            
        }
        
        // axios.post(`http://localhost:9000/add_questions/${id}`, {
        //     "document_name": documentName,
        //     "questions": questions,
        // })
    }

    function questionsUI() {
        return questions.map((ques, i) => (
            <div>
                <Accordion
                // expanded={ques.open} className={ques[i].open ? 'add-border' : ""}
                >

                    <AccordionSummary
                        aria-controls="panelia-content"
                        id="panelia-header"
                        elevation={1} style={{ width: '100%' }}
                    >
                        {questions[i].open ? (
                            <div className="saved_questions">
                                <Typography style={{ fontSize: "15px", fontWeight: "400", letterSpacing: '.1px', lineHeight: '24px', paddingBottom: '8px' }}>
                                    {i + 1}. {questions[i].questionText}
                                </Typography>
                                {ques.options.map((op, j) => (
                                    <div key={j} >
                                        <div style={{ display: 'flex', }}>
                                            <FormControlLabel style={{ marginLeft: "5px", marginBottom: "5px" }} disabled control={<input type={ques.questionType} color="primary" style={{ marginRight: '3px', }} required={ques.type} />} label={
                                                <Typography style={{
                                                    fontFamily: ' Roboto,Arial,sans-serif',
                                                    fontSize: ' 13px',
                                                    fontWeight: '400',
                                                    letterSpacing: '.2px',
                                                    lineHeight: '20px',
                                                    color: '#202124'
                                                }}>
                                                    {ques.options[j].optionText}
                                                </Typography>
                                            } />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : ""}
                    </AccordionSummary>
                    <div className="question_boxes">
                        <AccordionDetails className="add_questions" style={{ display: "flex", 'flex-direction': 'column' }}>
                            <div className="add_question_top">
                                <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(e) => { changeQuestion(e.target.value, i) }} ></input>
                                <CropOriginalIcon style={{ color: "#5f6368" }} />

                                <Select className="select" style={{ color: "#5f6368", fontSize: "13px" }} >
                                    <MenuItem id="text" value="Text" onClick={() => { addQuestionType(i, "text") }}> <SubjectIcon style={{ marginRight: "10px" }} /> Text</MenuItem>
                                    <MenuItem id="checkbox" value="Checkbox" onClick={() => { addQuestionType(i, "checkbox") }}> <CheckBoxIcon style={{ marginRight: "10px", color: "#70757a" }} checked /> Checkbox</MenuItem>
                                    <MenuItem id="radio" value="Radio" onClick={() => { addQuestionType(i, "radio") }}> <Radio style={{ marginRight: "10px", color: "#70757a" }} checked />Multiple Choice </MenuItem>
                                </Select>
                            </div>
                            {ques.options.map((op, j) => (
                                <div className="add_question_body" key={j}>
                                    {/* <Checkbox  color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} disabled/> */}
                                    {
                                        (ques.questionType != "text") ?
                                            <input type={ques.questionType} style={{ marginRight: "10px" }} /> :
                                            <ShortTextIcon style={{ marginRight: "10px" }} />

                                    }
                                    <div >
                                        <input type="text" className="text_input" placeholder="option" value={ques.options[j].optionText} onChange={(e) => { changeOptionValue(e.target.value, i, j) }}></input>
                                    </div>

                                    <CropOriginalIcon style={{ color: "#5f6368" }} />

                                    <IconButton aria-label="delete" >
                                        <CloseIcon onClick={() => { removeOption(i, j) }} />
                                    </IconButton>
                                </div>
                            ))}
                            {ques.options.length < 5 ? (
                                <div className="add_question_body">
                                    <FormControlLabel disabled control={

                                        (ques.questionType != "text") ?
                                            <input type={ques.questionType} color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} style={{ marginLeft: "10px", marginRight: "10px" }} disabled /> :
                                            <ShortTextIcon style={{ marginRight: "10px" }} />

                                    } label={
                                        <div>
                                            <input type="text" className="text_input" style={{ fontSize: "13px", width: "60px" }} placeholder="Add other"></input>
                                            <Button size="small" onClick={() => { addOption(i) }} style={{ textTransform: 'none', color: "#4285f4", fontSize: "13px", fontWeight: "600" }}>Add Option</Button>
                                        </div>
                                    } />
                                </div>

                            ) : ""}
                        </AccordionDetails>
                        <div className="question_edit">
                            <AddCircleOutlineIcon onClick={addMoreQuestionField} className="edit" />
                            <IconButton aria-label="delete" onClick={() => { deleteQuestion(i) }}>
                                <BsTrash />
                            </IconButton>
                        </div>
                    </div>
                </Accordion>
            </div>
        )
        )
    }

    return (
        <div>
            <div className="question_form">
                <br></br>
                <div className="section">
                    <div className="question_title_section">
                        <div className="question_form_top">
                        {errorMessage.map((error)=><h5 style={{ color: "red" }}> {error}</h5>)}
                            <input type="text" className="question_form_top_name" style={{ color: "black" }} placeholder={documentName} value={documentName} onChange={(e) => { setDocName(e.target.value) }}></input>
                        </div>
                    </div>
                    {questionsUI()}
                    <div className="save_form">
                        <Button variant="contained" color="primary" onClick={dispatchAddQuestion} style={{ fontSize: "14px" }}>Save</Button>
                    </div>
                    <div className="save_form">
                        <Link to="/getallforms">
                            <Button variant="contained" color="primary" style={{ fontSize: "14px" }}>View All Forms</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddForm;