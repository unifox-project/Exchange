import http_config from './axios_config';

const HTTP = http_config.instance;

export default {
    login(formData) {
        return HTTP.post('/login', {
            email: formData.email,
            password: formData.password
        });
    },
    register(formData) {
        return HTTP.post('/user/registration', {
            email: formData.email,
            password: formData.password,
            rePassword: formData.rePassword,
            recaptchaToken: formData.recaptchaToken,
            terms: formData.terms,
            privacy: formData.privacy,
            GDPR: formData.GDPR,
            refer: localStorage.getItem('refer') || null
        });
    },
    logout() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/logout', {headers: headers});
    },
    resetPassword(email) {
        return HTTP.post('/user/password/reset', {email: email});
    },
    checkResetPassword(hash) {
        return HTTP.post('/user/password/check', {hash: hash});
    },
    confirmResetPassword(formData) {
        return HTTP.post('/user/password/confirm', formData);
    },
    getProfile(requestParams) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/me', { params: requestParams, headers: headers });
    },
    updateProfile(profile) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.put('/me', profile, { headers: headers });
    },
    checkProfile() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/me/status', { headers: headers });
    },
    
    
    
    loginLogs() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/user/login-logs', { headers: headers });
    },
    tokenRevoke(id) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.put('/user/login-logs/'+id+'/token-revoke',{}, { headers: headers });
    },
    updatePassword(password) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.put('/user/password', password, { headers: headers });
    },
    
    //http://api.smartex.info/api/user/activation/asdasdasdasdaseqweqgregt
    //Route::get('/user/activation/{hash}', 'User\ActivationController@activation');
    SubmitVerificationEmail(hash) {
        return HTTP.get('/user/activation/'+hash);
    },
	

    //Route::get('/user/activation/{hash}', 'User\ActivationController@activation');
    ReVerificationEmail(email) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.post('/user/activation/sendCode/', { email : email}, { headers: headers });
    },
    
    //http://api.smartex.info/api/user/phone/verification/+42/1902788532
    //Route::post('/user/phone/verification/{country_code}/{phone}', function ($country_code, $phone)
    sendVerificationPhoneCode(country_code, number) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.post('/user/phone/verification/'+country_code+'/'+number, {}, { headers: headers });
    },

    //http://api.smartex.info/api/user/phone/verification/+42/1902788532/1533
    //Route::get('/user/phone/verification/{country_code}/{phone}/{code}', function ($country_code, $phone, $code)
    SubmitVerificationPhoneCode(country_code, number, code) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/user/phone/verification/'+country_code+'/'+number+'/'+code, { headers: headers });
    },
    
    //.put {verification_image_64_base:''}
    //http://api.smartex.info/api/user/documents/card
    //Route::put('/user/documents/card', 'User\ProfileController@uploadIdCard');
    SubmitVerificationPasport(requestParams) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.put('/user/documents/card', requestParams, { headers: headers });
    },
    
    //.put {verification_kyc_64_base:''}
    ////http://api.smartex.info/api/user/documents/kyc
    //Route::put('/user/documents/kyc', 'User\ProfileController@uploadKyc');
    SubmitVerificationKYC(image64) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.put('/user/documents/kyc',{verification_kyc_64_base:image64}, { headers: headers });
    },
    // http://api.smartex.info/api/user/referrers
    // Route::get('/user/referrers', 'User\ProfileController@referrers');
    ReferrerList() {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/user/referrers', { headers: headers });
    },
    ReferWithdrawRequest(requestParams) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.post('/user/referrers/withdraw', requestParams, { headers: headers });
    },
}