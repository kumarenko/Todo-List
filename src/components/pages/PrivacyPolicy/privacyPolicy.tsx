import React from 'react';
import { t } from "i18next";
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
    return (
        <div className='content d-flex flex-column align-items-center mx-auto my-0'>
            <Helmet>
                <title>{t('Privacy Policy')}</title>
                <meta name="description" content={t('privacy_policy.introduction_text')} />
                <meta property="og:title" content={t('Privacy Policy')} />
                <meta property="og:description" content={t('privacy_policy.introduction_text')} />
                <meta name="twitter:title" content={t('Privacy Policy')} />
                <meta name="twitter:description" content={t('privacy_policy.introduction_text')} />
            </Helmet>

            <div className={`d-flex justify-content-between h3 w-100 align-items-center justify-content-between flex-column flex-sm-row pt-5 pt-sm-3 px-3 mb-0`}>
                <h1 className='title pt-2'>{t('Privacy Policy')}</h1>
            </div>
            <div className="w-100 p-3">
                <ol className='subtitle'>
                    <li className='mt-2'>
                        <h2>{t('privacy_policy.introduction')}</h2>
                        {t('privacy_policy.introduction_text')}
                    </li>
                    <li className='mt-2'>
                        <h3>{t('privacy_policy.data_we_collect')}</h3>
                        <ul>
                            <li>{t('privacy_policy.personal_data')}</li>
                            <li>{t('privacy_policy.usage_data')}</li>
                        </ul>
                    </li>
                    <li className='mt-2'>
                        <h3>{t('privacy_policy.how_we_use_data')}</h3>
                        {t('privacy_policy.how_we_use_data_text')}
                        <ul>
                            <li>{t('privacy_policy.provide_and_support_service')}</li>
                            <li>{t('privacy_policy.improve_service_quality')}</li>
                            <li>{t('privacy_policy.analysis_and_statistics')}</li>
                        </ul>
                    </li>
                    <li className='mt-2'>
                        <h3>{t('privacy_policy.third_party_services')}</h3>
                        {t('privacy_policy.third_party_services_text')}
                    </li>
                    <li className='mt-2'>
                        <h3>{t('privacy_policy.data_protection')}</h3>
                        {t('privacy_policy.data_protection_text')}
                    </li>
                    <li className='mt-2'>
                        <h3>{t('privacy_policy.your_rights')}</h3>
                        {t('privacy_policy.your_rights_text')}
                    </li>
                    <li className='mt-2'>
                        <h3>{t('privacy_policy.future_plans')}</h3>
                        {t('privacy_policy.future_plans_text')}
                    </li>
                    <li className='mt-2'>
                        <h3>{t('privacy_policy.privacy_policy_changes')}</h3>
                        {t('privacy_policy.privacy_policy_changes_text')}
                    </li>
                    <li className='mt-2'>
                        <h3>{t('privacy_policy.contacts')}</h3>
                        {t('privacy_policy.contacts_text')} <a href="mailto:support@buyit.solutions">{t('privacy_policy.contact_email')}</a>
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
