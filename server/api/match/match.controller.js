/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/matchs              ->  index
 * POST    /api/matchs              ->  create
 * GET     /api/matchs/:id          ->  show
 * PUT     /api/matchs/:id          ->  update
 * DELETE  /api/matchs/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Match from './match.model';
import Player from '../player/player.model'

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
    var updated = _.merge(entity, updates);
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

// Gets a list of Matchs
export function index(req, res) {
  return Match.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Match from the DB
export function show(req, res) {
  return Match.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Match in the DB
export function create(req, res) {

  console.log(req.body);

  var h_team = Player.findOne({name: req.query.h_team}, 'name rank');
  var a_team = Player.findOne({name: req.query.a_team});

  console.log(h_team);
  console.log(a_team);

  var h_score = req.query.h_score;
  var a_score = req.query.a_score;

  var score_diff = Math.abs(h_score - a_score);
  var gd_fix = (score_diff == 2) ? 1.19 : (7 + score_diff / 8);
  var result = 0.5;
    if (h_score > a_score) {
      result = 1;
    } else if (h_score < a_score) {
      result = 0;
    }
  var rank_diff = h_team.tank - a_team.rank;
  var type = 10;
  var expected_result = Math.pow(1/10, -rank_diff/400) + 1;
  var points = type * gd_fix * (result - expected_result);
  var h_points = (h_score > a_score) ? points : -points;
  var a_points = (a_score > h_score) ? points : -points;

  console.log({
    home: h_team.name,
    away: a_team.name,
    h_rank: h_team.rank,
    a_rank: a_team.rank,
    h_score: h_score,
    a_score: a_score,
    type: type,
    h_points: h_points,
    a_points: a_points
  });

  return Match.create({
    home: h_team.name,
    away: a_team.name,
    h_rank: h_team.rank,
    a_rank: a_team.rank,
    h_score: h_score,
    a_score: a_score,
    type: type,
    h_points: h_points,
    a_points: a_points
  }).then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Match in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Match.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Match from the DB
export function destroy(req, res) {
  return Match.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
