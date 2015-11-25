var modulesVersion = '0.6.6'; // this package should release with original universe:modules

Package.describe({
    name: 'universe:ecmascript',
    version: modulesVersion,
    summary: 'Supports ES2015+ in all .js files with modules',
    git: 'https://github.com/vazco/universe-ecmascript',
    documentation: 'README.md'
});

Package.registerBuildPlugin({
    name: 'UniverseEcmascript',
    use: ['universe:modules-compiler@1.0.5'],
    sources: ['plugin.js']
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    // Use Meteor 1.2 build plugin
    api.use(['universe:modules@' + modulesVersion, 'isobuild:compiler-plugin@1.0.0']);
    api.imply('universe:modules@' + modulesVersion);
});