(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "/JoM":
/*!*******************************************************!*\
  !*** ./src/app/modules/auth/services/auth.service.ts ***!
  \*******************************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jwt-decode */ "EjJx");
/* harmony import */ var _role__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../role */ "yE1c");
/* harmony import */ var _casl_ability__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @casl/ability */ "c1DH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./message.service */ "QzY8");










class AuthService {
    constructor(http, router, ability, errorService) {
        this.http = http;
        this.router = router;
        this.ability = ability;
        this.errorService = errorService;
        this.loginUrl = '/auth/sign-in';
        this.registerUrl = '/auth/sign-up';
        this.checklistUrl = '/rest/checklist';
        this.refreshUrl = '/auth/refresh';
        this.signoutUrl = '/auth/sign-out';
        this.email = 'abc';
        this.password = '123';
        const accessToken = localStorage.getItem('AuthToken');
        const refreshToken = localStorage.getItem('RefreshToken');
        this._tokens = { accessToken, refreshToken };
        if (accessToken) {
            this.currentUser = this.decodeToken(accessToken);
            this.updateAbility(this.currentUser);
        }
    }
    get token() {
        var _a;
        return (_a = this._tokens) === null || _a === void 0 ? void 0 : _a.accessToken;
    }
    isSignin() {
        console.log('isSignin', this.token);
        return !!this.token;
    }
    login(email, password) {
        const a = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].host + this.loginUrl;
        return this.http.post(a, { email, password }, {
            responseType: 'json',
            params: { setAuthToken: 'false' }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(e => {
            localStorage.setItem('AuthToken', e.accessToken);
            localStorage.setItem('RefreshToken', e.refreshToken);
            this.currentUser = this.decodeToken(e.accessToken);
            this.updateAbility(this.currentUser);
            this._tokens = e;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(e => true)).pipe();
    }
    register(email, password, fullName, role = 'admin') {
        const a = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].host + this.registerUrl;
        return this.http.post(a, { email, password, fullName, role }, {
            responseType: 'json',
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(e => {
            console.log(e);
            this.errorService.showInfo('User ' + fullName + ' created.');
            this.router.navigate(['/signin/']);
            return fullName;
        }));
    }
    updateAbility(user) {
        const { can, rules } = new _casl_ability__WEBPACK_IMPORTED_MODULE_4__["AbilityBuilder"]();
        can('update', 'all');
        if (user.role === 'admin') {
            can('add', 'all');
        }
        else {
            can('add', 'all');
        }
        this.ability.update(rules);
    }
    decodeToken(jwtAccessToken) {
        return Object(jwt_decode__WEBPACK_IMPORTED_MODULE_2__["default"])(jwtAccessToken);
    }
    get isAdmin() {
        return this.currentUser && this.currentUser.role === _role__WEBPACK_IMPORTED_MODULE_3__["Role"].Admin;
    }
    get userRole() {
        return this.currentUser.role;
    }
    updateTokensPair() {
        const a = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].host + this.refreshUrl;
        return this.http.post(a, { refreshToken: this._tokens.refreshToken }, {
            responseType: 'json'
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(newTokensPair => {
            localStorage.setItem('AuthToken', newTokensPair.accessToken);
            localStorage.setItem('RefreshToken', newTokensPair.refreshToken);
            this._tokens = newTokensPair;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(newTokensPair => true));
    }
    logout() {
        const a = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].host + this.signoutUrl;
        return this.http.post(a, {})
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(() => {
            localStorage.clear();
            this._tokens = null;
            this.currentUser = null; //
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this._tokens);
        }));
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_casl_ability__WEBPACK_IMPORTED_MODULE_4__["Ability"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_message_service__WEBPACK_IMPORTED_MODULE_8__["MessageService"])); };
AuthService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Artem\Source\Repos\Checklist\src\main.ts */"zUnb");


/***/ }),

/***/ "58k3":
/*!*********************************************************************!*\
  !*** ./src/app/modules/auth/registration/registration.component.ts ***!
  \*********************************************************************/
/*! exports provided: RegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationComponent", function() { return RegistrationComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var src_app_modules_auth_password_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/auth/password.validator */ "k3pw");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth.service */ "/JoM");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/message.service */ "QzY8");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var src_app_shared_error_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/error.directive */ "zpJY");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");











