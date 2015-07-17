Ext.define('AA.Glyphs', {
    singleton: true,
    alternateClassName: ['Glyphs'],
    constructor: function (config) {
        this.initConfig(config);
    },
    config: {
        checked : 'f0a9'
    },

    getIcon: function (glyph) {
        return Glyphs.getGlyph(glyph);
    },

    getGlyph: function (glyph) {
        if (typeof Glyphs.config[glyph] === 'undefined') {
            return false;
        }
        return Glyphs.config[glyph] + '@FontAwesome';
    }
});