/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/matches              ->  index
 * POST    /api/matches              ->  create
 * GET     /api/matches/:id          ->  show
 * PUT     /api/matches/:id          ->  update
 * DELETE  /api/matches/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Matches from './matches.model';
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

  try {
    var matchPlayed = entity.played;

    var oldHomeScore = {
      points: entity.home.score.points,
      td: entity.home.score.td,
      cas: entity.home.score.cas
    };
    var oldAwayScore = {
      points: entity.away.score.points,
      td: entity.away.score.td,
      cas: entity.away.score.cas
    };
    // updating HOME player standing
    Standing.findOne({
      'player.id': updates.home.id,
      'competition.id': updates.competition.id,
      'round': updates.round
    }).exec((err, homeStanding) => {
      if (matchPlayed) {
        homeStanding.score.points -= oldHomeScore.points;
        homeStanding.score.td -= oldHomeScore.td;
        homeStanding.score.cas -= oldHomeScore.cas;
      }

      homeStanding.score.points += updates.home.score.points;
      homeStanding.score.td += updates.home.score.td;
      homeStanding.score.cas += updates.home.score.cas;

      homeStanding.score.tdCasTotal = homeStanding.score.td + homeStanding.score.cas;

      var newHomeScore = {
        points: homeStanding.score.points,
        td: homeStanding.score.td,
        cas: homeStanding.score.cas,
        tdCasTotal: homeStanding.score.tdCasTotal
      };

      Standing.update({ _id: homeStanding.id }, { $set: { score: newHomeScore }}, () => {
        console.log('Standing updated');
      });
    });

    // updating AWAY player standing
    Standing.findOne({
      'player.id': updates.away.id,
      'competition.id': updates.competition.id,
      'round': updates.round
    }).exec((err, awayStanding) => {
      if (matchPlayed) {
        awayStanding.score.points -= oldAwayScore.points;
        awayStanding.score.td -= oldAwayScore.td;
        awayStanding.score.cas -= oldAwayScore.cas;
      }

      awayStanding.score.points += updates.away.score.points;
      awayStanding.score.td += updates.away.score.td;
      awayStanding.score.cas += updates.away.score.cas;

      awayStanding.score.tdCasTotal = awayStanding.score.td + awayStanding.score.cas;

      var newAwayScore = {
        points: awayStanding.score.points,
        td: awayStanding.score.td,
        cas: awayStanding.score.cas,
        tdCasTotal: awayStanding.score.tdCasTotal
      };

      Standing.update({ _id: awayStanding.id }, { $set: { score: newAwayScore }}, () => {
        console.log('standing updated');
      });
    });
  } catch (err) {
    console.log(err.message);
  }
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

// Gets a list of Matchess
export function index(req, res) {
  return Matches.find(req.query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Matches from the DB
export function show(req, res) {
  return Matches.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Matches in the DB
export function create(req, res) {
  return Matches.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Matches in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Matches.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Matches from the DB
export function destroy(req, res) {
  return Matches.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
