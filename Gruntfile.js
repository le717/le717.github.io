module.exports = function(grunt) {
  "use strict";
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner: "/* <%= pkg.name %> - v<%= pkg.version %>\n" +
    " * <%= pkg.homepage ? '' + pkg.homepage + '\\n' : '' %>" +
    " * Created <%= grunt.template.today('yyyy') %> <%= pkg.author %>;\n" +
    " * Licensed under the <%= _.pluck(pkg.licenses, 'type').join(', ') %>\n */\n",
    cssfiles: ["css/*.css", "!css/*.min.css"],
    jsfiles: ["js/*.js", "!js/*.min.js"],

    // Keep the devDependencies up-to-date
    devUpdate: {
      main: {
        options: {
          // Do not mention already updated dependencies
          reportUpdated: false,
          // Prompt asking if the dependency should be updated
          updateType : "prompt",
          packages: {
            devDependencies: true,
            dependencies: true
          },
        }
      }
    },

    // Copy dependencies to their proper locations
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: "node_modules/",
            src: ["jquery.browser/dist/*.min.js", "string-format/lib/*"],
            dest: "lib/",
            flatten: true,
            filter: "isFile"
          },
          {
            expand: true,
            flatten: true,
            cwd: "node_modules/",
            src: "scss-mixins/mixins/*",
            dest: "css/mixins/",
          },
        ]
      }
    },

    // Lint the HTML using HTMLHint
    htmlhint: {
      html: {
        options: {
          "tag-pair": true,
        },
        src: ["index.html"]
      }
    },

    // Lint CSS using CSS Lint
    csslint: {
      strict: {
        options: {
          csslintrc: ".csslintrc",
          "import": 2
        },
        src: "<%= cssfiles %>",
      }
    },

    // Minify any CSS using CSSMin
    cssmin: {
      add_banner: {
        options: {
          banner: "<%= banner %>"
        },
        files: {
          "css/not-pong.min.css": "css/not-pong.css",
        }
      }
    },

    // Lint JavaScript using JSHint
    jshint: {
      src: {
        options: {
          jshintrc: ".jshintrc"
        },
        src: "<%= jsfiles %>",
      },
    },

    // Minify JavaScript using Uglify
    uglify: {
      options: {
        banner: "<%= banner %>",
        compress: true,
        report: "min",
        sourceMap: false,
        mangle: true
      },
      my_target: {
        files: {
          "js/<%= pkg.name %>.min.js": "<%= jsfiles %>",
        }
      }
    },

    // Watched files to trigger grunt
    watch: {
      files: ["Gruntfile.js", "<%= cssfiles %>", "<%= jsfiles %>"],
      tasks: ["all"]
    }
  });

  // Load all the plugins required to perform our tasks
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.registerTask("default", "List of commands", function() {
    grunt.log.writeln("");
    grunt.log.writeln("Run 'grunt copy' to copy any dependencies");
    grunt.log.writeln("Run 'grunt lint' to lint the source files");
    grunt.log.writeln("Run 'grunt build' to minify the source files");
    grunt.log.writeln("Run 'grunt devUpdate' to update the devDependencies");
    grunt.log.writeln("Run 'grunt all' to run all tasks except 'devUpdate'");
  });

  // Define the tasks
  grunt.registerTask("lint", ["htmlhint", "jshint", "csslint"]);
  grunt.registerTask("build", "cssmin", "uglify");
  grunt.registerTask("all", ["lint", "build"]);

  // Always use --force to stop csslint from killing the task
  grunt.option("force", true);
};
