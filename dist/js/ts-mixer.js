const copyProps = (dest, src, exclude = []) => {
    const props = Object.getOwnPropertyDescriptors(src);
    for (let prop of exclude)
        delete props[prop];
    Object.defineProperties(dest, props);
};
const protoChain = (obj, currentChain = [obj]) => {
    const proto = Object.getPrototypeOf(obj);
    if (proto === null)
        return currentChain;
    return protoChain(proto, [...currentChain, proto]);
};
const nearestCommonProto = (...objs) => {
    if (objs.length === 0)
        return undefined;
    let commonProto = undefined;
    const protoChains = objs.map(obj => protoChain(obj));
    while (protoChains.every(protoChain => protoChain.length > 0)) {
        const protos = protoChains.map(protoChain => protoChain.pop());
        const potentialCommonProto = protos[0];
        if (protos.every(proto => proto === potentialCommonProto))
            commonProto = potentialCommonProto;
        else
            break;
    }
    return commonProto;
};
const hardMixProtos = (ingredients, constructor, exclude = []) => {
    var _a;
    const base = (_a = nearestCommonProto(...ingredients)) !== null && _a !== void 0 ? _a : Object.prototype;
    const mixedProto = Object.create(base);
    const visitedProtos = protoChain(base);
    for (let prototype of ingredients) {
        let protos = protoChain(prototype);
        for (let i = protos.length - 1; i >= 0; i--) {
            let newProto = protos[i];
            if (visitedProtos.indexOf(newProto) === -1) {
                copyProps(mixedProto, newProto, ['constructor', ...exclude]);
                visitedProtos.push(newProto);
            }
        }
    }
    mixedProto.constructor = constructor;
    return mixedProto;
};
const unique = (arr) => arr.filter((e, i) => arr.indexOf(e) == i);
const getIngredientWithProp = (prop, ingredients) => {
    const protoChains = ingredients.map(ingredient => protoChain(ingredient));
    let protoDepth = 0;
    let protosAreLeftToSearch = true;
    while (protosAreLeftToSearch) {
        protosAreLeftToSearch = false;
        for (let i = ingredients.length - 1; i >= 0; i--) {
            const searchTarget = protoChains[i][protoDepth];
            if (searchTarget !== undefined && searchTarget !== null) {
                protosAreLeftToSearch = true;
                if (Object.getOwnPropertyDescriptor(searchTarget, prop) != undefined) {
                    return protoChains[i][0];
                }
            }
        }
        protoDepth++;
    }
    return undefined;
};
const proxyMix = (ingredients, prototype = Object.prototype) => new Proxy({}, {
    getPrototypeOf() {
        return prototype;
    },
    setPrototypeOf() {
        throw Error('Cannot set prototype of Proxies created by ts-mixer');
    },
    getOwnPropertyDescriptor(_, prop) {
        return Object.getOwnPropertyDescriptor(getIngredientWithProp(prop, ingredients) || {}, prop);
    },
    defineProperty() {
        throw new Error('Cannot define new properties on Proxies created by ts-mixer');
    },
    has(_, prop) {
        return getIngredientWithProp(prop, ingredients) !== undefined || prototype[prop] !== undefined;
    },
    get(_, prop) {
        return (getIngredientWithProp(prop, ingredients) || prototype)[prop];
    },
    set(_, prop, val) {
        const ingredientWithProp = getIngredientWithProp(prop, ingredients);
        if (ingredientWithProp === undefined)
            throw new Error('Cannot set new properties on Proxies created by ts-mixer');
        ingredientWithProp[prop] = val;
        return true;
    },
    deleteProperty() {
        throw new Error('Cannot delete properties on Proxies created by ts-mixer');
    },
    ownKeys() {
        return ingredients
            .map(Object.getOwnPropertyNames)
            .reduce((prev, curr) => curr.concat(prev.filter(key => curr.indexOf(key) < 0)));
    },
});
const softMixProtos = (ingredients, constructor) => proxyMix([...ingredients, { constructor }]);
const settings = {
    initFunction: null,
    staticsStrategy: 'copy',
    prototypeStrategy: 'copy',
    decoratorInheritance: 'deep',
};
const mixins = new Map();
const getMixinsForClass = (clazz) => mixins.get(clazz);
const registerMixins = (mixedClass, constituents) => mixins.set(mixedClass, constituents);
const hasMixin = (instance, mixin) => {
    if (instance instanceof mixin)
        return true;
    const constructor = instance.constructor;
    const visited = new Set();
    let frontier = new Set();
    frontier.add(constructor);
    while (frontier.size > 0) {
        if (frontier.has(mixin))
            return true;
        frontier.forEach(item => visited.add(item));
        const newFrontier = new Set();
        frontier.forEach(item => {
            var _a;
            const itemConstituents = (_a = mixins.get(item)) !== null && _a !== void 0 ? _a : protoChain(item.prototype).map(proto => proto.constructor).filter(item => item !== null);
            if (itemConstituents)
                itemConstituents.forEach(constituent => {
                    if (!visited.has(constituent) && !frontier.has(constituent))
                        newFrontier.add(constituent);
                });
        });
        frontier = newFrontier;
    }
    return false;
};
const mergeObjectsOfDecorators = (o1, o2) => {
    var _a, _b;
    const allKeys = unique([...Object.getOwnPropertyNames(o1), ...Object.getOwnPropertyNames(o2)]);
    const mergedObject = {};
    for (let key of allKeys)
        mergedObject[key] = unique([...((_a = o1 === null || o1 === void 0 ? void 0 : o1[key]) !== null && _a !== void 0 ? _a : []), ...((_b = o2 === null || o2 === void 0 ? void 0 : o2[key]) !== null && _b !== void 0 ? _b : [])]);
    return mergedObject;
};
const mergePropertyAndMethodDecorators = (d1, d2) => {
    var _a, _b, _c, _d;
    return ({
        property: mergeObjectsOfDecorators((_a = d1 === null || d1 === void 0 ? void 0 : d1.property) !== null && _a !== void 0 ? _a : {}, (_b = d2 === null || d2 === void 0 ? void 0 : d2.property) !== null && _b !== void 0 ? _b : {}),
        method: mergeObjectsOfDecorators((_c = d1 === null || d1 === void 0 ? void 0 : d1.method) !== null && _c !== void 0 ? _c : {}, (_d = d2 === null || d2 === void 0 ? void 0 : d2.method) !== null && _d !== void 0 ? _d : {}),
    });
};
const mergeDecorators = (d1, d2) => {
    var _a, _b, _c, _d, _e, _f;
    return ({
        class: unique([...(_a = d1 === null || d1 === void 0 ? void 0 : d1.class) !== null && _a !== void 0 ? _a : [], ...(_b = d2 === null || d2 === void 0 ? void 0 : d2.class) !== null && _b !== void 0 ? _b : []]),
        static: mergePropertyAndMethodDecorators((_c = d1 === null || d1 === void 0 ? void 0 : d1.static) !== null && _c !== void 0 ? _c : {}, (_d = d2 === null || d2 === void 0 ? void 0 : d2.static) !== null && _d !== void 0 ? _d : {}),
        instance: mergePropertyAndMethodDecorators((_e = d1 === null || d1 === void 0 ? void 0 : d1.instance) !== null && _e !== void 0 ? _e : {}, (_f = d2 === null || d2 === void 0 ? void 0 : d2.instance) !== null && _f !== void 0 ? _f : {}),
    });
};
const decorators = new Map();
const findAllConstituentClasses = (...classes) => {
    var _a;
    const allClasses = new Set();
    const frontier = new Set([...classes]);
    while (frontier.size > 0) {
        for (let clazz of frontier) {
            const protoChainClasses = protoChain(clazz.prototype).map(proto => proto.constructor);
            const mixinClasses = (_a = getMixinsForClass(clazz)) !== null && _a !== void 0 ? _a : [];
            const potentiallyNewClasses = [...protoChainClasses, ...mixinClasses];
            const newClasses = potentiallyNewClasses.filter(c => !allClasses.has(c));
            for (let newClass of newClasses)
                frontier.add(newClass);
            allClasses.add(clazz);
            frontier.delete(clazz);
        }
    }
    return [...allClasses];
};
const deepDecoratorSearch = (...classes) => {
    const decoratorsForClassChain = findAllConstituentClasses(...classes)
        .map(clazz => decorators.get(clazz))
        .filter(decorators => !!decorators);
    if (decoratorsForClassChain.length == 0)
        return {};
    if (decoratorsForClassChain.length == 1)
        return decoratorsForClassChain[0];
    return decoratorsForClassChain.reduce((d1, d2) => mergeDecorators(d1, d2));
};
const directDecoratorSearch = (...classes) => {
    const classDecorators = classes.map(clazz => getDecoratorsForClass(clazz));
    if (classDecorators.length === 0)
        return {};
    if (classDecorators.length === 1)
        return classDecorators[0];
    return classDecorators.reduce((d1, d2) => mergeDecorators(d1, d2));
};
const getDecoratorsForClass = (clazz) => {
    let decoratorsForClass = decorators.get(clazz);
    if (!decoratorsForClass) {
        decoratorsForClass = {};
        decorators.set(clazz, decoratorsForClass);
    }
    return decoratorsForClass;
};
const decorateClass = (decorator) => ((clazz) => {
    const decoratorsForClass = getDecoratorsForClass(clazz);
    let classDecorators = decoratorsForClass.class;
    if (!classDecorators) {
        classDecorators = [];
        decoratorsForClass.class = classDecorators;
    }
    classDecorators.push(decorator);
    return decorator(clazz);
});
const decorateMember = (decorator) => ((object, key, ...otherArgs) => {
    const decoratorTargetType = typeof object === 'function' ? 'static' : 'instance';
    const decoratorType = typeof object[key] === 'function' ? 'method' : 'property';
    const clazz = decoratorTargetType === 'static' ? object : object.constructor;
    const decoratorsForClass = getDecoratorsForClass(clazz);
    let decoratorsForTargetType = decoratorsForClass === null || decoratorsForClass === void 0 ? void 0 : decoratorsForClass[decoratorTargetType];
    if (!decoratorsForTargetType) {
        decoratorsForTargetType = {};
        decoratorsForClass[decoratorTargetType] = decoratorsForTargetType;
    }
    let decoratorsForType = decoratorsForTargetType === null || decoratorsForTargetType === void 0 ? void 0 : decoratorsForTargetType[decoratorType];
    if (!decoratorsForType) {
        decoratorsForType = {};
        decoratorsForTargetType[decoratorType] = decoratorsForType;
    }
    let decoratorsForKey = decoratorsForType === null || decoratorsForType === void 0 ? void 0 : decoratorsForType[key];
    if (!decoratorsForKey) {
        decoratorsForKey = [];
        decoratorsForType[key] = decoratorsForKey;
    }
    decoratorsForKey.push(decorator);
    return decorator(object, key, ...otherArgs);
});
const decorate = (decorator) => ((...args) => {
    if (args.length === 1)
        return decorateClass(decorator)(args[0]);
    return decorateMember(decorator)(...args);
});
function Mixin(...constructors) {
    var _a, _b, _c;
    const prototypes = constructors.map(constructor => constructor.prototype);
    const initFunctionName = settings.initFunction;
    if (initFunctionName !== null) {
        const initFunctions = prototypes
            .map(proto => proto[initFunctionName])
            .filter(func => typeof func === 'function');
        const combinedInitFunction = function (...args) {
            for (let initFunction of initFunctions)
                initFunction.apply(this, args);
        };
        const extraProto = { [initFunctionName]: combinedInitFunction };
        prototypes.push(extraProto);
    }
    function MixedClass(...args) {
        for (const constructor of constructors)
            copyProps(this, new constructor(...args));
        if (initFunctionName !== null && typeof this[initFunctionName] === 'function')
            this[initFunctionName].apply(this, args);
    }
    MixedClass.prototype = settings.prototypeStrategy === 'copy'
        ? hardMixProtos(prototypes, MixedClass)
        : softMixProtos(prototypes, MixedClass);
    Object.setPrototypeOf(MixedClass, settings.staticsStrategy === 'copy'
        ? hardMixProtos(constructors, null, ['prototype'])
        : proxyMix(constructors, Function.prototype));
    let DecoratedMixedClass = MixedClass;
    if (settings.decoratorInheritance !== 'none') {
        const classDecorators = settings.decoratorInheritance === 'deep'
            ? deepDecoratorSearch(...constructors)
            : directDecoratorSearch(...constructors);
        for (let decorator of (_a = classDecorators === null || classDecorators === void 0 ? void 0 : classDecorators.class) !== null && _a !== void 0 ? _a : []) {
            const result = decorator(DecoratedMixedClass);
            if (result) {
                DecoratedMixedClass = result;
            }
        }
        applyPropAndMethodDecorators((_b = classDecorators === null || classDecorators === void 0 ? void 0 : classDecorators.static) !== null && _b !== void 0 ? _b : {}, DecoratedMixedClass);
        applyPropAndMethodDecorators((_c = classDecorators === null || classDecorators === void 0 ? void 0 : classDecorators.instance) !== null && _c !== void 0 ? _c : {}, DecoratedMixedClass.prototype);
    }
    registerMixins(DecoratedMixedClass, constructors);
    return DecoratedMixedClass;
}
const applyPropAndMethodDecorators = (propAndMethodDecorators, target) => {
    const propDecorators = propAndMethodDecorators.property;
    const methodDecorators = propAndMethodDecorators.method;
    if (propDecorators)
        for (let key in propDecorators)
            for (let decorator of propDecorators[key])
                decorator(target, key);
    if (methodDecorators)
        for (let key in methodDecorators)
            for (let decorator of methodDecorators[key])
                decorator(target, key, Object.getOwnPropertyDescriptor(target, key));
};
const mix = (...ingredients) => decoratedClass => {
    const mixedClass = Mixin(...ingredients.concat([decoratedClass]));
    Object.defineProperty(mixedClass, 'name', {
        value: decoratedClass.name,
        writable: false,
    });
    return mixedClass;
};
export { Mixin, decorate, hasMixin, mix, settings };
