module.exports = function(grunt) {

    require('jit-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        revision: "r" + process.cwd().split('/').pop(),

        less: {

            common: {
                files: {
                    "web/app.css": [
                        "app.less"
                    ]
                }
            }
        },

        watch: {

            less: {
                files: ['**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            },

            jsx: {
                files: ['components/**/*.js', 'app.js'],
                tasks: ['browserify'],
                options: {
                    spawn: false
                }
            }
        },

        'http-server': {

            'dev': {

                // the server root directory
                root: 'web',

                port: 9009,

                host: "127.0.0.1",

                cache: 0,
                showDir : true,
                autoIndex: true,

                // server default file extension
                ext: "html",

                // run in parallel with other tasks
                runInBackground: false

            }

        },

        browserify: {
            dist: {
                files: {
                    'web/app.js': ['app.js'],
                },
                options: {
                   
                }
            }
        }

    });

    grunt.registerTask('css', ['less']);
    grunt.registerTask('default', ['css', 'imagemin', 'browserify']);
};
