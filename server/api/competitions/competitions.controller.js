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