function RegistrationComponent_mat_error_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Email is ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "required");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function RegistrationComponent_mat_error_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Password is ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "required");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function RegistrationComponent_mat_error_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Passwords should ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "match");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class RegistrationComponent {
    constructor(router, auth, errorService) {
        this.router = router;
        this.auth = auth;
        this.errorService = errorService;
        this.registrationForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]({
            emailFormControl: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].email,
            ]),
            passwordFormControl: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required,
            ]),
            usernameFormControl: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('', []),
            passwordConfirmFormControl: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('', []),
        }, src_app_modules_auth_password_validator__WEBPACK_IMPORTED_MODULE_1__["CustomValidators"].passwordConfirmValidator);
        this.roles = [
            { value: 'admin', viewValue: 'Admin' },
            { value: 'user', viewValue: 'User' }
        ];
    }
    signinRedirect() {
        this.router.navigate(['/signin/']);
    }
    registration() {
        console.log('Started registration');
        if (!this.registrationForm.valid) {
            console.log('Error registration');
            this.registrationForm.markAllAsTouched();
            return false;
        }
        const { emailFormControl, passwordFormControl, usernameFormControl, passwordConfirmFormControl } = this.registrationForm.controls;
        this.auth.register(emailFormControl.value, passwordFormControl.value, usernameFormControl.value).subscribe();
    }
}
RegistrationComponent.ɵfac = function RegistrationComponent_Factory(t) { return new (t || RegistrationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_message_service__WEBPACK_IMPORTED_MODULE_5__["MessageService"])); };
RegistrationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: RegistrationComponent, selectors: [["app-registration"]], decls: 27, vars: 4, consts: [[1, "example-form", 3, "formGroup"], [1, "example-full-width"], ["type", "email", "matInput", "", "formControlName", "emailFormControl", "placeholder", "Ex. pat@example.com", "name", "email"], [4, "appErrorDirective"], ["matInput", "", "formControlName", "usernameFormControl"], ["type", "password", "matInput", "", "formControlName", "passwordFormControl", "placeholder", "Ex. VeryHardPassword!1"], ["type", "password", "matInput", "", "formControlName", "passwordConfirmFormControl", "placeholder", "Ex. VeryHardPassword!1"], [1, "buttons"], ["type", "button", "mat-raised-button", "", "color", "primary", 1, "signin-button", 3, "click"], ["type", "button", "mat-stroked-button", "", "color", "primary", 1, "registaration-button", 3, "click"]], template: function RegistrationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Registration");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, RegistrationComponent_mat_error_7_Template, 4, 0, "mat-error", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Full name");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, RegistrationComponent_mat_error_16_Template, 4, 0, "mat-error", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Password confirmation");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](20, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, RegistrationComponent_mat_error_21_Template, 4, 0, "mat-error", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RegistrationComponent_Template_button_click_23_listener() { return ctx.registration(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "Register");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RegistrationComponent_Template_button_click_25_listener() { return ctx.signinRedirect(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.registrationForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("appErrorDirective", "emailFormControl");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("appErrorDirective", "passwordFormControl");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("appErrorDirective", "passwordConfirmFormControl");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], src_app_shared_error_directive__WEBPACK_IMPORTED_MODULE_8__["ErrorDirective"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatError"]], styles: [".error-message[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: red;\n  font-size: 16px !important;\n  display: flex;\n  justify-content: center;\n  margin-bottom: 0px;\n}\n\nh2[_ngcontent-%COMP%] {\n  font-size: 35px;\n  color: #5c5fe8;\n  text-align: center;\n  margin: 0px 0 35px;\n}\n\nmat-form-field[_ngcontent-%COMP%] {\n  margin: 15px 0 0 0;\n}\n\n.example-form[_ngcontent-%COMP%] {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n}\n\n.example-full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\ntd[_ngcontent-%COMP%] {\n  padding-right: 8px;\n}\n\nform[_ngcontent-%COMP%] {\n  background-color: #fff;\n  display: block;\n  height: auto;\n  width: 300px;\n  padding: 65px 40px;\n  margin: auto;\n  border-radius: 15px;\n}\n\nform[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%] {\n  margin: 30px 0 0px 0;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\nform[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   .registaration-button[_ngcontent-%COMP%] {\n  margin-left: 7px;\n}\n\nform[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   .signin-button[_ngcontent-%COMP%] {\n  margin-right: 7px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxccmVnaXN0cmF0aW9uLmNvbXBvbmVudC5zY3NzIiwiLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcYXNzZXRzXFxzY3NzXFxwYWxldHRlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0JBO0VBQ0UsVUFBQTtFQUNBLDBCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7QUFmRjs7QUFrQkE7RUFDRSxlQUFBO0VBQ0EsY0MxQlk7RUQyQlosa0JBQUE7RUFDQSxrQkFBQTtBQWZGOztBQWtCQTtFQUNFLGtCQUFBO0FBZkY7O0FBa0JBO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUFmRjs7QUFrQkE7RUFDRSxXQUFBO0FBZkY7O0FBa0JBO0VBQ0Usa0JBQUE7QUFmRjs7QUFrQkE7RUFDRSxzQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBZkY7O0FBaUJFO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUVBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FBaEJKOztBQWtCSTtFQUNFLGdCQUFBO0FBaEJOOztBQWtCSTtFQUNFLGlCQUFBO0FBaEJOIiwiZmlsZSI6InJlZ2lzdHJhdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIC5leGFtcGxlLWZvcm0ge1xyXG4vLyAgICAgbWluLXdpZHRoOiAxNTBweDtcclxuLy8gICAgIG1heC13aWR0aDogNTAwcHg7XHJcbi8vICAgICB3aWR0aDogMTAwJTtcclxuLy8gICB9XHJcbiAgXHJcbi8vICAgLmV4YW1wbGUtZnVsbC13aWR0aCB7XHJcbi8vICAgICB3aWR0aDogMTAwJTtcclxuLy8gICB9XHJcbiAgXHJcbi8vICAgdGQge1xyXG4vLyAgICAgcGFkZGluZy1yaWdodDogOHB4O1xyXG4vLyAgIH1cclxuXHJcbiAgQGltcG9ydCBcIi9zcmMvYXNzZXRzL3Njc3MvcGFsZXR0ZS5zY3NzXCI7XHJcblxyXG4uZXJyb3ItbWVzc2FnZSBoMSB7XHJcbiAgY29sb3I6IHJlZDtcclxuICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDBweDtcclxufVxyXG5cclxuaDIge1xyXG4gIGZvbnQtc2l6ZTogMzVweDtcclxuICBjb2xvcjogJGF3ZXNvbWUtYmx1ZTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWFyZ2luOiAwcHggMCAzNXB4O1xyXG59XHJcblxyXG5tYXQtZm9ybS1maWVsZCB7XHJcbiAgbWFyZ2luOiAxNXB4IDAgMCAwO1xyXG59XHJcblxyXG4uZXhhbXBsZS1mb3JtIHtcclxuICBtaW4td2lkdGg6IDE1MHB4O1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5leGFtcGxlLWZ1bGwtd2lkdGgge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG50ZCB7XHJcbiAgcGFkZGluZy1yaWdodDogOHB4O1xyXG59XHJcblxyXG5mb3JtIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIGhlaWdodDogYXV0bztcclxuICB3aWR0aDogMzAwcHg7XHJcbiAgcGFkZGluZzogNjVweCA0MHB4O1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG5cclxuICAuYnV0dG9ucyB7XHJcbiAgICBtYXJnaW46IDMwcHggMCAwcHggMDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHJcbiAgICBkaXNwbGF5OiBmbGV4OyAvL1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgLy9cclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7IC8vXHJcblxyXG4gICAgLnJlZ2lzdGFyYXRpb24tYnV0dG9uIHtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDdweDtcclxuICAgIH1cclxuICAgIC5zaWduaW4tYnV0dG9uIHtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiA3cHg7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIiRhd2Vzb21lLWJsdWU6cmdiYSg5MiwgOTUsIDIzMiwgMSk7XHJcbiRhd2Vzb21lLXJlZDpyZ2JhKDI0MywgMTE1LCAxMTYsIDEpOyJdfQ== */"] });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    host: ''
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Dfc7":
/*!**********************************************************!*\
  !*** ./src/app/modules/auth/sign-in/signin.component.ts ***!
  \**********************************************************/
