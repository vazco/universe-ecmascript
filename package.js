var modulesVersion = '0.6.7'; // this package should release with original universe:modules

Package.describe({
    name: 'universe:ecmascript',
    version: modulesVersion+'_1',
    summary: 'Supports ES2015+ in all .js files with modules',
    git: 'https://github.com/vazco/universe-ecmascript',
    documentation: 'README.md'
});

Package.registerBuildPlugin({
    name: 'UniverseEcmascript',
    use: ['babel-compiler@5.8.24_1', 'universe:modules-compiler@1.0.5', 'ecmascript@0.1.6', 'underscore@1.0.4'],
    sources: ['plugin.js'],
    npmDependencies: {
        'es6-module-crosspiler': '2.0.1',
        'esprima-fb': '15001.1001.0-dev-harmony-fb',
        'recast': '0.10.39'
    }
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    api.use(['universe:modules@' + modulesVersion, 'isobuild:compiler-plugin@1.0.0']);
    api.imply('ecmascript-runtime@0.2.6');
    api.imply('babel-runtime');
    api.imply('react-runtime@0.14.1||0.13.3');
    api.imply('promise');
    api.imply('universe:modules@' + modulesVersion);
});
