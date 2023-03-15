import Archive from '../models/archive.model';
import { NextFunction, Request, Response } from 'express';

// Get all categories
exports.get = (req: Request, res: Response, next: NextFunction) => {
  Archive.findAll()
    .then(archives => {
      res.status(200).json(archives)
    })
    .catch(err => console.error(err))
}

// Get category by id
exports.find = (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id
  if (id == "") res.status(404).json({ message: "Id not provided!" })

  Archive.findById(id)
    .then(archive => {
      res.status(200).json(archive)
    })
    .catch(err => console.error(err))
}

// Find category by params
exports.search = (req: Request, res: Response, next: NextFunction) => {
  const params = req.params

  Archive.findAll({ where: params })
    .then(archives => {
      if (!archives.length) res.status(404).json({ message: "Archives not found!" })
      res.status(200).json(archives)
    })
    .catch(err => console.error(err))
}

// Get all categories
exports.save = async (req: Request, res: Response, next: NextFunction) => {
  let params = req.body
  if (!params) res.status(404).json({ message: "Params not provided!" })

  let exists = await Archive.findOne({ where: params })
  if (exists) {
    let archive = await exists.update(params)
    res.status(200).json(archive)
  }

  let archive = await Archive.create(params)
  res.status(200).json(archive)
}