/*! exports provided: SigninComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SigninComponent", function() { return SigninComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "/JoM");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var src_app_shared_error_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/error.directive */ "zpJY");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");









function SigninComponent_mat_error_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Email is ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "required");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SigninComponent_mat_error_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Password is ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "required");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class SigninComponent {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
        this.signinForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]({
            emailFormControl: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].email,
            ]),
            passwordFormControl: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required,
            ]),
        });
    }
    signIn() {
        console.log(this.signinForm.get('emailFormControl').value);
        if (!this.signinForm.valid) {
            this.signinForm.markAllAsTouched();
            return false;
        }
        this.auth.login(this.signinForm.get('emailFormControl').value, this.signinForm.get('passwordFormControl').value)
            .subscribe(e => {
            this.router.navigate(['/checklist']); // tanya1@mail.com  12345678
            return true;
        });
    }
    registrationRedirect() {
        this.router.navigate(['/registration']);
    }
}
SigninComponent.ɵfac = function SigninComponent_Factory(t) { return new (t || SigninComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
SigninComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: SigninComponent, selectors: [["app-signin"]], decls: 20, vars: 3, consts: [[1, "example-form", 3, "formGroup"], [1, "example-full-width"], ["type", "email", "matInput", "", "formControlName", "emailFormControl", "placeholder", "Ex. pat@example.com", "name", "email"], ["email", ""], [4, "appErrorDirective"], ["type", "password", "matInput", "", "formControlName", "passwordFormControl", "placeholder", "Ex. VeryHardPassword!1", "name", "password"], ["password", ""], [1, "buttons"], ["type", "button", "mat-raised-button", "", "color", "primary", 1, "signin-button", 3, "click"], ["type", "button", "mat-stroked-button", "", "color", "primary", 1, "registaration-button", 3, "click"]], template: function SigninComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Sign in");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, SigninComponent_mat_error_8_Template, 4, 0, "mat-error", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "input", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, SigninComponent_mat_error_14_Template, 4, 0, "mat-error", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SigninComponent_Template_button_click_16_listener() { return ctx.signIn(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Sign in");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SigninComponent_Template_button_click_18_listener() { return ctx.registrationRedirect(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Registration");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.signinForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("appErrorDirective", "emailFormControl");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("appErrorDirective", "passwordFormControl");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], src_app_shared_error_directive__WEBPACK_IMPORTED_MODULE_6__["ErrorDirective"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatError"]], styles: [".error-message[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: red;\n  font-size: 16px !important;\n  display: flex;\n  justify-content: center;\n  margin-bottom: 0px;\n}\n\nh2[_ngcontent-%COMP%] {\n  font-size: 35px;\n  color: #5c5fe8;\n  text-align: center;\n  margin: 0px 0 35px;\n}\n\nmat-form-field[_ngcontent-%COMP%] {\n  margin: 15px 0 0 0;\n}\n\n.example-form[_ngcontent-%COMP%] {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n}\n\n.example-full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\ntd[_ngcontent-%COMP%] {\n  padding-right: 8px;\n}\n\nform[_ngcontent-%COMP%] {\n  background-color: #fff;\n  display: block;\n  height: auto;\n  width: 300px;\n  padding: 65px 40px;\n  margin: auto;\n  border-radius: 15px;\n}\n\nform[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%] {\n  margin: 30px 0 0px 0;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\nform[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   .registaration-button[_ngcontent-%COMP%] {\n  margin-left: 7px;\n}\n\nform[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   .signin-button[_ngcontent-%COMP%] {\n  margin-right: 7px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcc2lnbmluLmNvbXBvbmVudC5zY3NzIiwiLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcYXNzZXRzXFxzY3NzXFxwYWxldHRlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxVQUFBO0VBQ0EsMEJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtBQURGOztBQUlBO0VBQ0UsZUFBQTtFQUNBLGNDWlk7RURhWixrQkFBQTtFQUNBLGtCQUFBO0FBREY7O0FBSUE7RUFDRSxrQkFBQTtBQURGOztBQUlBO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUFERjs7QUFJQTtFQUNFLFdBQUE7QUFERjs7QUFJQTtFQUNFLGtCQUFBO0FBREY7O0FBSUE7RUFDRSxzQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBREY7O0FBR0U7RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBRUEsYUFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7QUFGSjs7QUFJSTtFQUNFLGdCQUFBO0FBRk47O0FBSUk7RUFDRSxpQkFBQTtBQUZOIiwiZmlsZSI6InNpZ25pbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIvc3JjL2Fzc2V0cy9zY3NzL3BhbGV0dGUuc2Nzc1wiO1xyXG5cclxuLmVycm9yLW1lc3NhZ2UgaDEge1xyXG4gIGNvbG9yOiByZWQ7XHJcbiAgZm9udC1zaXplOiAxNnB4ICFpbXBvcnRhbnQ7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAwcHg7XHJcbn1cclxuXHJcbmgyIHtcclxuICBmb250LXNpemU6IDM1cHg7XHJcbiAgY29sb3I6ICRhd2Vzb21lLWJsdWU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbjogMHB4IDAgMzVweDtcclxufVxyXG5cclxubWF0LWZvcm0tZmllbGQge1xyXG4gIG1hcmdpbjogMTVweCAwIDAgMDtcclxufVxyXG5cclxuLmV4YW1wbGUtZm9ybSB7XHJcbiAgbWluLXdpZHRoOiAxNTBweDtcclxuICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uZXhhbXBsZS1mdWxsLXdpZHRoIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxudGQge1xyXG4gIHBhZGRpbmctcmlnaHQ6IDhweDtcclxufVxyXG5cclxuZm9ybSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBoZWlnaHQ6IGF1dG87XHJcbiAgd2lkdGg6IDMwMHB4O1xyXG4gIHBhZGRpbmc6IDY1cHggNDBweDtcclxuICBtYXJnaW46IGF1dG87XHJcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcclxuXHJcbiAgLmJ1dHRvbnMge1xyXG4gICAgbWFyZ2luOiAzMHB4IDAgMHB4IDA7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gICAgZGlzcGxheTogZmxleDsgLy9cclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IC8vXHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kOyAvL1xyXG5cclxuICAgIC5yZWdpc3RhcmF0aW9uLWJ1dHRvbiB7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiA3cHg7XHJcbiAgICB9XHJcbiAgICAuc2lnbmluLWJ1dHRvbiB7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogN3B4O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIkYXdlc29tZS1ibHVlOnJnYmEoOTIsIDk1LCAyMzIsIDEpO1xyXG4kYXdlc29tZS1yZWQ6cmdiYSgyNDMsIDExNSwgMTE2LCAxKTsiXX0= */"] });


