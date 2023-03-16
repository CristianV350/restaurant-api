import Archive from '../models/archive.model';
import { NextFunction, Request, Response } from 'express';
import Ingredient from '../models/ingredient.model';

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
exports.search = async (req: Request, res: Response, next: NextFunction) => {
  const params = req.body
  if (!params) res.status(404).json({ message: "Params not provided!" })

  let archives = await Archive.findAll({ where: params })
  res.status(200).json(archives)
}

// Get all categories
exports.save = async (req: Request, res: Response, next: NextFunction) => {
  let archive = null
  let params = req.body
  if (!params) res.status(404).json({ message: "Params not provided!" })

  archive = await Archive.findOne({ where: params })
  if (!archive) {
    archive = await Archive.create({ ...params, stockList: JSON.stringify([]) })
    res.status(200).json(archive)
  }
  let stockJson = await Ingredient.findAll({ where: { archive_id: archive.id } })
  if (!stockJson) stockJson = []
  params["stockList"] = JSON.stringify(stockJson)

  archive = await archive.update(params)
  res.status(200).json(archive)
}
