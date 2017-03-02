import {Meteor} from 'meteor/meteor';
import {DDP} from 'meteor/ddp-client';
import {NProgress} from 'meteor/mrt:nprogress';
import {_} from 'lodash';

// Adapting auto-nprogress former package logic
const isMeteorSubscription = name => name.indexOf("meteor.") === 0 || name.indexOf("meteor_") === 0;

Meteor.startup(() => {
    Meteor.originalSubscribe = Meteor.subscribe;

    Meteor.subscribe = function (subscribeName) {
        if (subscribeName && !isMeteorSubscription(subscribeName)) {
            //preserves original onReady and onError functions
            let newArgs = arguments;
            const callbacks = {};
            // const params = Array.prototype.slice.call(arguments, 1);
            const makeFn = (fn) => () => {
                if (document.body) {
                    NProgress.done();
                }
                if (fn) {
                    fn.apply(this, arguments);
                }
            };

            const cut = (args) => Array.prototype.slice.call(args, 0, args.length - 1);

            if (arguments.length > 1) {
                const lastObj = arguments[arguments.length - 1];
                if (lastObj) {
                    if (_.isFunction(lastObj)) {
                        callbacks.onReady = makeFn(lastObj);
                        newArgs = cut(arguments);
                    }
                    else {
                        if (lastObj.onReady && _.isFunction(lastObj.onReady)) {
                            callbacks.onReady = makeFn(lastObj.onReady);
                            newArgs = cut(arguments);
                        }

                        if (lastObj.onError && _.isFunction(lastObj.onError)) {
                            callbacks.onError = makeFn(lastObj.onError);
                            newArgs = cut(arguments);
                        }
                    }
                }
            }

            if (!callbacks.onReady) {
                callbacks.onReady = makeFn();
            }
            if (!callbacks.onError) {
                callbacks.onError = makeFn();
            }

            Array.prototype.push.call(newArgs, callbacks);

            if (document.body) {
                NProgress.start();
                const c = setInterval(function () {
                    if (document.body && DDP._allSubscriptionsReady()) {
                        NProgress.done();
                        clearInterval(c);
                    }
                }, 80);
            }
            return Meteor.originalSubscribe.apply(this, newArgs);
        }
    };

    Meteor.withoutBar = {
        subscribe: Meteor.originalSubscribe
    };
});