/***/ }),

/***/ "FpDI":
/*!*********************************************************!*\
  !*** ./src/app/core/interceptors/tokens.interceptor.ts ***!
  \*********************************************************/
/*! exports provided: RefreshTokenInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefreshTokenInterceptor", function() { return RefreshTokenInterceptor; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_modules_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/auth/services/auth.service */ "/JoM");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");





class RefreshTokenInterceptor {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.isRefreshing = false;
        this.refreshTokenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](null);
    }
    intercept(req, next) {
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(error => {
            if (error.status === 403) {
                return this.catchErrorsFunction(req, next);
            }
            else {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["throwError"])(error);
            }
        }));
    }
    catchErrorsFunction(req, next) {
        console.log('catchErrorsFunction');
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.authService.updateTokensPair().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((tokens) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(tokens);
                const modifiedReq = req.clone({
                    headers: req.headers.set('x-auth-token', this.authService.token),
                });
                console.log('switchMap-modifiedReq!!!');
                return next.handle(modifiedReq);
            }));
            // ).pipe(catchError(() => this.authService.logout()));
        }
        else {
            console.log('else-switchMap-modifiedReq!!!');
            return this.refreshTokenSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(token => token != null), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(jwt => {
                const modifiedReq = req.clone({
                    headers: req.headers.set('x-auth-token', this.authService.token),
                });
                return next.handle(modifiedReq);
            }));
        }
    }
}
RefreshTokenInterceptor.ɵfac = function RefreshTokenInterceptor_Factory(t) { return new (t || RefreshTokenInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_modules_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"])); };
RefreshTokenInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: RefreshTokenInterceptor, factory: RefreshTokenInterceptor.ɵfac });


