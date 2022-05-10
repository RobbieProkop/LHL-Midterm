/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
// Once teh queries are working we'll pull them out to a seperate file
//const userQueries = require('../db/points-queries')

const pointRouter = (db) => {
  //GET /points/
  router.get("/", (req, res) => {
    let query = `SELECT * FROM points`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const points = data.rows;
        res.json({ points });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:mapId", (req, res) => {
    // let query = `SELECT * FROM points WHERE id = $1`;
    let query = `
    SELECT points.latitude, points.longitude
    FROM points
    JOIN maps ON maps.id = map_id
    WHERE maps.id = $1`;

    let queryParams = req.params.mapId;

    db.query(query, [queryParams])
      .then((point) => {
        res.json(point.rows[0]);
        // res.send(point.rows[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:id/edit", (req, res) => {
    let queryString = `
      UPDATE points
      SET title = $2, description = $3, image_url = $4
      WHERE id = $1
      RETURNING *`;
    const queryParams = [
      req.params.id,
      req.body.title,
      req.body.description,
      req.body.imageURL,
    ];

    console.log("POST points/:id/edit req.params", req.params);
    console.log("POST points/:id/edit req.body", req.body);
    console.log("POST points/:id/edit queryString", queryString);
    console.log("POST points/:id/edit queryParams", queryParams);

    db.query(queryString, queryParams)
      .then((pointEdited) => {
        console.log(
          "The point editted by the POST points/:id/edit is: ",
          pointEdited.rows[0]
        );
        res.send(pointEdited.rows[0]);
      })
      .catch((err) => {
        console.log("YO our shit broke!!");
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    let queryString = `
      INSERT INTO points (map_id, title, description, image_url, latitude, longitude)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`;
    const queryParams = [
      req.body.mapId,
      req.body.title,
      req.body.description,
      req.body.imageURL,
      req.body.latitude,
      req.body.longitude,
    ];
    db.query(queryString, queryParams)
      .then((pointAdded) => {
        console.log("New point added in post route");
        console.log("Returning from POST /points/: ", pointAdded.rows);
        res.send(pointAdded.rows[0]);
        //return pointAdded.rows[0];
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};

module.exports = pointRouter;