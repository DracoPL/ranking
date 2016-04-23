/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/competitions              ->  index
 * POST    /api/competitions              ->  create
 * GET     /api/competitions/:id          ->  show
 * PUT     /api/competitions/:id          ->  update
 * DELETE  /api/competitions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Competitions from './competitions.model';
import Matches from '../matches/matches.model';
import Standing from '../standing/standing.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.extend(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Competitionss
export function index(req, res) {
  return Competitions.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Competitions from the DB
export function show(req, res) {
  return Competitions.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Competitions in the DB
export function create(req, res) {
  return Competitions.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Competitions in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Competitions.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Competitions from the DB
export function destroy(req, res) {
  return Competitions.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function begin(req, res) {
  Competitions.findById(req.params.id).exec().then(competition => {
    var players = competition.players.slice();
    var shuffledPlayers = shuffle(players);
    var playersCount = shuffledPlayers.length;
    var matches = [];
    for (var i = 0; playersCount > i; i = i + 2) {
      var matchPlayers = shuffledPlayers.splice(0,2);
      var match = {
        competition: {
          id: competition._id,
          name: competition.name
        },
        home: {
          id: matchPlayers[0]._id,
          name: matchPlayers[0].name,
          score: {
            points: 0,
            td: 0,
            cas: 0
          }
        },
        away: {
          id: matchPlayers[1]._id,
          name: matchPlayers[1].name,
          score: {
            points: 0,
            td: 0,
            cas: 0
          }
        },
        round: 1
      };

      matches.push(match);
    }
    Matches.create(matches).then(() => {
      console.log('Matches created');
    });

    var roundOneStandings = competition.players.map(function(item) {
      var standing = {
        competition: {
          id: competition._id,
          name: competition.name
        },
        player: {
          id: item._id,
          name: item.name
        },
        score: {
          points: 0,
          td: 0,
          cas: 0
        },
        round: 1
      };

      return standing;
    });

    Standing.create(roundOneStandings).then( () => {
      console.log('Round one standing created');
    });

    competition.started = true;
    competition.rounds.push(1);
    competition.save().then(()=>{
      res.status(204).end();
    });
  });
}

export function newRound(req, res) {
  Competitions.findById(req.params.id).exec().then(competition => {

    competition.currentRound++;

    Standing.find({'competition.id': competition.id, 'round': competition.currentRound - 1})
    .sort({'score.points': -1, 'score.tdCasTotal': -1}).exec().then(standings => {
      var standingPlayers = standings.slice();
      var playersCount = standingPlayers.length;
      var matches = [];
      for (var i = 0; playersCount > i; i = i + 2) {
        var matchPlayers = standingPlayers.splice(0,2);
        var match = {
          competition: {
            id: competition._id,
            name: competition.name
          },
          home: {
            id: matchPlayers[0].player.id,
            name: matchPlayers[0].player.name,
            score: {
              points: 0,
              td: 0,
              cas: 0
            }
          },
          away: {
            id: matchPlayers[1].player.id,
            name: matchPlayers[1].player.name,
            score: {
              points: 0,
              td: 0,
              cas: 0
            }
          },
          round: competition.currentRound
        };

        matches.push(match);
      }
      Matches.create(matches).then(() => {
        console.log('Matches created');
      })

    var newRoundStandings = standings.map(function(item) {
      var standing = {
        competition: {
          id: competition._id,
          name: competition.name
        },
        player: {
          id: item.player.id,
          name: item.player.name
        },
        score: {
          points: item.score.points,
          td: item.score.td,
          cas: item.score.cas,
          tdCasTotal: item.score.td + item.score.cas
        },
        round: competition.currentRound
      };

      return standing;
    });

    Standing.create(newRoundStandings).then( () => {
      console.log('New round standings created');
    });
  });

    competition.rounds.push(competition.currentRound);
    competition.save().then(()=>{
      res.status(204).end();
    })
  });
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
