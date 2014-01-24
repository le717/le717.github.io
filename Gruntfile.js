module.exports = function (grunt) {
    "use strict";
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        banner: '/* <%= pkg.name %> - v<%= pkg.version %>\n' +
      '<%= pkg.homepage ? "" + pkg.homepage + "\\n" : "" %>' +
      'Created <%= grunt.template.today("yyyy") %> <%= pkg.author %>; ' +
      'Licensed under the <%= _.pluck(pkg.licenses, "type").join(", ") %>\n*/\n',

        // Validate the HTML using the W3C HTML Validator
        validation: {
            options: {
                reset: grunt.option("reset") || false,
                stoponerror: false,
            },
            files: {
                src: "index.html",
            }
        },

        // Lint the CSS
        csslint: {
            strict: {
                options: {
                    csslintrc: ".csslintrc",
                    "import": 2
                },
                src: "css/style.css",
            }
        },

        // Minify any CSS
        cssmin: {
            add_banner: {
                options: {
                    banner: "<%= banner %>"
                },
                files: {
                    "css/style.min.css": ["css/style.css"]
                }
            }
        },

        // Lint the JavaScript
        jshint: {
            src: {
                options: {
                    jshintrc: ".jshintrc"
                },
                src: ["Gruntfile.js", "js/script.js"],
            },
        },

        // Minify any JavaScript
        uglify: {
            options: {
                banner: "<%= banner %>"
            },
            my_target: {
                files: {
                    "js/script.min.js": ["js/script.js"],
                }
            }
        },

        // Watched files to trigger grunt
        watch: {
            files: ["index.html", "css/*.css", "*.js", "js/*.js"],
            tasks: ["all"]
        }
    });

    // Load the plugins required for our tasks
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask('default', 'List commands', function () {
        grunt.log.writeln("");
        grunt.log.writeln("Run 'grunt lint' to lint the source files");
        grunt.log.writeln("Run 'grunt build' to minify the source files");
        grunt.log.writeln("Run 'grunt all' to lint and minify the source files");
    });

    // Define the tasks
    grunt.registerTask("lint", ["validation", "csslint", "jshint"]);
    grunt.registerTask("build", ["cssmin", "uglify"]);
    grunt.registerTask("all", ["lint", "build"]);

    // Always use --force to stop csslint from killing the task
    grunt.option("force", true);
};
