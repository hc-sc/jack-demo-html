/**
 *   Jenkins build script for HelloWorld_HTML
 *
 */

pipeline {
	agent {label 'HelloWorld_HTML'}
	
    stages {
	    //stage("Grunt Tasks") {
		//}
	    
	    plugins {
  		id "com.eriwen.gradle.css" version "2.14.0"
		}
	stage("Tests") {
	    buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'com.eriwen:gradle-css-plugin:1.11.0'
    }
}

// Invoke the plugin
apply plugin: 'css'

// Declare your sources
css.source {
    dev {
        css {
            srcDir "app/styles"
            include "*.css"
            exclude "*.min.css"
        }
    }
}

// Specify a collection of files to be combined, then minified and finally GZip compressed.
combineCss {
    source = css.source.dev.css.files
    dest = "${buildDir}/all.css"
}

minifyCss {
    source = combineCss
    dest = "${buildDir}/all-min.css"
    yuicompressor { // Optional
        lineBreakPos = -1
    }
}

gzipCss {
    source = minifyCss
    dest = "${buildDir}/all.2.0.4.css"
}
	}
	    
	    stage("Deploy") {
            when {
                branch 'master'
            }
            steps {
                    println("File has been updated to")
		    sh '''
          			sudo ls -al
				locate -i index.html
				cat index.html	
                    '''
			}
        
        }                
    
	}
}
