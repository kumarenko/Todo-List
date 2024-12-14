import React from 'react';
import { t } from 'i18next';
import { Helmet } from 'react-helmet';
import Footer from "../../../common/footer";

const FAQ = () => {
    return (
        <div className="content-container d-flex">
            <Helmet>
                <title>{t('faq.title')}</title>
                <meta name="description" content={t('faq.description')} />
                <meta property="og:title" content={t('faq.title')} />
                <meta property="og:description" content={t('faq.description')} />
                <meta name="twitter:title" content={t('faq.title')} />
                <meta name="twitter:description" content={t('faq.description')} />
            </Helmet>


            {/* Основной контент с прокруткой */}
            <div className="faq-content w-100 p-3">
                <h1 className="title pt-2">{t('faq.title')}</h1>
                <ol>
                    <li className="mt-2" id="general-questions">
                        <h3>{t('faq.general_questions')}</h3>
                        <ul>
                            <li>
                                <h4>{t('faq.what_is_app')}</h4>
                                <p>{t('faq.what_is_app_answer')}</p>
                            </li>
                            <li>
                                <h4>{t('faq.registration_required')}</h4>
                                <p>{t('faq.registration_required_answer')}</p>
                            </li>
                            <li>
                                <h4>{t('faq.registration_benefits')}</h4>
                                <p>{t('faq.registration_benefits_answer')}</p>
                            </li>
                        </ul>
                    </li>
                    <li className="mt-2" id="guest-mode">
                        <h3>{t('faq.guest_mode')}</h3>
                        <ul>
                            <li>
                                <h4>{t('faq.guest_mode_description')}</h4>
                                <p>{t('faq.guest_mode_description_answer')}</p>
                            </li>
                            <li>
                                <h4>{t('faq.continue_in_guest_mode')}</h4>
                                <p>{t('faq.continue_in_guest_mode_answer')}</p>
                            </li>
                        </ul>
                    </li>
                    <li className="mt-2" id="app-functionality">
                        <h3>{t('faq.app_functionality')}</h3>
                        <ul>
                            <li>
                                <h4>{t('faq.create_new_list')}</h4>
                                <p>{t('faq.create_new_list_answer')}</p>
                            </li>
                            <li>
                                <h4>{t('faq.share_list_in_guest_mode')}</h4>
                                <p>{t('faq.share_list_in_guest_mode_answer')}</p>
                            </li>
                            <li>
                                <h4>{t('faq.offline_functionality')}</h4>
                                <p>{t('faq.offline_functionality_answer')}</p>
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>

            <Footer />
        </div>
    );
};

export default FAQ;
