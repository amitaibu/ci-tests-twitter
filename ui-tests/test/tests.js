'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This is an example assuming BrowserStack is used, as the capabilities are
// encoded in the way their system is using.
// See https://www.browserstack.com/automate/node

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
var capsConfig = {
  'chrome': {
    'browser' : 'Chrome',
    'browser_version' : '39.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  }
}

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var url = 'https://twitter.com';

describe('Twitter visual regression tests', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show a user page',function(done) {
    client
      .url(url + '/gizra_drupal')
      .webdrivercss(testName, {
        name: 'user-page',
        elem: '#page-container',
        remove: [
          // Remove the tweets as they change often.
          '.ProfileTweet',
          // Hide the signup modal in case it pops-up.
          '#signup-dialog',
          '.modal-enabled .modal-overlay',
          // Hide the spinner
          '.GridTimeline .has-more-items .spinner'
        ],
        // Exclude (place a black rectangle).
        exclude: [
          '.ProfileNav-value',
          '.MoveableModule',
          '.PhotoRail-headingText',
          '.PhotoRail-mediaBox .media-thumbnail'
        ]
      }, shoovWebdrivercss.processResults)
      .call(done);
  });
});
