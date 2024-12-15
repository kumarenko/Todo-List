import React, {useEffect, useState} from 'react';
import {t} from "i18next";
import {Helmet} from "react-helmet";
import Footer from "../../../common/footer";
import {Button, Form, InputGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {validateEmail} from "../../../helpers/validator";
import {sendFeedbackRequest} from "../../../actions/login";
import Spinner from "../../../common/spinner";

const allSubjects = ['suggestion', 'problem', 'other'];
const Feedback = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState(allSubjects[0]);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState({});
    const user = useSelector(state => state.user.user);
    const globalMessages = useSelector(state => state.settings.messagesQueue);
    useEffect(() => {
        if(user.role === 'USER') {
            setEmail(user.email);
        }
    }, [user]);

    useEffect(() => {
        setLoading(false);
    }, [globalMessages]);
    const dispatch = useDispatch();
    const sendFeedback = () => {
        setErrors({
            email: validateEmail(email),
            message: message.length < 10 ? t('Message is too short') : ''
        })
        if (!validateEmail(email).length && message.length >= 10) {
            setLoading(true);
            dispatch(sendFeedbackRequest(email, subject, message));
        }

    }
    return (
        <div className='content d-flex flex-column align-items-center mx-auto my-0'>
            <Helmet>
                <title>{t('Contacts & Feedback')}</title>
                <meta name="description" content={t('We value your feedback! Use this form to share your thoughts, report issues, or suggest improvements.')} />
                <meta property="og:title" content={t('Share Your Thoughts and Help Us Improve!')} />
                <meta property="og:description" content={t('We value your feedback! Use this form to share your thoughts, report issues, or suggest improvements.')} />
                <meta name="twitter:title" content={t('Share Your Thoughts and Help Us Improve!')} />
                <meta name="twitter:description" content={t('We value your feedback! Use this form to share your thoughts, report issues, or suggest improvements.')} />
            </Helmet>
            <Form className="faq-content w-100 p-3 d-flex flex-column pt-5">
                {loading ? <Spinner/> : null}
                <h1 className="title pt-2">{t('Share Your Thoughts and Help Us Improve!')}</h1>
                <InputGroup className='my-3 w-75 d-flex flex-nowrap'>
                    <Form.Label column sm="2" className='subtitle mx-2 w-25'>
                        {t('Email')}
                    </Form.Label>
                    <div className='w-75 position-relative'>
                        <Form.Control
                            type="text"
                            className=''
                            isInvalid={errors.email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors({
                                    ...errors,
                                    email: ''
                                });
                            }}
                            maxLength={100}
                            value={email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors?.email}
                        </Form.Control.Feedback>
                    </div>

                </InputGroup>
                <InputGroup className='my-3 w-75'>
                    <Form.Label column sm="2" className='subtitle mx-2 w-25'>
                        {t('Subject')}
                    </Form.Label>
                    <Form.Select
                        aria-label="subject"
                        onChange={(e) => {
                            setSubject(e.target.value);
                        }}
                        value={subject}
                    >
                        {allSubjects.map((subj) => (
                            <option key={subj} value={subj}>
                                {t(subj)}
                            </option>
                        ))}
                    </Form.Select>
                </InputGroup>

                <InputGroup className='my-3 w-75 d-flex flex-nowrap'>
                    <Form.Label column sm="2" className='subtitle mx-2 w-25'>
                        {t('Message')}
                    </Form.Label>
                    <div className='w-75 position-relative pb-4'>
                        <Form.Control
                            as="textarea"
                            className='input-with-length-numbers'
                            onChange={(e) => {
                                setMessage(e.target.value);
                                setErrors({...errors, message: ''});
                            }}
                            value={message}
                            isInvalid={errors.message}
                            maxLength={500}
                        />
                        <span className='label-with-length-numbers position-absolute top-75 end-0 subtitle'>{message.length} / 500</span>

                        <Form.Control.Feedback type="invalid">
                            {errors?.message}
                        </Form.Control.Feedback>
                    </div>
                </InputGroup>
                <div className='text-center'>
                    <Button onClick={sendFeedback}>Send feedback</Button>
                </div>
            </Form>
            <Footer />
        </div>
    );
};

export default Feedback;