import Category from '../models/category.model';
import { NextFunction, Request, Response } from 'express';

// Get all categories
exports.get = (req: Request, res: Response, next: NextFunction) => {
  Category.findAll()
    .then(categories => {
      res.status(200).json(categories)
    })
    .catch(err => console.error(err))
}

// Get category by id
exports.find = (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id
  if (id == "") res.status(404).json({ message: "Id not provided!" })

  Category.findById(id)
    .then(category => {
      res.status(200).json(category)
    })
    .catch(err => console.error(err))
}

// Find category by params
exports.search = (req: Request, res: Response, next: NextFunction) => {
  const params = req.params

  Category.findAll({ where: params })
    .then(categories => {
      if (!categories.length) res.status(404).json({ message: "Categories not found!" })
      res.status(200).json(categories)
    })
    .catch(err => console.error(err))
}

// Get all categories
exports.save = async (req: Request, res: Response, next: NextFunction) => {
  let params = req.body
  if (!params) res.status(404).json({ message: "Params not provided!" })
  let name = params.name

  let exists = await Category.findOne({ where: params })
  if (exists) {
    let category = await exists.update(params)
    res.status(200).json(category)
  }

  let category = await Category.create(params)
  res.status(200).json(category)
}