/***/ }),

/***/ "Fs42":
/*!*************************************************!*\
  !*** ./src/app/core/interceptors/error.type.ts ***!
  \*************************************************/
/*! exports provided: CustomError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomError", function() { return CustomError; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");

class CustomError extends Error {
    constructor(innerError) {
        let message = 'Unknown error';
        if (innerError instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpErrorResponse"]) {
            message = innerError.message;
        }
        else if (innerError.error && innerError.error.text) {
            message = innerError.error.text;
        }
        else if (innerError.error && typeof innerError.error === 'string') {
            message = innerError.error;
        }
        else if (innerError.data) {
            message = innerError.data;
        }
        super(message);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CustomError.prototype);
        this.innerError = innerError;
    }
}


/***/ }),

/***/ "K9yR":
/*!****************************************!*\
  !*** ./src/app/test/test.component.ts ***!
  \****************************************/
/*! exports provided: TestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestComponent", function() { return TestComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class TestComponent {
    constructor() {
        // generalArr = [];
        // observ(): void {
        //     const arr = this.generateArr();
        //     console.log(arr);
        //     const source = from(arr).pipe(
        //         map(n => {
        //             let observable = Observable.of(n + 10);
        //             // we now have an observable here, not a number!
        //             return observable;
        //         })
        //     );
        //     // .pipe(delay(1000));
        this.generalArr = [];
    }
    observ() {
        const arr = this.generateArr();
        console.log(arr);
        const source = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(arr).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(n => {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(n).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["delay"])(1000)); // of - make a lot of observ elements from array anf get them delay
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["concatAll"])() // make one general Observable from little ones and build them into the queue
        );
        source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(e => e / 2), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(e => (e % 1) === 0), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["scan"])((acc, curr) => {
            acc.push(curr);
            return acc;
        }, []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(e => e.length > 0), // !!e.length
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(mass => mass.reduce((acc, curentElement) => acc + curentElement, 0) / mass.length)
        // tslint:disable-next-line: deprecation
        ).subscribe(val => console.log('summ:', val), err => console.error('error:', err), () => console.log('completed'));
    }
    sumArrays(arr) {
        Array.prototype.push.apply(this.generalArr, arr);
        console.log('after-arr-', this.generalArr);
    }
    generateArr() {
        const testArr = [];
        for (let i = 0, t = 15; i < 15; i++) {
            testArr.push(Math.floor(Math.random() * t));
        }
        console.log(testArr);
        return testArr;
    }
}
TestComponent.ɵfac = function TestComponent_Factory(t) { return new (t || TestComponent)(); };
TestComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: TestComponent, selectors: [["app-test"]], decls: 2, vars: 0, consts: [[3, "click"]], template: function TestComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function TestComponent_Template_button_click_0_listener() { return ctx.observ(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "count!");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } }, encapsulation: 2 });


/***/ }),

/***/ "Nlor":
/*!********************************************************!*\
  !*** ./src/app/core/interceptors/error.interceptor.ts ***!
  \********************************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _error_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error.type */ "Fs42");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class ErrorInterceptor {
    intercept(request, next) {
        return next.handle(request).pipe(
        // retry(1),
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])((error) => {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["throwError"])(new _error_type__WEBPACK_IMPORTED_MODULE_2__["CustomError"](error));
        }));
    }
}
ErrorInterceptor.ɵfac = function ErrorInterceptor_Factory(t) { return new (t || ErrorInterceptor)(); };
ErrorInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: ErrorInterceptor, factory: ErrorInterceptor.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "PwvX":
/*!***************************************************************!*\
  !*** ./src/app/core/interceptors/errorHandler.interceptor.ts ***!
  \***************************************************************/
