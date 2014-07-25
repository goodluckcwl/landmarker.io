var Backbone = require('../lib/backbonej');

"use strict";

exports.Dispatcher = Backbone.Model.extend({

    defaults: function () {
        return {
            BATCH_RENDER: false
        }
    },

    rerender: function () {
        this.trigger('rerender');
    },

    enableBatchRender: function () {
        this.set('BATCH_RENDER', true);
    },

    disableBatchRender: function () {
        this.set('BATCH_RENDER', false);
    },

    isBatchRenderEnabled: function () {
        return this.get('BATCH_RENDER');
    }

});
