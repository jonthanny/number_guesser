var assert = require('chai').assert;
var Game = require('./game.js');

describe('Game', function() {
  it('exists', function() {
    assert.isFunction(Game);
  });

  it('hasMin', function() {
    var game = new Game(1,100);

    assert.equal(game.curMin,1);
  });

  it('hasMax', function() {
    var game = new Game(1,100);

    assert.equal(game.curMax,100);
  });

  it('has a start time', function() {
    var game = new Game(1,100);

    assert.equal(game.startTime,0);
  });

  it('has a end time', function() {
    var game = new Game(1,100);

    assert.equal(game.endTime,1);
  });

  it('has elapsed time function', function() {
    var game = new Game(1,100);

    assert.equal(game.timeElapsed,0);
    game.timeElapse();
    assert.equal(game.timeElapsed,1);
  });

  it('Has a currentCorrectNumber', function() {
    var game = new Game(1,100);
    
    assert.equal(game.currentCorrectNumber,0);
  });

});
