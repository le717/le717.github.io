module.exports = function(grunt) {
  "use strict";
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner: "/* <%= pkg.name %> - v<%= pkg.version %>\n" +
    " * <%= pkg.homepage ? '' + pkg.homepage + '\\n' : '' %>" +
    " * Created <%= grunt.template.today('yyyy') %> <%= pkg.author %>;\n" +
    " * Licensed under the <%= _.pluck(pkg.licenses, 'type').join(', ') %>\n */\n",
    cssfiles: ["css/*.css", "!css/*.min.css"],
    jsfiles: ["js/*.js", "!js/*.min.js"],

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

    copy: {
      main: {
        files: [
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

    htmlhint: {
      html: {
        options: {
          "tag-pair": true,
        },
        src: ["index.html"]
      }
    },

    csslint: {
      strict: {
        options: {
          csslintrc: ".csslintrc",
          "import": 2
        },
        src: "<%= cssfiles %>",
      }
    },

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

    jshint: {
      src: {
        options: {
          jshintrc: ".jshintrc"
        },
        src: "<%= jsfiles %>",
      },
    },

    uglify: {
      options: {
        banner: "<%= banner %>",
        compress: true,
        mangle: true,
        report: "min",
        sourceMap: false
      },
      my_target: {
        files: {
          "js/about.min.js": "js/about.js",
          "js/script.min.js": "js/script.js"
        }
      }
    },

    watch: {
      files: ["Gruntfile.js", "<%= cssfiles %>", "<%= jsfiles %>"],
      tasks: ["all"]
    }
  });

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.registerTask("default", "List of commands", function() {
    grunt.log.writeln("");
    grunt.log.writeln("Run 'grunt lint' to lint the source files");
    grunt.log.writeln("Run 'grunt build' to minify the source files");
    grunt.log.writeln("Run 'grunt devUpdate' to update the devDependencies");
    grunt.log.writeln("Run 'grunt all' to run all tasks except 'devUpdate'");
  });

  grunt.registerTask("lint", ["htmlhint", "jshint", "csslint"]);
  grunt.registerTask("build", ["copy", "cssmin", "uglify"]);
  grunt.registerTask("all", ["lint", "build"]);

  // Always use --force to stop csslint from killing the task
  grunt.option("force", true);
};
