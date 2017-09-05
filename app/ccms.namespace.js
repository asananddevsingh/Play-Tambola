(function () {
    'use strict';
    try {

        window.CCMS = window.CCMS || {};
        CCMS.ENDPOINTS = CCMS.ENDPOINTS || {};
        CCMS.OAUTHPARAM = CCMS.OAUTHPARAM || {};

        let PARAMS = JSON.parse(localStorage.getItem('params'));

        if (PARAMS) {

            /* OAuth Parameters */
            CCMS.OAUTHPARAM.CLIENT_ID = PARAMS.APP_CLIENT_ID;
            CCMS.OAUTHPARAM.REDIRECT_URI = PARAMS.OAG_REDIRECT_URL;

            /*********************** END POINTS ***********************/

            /* Local JSON Resource */
            CCMS.ENDPOINTS.LOCAL_GET_RESOURCE = './app/shared/json/resource.properties.json';
            CCMS.ENDPOINTS.LOCAL_GET_RESOURCETYPE = './app/shared/json/resourcetype.properties.json';
            CCMS.ENDPOINTS.LOCAL_GET_SERVICETYPE = './app/shared/json/servicetype.properties.json';
            /*CCMS.ENDPOINTS.LOCAL_GET_AUTHORIZATION_RULES = './authorization.rules.json';*/

            /* OAuth APIs*/
            CCMS.ENDPOINTS.POST_OAUTH_TOKEN = PARAMS.OAG_POST_OAUTH_TOKEN;
            CCMS.ENDPOINTS.POST_LOGOUT_SESSION = PARAMS.OAG_POST_LOGOUT_SESSION;

            /* Service Base Url */
            CCMS.ENDPOINTS.SERVICE_BASE_URL = PARAMS.OAG_SERVICE_BASE_URL;

            /* Authorization Rules */
            CCMS.ENDPOINTS.GET_AUTHORIZATION_RULES = createServiceEndPointUrl('authorization-rules');
            CCMS.ENDPOINTS.POST_AUTHORIZATION_RULES = createServiceEndPointUrl('authorization-rules');
            CCMS.ENDPOINTS.PUT_AUTHORIZATION_RULES = createServiceEndPointUrl('authorization-rules');

            /* CCMS Specific Attributes */
            CCMS.ENDPOINTS.GET_CCMS_SPECIFIC_ATTRIBUTES = createServiceEndPointUrl('ccms-specific-attributes');
            CCMS.ENDPOINTS.PUT_CCMS_SPECIFIC_ATTRIBUTES = createServiceEndPointUrl('ccms-specific-attributes');
            CCMS.ENDPOINTS.POST_CCMS_SPECIFIC_ATTRIBUTES = createServiceEndPointUrl('ccms-specific-attributes');
            CCMS.ENDPOINTS.DELETE_CCMS_SPECIFIC_ATTRIBUTES = createServiceEndPointUrl('ccms-specific-attributes');

            /* Data Sync Error */
            /*#### SAP to CCMS */
            CCMS.ENDPOINTS.GET_SAP_TO_CCMS_DATA_SYNC_ERROR = createServiceEndPointUrl('sync-errors');
            CCMS.ENDPOINTS.DELETE_SAP_TO_CCMS_DATA_SYNC_ERROR = createServiceEndPointUrl('sync-errors');

            /*#### CCMS To SAP */
            CCMS.ENDPOINTS.GET_CCMS_TO_SAP_DATA_SYNC_ERROR = createServiceEndPointUrl('queue-errors');
        }
        
        function createServiceEndPointUrl(endPointUrl) {
            return CCMS.ENDPOINTS.SERVICE_BASE_URL.concat(endPointUrl) || '';
        };

    } catch (err) {
        console.error('Error catched in ccms.namespace.js: ', err);
    }
})();