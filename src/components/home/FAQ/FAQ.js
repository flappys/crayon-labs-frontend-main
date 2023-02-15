
import React, { useEffect, useState } from "react";
import { FAQ_CONTENT, FOOTER } from "../../../utils/globals";
import './FAQ.css'
function FAQ() {
    const [id, setId] = useState(1)
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        filterQuestions(1)
    }, [])
    const onHandleClick = (tab) => {
        setId(tab.id)
        filterQuestions(tab.id)

    }
    const filterQuestions = (id) => {
        let questionsByID = FAQ_CONTENT.questions.filter((x) => x.tab_id === id)
        // console.log(questionsByID)
        setQuestions([...questionsByID])
    }

    const handleAccordion = (id,action) => {
        let index = questions.findIndex((x) => x.accordion_id === id)
        if(action==="down"){
            questions[index].accordion_trigger=false
            setQuestions([...questions])
        }
        else{
            questions.map((question) => {
                question.accordion_trigger = false
                return question;
            })
            questions[index].accordion_trigger=true 
        }
        setQuestions([...questions]);
    }
    return <div className="faq">
        <div className="priceTitle">
            {FAQ_CONTENT.title}
        </div>
        <div className="center">
            {/* <div className="tabFlex">
                {FAQ_CONTENT.tabs.map((tab) => <div onClick={() => onHandleClick(tab)} key={tab.id} className={tab.id === id ? "tabs active" : "tabs"}>
                    <p className="tabname">{tab.name}</p>
                </div>)}
            </div> */}

            <div className="questionFlex">
                <div className="faq-col1">
                    {questions.map((acc) =>
                        <div className="accordionBox" key={acc.accordion_id}>
                            <div className="accordiontitle">
                                <div className="accordionflex">
                                    <div className="accordioncol1">
                                        <div className="question">
                                        {acc.accordion_trigger ? <p className="question" onClick={() => handleAccordion(acc.accordion_id,"down")} >{acc.question} </p>
                                         : <p className="question" onClick={() => handleAccordion(acc.accordion_id,"up")}> {acc.question} </p>}
                                            {/* <p className="question">{acc.question} </p> */}
                                        </div>
                                        <div className="answer">
                                            {acc.accordion_trigger && <p className="answer">{acc.answer}</p>}
                                        </div>
                                    </div>
                                    <div className="accordioncol1">
                                        {acc.accordion_trigger ? <img alt="slide" onClick={() => handleAccordion(acc.accordion_id,"down")} className="Icon1" src={FAQ_CONTENT.accordionToggleUp}></img> : <img alt="slide" onClick={() => handleAccordion(acc.accordion_id,"up")} className="Icon1" src={FAQ_CONTENT.accordionToggleDown}></img>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="faq-col2">
                <img alt="faqImage" className="faqImage" src={FAQ_CONTENT.faqIcon} ></img>
                </div>
            </div>
        </div>
    </div>
}

export default FAQ

