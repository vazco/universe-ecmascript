const recast = Npm.require('recast');
const esprima = Npm.require('esprima-fb');
const Module = Npm.require('es6-module-crosspiler');

class UniverseEcmascriptCompiler extends UniverseModulesCompiler {

    constructor () {
        //enabling autoLoad
        super({ _autoExecRegex: /.*/});
    }

    compileOneFile (inputFile) {
        const source = inputFile.getContentsAsString();
        const fileOptions = inputFile.getFileOptions();
        if (fileOptions && fileOptions.noModule){
            return this.compileNonModuleFile(inputFile, source);
        }
        try {
            // getting the code with recast
            const ast = recast.parse(source, {esprima});
            const module = Module(ast);
            // we check if our source definitely won't be a module  (no imports and no exports)

            if (!module.isModule()) {
                return this.compileNonModuleFile(inputFile, source);
            }
        } catch (e) {
            //console.log(e);
            /* It is possible that esprima will not recognize all imports syntax,
             so this must be wrapped by the autoload function */
        }
        return super.compileOneFile(inputFile);
    }

    compileNonModuleFile (inputFile, source) {
        // Relative path of file to the package or app root directory (always uses forward slashes)
        const filePath = inputFile.getPathInPackage();

        // Get options from original MDG Babel compilier
        const babelDefaultOptions = Babel.getDefaultOptions(this.extraFeatures);

        const babelOptions = _({}).extend(babelDefaultOptions, {
            sourceMap: true,
            filename: filePath,
            sourceFileName: '/' + filePath,
            sourceMapName: '/' + filePath + '.map',
            whitelist: this.getTransformers(inputFile)
        });

        try {
            var result = Babel.compile(source, babelOptions);
        } catch (e) {
            if (e.loc) {
                inputFile.error({
                    message: e.message,
                    sourcePath: filePath,
                    line: e.loc.line,
                    column: e.loc.column
                });
                return;
            }
            throw e;
        }
        return {
            data: result.code,
            sourceMap: result.map
        }
    }

}

Plugin.registerCompiler({
    extensions: ['js', 'jsx'],
    filenames: []
}, function () {
    return new UniverseEcmascriptCompiler();
});