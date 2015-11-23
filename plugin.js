Plugin.registerCompiler({
    extensions: ['js', 'jsx'],
    filenames: []
}, function () {
    return new UniverseModulesCompiler({
        _autoExecRegex: /.*/
    });
});