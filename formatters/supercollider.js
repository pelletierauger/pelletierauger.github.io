module.exports = function(hljs) {
    return {
        keywords: {
            keyword: 'arg Synth SynthDef var',
            built_in: 'ExpRand Out PinkNoise Ringz SinOsc XLine',
            literal: 'true false'
        },
        illegal: '"',
        contains: [
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            hljs.C_NUMBER_MODE,
            {
                className: 'meta',
                begin: '#',
                end: '$'
            }
        ]
    };
};