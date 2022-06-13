(() => {
    var __webpack_modules__ = {
        432: () => {
            if (!Array.prototype.includes) Object.defineProperty(Array.prototype, "includes", {
                value: function(searchElement, fromIndex) {
                    if (null == this) throw new TypeError('"this" is null or not defined');
                    var o = Object(this);
                    var len = o.length >>> 0;
                    if (0 === len) return false;
                    var n = 0 | fromIndex;
                    var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
                    while (k < len) {
                        if (o[k] === searchElement) return true;
                        k++;
                    }
                    return false;
                }
            });
        },
        954: () => {
            if ("function" !== typeof Object.getPrototypeOf) Object.getPrototypeOf = "object" === typeof "test".__proto__ ? function(object) {
                return object.__proto__;
            } : function(object) {
                return object.constructor.prototype;
            };
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        const flsModules = {};
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(2 == webP.height);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = true === support ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    for (let index = 0; index < lock_padding.length; index++) {
                        const el = lock_padding[index];
                        el.style.paddingRight = "0px";
                    }
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                }
                body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        function menuClose() {
            bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
        function FLS(message) {
            setTimeout((() => {
                if (window.FLS) console.log(message);
            }), 0);
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
            const targetBlockElement = document.querySelector(targetBlock);
            if (targetBlockElement) {
                let headerItem = "";
                let headerItemHeight = 0;
                if (noHeader) {
                    headerItem = "header.header";
                    headerItemHeight = document.querySelector(headerItem).offsetHeight;
                }
                let options = {
                    speedAsDuration: true,
                    speed,
                    header: headerItem,
                    offset: offsetTop,
                    easing: "easeOutQuad"
                };
                document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                    targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                    targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                    window.scrollTo({
                        top: targetBlockElementPosition,
                        behavior: "smooth"
                    });
                }
                FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
            } else FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
        };
        function formFieldsInit(options = {
            viewPass: false
        }) {
            const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
            if (formFields.length) formFields.forEach((formField => {
                if (!formField.hasAttribute("data-placeholder-nohide")) formField.dataset.placeholder = formField.placeholder;
            }));
            document.body.addEventListener("focusin", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = "";
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.add("_form-focus");
                        targetElement.parentElement.classList.add("_form-focus");
                    }
                    formValidate.removeError(targetElement);
                }
            }));
            document.body.addEventListener("focusout", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = targetElement.dataset.placeholder;
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.remove("_form-focus");
                        targetElement.parentElement.classList.remove("_form-focus");
                    }
                    if (targetElement.hasAttribute("data-validate")) formValidate.validateInput(targetElement);
                }
            }));
            if (options.viewPass) document.addEventListener("click", (function(e) {
                let targetElement = e.target;
                if (targetElement.closest('[class*="__viewpass"]')) {
                    let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
                    targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
                    targetElement.classList.toggle("_viewpass-active");
                }
            }));
        }
        let formValidate = {
            getErrors(form) {
                let error = 0;
                let formRequiredItems = form.querySelectorAll("*[data-required]");
                if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                    if ((null !== formRequiredItem.offsetParent || "SELECT" === formRequiredItem.tagName) && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
                }));
                return error;
            },
            validateInput(formRequiredItem) {
                let error = 0;
                if ("email" === formRequiredItem.dataset.required) {
                    formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                    if (this.emailTest(formRequiredItem)) {
                        this.addError(formRequiredItem);
                        error++;
                    } else this.removeError(formRequiredItem);
                } else if ("checkbox" === formRequiredItem.type && !formRequiredItem.checked) {
                    this.addError(formRequiredItem);
                    error++;
                } else if (!formRequiredItem.value) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
                return error;
            },
            addError(formRequiredItem) {
                formRequiredItem.classList.add("_form-error");
                formRequiredItem.parentElement.classList.add("_form-error");
                let inputError = formRequiredItem.parentElement.querySelector(".form__error");
                if (inputError) formRequiredItem.parentElement.removeChild(inputError);
                if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
            },
            removeError(formRequiredItem) {
                formRequiredItem.classList.remove("_form-error");
                formRequiredItem.parentElement.classList.remove("_form-error");
                if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
            },
            formClean(form) {
                form.reset();
                setTimeout((() => {
                    let inputs = form.querySelectorAll("input,textarea");
                    for (let index = 0; index < inputs.length; index++) {
                        const el = inputs[index];
                        el.parentElement.classList.remove("_form-focus");
                        el.classList.remove("_form-focus");
                        formValidate.removeError(el);
                    }
                    let checkboxes = form.querySelectorAll(".checkbox__input");
                    if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                        const checkbox = checkboxes[index];
                        checkbox.checked = false;
                    }
                    if (flsModules.select) {
                        let selects = form.querySelectorAll(".select");
                        if (selects.length) for (let index = 0; index < selects.length; index++) {
                            const select = selects[index].querySelector("select");
                            flsModules.select.selectBuild(select);
                        }
                    }
                }), 0);
            },
            emailTest(formRequiredItem) {
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
            }
        };
        function formSubmit(options = {
            validate: true
        }) {
            const forms = document.forms;
            if (forms.length) for (const form of forms) {
                form.addEventListener("submit", (function(e) {
                    const form = e.target;
                    formSubmitAction(form, e);
                }));
                form.addEventListener("reset", (function(e) {
                    const form = e.target;
                    formValidate.formClean(form);
                }));
            }
            async function formSubmitAction(form, e) {
                const error = !form.hasAttribute("data-no-validate") ? formValidate.getErrors(form) : 0;
                if (0 === error) {
                    const ajax = form.hasAttribute("data-ajax");
                    if (ajax) {
                        e.preventDefault();
                        const formAction = form.getAttribute("action") ? form.getAttribute("action").trim() : "#";
                        const formMethod = form.getAttribute("method") ? form.getAttribute("method").trim() : "GET";
                        const formData = new FormData(form);
                        form.classList.add("_sending");
                        const response = await fetch(formAction, {
                            method: formMethod,
                            body: formData
                        });
                        if (response.ok) {
                            await response.json();
                            form.classList.remove("_sending");
                            formSent(form);
                        } else {
                            alert("Ошибка");
                            form.classList.remove("_sending");
                        }
                    } else if (form.hasAttribute("data-dev")) {
                        e.preventDefault();
                        formSent(form);
                    }
                } else {
                    e.preventDefault();
                    const formError = form.querySelector("._form-error");
                    if (formError && form.hasAttribute("data-goto-error")) gotoblock_gotoBlock(formError, true, 1e3);
                }
            }
            function formSent(form) {
                document.dispatchEvent(new CustomEvent("formSent", {
                    detail: {
                        form
                    }
                }));
                setTimeout((() => {
                    if (flsModules.popup) {
                        const popup = form.dataset.popupMessage;
                        popup ? flsModules.popup.open(popup) : null;
                    }
                }), 0);
                formValidate.formClean(form);
                formLogging(`Форма отправлена!`);
            }
            function formLogging(message) {
                FLS(`[Формы]: ${message}`);
            }
        }
        __webpack_require__(954);
        __webpack_require__(432);
        const keycode_namespaceObject = JSON.parse('{"ZH":8,"ol":127,"yY":46,"WV":40,"uR":35,"K5":13,"hY":27,"Sd":36,"Jm":45,"RL":37,"VM":34,"Ku":33,"pX":39,"L_":32,"Mf":9,"UP":38,"X":88,"ee":19,"w2":229}');
        function getLocator(tst, align) {
            var locator = (void 0 != tst.alternation ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
            if ("" !== locator) while (locator.length < align) locator += "0";
            return locator;
        }
        function getDecisionTaker(tst) {
            var decisionTaker = tst.locator[tst.alternation];
            if ("string" == typeof decisionTaker && decisionTaker.length > 0) decisionTaker = decisionTaker.split(",")[0];
            return void 0 !== decisionTaker ? decisionTaker.toString() : "";
        }
        function getPlaceholder(pos, test, returnPL) {
            const inputmask = this, opts = this.opts, maskset = this.maskset;
            test = test || getTest.call(inputmask, pos).match;
            if (void 0 !== test.placeholder || true === returnPL) return "function" === typeof test.placeholder ? test.placeholder(opts) : test.placeholder; else if (true === test.static) {
                if (pos > -1 && void 0 === maskset.validPositions[pos]) {
                    var prevTest, tests = getTests.call(inputmask, pos), staticAlternations = [];
                    if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if ("" !== tests[i].match.def && true !== tests[i].match.optionality && true !== tests[i].match.optionalQuantifier && (true === tests[i].match.static || void 0 === prevTest || false !== tests[i].match.fn.test(prevTest.match.def, maskset, pos, true, opts))) {
                        staticAlternations.push(tests[i]);
                        if (true === tests[i].match.static) prevTest = tests[i];
                        if (staticAlternations.length > 1) if (/[0-9a-bA-Z]/.test(staticAlternations[0].match.def)) return opts.placeholder.charAt(pos % opts.placeholder.length);
                    }
                }
                return test.def;
            }
            return opts.placeholder.charAt(pos % opts.placeholder.length);
        }
        function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
            var inputmask = this, opts = this.opts, maskset = this.maskset;
            var greedy = opts.greedy;
            if (clearOptionalTail && opts.greedy) {
                opts.greedy = false;
                inputmask.maskset.tests = {};
            }
            minimalPos = minimalPos || 0;
            var ndxIntlzr, test, testPos, jitRenderStatic, maskTemplate = [], pos = 0;
            do {
                if (true === baseOnInput && maskset.validPositions[pos]) {
                    testPos = clearOptionalTail && maskset.validPositions[pos].match.optionality && void 0 === maskset.validPositions[pos + 1] && (true === maskset.validPositions[pos].generatedInput || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && pos > 0) ? determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos];
                    test = testPos.match;
                    ndxIntlzr = testPos.locator.slice();
                    maskTemplate.push(true === includeMode ? testPos.input : false === includeMode ? test.nativeDef : getPlaceholder.call(inputmask, pos, test));
                } else {
                    testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
                    test = testPos.match;
                    ndxIntlzr = testPos.locator.slice();
                    var jitMasking = true === noJit ? false : false !== opts.jitMasking ? opts.jitMasking : test.jit;
                    jitRenderStatic = (jitRenderStatic && test.static && test.def !== opts.groupSeparator && null === test.fn || maskset.validPositions[pos - 1] && test.static && test.def !== opts.groupSeparator && null === test.fn) && maskset.tests[pos] && 1 === maskset.tests[pos].length;
                    if (jitRenderStatic || false === jitMasking || void 0 === jitMasking || "number" === typeof jitMasking && isFinite(jitMasking) && jitMasking > pos) maskTemplate.push(false === includeMode ? test.nativeDef : getPlaceholder.call(inputmask, pos, test)); else jitRenderStatic = false;
                }
                pos++;
            } while (true !== test.static || "" !== test.def || minimalPos > pos);
            if ("" === maskTemplate[maskTemplate.length - 1]) maskTemplate.pop();
            if (false !== includeMode || void 0 === maskset.maskLength) maskset.maskLength = pos - 1;
            opts.greedy = greedy;
            return maskTemplate;
        }
        function getTestTemplate(pos, ndxIntlzr, tstPs) {
            var inputmask = this, maskset = this.maskset;
            return maskset.validPositions[pos] || determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
        }
        function determineTestTemplate(pos, tests) {
            var inputmask = this, opts = this.opts;
            var optionalityLevel = determineOptionalityLevel(pos, tests);
            pos = pos > 0 ? pos - 1 : 0;
            var tstLocator, closest, bestMatch, altTest = getTest.call(inputmask, pos), targetLocator = getLocator(altTest);
            if (opts.greedy && tests.length > 1 && "" === tests[tests.length - 1].match.def) tests.pop();
            for (var ndx = 0; ndx < tests.length; ndx++) {
                var tst = tests[ndx];
                tstLocator = getLocator(tst, targetLocator.length);
                var distance = Math.abs(tstLocator - targetLocator);
                if (void 0 === closest || "" !== tstLocator && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && bestMatch.match.optionality - optionalityLevel > 0 && "master" === bestMatch.match.newBlockMarker && (!tst.match.optionality || tst.match.optionality - optionalityLevel < 1 || !tst.match.newBlockMarker) || bestMatch && !opts.greedy && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) {
                    closest = distance;
                    bestMatch = tst;
                }
            }
            return bestMatch;
        }
        function determineOptionalityLevel(pos, tests) {
            let optionalityLevel = 0, differentOptionalLevels = false;
            tests.forEach((test => {
                if (test.match.optionality) {
                    if (0 !== optionalityLevel && optionalityLevel !== test.match.optionality) differentOptionalLevels = true;
                    if (0 === optionalityLevel || optionalityLevel > test.match.optionality) optionalityLevel = test.match.optionality;
                }
            }));
            if (optionalityLevel) if (0 == pos) optionalityLevel = 0; else if (1 == tests.length) optionalityLevel = 0; else if (!differentOptionalLevels) optionalityLevel = 0;
            return optionalityLevel;
        }
        function getTest(pos, tests) {
            var inputmask = this, maskset = this.maskset;
            if (maskset.validPositions[pos]) return maskset.validPositions[pos];
            return (tests || getTests.call(inputmask, pos))[0];
        }
        function isSubsetOf(source, target, opts) {
            function expand(pattern) {
                var end, expanded = [], start = -1;
                for (var i = 0, l = pattern.length; i < l; i++) if ("-" === pattern.charAt(i)) {
                    end = pattern.charCodeAt(i + 1);
                    while (++start < end) expanded.push(String.fromCharCode(start));
                } else {
                    start = pattern.charCodeAt(i);
                    expanded.push(pattern.charAt(i));
                }
                return expanded.join("");
            }
            if (source.match.def === target.match.nativeDef) return true;
            if ((opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) && true !== source.match.static && true !== target.match.static) return -1 !== expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, "")));
            return false;
        }
        function getTests(pos, ndxIntlzr, tstPs) {
            var latestMatch, inputmask = this, $ = this.dependencyLib, maskset = this.maskset, opts = this.opts, el = this.el, maskTokens = maskset.maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [ 0 ], matches = [], insertStop = false, cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
            function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                function handleMatch(match, loopNdx, quantifierRecurse) {
                    function isFirstMatch(latestMatch, tokenGroup) {
                        var firstMatch = 0 === tokenGroup.matches.indexOf(latestMatch);
                        if (!firstMatch) tokenGroup.matches.every((function(match, ndx) {
                            if (true === match.isQuantifier) firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]); else if (Object.prototype.hasOwnProperty.call(match, "matches")) firstMatch = isFirstMatch(latestMatch, match);
                            if (firstMatch) return false;
                            return true;
                        }));
                        return firstMatch;
                    }
                    function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                        var bestMatch, indexPos;
                        if (maskset.tests[pos] || maskset.validPositions[pos]) (maskset.tests[pos] || [ maskset.validPositions[pos] ]).every((function(lmnt, ndx) {
                            if (lmnt.mloc[alternateNdx]) {
                                bestMatch = lmnt;
                                return false;
                            }
                            var alternation = void 0 !== targetAlternation ? targetAlternation : lmnt.alternation, ndxPos = void 0 !== lmnt.locator[alternation] ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                            if ((void 0 === indexPos || ndxPos < indexPos) && -1 !== ndxPos) {
                                bestMatch = lmnt;
                                indexPos = ndxPos;
                            }
                            return true;
                        }));
                        if (bestMatch) {
                            var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation];
                            var locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
                            return locator.slice((void 0 !== targetAlternation ? targetAlternation : bestMatch.alternation) + 1);
                        } else return void 0 !== targetAlternation ? resolveNdxInitializer(pos, alternateNdx) : void 0;
                    }
                    function staticCanMatchDefinition(source, target) {
                        return true === source.match.static && true !== target.match.static ? target.match.fn.test(source.match.def, maskset, pos, false, opts, false) : false;
                    }
                    function setMergeLocators(targetMatch, altMatch) {
                        var alternationNdx = targetMatch.alternation, shouldMerge = void 0 === altMatch || alternationNdx === altMatch.alternation && -1 === targetMatch.locator[alternationNdx].toString().indexOf(altMatch.locator[alternationNdx]);
                        if (!shouldMerge && alternationNdx > altMatch.alternation) for (var i = altMatch.alternation; i < alternationNdx; i++) if (targetMatch.locator[i] !== altMatch.locator[i]) {
                            alternationNdx = i;
                            shouldMerge = true;
                            break;
                        }
                        if (shouldMerge) {
                            targetMatch.mloc = targetMatch.mloc || {};
                            var locNdx = targetMatch.locator[alternationNdx];
                            if (void 0 === locNdx) targetMatch.alternation = void 0; else {
                                if ("string" === typeof locNdx) locNdx = locNdx.split(",")[0];
                                if (void 0 === targetMatch.mloc[locNdx]) targetMatch.mloc[locNdx] = targetMatch.locator.slice();
                                if (void 0 !== altMatch) {
                                    for (var ndx in altMatch.mloc) {
                                        if ("string" === typeof ndx) ndx = ndx.split(",")[0];
                                        if (void 0 === targetMatch.mloc[ndx]) targetMatch.mloc[ndx] = altMatch.mloc[ndx];
                                    }
                                    targetMatch.locator[alternationNdx] = Object.keys(targetMatch.mloc).join(",");
                                }
                                return true;
                            }
                        }
                        return false;
                    }
                    function isSameLevel(targetMatch, altMatch) {
                        if (targetMatch.locator.length !== altMatch.locator.length) return false;
                        for (let locNdx = targetMatch.alternation + 1; locNdx < targetMatch.locator.length; locNdx++) if (targetMatch.locator[locNdx] !== altMatch.locator[locNdx]) return false;
                        return true;
                    }
                    if (testPos > pos + opts._maxTestPos) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
                    if (testPos === pos && void 0 === match.matches) {
                        matches.push({
                            match,
                            locator: loopNdx.reverse(),
                            cd: cacheDependency,
                            mloc: {}
                        });
                        if (match.optionality && void 0 === quantifierRecurse && (opts.definitions && opts.definitions[match.nativeDef] && opts.definitions[match.nativeDef].optional || lib_inputmask.prototype.definitions[match.nativeDef] && lib_inputmask.prototype.definitions[match.nativeDef].optional)) {
                            insertStop = true;
                            testPos = pos;
                        } else return true;
                    } else if (void 0 !== match.matches) if (match.isGroup && quantifierRecurse !== match) {
                        match = handleMatch(maskToken.matches[maskToken.matches.indexOf(match) + 1], loopNdx, quantifierRecurse);
                        if (match) return true;
                    } else if (match.isOptional) {
                        var optionalToken = match, mtchsNdx = matches.length;
                        match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                        if (match) {
                            matches.forEach((function(mtch, ndx) {
                                if (ndx >= mtchsNdx) mtch.match.optionality = mtch.match.optionality ? mtch.match.optionality + 1 : 1;
                            }));
                            latestMatch = matches[matches.length - 1].match;
                            if (void 0 === quantifierRecurse && isFirstMatch(latestMatch, optionalToken)) {
                                insertStop = true;
                                testPos = pos;
                            } else return true;
                        }
                    } else if (match.isAlternator) {
                        var maltMatches, alternateToken = match, malternateMatches = [], currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, unMatchedAlternation = false;
                        var altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                        if (-1 === altIndex || "string" === typeof altIndex) {
                            var amndx, currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [];
                            if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx.toString());
                            if (void 0 !== maskset.excludes[pos]) {
                                var altIndexArrClone = altIndexArr.slice();
                                for (var i = 0, exl = maskset.excludes[pos].length; i < exl; i++) {
                                    var excludeSet = maskset.excludes[pos][i].toString().split(":");
                                    if (loopNdx.length == excludeSet[1]) altIndexArr.splice(altIndexArr.indexOf(excludeSet[0]), 1);
                                }
                                if (0 === altIndexArr.length) {
                                    delete maskset.excludes[pos];
                                    altIndexArr = altIndexArrClone;
                                }
                            }
                            if (true === opts.keepStatic || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) altIndexArr = altIndexArr.slice(0, 1);
                            for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                                amndx = parseInt(altIndexArr[ndx]);
                                matches = [];
                                ndxInitializer = "string" === typeof altIndex ? resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice() : ndxInitializerClone.slice();
                                var tokenMatch = alternateToken.matches[amndx];
                                if (tokenMatch && handleMatch(tokenMatch, [ amndx ].concat(loopNdx), quantifierRecurse)) match = true; else {
                                    if (0 === ndx) unMatchedAlternation = true;
                                    if (tokenMatch && tokenMatch.matches && tokenMatch.matches.length > alternateToken.matches[0].matches.length) break;
                                }
                                maltMatches = matches.slice();
                                testPos = currentPos;
                                matches = [];
                                for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                    var altMatch = maltMatches[ndx1], dropMatch = false;
                                    altMatch.match.jit = altMatch.match.jit || unMatchedAlternation;
                                    altMatch.alternation = altMatch.alternation || loopNdxCnt;
                                    setMergeLocators(altMatch);
                                    for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                        var altMatch2 = malternateMatches[ndx2];
                                        if ("string" !== typeof altIndex || void 0 !== altMatch.alternation && altIndexArr.includes(altMatch.locator[altMatch.alternation].toString())) if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                                            dropMatch = true;
                                            setMergeLocators(altMatch2, altMatch);
                                            break;
                                        } else if (isSubsetOf(altMatch, altMatch2, opts)) {
                                            if (setMergeLocators(altMatch, altMatch2)) {
                                                dropMatch = true;
                                                malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                                            }
                                            break;
                                        } else if (isSubsetOf(altMatch2, altMatch, opts)) {
                                            setMergeLocators(altMatch2, altMatch);
                                            break;
                                        } else if (staticCanMatchDefinition(altMatch, altMatch2)) {
                                            if (!isSameLevel(altMatch, altMatch2) && void 0 === el.inputmask.userOptions.keepStatic) opts.keepStatic = true; else if (setMergeLocators(altMatch, altMatch2)) {
                                                dropMatch = true;
                                                malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                                            }
                                            break;
                                        }
                                    }
                                    if (!dropMatch) malternateMatches.push(altMatch);
                                }
                            }
                            matches = currentMatches.concat(malternateMatches);
                            testPos = pos;
                            insertStop = matches.length > 0;
                            match = malternateMatches.length > 0;
                            ndxInitializer = ndxInitializerClone.slice();
                        } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse);
                        if (match) return true;
                    } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[maskToken.matches.indexOf(match) - 1]) {
                        var qt = match;
                        for (var qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                            var tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];
                            match = handleMatch(tokenGroup, [ qndx ].concat(loopNdx), tokenGroup);
                            if (match) {
                                latestMatch = matches[matches.length - 1].match;
                                latestMatch.optionalQuantifier = qndx >= qt.quantifier.min;
                                latestMatch.jit = (qndx + 1) * (tokenGroup.matches.indexOf(latestMatch) + 1) > qt.quantifier.jit;
                                if (latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                                    insertStop = true;
                                    testPos = pos;
                                    break;
                                }
                                if (latestMatch.jit) maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch);
                                return true;
                            }
                        }
                    } else {
                        match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                        if (match) return true;
                    } else testPos++;
                }
                for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (true !== maskToken.matches[tndx].isQuantifier) {
                    var match = handleMatch(maskToken.matches[tndx], [ tndx ].concat(loopNdx), quantifierRecurse);
                    if (match && testPos === pos) return match; else if (testPos > pos) break;
                }
            }
            function mergeLocators(pos, tests) {
                let alternation, locator = [];
                if (!Array.isArray(tests)) tests = [ tests ];
                if (tests.length > 0) if (void 0 === tests[0].alternation || true === opts.keepStatic) {
                    locator = determineTestTemplate.call(inputmask, pos, tests.slice()).locator.slice();
                    if (0 === locator.length) locator = tests[0].locator.slice();
                } else tests.forEach((function(tst) {
                    if ("" !== tst.def) if (0 === locator.length) {
                        alternation = tst.alternation;
                        locator = tst.locator.slice();
                    } else if (tst.locator[alternation] && -1 === locator[alternation].toString().indexOf(tst.locator[alternation])) locator[alternation] += "," + tst.locator[alternation];
                }));
                return locator;
            }
            if (pos > -1) {
                if (void 0 === ndxIntlzr) {
                    var test, previousPos = pos - 1;
                    while (void 0 === (test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) && previousPos > -1) previousPos--;
                    if (void 0 !== test && previousPos > -1) {
                        ndxInitializer = mergeLocators(previousPos, test);
                        cacheDependency = ndxInitializer.join("");
                        testPos = previousPos;
                    }
                }
                if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) return maskset.tests[pos];
                for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                    var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [ mtndx ]);
                    if (match && testPos === pos || testPos > pos) break;
                }
            }
            if (0 === matches.length || insertStop) matches.push({
                match: {
                    fn: null,
                    static: true,
                    optionality: false,
                    casing: null,
                    def: "",
                    placeholder: ""
                },
                locator: [],
                mloc: {},
                cd: cacheDependency
            });
            var result;
            if (void 0 !== ndxIntlzr && maskset.tests[pos]) result = $.extend(true, [], matches); else {
                maskset.tests[pos] = $.extend(true, [], matches);
                result = maskset.tests[pos];
            }
            matches.forEach((t => {
                t.match.optionality = false;
            }));
            return result;
        }
        const canUseDOM = !!("undefined" !== typeof window && window.document && window.document.createElement);
        const lib_canUseDOM = canUseDOM;
        const global_window = lib_canUseDOM ? window : {};
        const ua = global_window.navigator && global_window.navigator.userAgent || "", ie = ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident/") > 0, mobile = "ontouchstart" in global_window, iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile;
        function applyInputValue(input, value) {
            const inputmask = input ? input.inputmask : this, opts = inputmask.opts;
            input.inputmask.refreshValue = false;
            if ("function" === typeof opts.onBeforeMask) value = opts.onBeforeMask.call(inputmask, value, opts) || value;
            value = value.toString().split("");
            checkVal(input, true, false, value);
            inputmask.undoValue = inputmask._valueGet(true);
            if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate.call(inputmask).join("") && -1 === getLastValidPosition.call(inputmask)) input.inputmask._valueSet("");
        }
        function clearOptionalTail(buffer) {
            const inputmask = this;
            buffer.length = 0;
            var lmnt, template = getMaskTemplate.call(inputmask, true, 0, true, void 0, true);
            while (void 0 !== (lmnt = template.shift())) buffer.push(lmnt);
            return buffer;
        }
        function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
            const inputmask = input ? input.inputmask : this, maskset = inputmask.maskset, opts = inputmask.opts, $ = inputmask.dependencyLib;
            var inputValue = nptvl.slice(), charCodes = "", initialNdx = -1, result = void 0, skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
            opts.skipOptionalPartCharacter = "";
            function isTemplateMatch(ndx, charCodes) {
                var targetTemplate = getMaskTemplate.call(inputmask, true, 0).slice(ndx, seekNext.call(inputmask, ndx, false, false)).join("").replace(/'/g, ""), charCodeNdx = targetTemplate.indexOf(charCodes);
                while (charCodeNdx > 0 && " " === targetTemplate[charCodeNdx - 1]) charCodeNdx--;
                var match = 0 === charCodeNdx && !isMask.call(inputmask, ndx) && (getTest.call(inputmask, ndx).match.nativeDef === charCodes.charAt(0) || true === getTest.call(inputmask, ndx).match.static && getTest.call(inputmask, ndx).match.nativeDef === "'" + charCodes.charAt(0) || " " === getTest.call(inputmask, ndx).match.nativeDef && (getTest.call(inputmask, ndx + 1).match.nativeDef === charCodes.charAt(0) || true === getTest.call(inputmask, ndx + 1).match.static && getTest.call(inputmask, ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
                if (!match && charCodeNdx > 0 && !isMask.call(inputmask, ndx, false, true)) {
                    var nextPos = seekNext.call(inputmask, ndx);
                    if (inputmask.caretPos.begin < nextPos) inputmask.caretPos = {
                        begin: nextPos
                    };
                }
                return match;
            }
            resetMaskSet.call(inputmask);
            maskset.tests = {};
            initialNdx = opts.radixPoint ? determineNewCaretPosition.call(inputmask, {
                begin: 0,
                end: 0
            }, false, false === opts.__financeInput ? "radixFocus" : void 0).begin : 0;
            maskset.p = initialNdx;
            inputmask.caretPos = {
                begin: initialNdx
            };
            var staticMatches = [], prevCaretPos = inputmask.caretPos;
            inputValue.forEach((function(charCode, ndx) {
                if (void 0 !== charCode) {
                    var keypress = new $.Event("_checkval");
                    keypress.keyCode = charCode.toString().charCodeAt(0);
                    charCodes += charCode;
                    var lvp = getLastValidPosition.call(inputmask, void 0, true);
                    if (!isTemplateMatch(initialNdx, charCodes)) {
                        result = EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, inputmask.caretPos.begin);
                        if (result) {
                            initialNdx = inputmask.caretPos.begin + 1;
                            charCodes = "";
                        }
                    } else result = EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, lvp + 1);
                    if (result) {
                        if (void 0 !== result.pos && maskset.validPositions[result.pos] && true === maskset.validPositions[result.pos].match.static && void 0 === maskset.validPositions[result.pos].alternation) {
                            staticMatches.push(result.pos);
                            if (!inputmask.isRTL) result.forwardPosition = result.pos + 1;
                        }
                        writeBuffer.call(inputmask, void 0, getBuffer.call(inputmask), result.forwardPosition, keypress, false);
                        inputmask.caretPos = {
                            begin: result.forwardPosition,
                            end: result.forwardPosition
                        };
                        prevCaretPos = inputmask.caretPos;
                    } else if (void 0 === maskset.validPositions[ndx] && inputValue[ndx] === getPlaceholder.call(inputmask, ndx) && isMask.call(inputmask, ndx, true)) inputmask.caretPos.begin++; else inputmask.caretPos = prevCaretPos;
                }
            }));
            if (staticMatches.length > 0) {
                var sndx, validPos, nextValid = seekNext.call(inputmask, -1, void 0, false);
                if (!isComplete.call(inputmask, getBuffer.call(inputmask)) && staticMatches.length <= nextValid || isComplete.call(inputmask, getBuffer.call(inputmask)) && staticMatches.length > 0 && staticMatches.length !== nextValid && 0 === staticMatches[0]) {
                    var nextSndx = nextValid;
                    while (void 0 !== (sndx = staticMatches.shift())) {
                        var keypress = new $.Event("_checkval");
                        validPos = maskset.validPositions[sndx];
                        validPos.generatedInput = true;
                        keypress.keyCode = validPos.input.charCodeAt(0);
                        result = EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, nextSndx);
                        if (result && void 0 !== result.pos && result.pos !== sndx && maskset.validPositions[result.pos] && true === maskset.validPositions[result.pos].match.static) staticMatches.push(result.pos); else if (!result) break;
                        nextSndx++;
                    }
                }
            }
            if (writeOut) writeBuffer.call(inputmask, input, getBuffer.call(inputmask), result ? result.forwardPosition : inputmask.caretPos.begin, initiatingEvent || new $.Event("checkval"), initiatingEvent && ("input" === initiatingEvent.type && inputmask.undoValue !== getBuffer.call(inputmask).join("") || "paste" === initiatingEvent.type));
            opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
        }
        function HandleNativePlaceholder(npt, value) {
            const inputmask = npt ? npt.inputmask : this;
            if (ie) {
                if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || "" === npt.placeholder)) {
                    var buffer = getBuffer.call(inputmask).slice(), nptValue = npt.inputmask._valueGet();
                    if (nptValue !== value) {
                        var lvp = getLastValidPosition.call(inputmask);
                        if (-1 === lvp && nptValue === getBufferTemplate.call(inputmask).join("")) buffer = []; else if (-1 !== lvp) clearOptionalTail.call(inputmask, buffer);
                        writeBuffer(npt, buffer);
                    }
                }
            } else if (npt.placeholder !== value) {
                npt.placeholder = value;
                if ("" === npt.placeholder) npt.removeAttribute("placeholder");
            }
        }
        function unmaskedvalue(input) {
            const inputmask = input ? input.inputmask : this, opts = inputmask.opts, maskset = inputmask.maskset;
            if (input) {
                if (void 0 === input.inputmask) return input.value;
                if (input.inputmask && input.inputmask.refreshValue) applyInputValue(input, input.inputmask._valueGet(true));
            }
            var umValue = [], vps = maskset.validPositions;
            for (var pndx in vps) if (vps[pndx] && vps[pndx].match && (true != vps[pndx].match.static || Array.isArray(maskset.metadata) && true !== vps[pndx].generatedInput)) umValue.push(vps[pndx].input);
            var unmaskedValue = 0 === umValue.length ? "" : (inputmask.isRTL ? umValue.reverse() : umValue).join("");
            if ("function" === typeof opts.onUnMask) {
                var bufferValue = (inputmask.isRTL ? getBuffer.call(inputmask).slice().reverse() : getBuffer.call(inputmask)).join("");
                unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
            }
            return unmaskedValue;
        }
        function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
            const inputmask = input ? input.inputmask : this, opts = inputmask.opts, $ = inputmask.dependencyLib;
            if (event && "function" === typeof opts.onBeforeWrite) {
                var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
                if (result) {
                    if (result.refreshFromBuffer) {
                        var refresh = result.refreshFromBuffer;
                        refreshFromBuffer.call(inputmask, true === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer);
                        buffer = getBuffer.call(inputmask, true);
                    }
                    if (void 0 !== caretPos) caretPos = void 0 !== result.caret ? result.caret : caretPos;
                }
            }
            if (void 0 !== input) {
                input.inputmask._valueSet(buffer.join(""));
                if (void 0 !== caretPos && (void 0 === event || "blur" !== event.type)) caret.call(inputmask, input, caretPos, void 0, void 0, void 0 !== event && "keydown" === event.type && (event.keyCode === keycode_namespaceObject.yY || event.keyCode === keycode_namespaceObject.ZH));
                if (true === triggerEvents) {
                    var $input = $(input), nptVal = input.inputmask._valueGet();
                    input.inputmask.skipInputEvent = true;
                    $input.trigger("input");
                    setTimeout((function() {
                        if (nptVal === getBufferTemplate.call(inputmask).join("")) $input.trigger("cleared"); else if (true === isComplete.call(inputmask, buffer)) $input.trigger("complete");
                    }), 0);
                }
            }
        }
        var EventHandlers = {
            keydownEvent: function(e) {
                const inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib, maskset = inputmask.maskset;
                var input = this, $input = $(input), k = e.keyCode, pos = caret.call(inputmask, input);
                var kdResult = opts.onKeyDown.call(this, e, getBuffer.call(inputmask), pos, opts);
                if (void 0 !== kdResult) return kdResult;
                if (k === keycode_namespaceObject.ZH || k === keycode_namespaceObject.yY || iphone && k === keycode_namespaceObject.ol || e.ctrlKey && k === keycode_namespaceObject.X && !("oncut" in input)) {
                    e.preventDefault();
                    handleRemove.call(inputmask, input, k, pos);
                    writeBuffer(input, getBuffer.call(inputmask, true), maskset.p, e, input.inputmask._valueGet() !== getBuffer.call(inputmask).join(""));
                } else if (k === keycode_namespaceObject.uR || k === keycode_namespaceObject.VM) {
                    e.preventDefault();
                    var caretPos = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
                    caret.call(inputmask, input, e.shiftKey ? pos.begin : caretPos, caretPos, true);
                } else if (k === keycode_namespaceObject.Sd && !e.shiftKey || k === keycode_namespaceObject.Ku) {
                    e.preventDefault();
                    caret.call(inputmask, input, 0, e.shiftKey ? pos.begin : 0, true);
                } else if ((opts.undoOnEscape && k === keycode_namespaceObject.hY || false && 0) && true !== e.altKey) {
                    checkVal(input, true, false, inputmask.undoValue.split(""));
                    $input.trigger("click");
                } else if (k === keycode_namespaceObject.Jm && !(e.shiftKey || e.ctrlKey) && void 0 === inputmask.userOptions.insertMode) if (!isSelection.call(inputmask, pos)) {
                    opts.insertMode = !opts.insertMode;
                    caret.call(inputmask, input, pos.begin, pos.begin);
                } else opts.insertMode = !opts.insertMode; else if (true === opts.tabThrough && k === keycode_namespaceObject.Mf) if (true === e.shiftKey) {
                    pos.end = seekPrevious.call(inputmask, pos.end, true);
                    if (true === getTest.call(inputmask, pos.end - 1).match.static) pos.end--;
                    pos.begin = seekPrevious.call(inputmask, pos.end, true);
                    if (pos.begin >= 0 && pos.end > 0) {
                        e.preventDefault();
                        caret.call(inputmask, input, pos.begin, pos.end);
                    }
                } else {
                    pos.begin = seekNext.call(inputmask, pos.begin, true);
                    pos.end = seekNext.call(inputmask, pos.begin, true);
                    if (pos.end < maskset.maskLength) pos.end--;
                    if (pos.begin <= maskset.maskLength) {
                        e.preventDefault();
                        caret.call(inputmask, input, pos.begin, pos.end);
                    }
                } else if (!e.shiftKey) if (opts.insertModeVisual && false === opts.insertMode) if (k === keycode_namespaceObject.pX) setTimeout((function() {
                    var caretPos = caret.call(inputmask, input);
                    caret.call(inputmask, input, caretPos.begin);
                }), 0); else if (k === keycode_namespaceObject.RL) setTimeout((function() {
                    var caretPos = {
                        begin: translatePosition.call(inputmask, input.inputmask.caretPos.begin),
                        end: translatePosition.call(inputmask, input.inputmask.caretPos.end)
                    };
                    if (inputmask.isRTL) caret.call(inputmask, input, caretPos.begin + (caretPos.begin === maskset.maskLength ? 0 : 1)); else caret.call(inputmask, input, caretPos.begin - (0 === caretPos.begin ? 0 : 1));
                }), 0);
                inputmask.ignorable = opts.ignorables.includes(k);
            },
            keypressEvent: function(e, checkval, writeOut, strict, ndx) {
                const inputmask = this.inputmask || this, opts = inputmask.opts, $ = inputmask.dependencyLib, maskset = inputmask.maskset;
                var input = inputmask.el, $input = $(input), k = e.keyCode;
                if (true !== checkval && !(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || inputmask.ignorable)) {
                    if (k === keycode_namespaceObject.K5 && inputmask.undoValue !== inputmask._valueGet(true)) {
                        inputmask.undoValue = inputmask._valueGet(true);
                        setTimeout((function() {
                            $input.trigger("change");
                        }), 0);
                    }
                    inputmask.skipInputEvent = true;
                    return true;
                } else if (k) {
                    if ((44 === k || 46 === k) && 3 === e.location && "" !== opts.radixPoint) k = opts.radixPoint.charCodeAt(0);
                    var forwardPosition, pos = checkval ? {
                        begin: ndx,
                        end: ndx
                    } : caret.call(inputmask, input), c = String.fromCharCode(k);
                    c = opts.substitutes[c] || c;
                    maskset.writeOutBuffer = true;
                    var valResult = isValid.call(inputmask, pos, c, strict, void 0, void 0, void 0, checkval);
                    if (false !== valResult) {
                        resetMaskSet.call(inputmask, true);
                        forwardPosition = void 0 !== valResult.caret ? valResult.caret : seekNext.call(inputmask, valResult.pos.begin ? valResult.pos.begin : valResult.pos);
                        maskset.p = forwardPosition;
                    }
                    forwardPosition = opts.numericInput && void 0 === valResult.caret ? seekPrevious.call(inputmask, forwardPosition) : forwardPosition;
                    if (false !== writeOut) {
                        setTimeout((function() {
                            opts.onKeyValidation.call(input, k, valResult);
                        }), 0);
                        if (maskset.writeOutBuffer && false !== valResult) {
                            var buffer = getBuffer.call(inputmask);
                            writeBuffer(input, buffer, forwardPosition, e, true !== checkval);
                        }
                    }
                    e.preventDefault();
                    if (checkval) {
                        if (false !== valResult) valResult.forwardPosition = forwardPosition;
                        return valResult;
                    }
                }
            },
            keyupEvent: function(e) {
                const inputmask = this.inputmask;
                if (inputmask.isComposing && (e.keyCode === keycode_namespaceObject.w2 || e.keyCode === keycode_namespaceObject.K5)) inputmask.$el.trigger("input");
            },
            pasteEvent: function(e) {
                const inputmask = this.inputmask, opts = inputmask.opts;
                var tempValue, input = this, inputValue = inputmask._valueGet(true), caretPos = caret.call(inputmask, input);
                if (inputmask.isRTL) {
                    tempValue = caretPos.end;
                    caretPos.end = translatePosition.call(inputmask, caretPos.begin);
                    caretPos.begin = translatePosition.call(inputmask, tempValue);
                }
                var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                if (valueBeforeCaret == (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
                if (valueAfterCaret == (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).slice(caretPos.end).join("")) valueAfterCaret = "";
                if (window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret; else if (e.clipboardData && e.clipboardData.getData) inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret; else return true;
                var pasteValue = inputValue;
                if (inputmask.isRTL) {
                    pasteValue = pasteValue.split("");
                    for (let c of getBufferTemplate.call(inputmask)) if (pasteValue[0] === c) pasteValue.shift();
                    pasteValue = pasteValue.join("");
                }
                if ("function" === typeof opts.onBeforePaste) {
                    pasteValue = opts.onBeforePaste.call(inputmask, pasteValue, opts);
                    if (false === pasteValue) return false;
                    if (!pasteValue) pasteValue = inputValue;
                }
                checkVal(input, true, false, pasteValue.toString().split(""), e);
                e.preventDefault();
            },
            inputFallBackEvent: function(e) {
                const inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib;
                function ieMobileHandler(input, inputValue, caretPos) {
                    if (iemobile) {
                        var inputChar = inputValue.replace(getBuffer.call(inputmask).join(""), "");
                        if (1 === inputChar.length) {
                            var iv = inputValue.split("");
                            iv.splice(caretPos.begin, 0, inputChar);
                            inputValue = iv.join("");
                        }
                    }
                    return inputValue;
                }
                function analyseChanges(inputValue, buffer, caretPos) {
                    var frontPart = inputValue.substr(0, caretPos.begin).split(""), backPart = inputValue.substr(caretPos.begin).split(""), frontBufferPart = buffer.substr(0, caretPos.begin).split(""), backBufferPart = buffer.substr(caretPos.begin).split("");
                    var bl, i, placeholder, fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length, bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length, action = "", data = [], marker = "~";
                    while (frontPart.length < fpl) frontPart.push(marker);
                    while (frontBufferPart.length < fpl) frontBufferPart.push(marker);
                    while (backPart.length < bpl) backPart.unshift(marker);
                    while (backBufferPart.length < bpl) backBufferPart.unshift(marker);
                    var newBuffer = frontPart.concat(backPart);
                    var oldBuffer = frontBufferPart.concat(backBufferPart);
                    for (i = 0, bl = newBuffer.length; i < bl; i++) {
                        placeholder = getPlaceholder.call(inputmask, translatePosition.call(inputmask, i));
                        switch (action) {
                          case "insertText":
                            if (oldBuffer[i - 1] === newBuffer[i] && caretPos.begin == newBuffer.length - 1) data.push(newBuffer[i]);
                            i = bl;
                            break;

                          case "insertReplacementText":
                            if (newBuffer[i] === marker) caretPos.end++; else i = bl;
                            break;

                          case "deleteContentBackward":
                            if (newBuffer[i] === marker) caretPos.end++; else i = bl;
                            break;

                          default:
                            if (newBuffer[i] !== oldBuffer[i]) if ((newBuffer[i + 1] === marker || newBuffer[i + 1] === placeholder || void 0 === newBuffer[i + 1]) && (oldBuffer[i] === placeholder && oldBuffer[i + 1] === marker || oldBuffer[i] === marker)) {
                                action = "insertText";
                                data.push(newBuffer[i]);
                                caretPos.begin--;
                                caretPos.end--;
                            } else if (oldBuffer[i + 1] === marker && oldBuffer[i] === newBuffer[i + 1]) {
                                action = "insertText";
                                data.push(newBuffer[i]);
                                caretPos.begin--;
                                caretPos.end--;
                            } else if (newBuffer[i] !== placeholder && newBuffer[i] !== marker && (newBuffer[i + 1] === marker || oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1])) {
                                action = "insertReplacementText";
                                data.push(newBuffer[i]);
                                caretPos.begin--;
                            } else if (newBuffer[i] === marker) {
                                action = "deleteContentBackward";
                                if (isMask.call(inputmask, translatePosition.call(inputmask, i), true) || oldBuffer[i] === opts.radixPoint) caretPos.end++;
                            } else i = bl;
                            break;
                        }
                    }
                    return {
                        action,
                        data,
                        caret: caretPos
                    };
                }
                var input = this, inputValue = input.inputmask._valueGet(true), buffer = (inputmask.isRTL ? getBuffer.call(inputmask).slice().reverse() : getBuffer.call(inputmask)).join(""), caretPos = caret.call(inputmask, input, void 0, void 0, true);
                if (buffer !== inputValue) {
                    inputValue = ieMobileHandler(input, inputValue, caretPos);
                    var changes = analyseChanges(inputValue, buffer, caretPos);
                    if ((input.inputmask.shadowRoot || input.ownerDocument).activeElement !== input) input.focus();
                    writeBuffer(input, getBuffer.call(inputmask));
                    caret.call(inputmask, input, caretPos.begin, caretPos.end, true);
                    switch (changes.action) {
                      case "insertText":
                      case "insertReplacementText":
                        changes.data.forEach((function(entry, ndx) {
                            var keypress = new $.Event("keypress");
                            keypress.keyCode = entry.charCodeAt(0);
                            inputmask.ignorable = false;
                            EventHandlers.keypressEvent.call(input, keypress);
                        }));
                        setTimeout((function() {
                            inputmask.$el.trigger("keyup");
                        }), 0);
                        break;

                      case "deleteContentBackward":
                        var keydown = new $.Event("keydown");
                        keydown.keyCode = keycode_namespaceObject.ZH;
                        EventHandlers.keydownEvent.call(input, keydown);
                        break;

                      default:
                        applyInputValue(input, inputValue);
                        break;
                    }
                    e.preventDefault();
                }
            },
            compositionendEvent: function(e) {
                const inputmask = this.inputmask;
                inputmask.isComposing = false;
                inputmask.$el.trigger("input");
            },
            setValueEvent: function(e) {
                const inputmask = this.inputmask;
                var input = this, value = e && e.detail ? e.detail[0] : arguments[1];
                if (void 0 === value) value = input.inputmask._valueGet(true);
                applyInputValue(input, value);
                if (e.detail && void 0 !== e.detail[1] || void 0 !== arguments[2]) caret.call(inputmask, input, e.detail ? e.detail[1] : arguments[2]);
            },
            focusEvent: function(e) {
                const inputmask = this.inputmask, opts = inputmask.opts;
                var input = this, nptValue = input.inputmask._valueGet();
                if (opts.showMaskOnFocus) if (nptValue !== getBuffer.call(inputmask).join("")) writeBuffer(input, getBuffer.call(inputmask), seekNext.call(inputmask, getLastValidPosition.call(inputmask)));
                if (true === opts.positionCaretOnTab && false === inputmask.mouseEnter && (!isComplete.call(inputmask, getBuffer.call(inputmask)) || -1 === getLastValidPosition.call(inputmask))) EventHandlers.clickEvent.apply(input, [ e, true ]);
                inputmask.undoValue = inputmask._valueGet(true);
            },
            invalidEvent: function(e) {
                this.inputmask.validationEvent = true;
            },
            mouseleaveEvent: function() {
                const inputmask = this.inputmask, opts = inputmask.opts;
                var input = this;
                inputmask.mouseEnter = false;
                if (opts.clearMaskOnLostFocus && (input.inputmask.shadowRoot || input.ownerDocument).activeElement !== input) HandleNativePlaceholder(input, inputmask.originalPlaceholder);
            },
            clickEvent: function(e, tabbed) {
                const inputmask = this.inputmask;
                var input = this;
                if ((input.inputmask.shadowRoot || input.ownerDocument).activeElement === input) {
                    var newCaretPosition = determineNewCaretPosition.call(inputmask, caret.call(inputmask, input), tabbed);
                    if (void 0 !== newCaretPosition) caret.call(inputmask, input, newCaretPosition);
                }
            },
            cutEvent: function(e) {
                const inputmask = this.inputmask, maskset = inputmask.maskset;
                var input = this, pos = caret.call(inputmask, input);
                var clipData = inputmask.isRTL ? getBuffer.call(inputmask).slice(pos.end, pos.begin) : getBuffer.call(inputmask).slice(pos.begin, pos.end), clipDataText = inputmask.isRTL ? clipData.reverse().join("") : clipData.join("");
                if (window.navigator.clipboard) window.navigator.clipboard.writeText(clipDataText); else if (window.clipboardData && window.clipboardData.getData) window.clipboardData.setData("Text", clipDataText);
                handleRemove.call(inputmask, input, keycode_namespaceObject.yY, pos);
                writeBuffer(input, getBuffer.call(inputmask), maskset.p, e, inputmask.undoValue !== inputmask._valueGet(true));
            },
            blurEvent: function(e) {
                const inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib;
                var $input = $(this), input = this;
                if (input.inputmask) {
                    HandleNativePlaceholder(input, inputmask.originalPlaceholder);
                    var nptValue = input.inputmask._valueGet(), buffer = getBuffer.call(inputmask).slice();
                    if ("" !== nptValue) {
                        if (opts.clearMaskOnLostFocus) if (-1 === getLastValidPosition.call(inputmask) && nptValue === getBufferTemplate.call(inputmask).join("")) buffer = []; else clearOptionalTail.call(inputmask, buffer);
                        if (false === isComplete.call(inputmask, buffer)) {
                            setTimeout((function() {
                                $input.trigger("incomplete");
                            }), 0);
                            if (opts.clearIncomplete) {
                                resetMaskSet.call(inputmask);
                                if (opts.clearMaskOnLostFocus) buffer = []; else buffer = getBufferTemplate.call(inputmask).slice();
                            }
                        }
                        writeBuffer(input, buffer, void 0, e);
                    }
                    if (inputmask.undoValue !== inputmask._valueGet(true)) {
                        inputmask.undoValue = inputmask._valueGet(true);
                        $input.trigger("change");
                    }
                }
            },
            mouseenterEvent: function() {
                const inputmask = this.inputmask, opts = inputmask.opts;
                var input = this;
                inputmask.mouseEnter = true;
                if ((input.inputmask.shadowRoot || input.ownerDocument).activeElement !== input) {
                    var bufferTemplate = (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).join("");
                    if (inputmask.placeholder !== bufferTemplate && input.placeholder !== inputmask.originalPlaceholder) inputmask.originalPlaceholder = input.placeholder;
                    if (opts.showMaskOnHover) HandleNativePlaceholder(input, bufferTemplate);
                }
            },
            submitEvent: function() {
                const inputmask = this.inputmask, opts = inputmask.opts;
                if (inputmask.undoValue !== inputmask._valueGet(true)) inputmask.$el.trigger("change");
                if (-1 === getLastValidPosition.call(inputmask) && inputmask._valueGet && inputmask._valueGet() === getBufferTemplate.call(inputmask).join("")) inputmask._valueSet("");
                if (opts.clearIncomplete && false === isComplete.call(inputmask, getBuffer.call(inputmask))) inputmask._valueSet("");
                if (opts.removeMaskOnSubmit) {
                    inputmask._valueSet(inputmask.unmaskedvalue(), true);
                    setTimeout((function() {
                        writeBuffer(inputmask.el, getBuffer.call(inputmask));
                    }), 0);
                }
            },
            resetEvent: function() {
                const inputmask = this.inputmask;
                inputmask.refreshValue = true;
                setTimeout((function() {
                    applyInputValue(inputmask.el, inputmask._valueGet(true));
                }), 0);
            }
        };
        function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
            const inputmask = this, $ = this.dependencyLib, opts = this.opts, maskset = inputmask.maskset;
            var lastAlt, alternation, altPos, prevAltPos, i, validPos, decisionPos, nextPos, input, begin, end, validPsClone = $.extend(true, {}, maskset.validPositions), tstClone = $.extend(true, {}, maskset.tests), isValidRslt = false, returnRslt = false, lAltPos = void 0 !== rAltPos ? rAltPos : getLastValidPosition.call(inputmask);
            if (selection) {
                begin = selection.begin;
                end = selection.end;
                if (selection.begin > selection.end) {
                    begin = selection.end;
                    end = selection.begin;
                }
            }
            if (-1 === lAltPos && void 0 === rAltPos) {
                lastAlt = 0;
                prevAltPos = getTest.call(inputmask, lastAlt);
                alternation = prevAltPos.alternation;
            } else for (;lAltPos >= 0; lAltPos--) {
                altPos = maskset.validPositions[lAltPos];
                if (altPos && void 0 !== altPos.alternation) {
                    if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
                    lastAlt = lAltPos;
                    alternation = maskset.validPositions[lastAlt].alternation;
                    prevAltPos = altPos;
                }
            }
            if (void 0 !== alternation) {
                decisionPos = parseInt(lastAlt);
                maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [];
                if (true !== maskPos) maskset.excludes[decisionPos].push(getDecisionTaker(prevAltPos) + ":" + prevAltPos.alternation);
                var validInputs = [], resultPos = -1;
                for (i = decisionPos; i < getLastValidPosition.call(inputmask, void 0, true) + 1; i++) {
                    if (-1 === resultPos && maskPos <= i && void 0 !== c) {
                        validInputs.push(c);
                        resultPos = validInputs.length - 1;
                    }
                    validPos = maskset.validPositions[i];
                    if (validPos && true !== validPos.generatedInput && (void 0 === selection || i < begin || i >= end)) validInputs.push(validPos.input);
                    delete maskset.validPositions[i];
                }
                if (-1 === resultPos && void 0 !== c) {
                    validInputs.push(c);
                    resultPos = validInputs.length - 1;
                }
                while (void 0 !== maskset.excludes[decisionPos] && maskset.excludes[decisionPos].length < 10) {
                    maskset.tests = {};
                    resetMaskSet.call(inputmask, true);
                    isValidRslt = true;
                    for (i = 0; i < validInputs.length; i++) {
                        nextPos = isValidRslt.caret || getLastValidPosition.call(inputmask, void 0, true) + 1;
                        input = validInputs[i];
                        if (!(isValidRslt = isValid.call(inputmask, nextPos, input, false, fromIsValid, true))) break;
                        if (i === resultPos) returnRslt = isValidRslt;
                        if (true == maskPos && isValidRslt) returnRslt = {
                            caretPos: i
                        };
                    }
                    if (!isValidRslt) {
                        resetMaskSet.call(inputmask);
                        prevAltPos = getTest.call(inputmask, decisionPos);
                        maskset.validPositions = $.extend(true, {}, validPsClone);
                        maskset.tests = $.extend(true, {}, tstClone);
                        if (maskset.excludes[decisionPos]) {
                            var decisionTaker = getDecisionTaker(prevAltPos);
                            if (-1 !== maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation)) {
                                returnRslt = alternate.call(inputmask, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                                break;
                            }
                            maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation);
                            for (i = decisionPos; i < getLastValidPosition.call(inputmask, void 0, true) + 1; i++) delete maskset.validPositions[i];
                        } else {
                            returnRslt = alternate.call(inputmask, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                            break;
                        }
                    } else break;
                }
            }
            if (!returnRslt || false !== opts.keepStatic) delete maskset.excludes[decisionPos];
            return returnRslt;
        }
        function casing(elem, test, pos) {
            const opts = this.opts, maskset = this.maskset;
            switch (opts.casing || test.casing) {
              case "upper":
                elem = elem.toUpperCase();
                break;

              case "lower":
                elem = elem.toLowerCase();
                break;

              case "title":
                var posBefore = maskset.validPositions[pos - 1];
                if (0 === pos || posBefore && posBefore.input === String.fromCharCode(keycode_namespaceObject.L_)) elem = elem.toUpperCase(); else elem = elem.toLowerCase();
                break;

              default:
                if ("function" === typeof opts.casing) {
                    var args = Array.prototype.slice.call(arguments);
                    args.push(maskset.validPositions);
                    elem = opts.casing.apply(this, args);
                }
            }
            return elem;
        }
        function checkAlternationMatch(altArr1, altArr2, na) {
            const opts = this.opts;
            var naNdx, altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = false, naArr = void 0 !== na ? na.split(",") : [];
            for (var i = 0; i < naArr.length; i++) if (-1 !== (naNdx = altArr1.indexOf(naArr[i]))) altArr1.splice(naNdx, 1);
            for (var alndx = 0; alndx < altArr1.length; alndx++) if (altArrC.includes(altArr1[alndx])) {
                isMatch = true;
                break;
            }
            return isMatch;
        }
        function handleRemove(input, k, pos, strict, fromIsValid) {
            const inputmask = this, maskset = this.maskset, opts = this.opts;
            if (opts.numericInput || inputmask.isRTL) {
                if (k === keycode_namespaceObject.ZH) k = keycode_namespaceObject.yY; else if (k === keycode_namespaceObject.yY) k = keycode_namespaceObject.ZH;
                if (inputmask.isRTL) {
                    var pend = pos.end;
                    pos.end = pos.begin;
                    pos.begin = pend;
                }
            }
            var lvp = getLastValidPosition.call(inputmask, void 0, true);
            if (pos.end >= getBuffer.call(inputmask).length && lvp >= pos.end) pos.end = lvp + 1;
            if (k === keycode_namespaceObject.ZH) {
                if (pos.end - pos.begin < 1) pos.begin = seekPrevious.call(inputmask, pos.begin);
            } else if (k === keycode_namespaceObject.yY) if (pos.begin === pos.end) pos.end = isMask.call(inputmask, pos.end, true, true) ? pos.end + 1 : seekNext.call(inputmask, pos.end) + 1;
            var offset;
            if (false !== (offset = revalidateMask.call(inputmask, pos))) {
                if (true !== strict && false !== opts.keepStatic || null !== opts.regex && -1 !== getTest.call(inputmask, pos.begin).match.def.indexOf("|")) {
                    var result = alternate.call(inputmask, true);
                    if (result) {
                        var newPos = void 0 !== result.caret ? result.caret : result.pos ? seekNext.call(inputmask, result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition.call(inputmask, -1, true);
                        if (k !== keycode_namespaceObject.yY || pos.begin > newPos) pos.begin == newPos;
                    }
                }
                if (true !== strict) {
                    maskset.p = k === keycode_namespaceObject.yY ? pos.begin + offset : pos.begin;
                    maskset.p = determineNewCaretPosition.call(inputmask, {
                        begin: maskset.p,
                        end: maskset.p
                    }, false, false === opts.insertMode && k === keycode_namespaceObject.ZH ? "none" : void 0).begin;
                }
            }
        }
        function isComplete(buffer) {
            const inputmask = this, opts = this.opts, maskset = this.maskset;
            if ("function" === typeof opts.isComplete) return opts.isComplete(buffer, opts);
            if ("*" === opts.repeat) return;
            var complete = false, lrp = determineLastRequiredPosition.call(inputmask, true), aml = seekPrevious.call(inputmask, lrp.l);
            if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                complete = true;
                for (var i = 0; i <= aml; i++) {
                    var test = getTestTemplate.call(inputmask, i).match;
                    if (true !== test.static && void 0 === maskset.validPositions[i] && true !== test.optionality && true !== test.optionalQuantifier || true === test.static && buffer[i] !== getPlaceholder.call(inputmask, i, test)) {
                        complete = false;
                        break;
                    }
                }
            }
            return complete;
        }
        function isSelection(posObj) {
            const inputmask = this, opts = this.opts, insertModeOffset = opts.insertMode ? 0 : 1;
            return inputmask.isRTL ? posObj.begin - posObj.end > insertModeOffset : posObj.end - posObj.begin > insertModeOffset;
        }
        function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly, fromCheckval) {
            const inputmask = this, $ = this.dependencyLib, opts = this.opts, maskset = inputmask.maskset;
            strict = true === strict;
            var maskPos = pos;
            if (void 0 !== pos.begin) maskPos = inputmask.isRTL ? pos.end : pos.begin;
            function processCommandObject(commandObj) {
                if (void 0 !== commandObj) {
                    if (void 0 !== commandObj.remove) {
                        if (!Array.isArray(commandObj.remove)) commandObj.remove = [ commandObj.remove ];
                        commandObj.remove.sort((function(a, b) {
                            return b.pos - a.pos;
                        })).forEach((function(lmnt) {
                            revalidateMask.call(inputmask, {
                                begin: lmnt,
                                end: lmnt + 1
                            });
                        }));
                        commandObj.remove = void 0;
                    }
                    if (void 0 !== commandObj.insert) {
                        if (!Array.isArray(commandObj.insert)) commandObj.insert = [ commandObj.insert ];
                        commandObj.insert.sort((function(a, b) {
                            return a.pos - b.pos;
                        })).forEach((function(lmnt) {
                            if ("" !== lmnt.c) isValid.call(inputmask, lmnt.pos, lmnt.c, void 0 !== lmnt.strict ? lmnt.strict : true, void 0 !== lmnt.fromIsValid ? lmnt.fromIsValid : fromIsValid);
                        }));
                        commandObj.insert = void 0;
                    }
                    if (commandObj.refreshFromBuffer && commandObj.buffer) {
                        var refresh = commandObj.refreshFromBuffer;
                        refreshFromBuffer.call(inputmask, true === refresh ? refresh : refresh.start, refresh.end, commandObj.buffer);
                        commandObj.refreshFromBuffer = void 0;
                    }
                    if (void 0 !== commandObj.rewritePosition) {
                        maskPos = commandObj.rewritePosition;
                        commandObj = true;
                    }
                }
                return commandObj;
            }
            function _isValid(position, c, strict) {
                var rslt = false;
                getTests.call(inputmask, position).every((function(tst, ndx) {
                    var test = tst.match;
                    getBuffer.call(inputmask, true);
                    if (test.jit && void 0 === maskset.validPositions[seekPrevious.call(inputmask, position)]) rslt = false; else rslt = null != test.fn ? test.fn.test(c, maskset, position, strict, opts, isSelection.call(inputmask, pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def ? {
                        c: getPlaceholder.call(inputmask, position, test, true) || test.def,
                        pos: position
                    } : false;
                    if (false !== rslt) {
                        var elem = void 0 !== rslt.c ? rslt.c : c, validatedPos = position;
                        elem = elem === opts.skipOptionalPartCharacter && true === test.static ? getPlaceholder.call(inputmask, position, test, true) || test.def : elem;
                        rslt = processCommandObject(rslt);
                        if (true !== rslt && void 0 !== rslt.pos && rslt.pos !== position) validatedPos = rslt.pos;
                        if (true !== rslt && void 0 === rslt.pos && void 0 === rslt.c) return false;
                        if (false === revalidateMask.call(inputmask, pos, $.extend({}, tst, {
                            input: casing.call(inputmask, elem, test, validatedPos)
                        }), fromIsValid, validatedPos)) rslt = false;
                        return false;
                    }
                    return true;
                }));
                return rslt;
            }
            var result = true, positionsClone = $.extend(true, {}, maskset.validPositions);
            if (false === opts.keepStatic && void 0 !== maskset.excludes[maskPos] && true !== fromAlternate && true !== fromIsValid) for (var i = maskPos; i < (inputmask.isRTL ? pos.begin : pos.end); i++) if (void 0 !== maskset.excludes[i]) {
                maskset.excludes[i] = void 0;
                delete maskset.tests[i];
            }
            if ("function" === typeof opts.preValidation && true !== fromIsValid && true !== validateOnly) {
                result = opts.preValidation.call(inputmask, getBuffer.call(inputmask), maskPos, c, isSelection.call(inputmask, pos), opts, maskset, pos, strict || fromAlternate);
                result = processCommandObject(result);
            }
            if (true === result) {
                result = _isValid(maskPos, c, strict);
                if ((!strict || true === fromIsValid) && false === result && true !== validateOnly) {
                    var currentPosValid = maskset.validPositions[maskPos];
                    if (currentPosValid && true === currentPosValid.match.static && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) result = {
                        caret: seekNext.call(inputmask, maskPos)
                    }; else if (opts.insertMode || void 0 === maskset.validPositions[seekNext.call(inputmask, maskPos)] || pos.end > maskPos) {
                        var skip = false;
                        if (maskset.jitOffset[maskPos] && void 0 === maskset.validPositions[seekNext.call(inputmask, maskPos)]) {
                            result = isValid.call(inputmask, maskPos + maskset.jitOffset[maskPos], c, true, true);
                            if (false !== result) {
                                if (true !== fromAlternate) result.caret = maskPos;
                                skip = true;
                            }
                        }
                        if (pos.end > maskPos) maskset.validPositions[maskPos] = void 0;
                        if (!skip && !isMask.call(inputmask, maskPos, opts.keepStatic && 0 === maskPos)) for (var nPos = maskPos + 1, snPos = seekNext.call(inputmask, maskPos, false, 0 !== maskPos); nPos <= snPos; nPos++) {
                            result = _isValid(nPos, c, strict);
                            if (false !== result) {
                                result = trackbackPositions.call(inputmask, maskPos, void 0 !== result.pos ? result.pos : nPos) || result;
                                maskPos = nPos;
                                break;
                            }
                        }
                    }
                }
                if (false === result && opts.keepStatic && (isComplete.call(inputmask, getBuffer.call(inputmask)) || 0 === maskPos) && !strict && true !== fromAlternate) result = alternate.call(inputmask, maskPos, c, strict, fromIsValid, void 0, pos); else if (isSelection.call(inputmask, pos) && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && opts.keepStatic && !strict && true !== fromAlternate) result = alternate.call(inputmask, true);
                if (true === result) result = {
                    pos: maskPos
                };
            }
            if ("function" === typeof opts.postValidation && true !== fromIsValid && true !== validateOnly) {
                var postResult = opts.postValidation.call(inputmask, getBuffer.call(inputmask, true), void 0 !== pos.begin ? inputmask.isRTL ? pos.end : pos.begin : pos, c, result, opts, maskset, strict, fromCheckval);
                if (void 0 !== postResult) result = true === postResult ? result : postResult;
            }
            if (result && void 0 === result.pos) result.pos = maskPos;
            if (false === result || true === validateOnly) {
                resetMaskSet.call(inputmask, true);
                maskset.validPositions = $.extend(true, {}, positionsClone);
            } else trackbackPositions.call(inputmask, void 0, maskPos, true);
            var endResult = processCommandObject(result);
            if (void 0 !== inputmask.maxLength) {
                var buffer = getBuffer.call(inputmask);
                if (buffer.length > inputmask.maxLength && !fromIsValid) {
                    resetMaskSet.call(inputmask, true);
                    maskset.validPositions = $.extend(true, {}, positionsClone);
                    endResult = false;
                }
            }
            return endResult;
        }
        function positionCanMatchDefinition(pos, testDefinition, opts) {
            const inputmask = this, maskset = this.maskset;
            var valid = false, tests = getTests.call(inputmask, pos);
            for (var tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && (tests[tndx].match["nativeDef"] === testDefinition.match[opts.shiftPositions ? "def" : "nativeDef"] && (!opts.shiftPositions || !testDefinition.match.static) || tests[tndx].match["nativeDef"] === testDefinition.match["nativeDef"] || opts.regex && !tests[tndx].match.static && tests[tndx].match.fn.test(testDefinition.input))) {
                valid = true;
                break;
            } else if (tests[tndx].match && tests[tndx].match["def"] === testDefinition.match["nativeDef"]) {
                valid = void 0;
                break;
            }
            if (false === valid) if (void 0 !== maskset.jitOffset[pos]) valid = positionCanMatchDefinition.call(inputmask, pos + maskset.jitOffset[pos], testDefinition, opts);
            return valid;
        }
        function refreshFromBuffer(start, end, buffer) {
            const inputmask = this, maskset = this.maskset, opts = this.opts, $ = this.dependencyLib;
            var i, p, skipOptionalPartCharacter = opts.skipOptionalPartCharacter, bffr = inputmask.isRTL ? buffer.slice().reverse() : buffer;
            opts.skipOptionalPartCharacter = "";
            if (true === start) {
                resetMaskSet.call(inputmask);
                maskset.tests = {};
                start = 0;
                end = buffer.length;
                p = determineNewCaretPosition.call(inputmask, {
                    begin: 0,
                    end: 0
                }, false).begin;
            } else {
                for (i = start; i < end; i++) delete maskset.validPositions[i];
                p = start;
            }
            var keypress = new $.Event("keypress");
            for (i = start; i < end; i++) {
                keypress.keyCode = bffr[i].toString().charCodeAt(0);
                inputmask.ignorable = false;
                var valResult = EventHandlers.keypressEvent.call(inputmask, keypress, true, false, false, p);
                if (false !== valResult && void 0 !== valResult) p = valResult.forwardPosition;
            }
            opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
        }
        function trackbackPositions(originalPos, newPos, fillOnly) {
            const inputmask = this, maskset = this.maskset, $ = this.dependencyLib;
            if (void 0 === originalPos) for (originalPos = newPos - 1; originalPos > 0; originalPos--) if (maskset.validPositions[originalPos]) break;
            for (var ps = originalPos; ps < newPos; ps++) if (void 0 === maskset.validPositions[ps] && !isMask.call(inputmask, ps, false)) {
                var vp = 0 == ps ? getTest.call(inputmask, ps) : maskset.validPositions[ps - 1];
                if (vp) {
                    var tests = getTests.call(inputmask, ps).slice();
                    if ("" === tests[tests.length - 1].match.def) tests.pop();
                    var np, bestMatch = determineTestTemplate.call(inputmask, ps, tests);
                    if (bestMatch && (true !== bestMatch.match.jit || "master" === bestMatch.match.newBlockMarker && (np = maskset.validPositions[ps + 1]) && true === np.match.optionalQuantifier)) {
                        bestMatch = $.extend({}, bestMatch, {
                            input: getPlaceholder.call(inputmask, ps, bestMatch.match, true) || bestMatch.match.def
                        });
                        bestMatch.generatedInput = true;
                        revalidateMask.call(inputmask, ps, bestMatch, true);
                        if (true !== fillOnly) {
                            var cvpInput = maskset.validPositions[newPos].input;
                            maskset.validPositions[newPos] = void 0;
                            return isValid.call(inputmask, newPos, cvpInput, true, true);
                        }
                    }
                }
            }
        }
        function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
            const inputmask = this, maskset = this.maskset, opts = this.opts, $ = this.dependencyLib;
            function IsEnclosedStatic(pos, valids, selection) {
                var posMatch = valids[pos];
                if (void 0 !== posMatch && true === posMatch.match.static && true !== posMatch.match.optionality && (void 0 === valids[0] || void 0 === valids[0].alternation)) {
                    var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && true === valids[pos - 1].match.static && valids[pos - 1] : valids[pos - 1], nextMatch = selection.end > pos + 1 ? valids[pos + 1] && true === valids[pos + 1].match.static && valids[pos + 1] : valids[pos + 1];
                    return prevMatch && nextMatch;
                }
                return false;
            }
            var offset = 0, begin = void 0 !== pos.begin ? pos.begin : pos, end = void 0 !== pos.end ? pos.end : pos, valid = true;
            if (pos.begin > pos.end) {
                begin = pos.end;
                end = pos.begin;
            }
            validatedPos = void 0 !== validatedPos ? validatedPos : begin;
            if (begin !== end || opts.insertMode && void 0 !== maskset.validPositions[validatedPos] && void 0 === fromIsValid || void 0 === validTest || validTest.match.optionalQuantifier || validTest.match.optionality) {
                var i, positionsClone = $.extend(true, {}, maskset.validPositions), lvp = getLastValidPosition.call(inputmask, void 0, true);
                maskset.p = begin;
                for (i = lvp; i >= begin; i--) {
                    delete maskset.validPositions[i];
                    if (void 0 === validTest) delete maskset.tests[i + 1];
                }
                var t, canMatch, test, j = validatedPos, posMatch = j;
                if (validTest) {
                    maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
                    posMatch++;
                    j++;
                }
                for (i = validTest ? end : end - 1; i <= lvp; i++) {
                    if (void 0 !== (t = positionsClone[i]) && true !== t.generatedInput && (i >= end || i >= begin && IsEnclosedStatic(i, positionsClone, {
                        begin,
                        end
                    }))) {
                        while (test = getTest.call(inputmask, posMatch), "" !== test.match.def) {
                            if (false !== (canMatch = positionCanMatchDefinition.call(inputmask, posMatch, t, opts)) || "+" === t.match.def) {
                                if ("+" === t.match.def) getBuffer.call(inputmask, true);
                                var result = isValid.call(inputmask, posMatch, t.input, "+" !== t.match.def, true);
                                valid = false !== result;
                                j = (result.pos || posMatch) + 1;
                                if (!valid && canMatch) break;
                            } else valid = false;
                            if (valid) {
                                if (void 0 === validTest && t.match.static && i === pos.begin) offset++;
                                break;
                            }
                            if (!valid && getBuffer.call(inputmask), posMatch > maskset.maskLength) break;
                            posMatch++;
                        }
                        if ("" == getTest.call(inputmask, posMatch).match.def) valid = false;
                        posMatch = j;
                    }
                    if (!valid) break;
                }
                if (!valid) {
                    maskset.validPositions = $.extend(true, {}, positionsClone);
                    resetMaskSet.call(inputmask, true);
                    return false;
                }
            } else if (validTest && getTest.call(inputmask, validatedPos).match.cd === validTest.match.cd) maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
            resetMaskSet.call(inputmask, true);
            return offset;
        }
        function caret(input, begin, end, notranslate, isDelete) {
            const inputmask = this, opts = this.opts;
            var range;
            if (void 0 !== begin) {
                if (Array.isArray(begin)) {
                    end = inputmask.isRTL ? begin[0] : begin[1];
                    begin = inputmask.isRTL ? begin[1] : begin[0];
                }
                if (void 0 !== begin.begin) {
                    end = inputmask.isRTL ? begin.begin : begin.end;
                    begin = inputmask.isRTL ? begin.end : begin.begin;
                }
                if ("number" === typeof begin) {
                    begin = notranslate ? begin : translatePosition.call(inputmask, begin);
                    end = notranslate ? end : translatePosition.call(inputmask, end);
                    end = "number" == typeof end ? end : begin;
                    var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
                    input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
                    input.inputmask.caretPos = {
                        begin,
                        end
                    };
                    if (opts.insertModeVisual && false === opts.insertMode && begin === end) if (!isDelete) end++;
                    if (input === (input.inputmask.shadowRoot || input.ownerDocument).activeElement) if ("setSelectionRange" in input) input.setSelectionRange(begin, end); else if (window.getSelection) {
                        range = document.createRange();
                        if (void 0 === input.firstChild || null === input.firstChild) {
                            var textNode = document.createTextNode("");
                            input.appendChild(textNode);
                        }
                        range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length);
                        range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length);
                        range.collapse(true);
                        var sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                    } else if (input.createTextRange) {
                        range = input.createTextRange();
                        range.collapse(true);
                        range.moveEnd("character", end);
                        range.moveStart("character", begin);
                        range.select();
                    }
                }
            } else {
                if ("selectionStart" in input && "selectionEnd" in input) {
                    begin = input.selectionStart;
                    end = input.selectionEnd;
                } else if (window.getSelection) {
                    range = window.getSelection().getRangeAt(0);
                    if (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) {
                        begin = range.startOffset;
                        end = range.endOffset;
                    }
                } else if (document.selection && document.selection.createRange) {
                    range = document.selection.createRange();
                    begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length);
                    end = begin + range.text.length;
                }
                return {
                    begin: notranslate ? begin : translatePosition.call(inputmask, begin),
                    end: notranslate ? end : translatePosition.call(inputmask, end)
                };
            }
        }
        function determineLastRequiredPosition(returnDefinition) {
            const inputmask = this, maskset = this.maskset, $ = this.dependencyLib;
            var pos, testPos, buffer = getMaskTemplate.call(inputmask, true, getLastValidPosition.call(inputmask), true, true), bl = buffer.length, lvp = getLastValidPosition.call(inputmask), positions = {}, lvTest = maskset.validPositions[lvp], ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0;
            for (pos = lvp + 1; pos < buffer.length; pos++) {
                testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
                ndxIntlzr = testPos.locator.slice();
                positions[pos] = $.extend(true, {}, testPos);
            }
            var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
            for (pos = bl - 1; pos > lvp; pos--) {
                testPos = positions[pos];
                if ((testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && true != testPos.match.static || true === testPos.match.static && testPos.locator[lvTest.alternation] && checkAlternationMatch.call(inputmask, testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests.call(inputmask, pos)[0].def)) && buffer[pos] === getPlaceholder.call(inputmask, pos, testPos.match)) bl--; else break;
            }
            return returnDefinition ? {
                l: bl,
                def: positions[bl] ? positions[bl].match : void 0
            } : bl;
        }
        function determineNewCaretPosition(selectedCaret, tabbed, positionCaretOnClick) {
            const inputmask = this, maskset = this.maskset, opts = this.opts;
            function doRadixFocus(clickPos) {
                if ("" !== opts.radixPoint && 0 !== opts.digits) {
                    var vps = maskset.validPositions;
                    if (void 0 === vps[clickPos] || vps[clickPos].input === getPlaceholder.call(inputmask, clickPos)) {
                        if (clickPos < seekNext.call(inputmask, -1)) return true;
                        var radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
                        if (-1 !== radixPos) {
                            for (var vp in vps) if (vps[vp] && radixPos < vp && vps[vp].input !== getPlaceholder.call(inputmask, vp)) return false;
                            return true;
                        }
                    }
                }
                return false;
            }
            if (tabbed) if (inputmask.isRTL) selectedCaret.end = selectedCaret.begin; else selectedCaret.begin = selectedCaret.end;
            if (selectedCaret.begin === selectedCaret.end) {
                positionCaretOnClick = positionCaretOnClick || opts.positionCaretOnClick;
                switch (positionCaretOnClick) {
                  case "none":
                    break;

                  case "select":
                    selectedCaret = {
                        begin: 0,
                        end: getBuffer.call(inputmask).length
                    };
                    break;

                  case "ignore":
                    selectedCaret.end = selectedCaret.begin = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
                    break;

                  case "radixFocus":
                    if (doRadixFocus(selectedCaret.begin)) {
                        var radixPos = getBuffer.call(inputmask).join("").indexOf(opts.radixPoint);
                        selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext.call(inputmask, radixPos) : radixPos;
                        break;
                    }

                  default:
                    var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition.call(inputmask, clickPosition, true), lastPosition = seekNext.call(inputmask, -1 === lvclickPosition && !isMask.call(inputmask, 0) ? -1 : lvclickPosition);
                    if (clickPosition <= lastPosition) selectedCaret.end = selectedCaret.begin = !isMask.call(inputmask, clickPosition, false, true) ? seekNext.call(inputmask, clickPosition) : clickPosition; else {
                        var lvp = maskset.validPositions[lvclickPosition], tt = getTestTemplate.call(inputmask, lastPosition, lvp ? lvp.match.locator : void 0, lvp), placeholder = getPlaceholder.call(inputmask, lastPosition, tt.match);
                        if ("" !== placeholder && getBuffer.call(inputmask)[lastPosition] !== placeholder && true !== tt.match.optionalQuantifier && true !== tt.match.newBlockMarker || !isMask.call(inputmask, lastPosition, opts.keepStatic, true) && tt.match.def === placeholder) {
                            var newPos = seekNext.call(inputmask, lastPosition);
                            if (clickPosition >= newPos || clickPosition === lastPosition) lastPosition = newPos;
                        }
                        selectedCaret.end = selectedCaret.begin = lastPosition;
                    }
                }
                return selectedCaret;
            }
        }
        function getBuffer(noCache) {
            const inputmask = this, maskset = this.maskset;
            if (void 0 === maskset.buffer || true === noCache) {
                maskset.buffer = getMaskTemplate.call(inputmask, true, getLastValidPosition.call(inputmask), true);
                if (void 0 === maskset._buffer) maskset._buffer = maskset.buffer.slice();
            }
            return maskset.buffer;
        }
        function getBufferTemplate() {
            const inputmask = this, maskset = this.maskset;
            if (void 0 === maskset._buffer) {
                maskset._buffer = getMaskTemplate.call(inputmask, false, 1);
                if (void 0 === maskset.buffer) maskset.buffer = maskset._buffer.slice();
            }
            return maskset._buffer;
        }
        function getLastValidPosition(closestTo, strict, validPositions) {
            const maskset = this.maskset;
            var before = -1, after = -1, valids = validPositions || maskset.validPositions;
            if (void 0 === closestTo) closestTo = -1;
            for (var posNdx in valids) {
                var psNdx = parseInt(posNdx);
                if (valids[psNdx] && (strict || true !== valids[psNdx].generatedInput)) {
                    if (psNdx <= closestTo) before = psNdx;
                    if (psNdx >= closestTo) after = psNdx;
                }
            }
            return -1 === before || before == closestTo ? after : -1 == after ? before : closestTo - before < after - closestTo ? before : after;
        }
        function isMask(pos, strict, fuzzy) {
            const inputmask = this, maskset = this.maskset;
            var test = getTestTemplate.call(inputmask, pos).match;
            if ("" === test.def) test = getTest.call(inputmask, pos).match;
            if (true !== test.static) return test.fn;
            if (true === fuzzy && void 0 !== maskset.validPositions[pos] && true !== maskset.validPositions[pos].generatedInput) return true;
            if (true !== strict && pos > -1) {
                if (fuzzy) {
                    var tests = getTests.call(inputmask, pos);
                    return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
                }
                var testTemplate = determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos));
                var testPlaceHolder = getPlaceholder.call(inputmask, pos, testTemplate.match);
                return testTemplate.match.def !== testPlaceHolder;
            }
            return false;
        }
        function resetMaskSet(soft) {
            const maskset = this.maskset;
            maskset.buffer = void 0;
            if (true !== soft) {
                maskset.validPositions = {};
                maskset.p = 0;
            }
        }
        function seekNext(pos, newBlock, fuzzy) {
            const inputmask = this;
            if (void 0 === fuzzy) fuzzy = true;
            var position = pos + 1;
            while ("" !== getTest.call(inputmask, position).match.def && (true === newBlock && (true !== getTest.call(inputmask, position).match.newBlockMarker || !isMask.call(inputmask, position, void 0, true)) || true !== newBlock && !isMask.call(inputmask, position, void 0, fuzzy))) position++;
            return position;
        }
        function seekPrevious(pos, newBlock) {
            const inputmask = this;
            var position = pos - 1;
            if (pos <= 0) return 0;
            while (position > 0 && (true === newBlock && (true !== getTest.call(inputmask, position).match.newBlockMarker || !isMask.call(inputmask, position, void 0, true)) || true !== newBlock && !isMask.call(inputmask, position, void 0, true))) position--;
            return position;
        }
        function translatePosition(pos) {
            const inputmask = this, opts = this.opts, el = this.el;
            if (inputmask.isRTL && "number" === typeof pos && (!opts.greedy || "" !== opts.placeholder) && el) pos = Math.abs(inputmask._valueGet().length - pos);
            return pos;
        }
        var EventRuler = {
            on: function(input, eventName, eventHandler) {
                const $ = input.inputmask.dependencyLib;
                var ev = function(e) {
                    if (e.originalEvent) {
                        e = e.originalEvent || e;
                        arguments[0] = e;
                    }
                    var args, that = this, inputmask = that.inputmask, opts = inputmask ? inputmask.opts : void 0;
                    if (void 0 === inputmask && "FORM" !== this.nodeName) {
                        var imOpts = $.data(that, "_inputmask_opts");
                        $(that).off();
                        if (imOpts) new lib_inputmask(imOpts).mask(that);
                    } else if (![ "submit", "reset", "setvalue" ].includes(e.type) && "FORM" !== this.nodeName && (that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || false === opts.tabThrough && e.keyCode === keycode_namespaceObject.Mf))) e.preventDefault(); else {
                        switch (e.type) {
                          case "input":
                            if (true === inputmask.skipInputEvent || e.inputType && "insertCompositionText" === e.inputType) {
                                inputmask.skipInputEvent = false;
                                return e.preventDefault();
                            }
                            break;

                          case "keydown":
                            inputmask.skipKeyPressEvent = false;
                            inputmask.skipInputEvent = inputmask.isComposing = e.keyCode === keycode_namespaceObject.w2;
                            break;

                          case "keyup":
                          case "compositionend":
                            if (inputmask.isComposing) inputmask.skipInputEvent = false;
                            break;

                          case "keypress":
                            if (true === inputmask.skipKeyPressEvent) return e.preventDefault();
                            inputmask.skipKeyPressEvent = true;
                            break;

                          case "click":
                          case "focus":
                            if (inputmask.validationEvent) {
                                inputmask.validationEvent = false;
                                input.blur();
                                HandleNativePlaceholder(input, (inputmask.isRTL ? getBufferTemplate.call(inputmask).slice().reverse() : getBufferTemplate.call(inputmask)).join(""));
                                setTimeout((function() {
                                    input.focus();
                                }), opts.validationEventTimeOut);
                                return false;
                            }
                            args = arguments;
                            setTimeout((function() {
                                if (!input.inputmask) return;
                                eventHandler.apply(that, args);
                            }), 0);
                            return false;
                        }
                        var returnVal = eventHandler.apply(that, arguments);
                        if (false === returnVal) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        return returnVal;
                    }
                };
                if ([ "submit", "reset" ].includes(eventName)) {
                    ev = ev.bind(input);
                    if (null !== input.form) $(input.form).on(eventName, ev);
                } else $(input).on(eventName, ev);
                input.inputmask.events[eventName] = input.inputmask.events[eventName] || [];
                input.inputmask.events[eventName].push(ev);
            },
            off: function(input, event) {
                if (input.inputmask && input.inputmask.events) {
                    const $ = input.inputmask.dependencyLib;
                    let events = input.inputmask.events;
                    if (event) {
                        events = [];
                        events[event] = input.inputmask.events[event];
                    }
                    for (let eventName in events) {
                        let evArr = events[eventName];
                        while (evArr.length > 0) {
                            let ev = evArr.pop();
                            if ([ "submit", "reset" ].includes(eventName)) {
                                if (null !== input.form) $(input.form).off(eventName, ev);
                            } else $(input).off(eventName, ev);
                        }
                        delete input.inputmask.events[eventName];
                    }
                }
            }
        };
        function mask() {
            const inputmask = this, opts = this.opts, el = this.el, $ = this.dependencyLib;
            function isElementTypeSupported(input, opts) {
                function patchValueProperty(npt) {
                    var valueGet;
                    var valueSet;
                    function patchValhook(type) {
                        if ($.valHooks && (void 0 === $.valHooks[type] || true !== $.valHooks[type].inputmaskpatch)) {
                            var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
                                return elem.value;
                            };
                            var valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
                                elem.value = value;
                                return elem;
                            };
                            $.valHooks[type] = {
                                get: function(elem) {
                                    if (elem.inputmask) if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue(); else {
                                        var result = valhookGet(elem);
                                        return -1 !== getLastValidPosition.call(inputmask, void 0, void 0, elem.inputmask.maskset.validPositions) || true !== opts.nullable ? result : "";
                                    } else return valhookGet(elem);
                                },
                                set: function(elem, value) {
                                    var result = valhookSet(elem, value);
                                    if (elem.inputmask) applyInputValue(elem, value);
                                    return result;
                                },
                                inputmaskpatch: true
                            };
                        }
                    }
                    function getter() {
                        if (this.inputmask) return this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition.call(inputmask) || true !== opts.nullable ? (this.inputmask.shadowRoot || this.ownerDocument).activeElement === this && opts.clearMaskOnLostFocus ? (inputmask.isRTL ? clearOptionalTail.call(inputmask, getBuffer.call(inputmask).slice()).reverse() : clearOptionalTail.call(inputmask, getBuffer.call(inputmask).slice())).join("") : valueGet.call(this) : ""; else return valueGet.call(this);
                    }
                    function setter(value) {
                        valueSet.call(this, value);
                        if (this.inputmask) applyInputValue(this, value);
                    }
                    function installNativeValueSetFallback(npt) {
                        EventRuler.on(npt, "mouseenter", (function() {
                            var input = this, value = input.inputmask._valueGet(true);
                            if (value !== (inputmask.isRTL ? getBuffer.call(inputmask).reverse() : getBuffer.call(inputmask)).join("")) applyInputValue(input, value);
                        }));
                    }
                    if (!npt.inputmask.__valueGet) {
                        if (true !== opts.noValuePatching) {
                            if (Object.getOwnPropertyDescriptor) {
                                var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;
                                if (valueProperty && valueProperty.get && valueProperty.set) {
                                    valueGet = valueProperty.get;
                                    valueSet = valueProperty.set;
                                    Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: true
                                    });
                                } else if ("input" !== npt.tagName.toLowerCase()) {
                                    valueGet = function() {
                                        return this.textContent;
                                    };
                                    valueSet = function(value) {
                                        this.textContent = value;
                                    };
                                    Object.defineProperty(npt, "value", {
                                        get: getter,
                                        set: setter,
                                        configurable: true
                                    });
                                }
                            } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
                                valueGet = npt.__lookupGetter__("value");
                                valueSet = npt.__lookupSetter__("value");
                                npt.__defineGetter__("value", getter);
                                npt.__defineSetter__("value", setter);
                            }
                            npt.inputmask.__valueGet = valueGet;
                            npt.inputmask.__valueSet = valueSet;
                        }
                        npt.inputmask._valueGet = function(overruleRTL) {
                            return inputmask.isRTL && true !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                        };
                        npt.inputmask._valueSet = function(value, overruleRTL) {
                            valueSet.call(this.el, null === value || void 0 === value ? "" : true !== overruleRTL && inputmask.isRTL ? value.split("").reverse().join("") : value);
                        };
                        if (void 0 === valueGet) {
                            valueGet = function() {
                                return this.value;
                            };
                            valueSet = function(value) {
                                this.value = value;
                            };
                            patchValhook(npt.type);
                            installNativeValueSetFallback(npt);
                        }
                    }
                }
                if ("textarea" !== input.tagName.toLowerCase()) opts.ignorables.push(keycode_namespaceObject.K5);
                var elementType = input.getAttribute("type");
                var isSupported = "input" === input.tagName.toLowerCase() && opts.supportsInputType.includes(elementType) || input.isContentEditable || "textarea" === input.tagName.toLowerCase();
                if (!isSupported) if ("input" === input.tagName.toLowerCase()) {
                    var el = document.createElement("input");
                    el.setAttribute("type", elementType);
                    isSupported = "text" === el.type;
                    el = null;
                } else isSupported = "partial";
                if (false !== isSupported) patchValueProperty(input); else input.inputmask = void 0;
                return isSupported;
            }
            EventRuler.off(el);
            var isSupported = isElementTypeSupported(el, opts);
            if (false !== isSupported) {
                inputmask.originalPlaceholder = el.placeholder;
                inputmask.maxLength = void 0 !== el ? el.maxLength : void 0;
                if (-1 === inputmask.maxLength) inputmask.maxLength = void 0;
                if ("inputMode" in el && null === el.getAttribute("inputmode")) {
                    el.inputMode = opts.inputmode;
                    el.setAttribute("inputmode", opts.inputmode);
                }
                if (true === isSupported) {
                    opts.showMaskOnFocus = opts.showMaskOnFocus && -1 === [ "cc-number", "cc-exp" ].indexOf(el.autocomplete);
                    if (iphone) opts.insertModeVisual = false;
                    EventRuler.on(el, "submit", EventHandlers.submitEvent);
                    EventRuler.on(el, "reset", EventHandlers.resetEvent);
                    EventRuler.on(el, "blur", EventHandlers.blurEvent);
                    EventRuler.on(el, "focus", EventHandlers.focusEvent);
                    EventRuler.on(el, "invalid", EventHandlers.invalidEvent);
                    EventRuler.on(el, "click", EventHandlers.clickEvent);
                    EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent);
                    EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent);
                    EventRuler.on(el, "paste", EventHandlers.pasteEvent);
                    EventRuler.on(el, "cut", EventHandlers.cutEvent);
                    EventRuler.on(el, "complete", opts.oncomplete);
                    EventRuler.on(el, "incomplete", opts.onincomplete);
                    EventRuler.on(el, "cleared", opts.oncleared);
                    if (true !== opts.inputEventOnly) {
                        EventRuler.on(el, "keydown", EventHandlers.keydownEvent);
                        EventRuler.on(el, "keypress", EventHandlers.keypressEvent);
                        EventRuler.on(el, "keyup", EventHandlers.keyupEvent);
                    }
                    if (mobile || opts.inputEventOnly) el.removeAttribute("maxLength");
                    EventRuler.on(el, "input", EventHandlers.inputFallBackEvent);
                    EventRuler.on(el, "compositionend", EventHandlers.compositionendEvent);
                }
                EventRuler.on(el, "setvalue", EventHandlers.setValueEvent);
                getBufferTemplate.call(inputmask).join("");
                inputmask.undoValue = inputmask._valueGet(true);
                var activeElement = (el.inputmask.shadowRoot || el.ownerDocument).activeElement;
                if ("" !== el.inputmask._valueGet(true) || false === opts.clearMaskOnLostFocus || activeElement === el) {
                    applyInputValue(el, el.inputmask._valueGet(true), opts);
                    var buffer = getBuffer.call(inputmask).slice();
                    if (false === isComplete.call(inputmask, buffer)) if (opts.clearIncomplete) resetMaskSet.call(inputmask);
                    if (opts.clearMaskOnLostFocus && activeElement !== el) if (-1 === getLastValidPosition.call(inputmask)) buffer = []; else clearOptionalTail.call(inputmask, buffer);
                    if (false === opts.clearMaskOnLostFocus || opts.showMaskOnFocus && activeElement === el || "" !== el.inputmask._valueGet(true)) writeBuffer(el, buffer);
                    if (activeElement === el) caret.call(inputmask, el, seekNext.call(inputmask, getLastValidPosition.call(inputmask)));
                }
            }
        }
        function extend() {
            let options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
            if ("boolean" === typeof target) {
                deep = target;
                target = arguments[i] || {};
                i++;
            }
            if ("object" !== typeof target && "function" !== typeof target) target = {};
            for (;i < length; i++) if (null != (options = arguments[i])) for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) continue;
                if (deep && copy && ("[object Object]" === Object.prototype.toString.call(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    } else clone = src && "[object Object]" === Object.prototype.toString.call(src) ? src : {};
                    target[name] = extend(deep, clone, copy);
                } else if (void 0 !== copy) target[name] = copy;
            }
            return target;
        }
        function data(owner, key, value) {
            if (void 0 === value) return owner.__data ? owner.__data[key] : null; else {
                owner.__data = owner.__data || {};
                owner.__data[key] = value;
            }
        }
        function isValidElement(elem) {
            return elem instanceof Element;
        }
        let events_Event;
        if ("function" === typeof global_window.CustomEvent) events_Event = global_window.CustomEvent; else if (lib_canUseDOM) {
            events_Event = function(event, params) {
                params = params || {
                    bubbles: false,
                    cancelable: false,
                    detail: void 0
                };
                var evt = document.createEvent("CustomEvent");
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            };
            events_Event.prototype = global_window.Event.prototype;
        }
        function on(events, handler) {
            function addEvent(ev, namespace) {
                if (elem.addEventListener) elem.addEventListener(ev, handler, false); else if (elem.attachEvent) elem.attachEvent("on" + ev, handler);
                eventRegistry[ev] = eventRegistry[ev] || {};
                eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [];
                eventRegistry[ev][namespace].push(handler);
            }
            if (isValidElement(this[0])) {
                var eventRegistry = this[0].eventRegistry, elem = this[0];
                var _events = events.split(" ");
                for (var endx = 0; endx < _events.length; endx++) {
                    var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
                    addEvent(ev, namespace);
                }
            }
            return this;
        }
        function off(events, handler) {
            var eventRegistry, elem;
            function removeEvent(ev, namespace, handler) {
                if (ev in eventRegistry === true) {
                    if (elem.removeEventListener) elem.removeEventListener(ev, handler, false); else if (elem.detachEvent) elem.detachEvent("on" + ev, handler);
                    if ("global" === namespace) for (var nmsp in eventRegistry[ev]) eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1); else eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
                }
            }
            function resolveNamespace(ev, namespace) {
                var hndx, hndL, evts = [];
                if (ev.length > 0) if (void 0 === handler) for (hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++) evts.push({
                    ev,
                    namespace: namespace && namespace.length > 0 ? namespace : "global",
                    handler: eventRegistry[ev][namespace][hndx]
                }); else evts.push({
                    ev,
                    namespace: namespace && namespace.length > 0 ? namespace : "global",
                    handler
                }); else if (namespace.length > 0) for (var evNdx in eventRegistry) for (var nmsp in eventRegistry[evNdx]) if (nmsp === namespace) if (void 0 === handler) for (hndx = 0, 
                hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++) evts.push({
                    ev: evNdx,
                    namespace: nmsp,
                    handler: eventRegistry[evNdx][nmsp][hndx]
                }); else evts.push({
                    ev: evNdx,
                    namespace: nmsp,
                    handler
                });
                return evts;
            }
            if (isValidElement(this[0]) && events) {
                eventRegistry = this[0].eventRegistry;
                elem = this[0];
                var _events = events.split(" ");
                for (var endx = 0; endx < _events.length; endx++) {
                    var nsEvent = _events[endx].split("."), offEvents = resolveNamespace(nsEvent[0], nsEvent[1]);
                    for (var i = 0, offEventsL = offEvents.length; i < offEventsL; i++) removeEvent(offEvents[i].ev, offEvents[i].namespace, offEvents[i].handler);
                }
            }
            return this;
        }
        function trigger(events) {
            if (isValidElement(this[0])) {
                var eventRegistry = this[0].eventRegistry, elem = this[0];
                var _events = "string" === typeof events ? events.split(" ") : [ events.type ];
                for (var endx = 0; endx < _events.length; endx++) {
                    var nsEvent = _events[endx].split("."), ev = nsEvent[0], namespace = nsEvent[1] || "global";
                    if (void 0 !== document && "global" === namespace) {
                        var evnt, i, params = {
                            bubbles: true,
                            cancelable: true,
                            detail: arguments[1]
                        };
                        if (document.createEvent) {
                            try {
                                switch (ev) {
                                  case "input":
                                    params.inputType = "insertText";
                                    evnt = new InputEvent(ev, params);
                                    break;

                                  default:
                                    evnt = new CustomEvent(ev, params);
                                }
                            } catch (e) {
                                evnt = document.createEvent("CustomEvent");
                                evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
                            }
                            if (events.type) extend(evnt, events);
                            elem.dispatchEvent(evnt);
                        } else {
                            evnt = document.createEventObject();
                            evnt.eventType = ev;
                            evnt.detail = arguments[1];
                            if (events.type) extend(evnt, events);
                            elem.fireEvent("on" + evnt.eventType, evnt);
                        }
                    } else if (void 0 !== eventRegistry[ev]) {
                        arguments[0] = arguments[0].type ? arguments[0] : inputmask_dependencyLib.Event(arguments[0]);
                        arguments[0].detail = arguments.slice(1);
                        if ("global" === namespace) for (var nmsp in eventRegistry[ev]) for (i = 0; i < eventRegistry[ev][nmsp].length; i++) eventRegistry[ev][nmsp][i].apply(elem, arguments); else for (i = 0; i < eventRegistry[ev][namespace].length; i++) eventRegistry[ev][namespace][i].apply(elem, arguments);
                    }
                }
            }
            return this;
        }
        const inputmask_dependencyLib_document = global_window.document;
        function DependencyLib(elem) {
            if (elem instanceof DependencyLib) return elem;
            if (!(this instanceof DependencyLib)) return new DependencyLib(elem);
            if (void 0 !== elem && null !== elem && elem !== global_window) {
                this[0] = elem.nodeName ? elem : void 0 !== elem[0] && elem[0].nodeName ? elem[0] : inputmask_dependencyLib_document.querySelector(elem);
                if (void 0 !== this[0] && null !== this[0]) this[0].eventRegistry = this[0].eventRegistry || {};
            }
        }
        DependencyLib.prototype = {
            on,
            off,
            trigger
        };
        DependencyLib.extend = extend;
        DependencyLib.data = data;
        DependencyLib.Event = events_Event;
        const inputmask_dependencyLib = DependencyLib;
        function masktoken(isGroup, isOptional, isQuantifier, isAlternator) {
            this.matches = [];
            this.openGroup = isGroup || false;
            this.alternatorGroup = false;
            this.isGroup = isGroup || false;
            this.isOptional = isOptional || false;
            this.isQuantifier = isQuantifier || false;
            this.isAlternator = isAlternator || false;
            this.quantifier = {
                min: 1,
                max: 1
            };
        }
        function generateMaskSet(opts, nocache) {
            var ms;
            function generateMask(mask, metadata, opts) {
                var regexMask = false;
                if (null === mask || "" === mask) {
                    regexMask = null !== opts.regex;
                    if (regexMask) {
                        mask = opts.regex;
                        mask = mask.replace(/^(\^)(.*)(\$)$/, "$2");
                    } else {
                        regexMask = true;
                        mask = ".*";
                    }
                }
                if (1 === mask.length && false === opts.greedy && 0 !== opts.repeat) opts.placeholder = "";
                if (opts.repeat > 0 || "*" === opts.repeat || "+" === opts.repeat) {
                    var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                    mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1];
                }
                var masksetDefinition, maskdefKey;
                maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;
                if (null !== opts.keepStatic) maskdefKey = "ks_" + opts.keepStatic + maskdefKey;
                if (void 0 === lib_inputmask.prototype.masksCache[maskdefKey] || true === nocache) {
                    masksetDefinition = {
                        mask,
                        maskToken: lib_inputmask.prototype.analyseMask(mask, regexMask, opts),
                        validPositions: {},
                        _buffer: void 0,
                        buffer: void 0,
                        tests: {},
                        excludes: {},
                        metadata,
                        maskLength: void 0,
                        jitOffset: {}
                    };
                    if (true !== nocache) {
                        lib_inputmask.prototype.masksCache[maskdefKey] = masksetDefinition;
                        masksetDefinition = inputmask_dependencyLib.extend(true, {}, lib_inputmask.prototype.masksCache[maskdefKey]);
                    }
                } else masksetDefinition = inputmask_dependencyLib.extend(true, {}, lib_inputmask.prototype.masksCache[maskdefKey]);
                return masksetDefinition;
            }
            if ("function" === typeof opts.mask) opts.mask = opts.mask(opts);
            if (Array.isArray(opts.mask)) if (opts.mask.length > 1) {
                if (null === opts.keepStatic) opts.keepStatic = true;
                var altMask = opts.groupmarker[0];
                (opts.isRTL ? opts.mask.reverse() : opts.mask).forEach((function(msk) {
                    if (altMask.length > 1) altMask += opts.alternatormarker;
                    if (void 0 !== msk.mask && "function" !== typeof msk.mask) altMask += msk.mask; else altMask += msk;
                }));
                altMask += opts.groupmarker[1];
                return generateMask(altMask, opts.mask, opts);
            } else opts.mask = opts.mask.pop();
            if (opts.mask && void 0 !== opts.mask.mask && "function" !== typeof opts.mask.mask) ms = generateMask(opts.mask.mask, opts.mask, opts); else ms = generateMask(opts.mask, opts.mask, opts);
            if (null === opts.keepStatic) opts.keepStatic = false;
            return ms;
        }
        function analyseMask(mask, regexMask, opts) {
            const tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g, regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g;
            var match, m, openingToken, currentOpeningToken, alternator, lastMatch, escaped = false, currentToken = new masktoken, openenings = [], maskTokens = [], closeRegexGroup = false;
            function insertTestDefinition(mtoken, element, position) {
                position = void 0 !== position ? position : mtoken.matches.length;
                var prevMatch = mtoken.matches[position - 1];
                if (regexMask) {
                    if (0 === element.indexOf("[") || escaped && /\\d|\\s|\\w/i.test(element) || "." === element) mtoken.matches.splice(position++, 0, {
                        fn: new RegExp(element, opts.casing ? "i" : ""),
                        static: false,
                        optionality: false,
                        newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element,
                        casing: null,
                        def: element,
                        placeholder: void 0,
                        nativeDef: element
                    }); else {
                        if (escaped) element = element[element.length - 1];
                        element.split("").forEach((function(lmnt, ndx) {
                            prevMatch = mtoken.matches[position - 1];
                            mtoken.matches.splice(position++, 0, {
                                fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", opts.casing ? "i" : "") : null,
                                static: true,
                                optionality: false,
                                newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== lmnt && true !== prevMatch.static,
                                casing: null,
                                def: opts.staticDefinitionSymbol || lmnt,
                                placeholder: void 0 !== opts.staticDefinitionSymbol ? lmnt : void 0,
                                nativeDef: (escaped ? "'" : "") + lmnt
                            });
                        }));
                    }
                    escaped = false;
                } else {
                    var maskdef = opts.definitions && opts.definitions[element] || opts.usePrototypeDefinitions && lib_inputmask.prototype.definitions[element];
                    if (maskdef && !escaped) mtoken.matches.splice(position++, 0, {
                        fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function() {
                            this.test = maskdef.validator;
                        } : new RegExp("."),
                        static: maskdef.static || false,
                        optionality: maskdef.optional || false,
                        newBlockMarker: void 0 === prevMatch || maskdef.optional ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
                        casing: maskdef.casing,
                        def: maskdef.definitionSymbol || element,
                        placeholder: maskdef.placeholder,
                        nativeDef: element,
                        generated: maskdef.generated
                    }); else {
                        mtoken.matches.splice(position++, 0, {
                            fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", opts.casing ? "i" : "") : null,
                            static: true,
                            optionality: false,
                            newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element && true !== prevMatch.static,
                            casing: null,
                            def: opts.staticDefinitionSymbol || element,
                            placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
                            nativeDef: (escaped ? "'" : "") + element
                        });
                        escaped = false;
                    }
                }
            }
            function verifyGroupMarker(maskToken) {
                if (maskToken && maskToken.matches) maskToken.matches.forEach((function(token, ndx) {
                    var nextToken = maskToken.matches[ndx + 1];
                    if ((void 0 === nextToken || void 0 === nextToken.matches || false === nextToken.isQuantifier) && token && token.isGroup) {
                        token.isGroup = false;
                        if (!regexMask) {
                            insertTestDefinition(token, opts.groupmarker[0], 0);
                            if (true !== token.openGroup) insertTestDefinition(token, opts.groupmarker[1]);
                        }
                    }
                    verifyGroupMarker(token);
                }));
            }
            function defaultCase() {
                if (openenings.length > 0) {
                    currentOpeningToken = openenings[openenings.length - 1];
                    insertTestDefinition(currentOpeningToken, m);
                    if (currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) if (alternator.matches[mndx].isGroup) alternator.matches[mndx].isGroup = false;
                        if (openenings.length > 0) {
                            currentOpeningToken = openenings[openenings.length - 1];
                            currentOpeningToken.matches.push(alternator);
                        } else currentToken.matches.push(alternator);
                    }
                } else insertTestDefinition(currentToken, m);
            }
            function reverseTokens(maskToken) {
                function reverseStatic(st) {
                    if (st === opts.optionalmarker[0]) st = opts.optionalmarker[1]; else if (st === opts.optionalmarker[1]) st = opts.optionalmarker[0]; else if (st === opts.groupmarker[0]) st = opts.groupmarker[1]; else if (st === opts.groupmarker[1]) st = opts.groupmarker[0];
                    return st;
                }
                maskToken.matches = maskToken.matches.reverse();
                for (var match in maskToken.matches) if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
                    var intMatch = parseInt(match);
                    if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                        var qt = maskToken.matches[match];
                        maskToken.matches.splice(match, 1);
                        maskToken.matches.splice(intMatch + 1, 0, qt);
                    }
                    if (void 0 !== maskToken.matches[match].matches) maskToken.matches[match] = reverseTokens(maskToken.matches[match]); else maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
                }
                return maskToken;
            }
            function groupify(matches) {
                var groupToken = new masktoken(true);
                groupToken.openGroup = false;
                groupToken.matches = matches;
                return groupToken;
            }
            function closeGroup() {
                openingToken = openenings.pop();
                openingToken.openGroup = false;
                if (void 0 !== openingToken) if (openenings.length > 0) {
                    currentOpeningToken = openenings[openenings.length - 1];
                    currentOpeningToken.matches.push(openingToken);
                    if (currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        let altMatchesLength = alternator.matches[0].matches ? alternator.matches[0].matches.length : 1;
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                            alternator.matches[mndx].isGroup = false;
                            alternator.matches[mndx].alternatorGroup = false;
                            if (null === opts.keepStatic && altMatchesLength < (alternator.matches[mndx].matches ? alternator.matches[mndx].matches.length : 1)) opts.keepStatic = true;
                            altMatchesLength = alternator.matches[mndx].matches ? alternator.matches[mndx].matches.length : 1;
                        }
                        if (openenings.length > 0) {
                            currentOpeningToken = openenings[openenings.length - 1];
                            currentOpeningToken.matches.push(alternator);
                        } else currentToken.matches.push(alternator);
                    }
                } else currentToken.matches.push(openingToken); else defaultCase();
            }
            function groupQuantifier(matches) {
                var lastMatch = matches.pop();
                if (lastMatch.isQuantifier) lastMatch = groupify([ matches.pop(), lastMatch ]);
                return lastMatch;
            }
            if (regexMask) {
                opts.optionalmarker[0] = void 0;
                opts.optionalmarker[1] = void 0;
            }
            while (match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask)) {
                m = match[0];
                if (regexMask) {
                    switch (m.charAt(0)) {
                      case "?":
                        m = "{0,1}";
                        break;

                      case "+":
                      case "*":
                        m = "{" + m + "}";
                        break;

                      case "|":
                        if (0 === openenings.length) {
                            var altRegexGroup = groupify(currentToken.matches);
                            altRegexGroup.openGroup = true;
                            openenings.push(altRegexGroup);
                            currentToken.matches = [];
                            closeRegexGroup = true;
                        }
                        break;
                    }
                    switch (m) {
                      case "\\d":
                        m = "[0-9]";
                        break;

                      case "(?=":
                        break;

                      case "(?!":
                        break;

                      case "(?<=":
                        break;

                      case "(?<!":
                        break;
                    }
                }
                if (escaped) {
                    defaultCase();
                    continue;
                }
                switch (m.charAt(0)) {
                  case "$":
                  case "^":
                    if (!regexMask) defaultCase();
                    break;

                  case opts.escapeChar:
                    escaped = true;
                    if (regexMask) defaultCase();
                    break;

                  case opts.optionalmarker[1]:
                  case opts.groupmarker[1]:
                    closeGroup();
                    break;

                  case opts.optionalmarker[0]:
                    openenings.push(new masktoken(false, true));
                    break;

                  case opts.groupmarker[0]:
                    openenings.push(new masktoken(true));
                    break;

                  case opts.quantifiermarker[0]:
                    var quantifier = new masktoken(false, false, true);
                    m = m.replace(/[{}?]/g, "");
                    var mqj = m.split("|"), mq = mqj[0].split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]), mqJit = isNaN(mqj[1]) ? mqj[1] : parseInt(mqj[1]);
                    if ("*" === mq0 || "+" === mq0) mq0 = "*" === mq1 ? 0 : 1;
                    quantifier.quantifier = {
                        min: mq0,
                        max: mq1,
                        jit: mqJit
                    };
                    var matches = openenings.length > 0 ? openenings[openenings.length - 1].matches : currentToken.matches;
                    match = matches.pop();
                    if (match.isAlternator) {
                        matches.push(match);
                        matches = match.matches;
                        var groupToken = new masktoken(true);
                        var tmpMatch = matches.pop();
                        matches.push(groupToken);
                        matches = groupToken.matches;
                        match = tmpMatch;
                    }
                    if (!match.isGroup) match = groupify([ match ]);
                    matches.push(match);
                    matches.push(quantifier);
                    break;

                  case opts.alternatormarker:
                    if (openenings.length > 0) {
                        currentOpeningToken = openenings[openenings.length - 1];
                        var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                        if (currentOpeningToken.openGroup && (void 0 === subToken.matches || false === subToken.isGroup && false === subToken.isAlternator)) lastMatch = openenings.pop(); else lastMatch = groupQuantifier(currentOpeningToken.matches);
                    } else lastMatch = groupQuantifier(currentToken.matches);
                    if (lastMatch.isAlternator) openenings.push(lastMatch); else {
                        if (lastMatch.alternatorGroup) {
                            alternator = openenings.pop();
                            lastMatch.alternatorGroup = false;
                        } else alternator = new masktoken(false, false, false, true);
                        alternator.matches.push(lastMatch);
                        openenings.push(alternator);
                        if (lastMatch.openGroup) {
                            lastMatch.openGroup = false;
                            var alternatorGroup = new masktoken(true);
                            alternatorGroup.alternatorGroup = true;
                            openenings.push(alternatorGroup);
                        }
                    }
                    break;

                  default:
                    defaultCase();
                }
            }
            if (closeRegexGroup) closeGroup();
            while (openenings.length > 0) {
                openingToken = openenings.pop();
                currentToken.matches.push(openingToken);
            }
            if (currentToken.matches.length > 0) {
                verifyGroupMarker(currentToken);
                maskTokens.push(currentToken);
            }
            if (opts.numericInput || opts.isRTL) reverseTokens(maskTokens[0]);
            return maskTokens;
        }
        const definitions = {
            9: {
                validator: "[0-9０-９]",
                definitionSymbol: "*"
            },
            a: {
                validator: "[A-Za-zА-яЁёÀ-ÿµ]",
                definitionSymbol: "*"
            },
            "*": {
                validator: "[0-9０-９A-Za-zА-яЁёÀ-ÿµ]"
            }
        };
        const defaults = {
            _maxTestPos: 500,
            placeholder: "_",
            optionalmarker: [ "[", "]" ],
            quantifiermarker: [ "{", "}" ],
            groupmarker: [ "(", ")" ],
            alternatormarker: "|",
            escapeChar: "\\",
            mask: null,
            regex: null,
            oncomplete: () => {},
            onincomplete: () => {},
            oncleared: () => {},
            repeat: 0,
            greedy: false,
            autoUnmask: false,
            removeMaskOnSubmit: false,
            clearMaskOnLostFocus: true,
            insertMode: true,
            insertModeVisual: true,
            clearIncomplete: false,
            alias: null,
            onKeyDown: () => {},
            onBeforeMask: null,
            onBeforePaste: function(pastedValue, opts) {
                return "function" === typeof opts.onBeforeMask ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
            },
            onBeforeWrite: null,
            onUnMask: null,
            showMaskOnFocus: true,
            showMaskOnHover: true,
            onKeyValidation: () => {},
            skipOptionalPartCharacter: " ",
            numericInput: false,
            rightAlign: false,
            undoOnEscape: true,
            radixPoint: "",
            _radixDance: false,
            groupSeparator: "",
            keepStatic: null,
            positionCaretOnTab: true,
            tabThrough: false,
            supportsInputType: [ "text", "tel", "url", "password", "search" ],
            ignorables: [ keycode_namespaceObject.ZH, keycode_namespaceObject.Mf, keycode_namespaceObject.ee, keycode_namespaceObject.hY, keycode_namespaceObject.Ku, keycode_namespaceObject.VM, keycode_namespaceObject.uR, keycode_namespaceObject.Sd, keycode_namespaceObject.RL, keycode_namespaceObject.UP, keycode_namespaceObject.pX, keycode_namespaceObject.WV, keycode_namespaceObject.Jm, keycode_namespaceObject.yY, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229 ],
            isComplete: null,
            preValidation: null,
            postValidation: null,
            staticDefinitionSymbol: void 0,
            jitMasking: false,
            nullable: true,
            inputEventOnly: false,
            noValuePatching: false,
            positionCaretOnClick: "lvp",
            casing: null,
            inputmode: "text",
            importDataAttributes: true,
            shiftPositions: true,
            usePrototypeDefinitions: true,
            validationEventTimeOut: 3e3,
            substitutes: {}
        };
        const inputmask_document = global_window.document, dataKey = "_inputmask_opts";
        function Inputmask(alias, options, internal) {
            if (!lib_canUseDOM) return;
            if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
            this.dependencyLib = inputmask_dependencyLib;
            this.el = void 0;
            this.events = {};
            this.maskset = void 0;
            if (true !== internal) {
                if ("[object Object]" === Object.prototype.toString.call(alias)) options = alias; else {
                    options = options || {};
                    if (alias) options.alias = alias;
                }
                this.opts = inputmask_dependencyLib.extend(true, {}, this.defaults, options);
                this.noMasksCache = options && void 0 !== options.definitions;
                this.userOptions = options || {};
                resolveAlias(this.opts.alias, options, this.opts);
            }
            this.refreshValue = false;
            this.undoValue = void 0;
            this.$el = void 0;
            this.skipKeyPressEvent = false;
            this.skipInputEvent = false;
            this.validationEvent = false;
            this.ignorable = false;
            this.maxLength;
            this.mouseEnter = false;
            this.originalPlaceholder = void 0;
            this.isComposing = false;
        }
        Inputmask.prototype = {
            dataAttribute: "data-inputmask",
            defaults,
            definitions,
            aliases: {},
            masksCache: {},
            get isRTL() {
                return this.opts.isRTL || this.opts.numericInput;
            },
            mask: function(elems) {
                var that = this;
                if ("string" === typeof elems) elems = inputmask_document.getElementById(elems) || inputmask_document.querySelectorAll(elems);
                elems = elems.nodeName ? [ elems ] : Array.isArray(elems) ? elems : Array.from(elems);
                elems.forEach((function(el, ndx) {
                    var scopedOpts = inputmask_dependencyLib.extend(true, {}, that.opts);
                    if (importAttributeOptions(el, scopedOpts, inputmask_dependencyLib.extend(true, {}, that.userOptions), that.dataAttribute)) {
                        var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                        if (void 0 !== maskset) {
                            if (void 0 !== el.inputmask) {
                                el.inputmask.opts.autoUnmask = true;
                                el.inputmask.remove();
                            }
                            el.inputmask = new Inputmask(void 0, void 0, true);
                            el.inputmask.opts = scopedOpts;
                            el.inputmask.noMasksCache = that.noMasksCache;
                            el.inputmask.userOptions = inputmask_dependencyLib.extend(true, {}, that.userOptions);
                            el.inputmask.el = el;
                            el.inputmask.$el = inputmask_dependencyLib(el);
                            el.inputmask.maskset = maskset;
                            inputmask_dependencyLib.data(el, dataKey, that.userOptions);
                            mask.call(el.inputmask);
                        }
                    }
                }));
                return elems && elems[0] ? elems[0].inputmask || this : this;
            },
            option: function(options, noremask) {
                if ("string" === typeof options) return this.opts[options]; else if ("object" === typeof options) {
                    inputmask_dependencyLib.extend(this.userOptions, options);
                    if (this.el && true !== noremask) this.mask(this.el);
                    return this;
                }
            },
            unmaskedvalue: function(value) {
                this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
                if (void 0 === this.el || void 0 !== value) {
                    var valueBuffer = ("function" === typeof this.opts.onBeforeMask ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
                    checkVal.call(this, void 0, false, false, valueBuffer);
                    if ("function" === typeof this.opts.onBeforeWrite) this.opts.onBeforeWrite.call(this, void 0, getBuffer.call(this), 0, this.opts);
                }
                return unmaskedvalue.call(this, this.el);
            },
            remove: function() {
                if (this.el) {
                    inputmask_dependencyLib.data(this.el, dataKey, null);
                    var cv = this.opts.autoUnmask ? unmaskedvalue(this.el) : this._valueGet(this.opts.autoUnmask);
                    if (cv !== getBufferTemplate.call(this).join("")) this._valueSet(cv, this.opts.autoUnmask); else this._valueSet("");
                    EventRuler.off(this.el);
                    var valueProperty;
                    if (Object.getOwnPropertyDescriptor && Object.getPrototypeOf) {
                        valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value");
                        if (valueProperty) if (this.__valueGet) Object.defineProperty(this.el, "value", {
                            get: this.__valueGet,
                            set: this.__valueSet,
                            configurable: true
                        });
                    } else if (inputmask_document.__lookupGetter__ && this.el.__lookupGetter__("value")) if (this.__valueGet) {
                        this.el.__defineGetter__("value", this.__valueGet);
                        this.el.__defineSetter__("value", this.__valueSet);
                    }
                    this.el.inputmask = void 0;
                }
                return this.el;
            },
            getemptymask: function() {
                this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
                return getBufferTemplate.call(this).join("");
            },
            hasMaskedValue: function() {
                return !this.opts.autoUnmask;
            },
            isComplete: function() {
                this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
                return isComplete.call(this, getBuffer.call(this));
            },
            getmetadata: function() {
                this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
                if (Array.isArray(this.maskset.metadata)) {
                    var maskTarget = getMaskTemplate.call(this, true, 0, false).join("");
                    this.maskset.metadata.forEach((function(mtdt) {
                        if (mtdt.mask === maskTarget) {
                            maskTarget = mtdt;
                            return false;
                        }
                        return true;
                    }));
                    return maskTarget;
                }
                return this.maskset.metadata;
            },
            isValid: function(value) {
                this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
                if (value) {
                    var valueBuffer = ("function" === typeof this.opts.onBeforeMask ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
                    checkVal.call(this, void 0, true, false, valueBuffer);
                } else value = this.isRTL ? getBuffer.call(this).slice().reverse().join("") : getBuffer.call(this).join("");
                var buffer = getBuffer.call(this);
                var rl = determineLastRequiredPosition.call(this), lmib = buffer.length - 1;
                for (;lmib > rl; lmib--) if (isMask.call(this, lmib)) break;
                buffer.splice(rl, lmib + 1 - rl);
                return isComplete.call(this, buffer) && value === (this.isRTL ? getBuffer.call(this).slice().reverse().join("") : getBuffer.call(this).join(""));
            },
            format: function(value, metadata) {
                this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
                let valueBuffer = ("function" === typeof this.opts.onBeforeMask ? this.opts.onBeforeMask.call(this, value, this.opts) || value : value).split("");
                checkVal.call(this, void 0, true, false, valueBuffer);
                let formattedValue = this.isRTL ? getBuffer.call(this).slice().reverse().join("") : getBuffer.call(this).join("");
                return metadata ? {
                    value: formattedValue,
                    metadata: this.getmetadata()
                } : formattedValue;
            },
            setValue: function(value) {
                if (this.el) inputmask_dependencyLib(this.el).trigger("setvalue", [ value ]);
            },
            analyseMask
        };
        function resolveAlias(aliasStr, options, opts) {
            var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
            if (aliasDefinition) {
                if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, void 0, opts);
                inputmask_dependencyLib.extend(true, opts, aliasDefinition);
                inputmask_dependencyLib.extend(true, opts, options);
                return true;
            } else if (null === opts.mask) opts.mask = aliasStr;
            return false;
        }
        function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
            function importOption(option, optionData) {
                const attrOption = "" === dataAttribute ? option : dataAttribute + "-" + option;
                optionData = void 0 !== optionData ? optionData : npt.getAttribute(attrOption);
                if (null !== optionData) {
                    if ("string" === typeof optionData) if (0 === option.indexOf("on")) optionData = global_window[optionData]; else if ("false" === optionData) optionData = false; else if ("true" === optionData) optionData = true;
                    userOptions[option] = optionData;
                }
            }
            if (true === opts.importDataAttributes) {
                var option, dataoptions, optionData, p, attrOptions = npt.getAttribute(dataAttribute);
                if (attrOptions && "" !== attrOptions) {
                    attrOptions = attrOptions.replace(/'/g, '"');
                    dataoptions = JSON.parse("{" + attrOptions + "}");
                }
                if (dataoptions) {
                    optionData = void 0;
                    for (p in dataoptions) if ("alias" === p.toLowerCase()) {
                        optionData = dataoptions[p];
                        break;
                    }
                }
                importOption("alias", optionData);
                if (userOptions.alias) resolveAlias(userOptions.alias, userOptions, opts);
                for (option in opts) {
                    if (dataoptions) {
                        optionData = void 0;
                        for (p in dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
                            optionData = dataoptions[p];
                            break;
                        }
                    }
                    importOption(option, optionData);
                }
            }
            inputmask_dependencyLib.extend(true, opts, userOptions);
            if ("rtl" === npt.dir || opts.rightAlign) npt.style.textAlign = "right";
            if ("rtl" === npt.dir || opts.numericInput) {
                npt.dir = "ltr";
                npt.removeAttribute("dir");
                opts.isRTL = true;
            }
            return Object.keys(userOptions).length;
        }
        Inputmask.extendDefaults = function(options) {
            inputmask_dependencyLib.extend(true, Inputmask.prototype.defaults, options);
        };
        Inputmask.extendDefinitions = function(definition) {
            inputmask_dependencyLib.extend(true, Inputmask.prototype.definitions, definition);
        };
        Inputmask.extendAliases = function(alias) {
            inputmask_dependencyLib.extend(true, Inputmask.prototype.aliases, alias);
        };
        Inputmask.format = function(value, options, metadata) {
            return Inputmask(options).format(value, metadata);
        };
        Inputmask.unmask = function(value, options) {
            return Inputmask(options).unmaskedvalue(value);
        };
        Inputmask.isValid = function(value, options) {
            return Inputmask(options).isValid(value);
        };
        Inputmask.remove = function(elems) {
            if ("string" === typeof elems) elems = inputmask_document.getElementById(elems) || inputmask_document.querySelectorAll(elems);
            elems = elems.nodeName ? [ elems ] : elems;
            elems.forEach((function(el) {
                if (el.inputmask) el.inputmask.remove();
            }));
        };
        Inputmask.setValue = function(elems, value) {
            if ("string" === typeof elems) elems = inputmask_document.getElementById(elems) || inputmask_document.querySelectorAll(elems);
            elems = elems.nodeName ? [ elems ] : elems;
            elems.forEach((function(el) {
                if (el.inputmask) el.inputmask.setValue(value); else inputmask_dependencyLib(el).trigger("setvalue", [ value ]);
            }));
        };
        Inputmask.dependencyLib = inputmask_dependencyLib;
        global_window.Inputmask = Inputmask;
        const lib_inputmask = Inputmask;
        const inputMasks = document.querySelectorAll("input");
        if (inputMasks.length) for (let index = 0; index < inputMasks.length; index++) {
            const input = inputMasks[index];
            if (input.classList.contains("_date")) lib_inputmask("99.99.9999", {
                onincomplete: function() {
                    input.classList.add("_form-error");
                },
                clearIncomplete: true,
                clearMaskOnLostFocus: true
            }).mask(input);
            if (input.classList.contains("_tel")) lib_inputmask("+7(999)999-99-99", {
                onincomplete: function() {
                    input.classList.add("_form-error");
                },
                clearIncomplete: true,
                clearMaskOnLostFocus: true
            }).mask(input);
        }
        class ScrollWatcher {
            constructor(props) {
                let defaultConfig = {
                    logging: true
                };
                this.config = Object.assign(defaultConfig, props);
                this.observer;
                !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
            }
            scrollWatcherUpdate() {
                this.scrollWatcherRun();
            }
            scrollWatcherRun() {
                document.documentElement.classList.add("watcher");
                this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
            }
            scrollWatcherConstructor(items) {
                if (items.length) {
                    this.scrollWatcherLogging(`Проснулся, слежу за объектами (${items.length})...`);
                    let uniqParams = uniqArray(Array.from(items).map((function(item) {
                        return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                    })));
                    uniqParams.forEach((uniqParam => {
                        let uniqParamArray = uniqParam.split("|");
                        let paramsWatch = {
                            root: uniqParamArray[0],
                            margin: uniqParamArray[1],
                            threshold: uniqParamArray[2]
                        };
                        let groupItems = Array.from(items).filter((function(item) {
                            let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                            let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                            let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                            if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                        }));
                        let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                        this.scrollWatcherInit(groupItems, configWatcher);
                    }));
                } else this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
            }
            getScrollWatcherConfig(paramsWatch) {
                let configWatcher = {};
                if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if ("null" !== paramsWatch.root) this.scrollWatcherLogging(`Эмм... родительского объекта ${paramsWatch.root} нет на странице`);
                configWatcher.rootMargin = paramsWatch.margin;
                if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                    this.scrollWatcherLogging(`Ой ой, настройку data-watch-margin нужно задавать в PX или %`);
                    return;
                }
                if ("prx" === paramsWatch.threshold) {
                    paramsWatch.threshold = [];
                    for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
                } else paramsWatch.threshold = paramsWatch.threshold.split(",");
                configWatcher.threshold = paramsWatch.threshold;
                return configWatcher;
            }
            scrollWatcherCreate(configWatcher) {
                this.observer = new IntersectionObserver(((entries, observer) => {
                    entries.forEach((entry => {
                        this.scrollWatcherCallback(entry, observer);
                    }));
                }), configWatcher);
            }
            scrollWatcherInit(items, configWatcher) {
                this.scrollWatcherCreate(configWatcher);
                items.forEach((item => this.observer.observe(item)));
            }
            scrollWatcherIntersecting(entry, targetElement) {
                if (entry.isIntersecting) {
                    !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я вижу ${targetElement.classList}, добавил класс _watcher-view`);
                } else {
                    targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я не вижу ${targetElement.classList}, убрал класс _watcher-view`);
                }
            }
            scrollWatcherOff(targetElement, observer) {
                observer.unobserve(targetElement);
                this.scrollWatcherLogging(`Я перестал следить за ${targetElement.classList}`);
            }
            scrollWatcherLogging(message) {
                this.config.logging ? FLS(`[Наблюдатель]: ${message}`) : null;
            }
            scrollWatcherCallback(entry, observer) {
                const targetElement = entry.target;
                this.scrollWatcherIntersecting(entry, targetElement);
                targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
                document.dispatchEvent(new CustomEvent("watcherCallback", {
                    detail: {
                        entry
                    }
                }));
                if (entry.isIntersecting) {
                    var elem = document.createElement("script");
                    elem.src = "https://api-maps.yandex.ru/2.1?apikey=8d7bd03a-f132-4234-ac7b-1e031670c1a1&lang=ru_RU";
                    document.getElementsByTagName("body")[0].appendChild(elem);
                    setTimeout((function() {
                        ymaps.ready(init);
                    }), 2e3);
                    function init(ymaps) {
                        let myMap = new ymaps.Map("map", {
                            controls: [],
                            center: [ 59.953928, 30.371139 ],
                            zoom: 10
                        });
                        let myPlacemark = new ymaps.Placemark([ 59.9588, 30.474933 ], {
                            balloonContentHeader: "ST TUNING",
                            balloonContentBody: "Ириновский проспект 24к.",
                            balloonContentFooter: "<a  href = 'tel:88129050600' > 8 (812) 905-06-00 </a >",
                            hasBalloon: true,
                            hideIconOnBalloonOpen: true
                        }, {
                            iconLayout: "default#imageWithContent",
                            iconImageHref: "/img/map.png",
                            iconImageSize: [ 40, 40 ],
                            iconImageOffset: [ -20, -20 ],
                            iconContentOffset: [ 0, 0 ]
                        });
                        myMap.geoObjects.add(myPlacemark);
                    }
                }
            }
        }
        flsModules.watcher = new ScrollWatcher({});
        let addWindowScrollEvent = false;
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }), this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            }));
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                    return item.breakpoint === mediaBreakpoint;
                }));
                matchMedia.addListener((function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            } else for (let i = оbjects.length - 1; i >= 0; i--) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if ("last" === place || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if ("first" === place) {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return -1;
                    if ("last" === a.place || "first" === b.place) return 1;
                    return a.place - b.place;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                Array.prototype.sort.call(arr, (function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if ("first" === a.place || "last" === b.place) return 1;
                        if ("last" === a.place || "first" === b.place) return -1;
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
        window["FLS"] = false;
        isWebp();
        menuInit();
        formFieldsInit({
            viewPass: false
        });
        formSubmit();
    })();
})();