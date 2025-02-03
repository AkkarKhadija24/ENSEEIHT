/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/4/16.
 */

var GraphUpdateTypes = {
  NODE_ADDED: "NODE_ADDED",
  NODE_DELETED: "NODE_DELETED",
  NODE_UPDATED: "NODE_UPDATED",
  EDGE_ADDED: "EDGE_ADDED",
  EDGE_UPDATED: "EDGE_UPDATED",
  EDGE_DELETED: "EDGE_DELETED"
};

var GraphDetailLevels = {
  LOW: 0,
  MODERATE_LOW: 1,
  MODERATE: 2,
  MODERATE_HIGH: 3,
  HIGH: 4
};

var ValueTypes = {
  REFERENCE: 'reference',
  TEMPLATE: 'template',
  CONSTANT: 'constant'
};