/*! exports provided: ErrorHandterInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorHandterInterceptor", function() { return ErrorHandterInterceptor; });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _error_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error.type */ "Fs42");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_modules_auth_services_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/auth/services/message.service */ "QzY8");
/* harmony import */ var src_app_modules_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/auth/services/auth.service */ "/JoM");





class ErrorHandterInterceptor {
    constructor(errorService, authService) {
        this.errorService = errorService;
        this.authService = authService;
    }
    handleError(error) {
        if (!src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].production) {
            console.error(error);
        }
        if (error instanceof _error_type__WEBPACK_IMPORTED_MODULE_1__["CustomError"]) {
            this.handleServerError(error);
        }
        else {
            if (error.error.message) {
                this.errorService.showError(error.error.message);
            }
            else if (error.message) {
                this.errorService.showError(error.message);
            }
            else {
                this.errorService.showError('Some error happened!');
            }
        }
        // switch (true) {
        //     case !!error.error.message:
        //         this.errorService.showError(error.error.message);
        //         break;
        //     case !!error.message:
        //         this.errorService.showError(error.message);
        //         break;
        //     default:
        //         this.errorService.showError('Some error happened!');
        //         break;
        // }
    }
    handleServerError(error) {
        if (error.innerError.status === 403) {
            this.errorService.showInfo('Session Expired.');
            this.authService.logout();
        }
        else if (error.innerError.status === 500) {
            this.errorService.showError('Server error.');
        }
        else {
            this.errorService.showError(error.innerError.error.message);
        }
    }
}
ErrorHandterInterceptor.ɵfac = function ErrorHandterInterceptor_Factory(t) { return new (t || ErrorHandterInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_modules_auth_services_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_modules_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"])); };
ErrorHandterInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: ErrorHandterInterceptor, factory: ErrorHandterInterceptor.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "QzY8":
/*!**********************************************************!*\
  !*** ./src/app/modules/auth/services/message.service.ts ***!
  \**********************************************************/
/*! exports provided: MessageType, MessageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageType", function() { return MessageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageService", function() { return MessageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");


var MessageType;
(function (MessageType) {
    MessageType["error"] = "error";
    MessageType["warning"] = "warning";
    MessageType["info"] = "info";
})(MessageType || (MessageType = {}));
class MessageService {
    constructor(_snackBar, zone) {
        this._snackBar = _snackBar;
        this.zone = zone;
    }
    showWarning(message) {
        this.showMessage(message, MessageType.warning);
    }
    showInfo(message) {
        this.showMessage(message, MessageType.info);
    }
    showError(message) {
        this.showMessage(message, MessageType.error);
    }
    showMessage(message, messageType) {
        this.zone.run(() => {
            this._snackBar.open(message, null, {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: `${messageType}-message`,
                duration: 3000
            });
        });
    }
}
MessageService.ɵfac = function MessageService_Factory(t) { return new (t || MessageService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"])); };
MessageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MessageService, factory: MessageService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _modules_route_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/route-animations */ "tEwG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _modules_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/auth/services/auth.service */ "/JoM");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");




class AppComponent {
    constructor(authService, activatedRoute, router) {
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.title = 'ToDo List';
    }
    signOut() {
        this.authService.logout().subscribe(() => {
            this.router.navigateByUrl('/signin/');
        });
    }
    getState(outlet) {
        // Changing the activatedRouteData.state triggers the animation
        console.log(this.router.url);
        return outlet.activatedRouteData.state;
    }
    prepareRoute(outlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_modules_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 13, vars: 1, consts: [["routerLink", "", "routerLinkActive", "active", "hidden", ""], ["routerLink", "/signin/", "routerLinkActive", "active", "hidden", ""], ["routerLink", "/registration", "routerLinkActive", "active", "hidden", ""], [1, "sign-out"], ["routerLink", "/signin/", "routerLinkActive", "active", 3, "click"], ["outlet", "outlet"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Checklist ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Signin ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Registration");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_Template_a_click_8_listener() { return ctx.signOut(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " Sign-out ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "router-outlet", null, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("@fadeInAnimation", ctx.prepareRoute(_r0));
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkActive"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: [".sign-out[_ngcontent-%COMP%] {\n  text-align: end;\n  margin-right: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLGtCQUFBO0FBQ0oiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNpZ24tb3V0IHtcclxuICAgIHRleHQtYWxpZ246IGVuZDtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG5cclxuIl19 */"], data: { animation: [_modules_route_animations__WEBPACK_IMPORTED_MODULE_0__["fadeInAnimation"]] } });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _test_test_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./test/test.component */ "K9yR");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _core_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/interceptors/auth.interceptor */ "htiD");
/* harmony import */ var _core_interceptors_tokens_interceptor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core/interceptors/tokens.interceptor */ "FpDI");
/* harmony import */ var _casl_ability__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @casl/ability */ "c1DH");
/* harmony import */ var _core_interceptors_errorHandler_interceptor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core/interceptors/errorHandler.interceptor */ "PwvX");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _core_interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./core/interceptors/error.interceptor */ "Nlor");















class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ providers: [
        _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"],
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _core_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_8__["TokenInterceptor"], multi: true },
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _core_interceptors_tokens_interceptor__WEBPACK_IMPORTED_MODULE_9__["RefreshTokenInterceptor"], multi: true },
        { provide: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ErrorHandler"], useClass: _core_interceptors_errorHandler_interceptor__WEBPACK_IMPORTED_MODULE_11__["ErrorHandterInterceptor"] },
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _core_interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_13__["ErrorInterceptor"], multi: true },
        { provide: _casl_ability__WEBPACK_IMPORTED_MODULE_10__["Ability"], useValue: new _casl_ability__WEBPACK_IMPORTED_MODULE_10__["Ability"]() },
        { provide: _casl_ability__WEBPACK_IMPORTED_MODULE_10__["PureAbility"], useExisting: _casl_ability__WEBPACK_IMPORTED_MODULE_10__["Ability"] }
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_12__["MatSnackBarModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        _test_test_component__WEBPACK_IMPORTED_MODULE_6__["TestComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_12__["MatSnackBarModule"]] }); })();


