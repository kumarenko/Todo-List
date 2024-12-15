import React from 'react';
import { t } from 'i18next';
import { Helmet } from 'react-helmet';
import Footer from "../../../common/footer";

const TermsOfUse = () => {
    return (
        <div className={`content d-flex flex-column align-items-center mx-auto my-0`}>
            <Helmet>
                <title>{t('Terms of use')}</title>
                <meta name="description" content={t('introduction')} />
                <meta property="og:title" content={t('Terms of use')} />
                <meta property="og:description" content={t('introduction')} />
                <meta name="twitter:title" content={t('Terms of use')} />
                <meta name="twitter:description" content={t('introduction')} />
            </Helmet>

            <div className={`d-flex justify-content-between h3 w-100 align-items-center justify-content-between flex-column flex-sm-row pt-5 pt-sm-3 px-3 mb-0`}>
                <h1 className='title pt-2'>{t('Terms of use')}</h1>
            </div>
            <div className={`w-100 p-3`}>
                <ol className='subtitle'>
                    <li className='mt-2'>
                        <h3>{t('introductionHeader')}</h3>
                        {t('introduction')}
                    </li>
                    <li className='mt-2'>
                        <h3>{t('useOfServiceHeader')}</h3>
                        {t('useOfService')}
                    </li>
                    <li className='mt-2'>
                        <h3>{t('registrationAndAccountHeader')}</h3>
                        {t('registrationAndAccount')}
                    </li>
                    <li className='mt-2'>
                        <h3>{t('privacyAndDataProtectionHeader')}</h3>
                        {t('privacyAndDataProtection')}
                    </li>
                    <li className='mt-2'>
                        <h3>{t('limitationOfLiabilityHeader')}</h3>
                        {t('limitationOfLiability')}
                    </li>
                    <li className='mt-2'>
                        <h3>{t('changesToTermsHeader')}</h3>
                        {t('changesToTerms')}
                    </li>
                    <li className='mt-2'>
                        <h3>{t('contactHeader')}</h3>
                        {t('contact')}
                        <a href="mailto:support@buyit.solutions">{t('contactEmail')}</a>.
                    </li>
                </ol>
            </div>
            <Footer/>
        </div>
    );
};

export default TermsOfUse;
