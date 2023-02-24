import { NextFunction, Request, Response } from 'express';
import CheckpointModel from '../models/checkpoint.model';

// Get all categories
exports.get = (req: Request, res: Response, next: NextFunction) => {
  CheckpointModel.findAll()
    .then(checkpoints => {
      res.status(200).json({ result: checkpoints })
    })
    .catch(err => console.error(err))
}

// Get category by id
exports.find = (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id
  if (id == "") res.status(404).json({ message: "Id not provided!" })

  CheckpointModel.findById(id)
    .then(checkpoint => {
      res.status(200).json({ result: checkpoint })
    })
    .catch(err => console.error(err))
}

// Find category by params
exports.search = (req: Request, res: Response, next: NextFunction) => {
  const params = req.params

  CheckpointModel.findAll({ where: params })
    .then(checkpoints => {
      if (!checkpoints.length) res.status(404).json({ message: "Checkpoints not found!" })
      res.status(200).json({ result: checkpoints })
    })
    .catch(err => console.error(err))
}

// Find category by params
exports.save = async (req: Request, res: Response, next: NextFunction) => {
  const params = req.body
  const name = params.name
  const address = params.address
  console.log(params)

  let checkpoint = await CheckpointModel.findOne({ where: params })
  if (checkpoint !== null) res.status(404).json({ message: "Checkpoint already exists!" })

  checkpoint = await CheckpointModel.create({ name, address })
  res.status(200).json({ result: checkpoint })
}