/***/ }),

/***/ "cMCp":
/*!*****************************************************!*\
  !*** ./src/app/modules/auth/auth-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: pathMatcher, AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathMatcher", function() { return pathMatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _registration_registration_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registration/registration.component */ "58k3");
/* harmony import */ var _sign_in_signin_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sign-in/signin.component */ "Dfc7");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





function pathMatcher(segments, group, route) {
    console.log('ssssssssssssssssssssssssssss-matcher', segments);
    if (segments.length === 0) {
        return null;
    }
    const matchedRoute = routes.find(d => d.path === segments[0].path);
    return !!matchedRoute ? { consumed: [] } : null;
}
const routes = [
    {
        path: 'signin',
        component: _sign_in_signin_component__WEBPACK_IMPORTED_MODULE_2__["SigninComponent"],
        data: { animation: 'SigninPage' }
    },
    {
        path: 'registration',
        component: _registration_registration_component__WEBPACK_IMPORTED_MODULE_1__["RegistrationComponent"],
        data: { animation: 'RegistrationPage' }
    }
];
class AuthRoutingModule {
}
AuthRoutingModule.ɵfac = function AuthRoutingModule_Factory(t) { return new (t || AuthRoutingModule)(); };
AuthRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AuthRoutingModule });
AuthRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AuthRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "htiD":
/*!*******************************************************!*\
  !*** ./src/app/core/interceptors/auth.interceptor.ts ***!
  \*******************************************************/
/*! exports provided: TokenInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenInterceptor", function() { return TokenInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_modules_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/auth/services/auth.service */ "/JoM");


class TokenInterceptor {
    constructor(authService) {
        this.authService = authService;
    }
    intercept(req, next) {
        const shouldAddAuthToken = req.params.get('setAuthToken') || true;
        const token = this.authService.token;
        if (shouldAddAuthToken.toString().toLowerCase() === 'false' || this.authService.token === null || !token) {
            return next.handle(req);
        }
        const modifiedReq = req.clone({
            headers: req.headers.set('x-auth-token', token),
        });
        return next.handle(modifiedReq);
    }
}
TokenInterceptor.ɵfac = function TokenInterceptor_Factory(t) { return new (t || TokenInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](src_app_modules_auth_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"])); };
TokenInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: TokenInterceptor, factory: TokenInterceptor.ɵfac });


/***/ }),

/***/ "k3pw":
/*!****************************************************!*\
  !*** ./src/app/modules/auth/password.validator.ts ***!
  \****************************************************/
/*! exports provided: CustomValidators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomValidators", function() { return CustomValidators; });
class CustomValidators {
    static passwordConfirmValidator(formGroup) {
        const password = formGroup.get('passwordFormControl').value;
        const confirmPassword = formGroup.get('passwordConfirmFormControl').value;
        // compare the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            formGroup.get('passwordConfirmFormControl').setErrors({ NoPassswordMatch: true });
            return { NoPassswordMatch: true };
        }
        formGroup.get('passwordConfirmFormControl').setErrors(null);
        return null;
    }
}


/***/ }),

/***/ "tEwG":
/*!*********************************************!*\
  !*** ./src/app/modules/route-animations.ts ***!
  \*********************************************/
