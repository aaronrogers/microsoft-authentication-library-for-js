/**
  * Copyright (c) Microsoft Corporation
  *  All Rights Reserved
  *  MIT License
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy of this
  * software and associated documentation files (the "Software"), to deal in the Software
  * without restriction, including without limitation the rights to use, copy, modify,
  * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  * permit persons to whom the Software is furnished to do so, subject to the following
  * conditions:
  *
  * The above copyright notice and this permission notice shall be
  * included in all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
  * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
  * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */

import { Constants } from "../Constants";
import { ClientAuthError } from "./ClientAuthError";
import { AuthError } from "./AuthError";

export const ClientConfigurationErrorMessage = {
    invalidCacheLocation: {
        code: "invalid_cache_location",
        desc: "The cache contains multiple tokens satisfying the requirements. " +
            "Call AcquireToken again providing more requirements like authority."
    },
    noRedirectCallbacksSet: {
        code: "no_redirect_callbacks",
        desc: "No redirect callbacks have been set. Please call setRedirectCallbacks() with the appropriate function arguments before continuing. " +
            "More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/-basics."
    },
    invalidCallbackObject: {
        code: "invalid_callback_object",
        desc: "The object passed for the callback was invalid. " +
          "More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/-basics."
    },
    scopesRequired: {
        code: "scopes_required",
        desc: "Scopes are required to obtain an access token."
    },
    emptyScopes: {
        code: "empty_input_scopes_error",
        desc: "Scopes cannot be passed as empty array."
    },
    nonArrayScopes: {
        code: "nonarray_input_scopes_error",
        desc: "Scopes cannot be passed as non-array."
    },
    clientScope: {
        code: "clientid_input_scopes_error",
        desc: "Client ID can only be provided as a single scope."
    },
    invalidPrompt: {
        code: "invalid_prompt_value",
        desc: "Supported prompt values are 'login', 'select_account', 'consent' and 'none'",
    },
    invalidAuthorityType: {
        code: "invalid_authority_type",
        desc: "The given authority is not a valid type of authority supported by MSAL. Please see here for valid authorities: <insert URL here>."
    },
    authorityUriInsecure: {
        code: "authority_uri_insecure",
        desc: "Authority URIs must use https."
    },
    authorityUriInvalidPath: {
        code: "authority_uri_invalid_path",
        desc: "Given authority URI is invalid."
    },
    unsupportedAuthorityValidation: {
        code: "unsupported_authority_validation",
        desc: "The authority validation is not supported for this authority type."
    },
    b2cAuthorityUriInvalidPath: {
        code: "b2c_authority_uri_invalid_path",
        desc: "The given URI for the B2C authority is invalid."
    },
};

/**
 * Error thrown when there is an error in configuration of the .js library.
 */
export class ClientConfigurationError extends ClientAuthError {

    constructor(errorCode: string, errorMessage?: string) {
        super(errorCode, errorMessage);
        this.name = "ClientConfigurationError";
        Object.setPrototypeOf(this, ClientConfigurationError.prototype);
    }

    static createInvalidCacheLocationConfigError(givenCacheLocation: string): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCacheLocation.code,
            `${ClientConfigurationErrorMessage.invalidCacheLocation.desc} Provided value: ${givenCacheLocation}. Possible values are: ${Constants.cacheLocationLocal}, ${Constants.cacheLocationSession}.`);
    }

    static createRedirectCallbacksNotSetError(): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.noRedirectCallbacksSet.code, ClientConfigurationErrorMessage.noRedirectCallbacksSet.desc);
    }

    static createInvalidCallbackObjectError(callbackType: string, callbackObject: object): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCallbackObject.code,
            `${ClientConfigurationErrorMessage.invalidCallbackObject.desc} Given value for ${callbackType} callback function: ${callbackObject}`);
    }

    static createEmptyScopesArrayError(scopesValue: string): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.emptyScopes.code,
            `${ClientConfigurationErrorMessage.emptyScopes.desc} Given value: ${scopesValue}.`);
    }

    static createScopesNonArrayError(scopesValue: string): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.nonArrayScopes.code,
            `${ClientConfigurationErrorMessage.nonArrayScopes.desc} Given value: ${scopesValue}.`);
    }

    static createClientIdSingleScopeError(scopesValue: string): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.clientScope.code,
            `${ClientConfigurationErrorMessage.clientScope.desc} Given value: ${scopesValue}.`);
    }

    static createScopesRequiredError(scopesValue: any): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.scopesRequired.code,
            `${ClientConfigurationErrorMessage.scopesRequired.desc} Given value: ${scopesValue}`);
    }

    static createInvalidPromptError(promptValue: any): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidPrompt.code,
            `${ClientConfigurationErrorMessage.invalidPrompt.desc} Given value: ${promptValue}`);
    }
}
