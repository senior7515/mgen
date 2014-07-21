/*exported mGen */
(function() {

    "use strict";
    var mGen = {
        /**
         *
         * MGEN ClassRegistry GENERATOR.
         *
         * This module is used to create a mgen-ClassRegistry. The ClassRegistry is
         * later used to instanciate classes. To create a ClassRegistry simply
         * call mGen.generate with a ClassRegistryBlueprint (generated by mgen-javascriptgenerator)
         *
         * @param {object} ClassRegistryBlueprint - ClassRegistryBlueprint object created by mgen-javascriptgenerator (REQUIRED).
         *
         * @param settings {object} Settings for adjusting the behavior on creation of objects (OPTIONAL).
         * @param settings.warn              {bool} Set to true if warnings should be printed in console, default is true
         * @param settings.never_catch_error {bool} Set to true if mgen never internally should catch error, this is preferable when you want to find the origin of a error instead of a pritty error. Default false
         * @param settings.validate          {bool} Set to true for type-validation of data on creation. There is a fairly big performace improvement to turn this of. Default true
         * @return a ClassRegistry object.
         */
        generate: function(ClassRegistryBlueprint, settings) {
            var obj, obj_key, ClassRegistry;
            function tmpWrap(id){
                if(!id){ throw "Missing id";}
                return ClassRegistryBlueprint.lookup(id);
            }
            settings = settings || {};
            settings = {
                warn: (typeof settings.warn === "undefined") ? true : settings.warn,
                never_catch_error: (typeof settings.never_catch_error === "undefined") ? false : settings.never_catch_error,
                validate: (typeof settings.validate === "undefined") ? true : settings.validate,
                strict_enums: (typeof settings.strict_enums === "undefined") ? false : settings.strict_enums
            };

            // Default constructor. All generated classes inherits this (prototype-wize)
            ClassRegistry = function() {};

            /**
             * Validate
             * call this method on a instance to type-validate it.
             * @param options {object} settings for this individual object (if not specified it inherits the settings from the call to mGenGenerate)
             * @return {bool} true if all fields correspond to class ClassRegistryBlueprint, false otherwise.
             */
            ClassRegistry.validate = function(object, options) {
                var def = {
                    warn: false,
                    validate: true
                };
                options = options || {};
                extend(options, def);
                extend(options, settings);

                try {
                    new(ClassRegistry.getClass(tmpWrap(object.__t)))(object, options);
                } catch (e) {
                    if (options.warn) {
                        window.console.warn("Validation failed. Reason: \n" + e);
                    }
                    if (options.never_catch_error) {
                        throw e;
                    }
                    return false;
                }
                return true;
            };

            /**
             * @param typeId {string} base64 hash for the class
             * @return {bool} true if the class exist in the ClassRegistry, false otherwise.
             */
            ClassRegistry.hasClassWithId = function(typeId) {
                return tmpWrap(typeId) !== undefined;
            };

            /**
             * @param typeId {string} base64 hash for the class
             * @return {constructor} returns a class constructor for the specified typeid.
             */
            ClassRegistry.getClassWithId = function(typeId) {
                return ClassRegistry.getClass(tmpWrap(typeId));
            };

            /**
             * @param type path {string} the complete type path (or shorthand version) for the class, i.e "module1.module2.ClassName" or "ClassName"
             * @return {bool} true if the class exist in the ClassRegistry, false otherwise.
             */
            ClassRegistry.hasClass = function(path) {
                return ClassRegistryBlueprint.classes[path] !== undefined || typeof ClassRegistry[path] !== undefined;
            };

            /**
             * @param type path {string} the complete type path for the class, i.e "module1.module2.ClassName"
             * @return {constructor} returns a class constructor for the specified typeid.
             */
            ClassRegistry.getClass = function(path) {
                return treeIndexGet(ClassRegistry, path);
            };

            // create the classes in root and at absolue path.
            for (obj_key in ClassRegistryBlueprint.classes) {
                if (ClassRegistryBlueprint.classes.hasOwnProperty(obj_key)) {
                    registerClass(ClassRegistryBlueprint.classes[obj_key], obj_key);
                }
            }

            //lets find each super and create inheritance
            for (obj in ClassRegistryBlueprint.classes) {
                setParent(obj);
            }

            // The shorthand notation can create conflicts. Lets make sure we mark them as such.
            for (obj in ClassRegistryBlueprint.classes) {
                if (ClassRegistryBlueprint.classes.hasOwnProperty(obj_key)) {
                    handleConflict(obj_key);
                }
            }

            return ClassRegistry;

            /* CREATION HELPER FUNCTIONS */

            function setParent(obj) {
                var C, super_path;
                if (ClassRegistryBlueprint.classes.hasOwnProperty(obj)) {
                    C = ClassRegistry.getClass(tmpWrap(ClassRegistryBlueprint.classes[obj].__t));
                    if (C.prototype instanceof ClassRegistry) {
                        return;
                    }
                    super_path = getParentTypePath(ClassRegistryBlueprint.classes[obj]);
                    if (!super_path) {
                        C.prototype = new ClassRegistry();
                    } else {
                        setParent(super_path);
                        C.prototype = new(ClassRegistry.getClass(super_path))("NO_CONSTRUCT");
                    }
                    C.prototype.constructor = C;
                }
            }

            function handleConflict(path) {
                var shortName = getShortName(path),
                    obj = ClassRegistry[shortName];
                if (Array.isArray(obj)) { // its a conflict
                    ClassRegistry[shortName] = createConflictConstructor(obj);
                }
            }

            function createConflictConstructor(arr) {
                return function() {
                    var classPath,
                        e = "Call to conflicting constructor, please use full path istead of shorthand notation. \n";
                    e = e + "Possible versions are: \n";
                    for (classPath in arr) {
                        e = e + "\t" + classPath + "\n";
                    }
                    throw e;
                };
            }

            function getShortName(path) {
                var a = path.split(".");
                return a[a.length - 1];
            }

            function treeIndexGet(obj, path) {
                var original_path = path;

                function recTreeIndexGet(obj, path) {
                    if (typeof path === "string") {
                        return recTreeIndexGet(obj, path.split("."));
                    } else if (path.length === 0 || obj[path[0]] === undefined) {
                        if (typeof obj !== "function") {
                            throw "Class " + original_path + " not found in ClassRegistryBlueprint.";
                        }
                        return obj;
                    } else {
                        return recTreeIndexGet(obj[path[0]], path.slice(1));
                    }
                }
                return recTreeIndexGet(obj, path);
            }

            function treeIndexSet(obj, path, value) {
                if (typeof path === "string") {
                    treeIndexSet(obj, path.split("."), value);
                } else if (path.length === 1) {
                    obj[path[0]] = value;
                } else {
                    obj[path[0]] = obj[path[0]] || {};
                    treeIndexSet(obj[path[0]], path.slice(1), value);
                }
            }

            function registerClass(obj, path) {
                var currentClassType, currentClassPath, collidingClassType, collidingClassPath,

                    ClassConstructor = createClass(obj);

                treeIndexSet(ClassRegistry, path, ClassConstructor);
                if (!ClassRegistry[getShortName(path)]) {
                    ClassRegistry[getShortName(path)] = ClassConstructor;
                } else {
                    // we have a collision. Lets create a list of all the collisions and then later turn it into a warning for the user.

                    currentClassType = (new ClassConstructor("NO_CONSTRUCT")).__t;
                    currentClassPath = tmpWrap(currentClassType);

                    if (typeof ClassRegistry[getShortName(path)] === "function") {
                        collidingClassType = (new ClassRegistry[getShortName(path)]("NO_CONSTRUCT")).__t;
                        collidingClassPath = tmpWrap(collidingClassType);

                        ClassRegistry[getShortName(path)] = [collidingClassPath, currentClassPath];
                    } else {
                        // append to collision list
                        ClassRegistry[getShortName(path)].push(currentClassPath);
                    }
                }
            }

            function createClass(obj) {
                var _c = {}; // the _ object is used to trick the function.name property to be correct for the class.
                // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
                _c[tmpWrap(obj.__t)] = function(data, options) {
                    if (data === "NO_CONSTRUCT") {
                        this.__t = obj.__t;
                        return;
                    }

                    var default_construction = false;

                    if (data === "DEFAULT") {
                        default_construction = true;
                        data = null;
                    }

                    /* Options are local settings that inherits settings from the ClassRegistry */
                    options = options || {};
                    extend(options, settings);

                    if (data) {
                        if (data.__t) {
                            //If the data does not fit the corresponding type then check if it is a derived type.
                            if (obj.__t != data.__t) {
                                if (isDerivedType(data.__t, obj.__t)) {
                                    return new(ClassRegistry.getClass(tmpWrap(data.__t)))(data);
                                } else {
                                    throw " Tried to create " + tmpWrap(obj.__t) + " but got " + tmpWrap(data.__t);
                                }
                            }
                        }
                        if (options.validate) {
                            validateIndata(obj, data);
                        }
                    }

                    //populate fields with data.
                    for (var field in obj) {
                        if (!obj.hasOwnProperty(field)) continue;

                        if (field === "__t") {
                            this.__t = obj.__t;
                        } else {
                            try {
                                if (options.validate && !default_construction) {
                                    this[field] = createField(obj[field], field, data, options);
                                } else if (default_construction) {
                                    this[field] = createDefaultField(obj[field], field, options);
                                } else {
                                    this[field] = data ? data[field] : null;
                                }
                            } catch (err) {
                                if (options.never_catch_error) {
                                    throw err;
                                } else {
                                    throw "Could not create object " + tmpWrap(obj.__t) + " Reason: \n" + err;
                                }
                            }
                            if (this[field] === null) {
                                delete(this[field]);
                            }
                        }
                    }
                };
                return _c[tmpWrap(obj.__t)];
            }

            function validateIndata(obj, data) {
                var pos, _key, possible;
                for (_key in data) {
                    if (!data.hasOwnProperty(_key)) continue;
                    if (!obj[_key] && _key != "__t") {
                        // trying to set a field that does not exist. Throw error.
                        possible = "";
                        for (pos in obj) {
                            if (pos != "__t") {
                                possible += " \t " + pos + " \n ";
                            }
                        }
                        throw tmpWrap(obj.__t) + " does not have field " + _key +
                            " \n Possible options are: \n" + possible + " \n ";
                    }
                }
            }

            function createField(field, key, data, options) {
                if (hasFlag(field.flags, "required")) {
                    if (data === undefined || data[key] === undefined) {
                        throw "Missing REQUIRED value: \"" + key + "\" of type " + field.type;
                    }
                    return createFieldOfType(field.type, data[key], options);
                } else {
                    if (data && typeof data[key] !== "undefined") {
                        return createFieldOfType(field.type, data && data[key] || null, options);
                    } else {
                        return null;
                    }
                }
            }

            function createDefaultField(field, key, options) {
                if (options.validate && hasFlag(field.flags, "required")) {
                    throw "Missing REQUIRED value: \"" + key + "\" of type " + field.type;
                } else {
                    return createFieldOfType(field.type, null, options);
                }
            }


            function createFieldOfType(type, value, options) {
                var Construct, ret, t = type.split(":");

                //if we got a complete path as type
                if (ClassRegistryBlueprint.classes[t[0]]) {
                    t[1] = type;
                    t[0] = "object";
                }

                //t[0]: is now primitive type (int32, etc or object)
                //t[1]: if t[0] is a container type, t[1] will specify what it contains
                //t[2]: if t[0] is a map then it will be what t[1] maps to (ex: map:int32:Color)
                switch (t[0]) {
                    case "object":
                        if (value && typeof value !== "object") {
                            throw "Tried to create " + type + " but had no object data.";
                        }
                        value = value || {};
                        var V = ClassRegistry.getClass(t[1]);
                        ret = new V(value);
                        return ret;
                    case "list":
                        if (value && !Array.isArray(value)) {
                            throw "Tried to create " + type + " but had no array data.";
                        }
                        value = value || [];
                        ret = [];
                        Construct = ClassRegistry.getClass(t[1]);
                        value.forEach(function(entry) {
                            ret.push(new Construct(entry));
                        });
                        return ret;
                    case "map":
                        if (value && typeof value !== "object") {
                            throw "Tried to create " + type + " but had no object data.";
                        }
                        value = value || {};
                        ret = {};
                        for (var key in value) {
                            if (value.hasOwnProperty(key)) {
                                ret[createFieldOfType(t[1], key, options)] = createFieldOfType(t[2], value[key], options);
                            }
                        }
                        return ret;
                    case "enum":
                        return checkEnum(value, t[1].split(", "), options);
                    case "int8":
                        checkInt(value, 8, type, options);
                        return value || 0;
                    case "int16":
                        checkInt(value, 16, type, options);
                        return value || 0;
                    case "int32":
                        checkInt(value, 32, type, options);
                        ret = value || 0;
                        return ret;
                    case "int64":
                        checkInt(value, 64, type, options);
                        return value || 0;
                    case "float32":
                        checkFloat(value, 32, type, options);
                        return value || 0;
                    case "float64":
                        checkFloat(value, 64, type, options);
                        return value || 0;
                    case "string":
                        if (value && typeof value !== "string") {
                            throw "Tried to create " + type + " but had no string data.";
                        }
                        return value || "";
                    case "boolean":
                        return !!value;
                    default:
                        throw "Tried to create " + type + " but it's not implemented.";
                }
            }

            function checkEnum(value, allowed_values, options) {
                if (!value) {
                    return "UNKNOWN";
                }
                if (value && typeof value !== "string") {
                    throw "Tried to create with wrong type (needed string).";
                }
                if (allowed_values.indexOf(value) === -1) {
                    if(options.strict_enums){
                        throw "Tried to create enum \"" + value +
                            "\" but only " + allowed_values.join(", ") + " are allowed." +
                            "You can bypass this with setting strict_enums to false";
                    } else {
                        return "UNKNOWN";
                    }
                }
                return value;
            }

            function checkInt(value, size, type, options) {
                if (size > 32) {
                    if (options.warn) {
                        window.console.warn("mgen_js cannot handle 64 bit integers well due to javascript limitations. See https://developer.mozilla.org/en-US/docs/Mozilla/js-ctypes/js-ctypes_reference/Int64");
                    }
                }

                if (typeof value === "undefined" || value === null) {
                    return;
                }

                if (typeof value !== "number") {
                    throw "Tried to create " + type + " but data was of type: " + (typeof value);
                }

                if (isNumeric(parseInt(value, 10)) && (parseFloat(value, 10) === parseInt(value, 10))) {
                    var lim = Math.pow(2, size - 1);
                    if (value > lim - 1 || value < -lim) {
                        throw value + " is out of range for int" + size;
                    }
                    return true;
                } else {
                    throw "Tried to create " + type + " but data ( " + value + " ) was not a valid integer.";
                }
            }

            function checkFloat(value, size, type) {
                if (typeof value === "undefined" || value === null) {
                    return;
                }
                if (!isNumeric(value)) {
                    throw "Tried to create " + type + " but data ( " + value + " ) was not a valid float.";
                }
            }

            function hasFlag(fields, flag) {
                return (fields.indexOf(flag) > -1);
            }

            function isNumeric(number) {
                // Borrowed from jQuery with comment:
                // parseFloat NaNs numeric-cast false positives (null|true|false|"")
                // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
                // subtraction forces infinities to NaN
                return number - parseFloat(number) >= 0;
            }

            /**
             * @param derived {string} hash from derived type
             * @param base {string} hash from base type
             */
            function isDerivedType(derived, base) {
                return derived.substr(0, base.length - 1) === base;
            }

            function getParentTypePath(obj) {
                var parentHash = obj.__t.slice(0, -3);
                if (parentHash.length > 0) {
                    return tmpWrap(parentHash);
                } else {
                    return null;
                }
            }

            function extend(options, settings) {
                for (var field in settings) {
                    if (!settings.hasOwnProperty(field)) continue;
                    options[field] = (typeof options[field] === "undefined") ? settings[field] : options[field];
                }
            }
        },

        jsonHandler: function(ClassRegistry) {
            var JsonHandler = function(ClassRegistry) {
                this.ClassRegistry = ClassRegistry;
            };
            JsonHandler.prototype.stringToObject = function(data) {
                if (typeof data !== "string") throw "Create from string needs a string argument";
                var object = JSON.parse(data);
                return this.jsonToObject(object);
            };

            JsonHandler.prototype.jsonToObject = function(object) {
                return new(this.ClassRegistry.getClassWithId(object.__t))(object);
            };

            JsonHandler.prototype.objectToString = function(object) {
                return JSON.stringify(object);
            };
            return new JsonHandler(ClassRegistry);
        }
    };

    // Support for requirejs etc.
    if (typeof define === "function" && define.amd) {
        define("mGen", [], function() {
            return mGen;
        });
    } else {
        // expose mGen the old fashioned way.
        window.mGen = mGen;
    }

    return mGen;
})();