/*! exports provided: fadeInAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fadeInAnimation", function() { return fadeInAnimation; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "R0Ic");

const fadeInAnimation = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('fadeInAnimation', [
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])('* <=> *', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ position: 'relative' }),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter, :leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ], { optional: true }),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ opacity: 0, transform: 'translateY(-10px)' })
        ], { optional: true }),
        //   query(':leave', animateChild(), { optional: true }),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["group"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':leave', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms ease-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ opacity: 0, transform: 'translateY(500px)' }))
            ], { optional: true }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["query"])(':enter', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('300ms ease-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ opacity: 1, transform: 'translateY(0)' }))
            ], { optional: true })
        ]),
    ]),
]);
// export const fadeInAnimation =
//     // trigger name for attaching this animation to an element using the [@triggerName] syntax
//     trigger('fadeInAnimation', [
//         // route 'enter' transition
//         // transition('*<=>*', [
//         //     // css styles at start of transition
//         //     style({ opacity: 0 }),
//         //     // animation and styles at end of transition
//         //     animate('.15s', style({ opacity: 1 }))
//         // ]),
//         // Set a default  style for enter and leave
//         transition(':enter', [
//             style({ opacity: 0 }),
//             animate('10000ms', style({ opacity: 1 })),
//         ]),
//         transition(':leave', [
//             animate('10000ms', style({ opacity: 0 }))
//         ])
// transition(':enter', [
//     style({
//         position: 'absolute',
//         // left: 0,
//         width: '100%',
//         opacity: 0,
//         transform: 'translateY(-25px)',
//     }),
//     animate('6000ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
// ]),
// transition(':leave', [
//     style({
//         position: 'absolute',
//         // left: 0,
//         width: '100%',
//         opacity: 1,
//         transform: 'translateY(0)',
//     }),
//     animate('6000ms ease', style({ opacity: 0, transform: 'translateY(800px)' }))
// ])
// transition('* <=> *', [
//     query(':enter, :leave', [
//         style({
//             position: 'absolute',
//             // left: 0,
//             width: '100%',
//             opacity: 0,
//             transform: 'translateY(-25px)',
//         }),
//     ], { optional: true }),
//     // Animate the new page in
//     group([
//         query(':enter', [
//             animate('6000ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
//         ], { optional: true }),
//         query(':leave', [
//             animate('6000ms ease', style({ opacity: 0, transform: 'translateY(800px)' }))
//         ], { optional: true })
//     ])
// ]),
// transition(':enter', [
//     style({ transform: 'translateX(100%)', opacity: 0 }),
//     animate('600ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 1 }))
//   ]),
//   transition(':leave', [
//     style({ transform: 'translateX(0%)', opacity: 1 }),
//     animate('0ms ease-in', style({ transform: 'translateX(100%)', 'opacity': 0 }))
//   ])
// query(':enter, :leave', style({ position: 'fixed', width: '100%' })),
// group([
//     query(':enter', [
//         style({ transform: 'translateX(100%)' }),
//         animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//     ]),
//     query(':leave', [
//         style({ transform: 'translateX(0%)' }),
//         animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))]),
// ])
// ]);


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _modules_auth_auth_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/auth/auth-routing.module */ "cMCp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




const appRoutes = [
    {
        matcher: _modules_auth_auth_routing_module__WEBPACK_IMPORTED_MODULE_1__["pathMatcher"],
        loadChildren: () => Promise.all(/*! import() | modules-auth-auth-module */[__webpack_require__.e("default~modules-auth-auth-module~modules-checklist-checklist-module"), __webpack_require__.e("modules-auth-auth-module")]).then(__webpack_require__.bind(null, /*! ./modules/auth/auth.module */ "305l")).then(m => m.AuthModule),
    },
    {
        path: '',
        loadChildren: () => Promise.all(/*! import() | modules-checklist-checklist-module */[__webpack_require__.e("default~modules-auth-auth-module~modules-checklist-checklist-module"), __webpack_require__.e("modules-checklist-checklist-module")]).then(__webpack_require__.bind(null, /*! ./modules/checklist/checklist.module */ "nBvY")).then(m => m.ChecklistModule),
        canActivate: [],
        // data: { roles: [Role.Admin, Role.User], animation: 'AllPage' },
        data: { animation: 'AllPage' },
    },
    {
        path: '**',
        redirectTo: '',
        data: { animation: 'AboutPage' }
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(appRoutes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "yE1c":
/*!**************************************!*\
  !*** ./src/app/modules/auth/role.ts ***!
  \**************************************/
/*! exports provided: Role */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Role", function() { return Role; });
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Admin"] = "admin";
})(Role || (Role = {}));


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ }),

/***/ "zpJY":
/*!*******************************************!*\
  !*** ./src/app/shared/error.directive.ts ***!
  \*******************************************/
/*! exports provided: ErrorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorDirective", function() { return ErrorDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");


class ErrorDirective {
    constructor(templateRef, viewContainer, parent) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        if (parent) {
            this.formControl = parent.formDirective;
        }
    }
    set appErrorDirective(controlName) {
        const formControl = this.formControl.form.get(controlName);
        formControl.statusChanges.subscribe((status) => {
            this.updateStatus(status);
        });
        this.updateStatus(formControl.status);
    }
    updateStatus(status) {
        this.viewContainer.clear();
        if (status === 'INVALID') {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
ErrorDirective.ɵfac = function ErrorDirective_Factory(t) { return new (t || ErrorDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ControlContainer"], 13)); };
ErrorDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: ErrorDirective, selectors: [["", "appErrorDirective", ""]], inputs: { appErrorDirective: "appErrorDirective" } });


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map