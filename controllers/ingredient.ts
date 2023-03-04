import Category from '../models/category.model';
import Ingredient from '../models/ingredient.model';
import { Response } from 'express';
import { Request } from 'express';
import { NextFunction } from 'express';

exports.index = (req: Request, res: Response) => {
  // ...
};

exports.create = (req: Request, res: Response) => {
  // ...
};

exports.store = async (req: Request, res: Response) => {
  try {
    const { name, parent_id, price, measure, quantity } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    const dbData = await Ingredient.findOne({ where: { name } });

    if (dbData) {
      return res.json({ error: 'Exists' });
    }

    const ingredient = await Ingredient.create({
      name,
      category_id: parent_id,
      price: price || 0,
      measure: measure || 'kg',
      quantity: quantity || 0,
    });

    await ingredient.save();

    return res.json(ingredient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.find = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const ingredients = await Ingredient.findAll({ where: { "category_id": id } });

    return res.json(ingredients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Find category by params
exports.search = (req: Request, res: Response, next: NextFunction) => {
  const params = req.params

  Ingredient.findAll({ where: params })
    .then(ingredients => {
      if (!ingredients.length) res.status(404).json({ message: "Ingredients not found!" })
      res.status(200).json(ingredients)
    })
    .catch(err => console.error(err))
}

exports.edit = (req: Request, res: Response) => {
  // ...
};

exports.save = async (req: Request, res: Response) => {
  try {
    let params = req.body;
    const { name, measure, price, quantity } = req.body;
    const { id } = req.params;

    let ingredient = await Ingredient.findOne({ where: { name, id } });

    if (ingredient) {
      ingredient = await ingredient.update(params)
      return res.json(ingredient);
    }

    ingredient = await Ingredient.create({
      name,
      category_id: id,
      price: price || 0,
      measure: measure || 'kg',
      quantity: quantity || 0,
    });

    return res.json(ingredient);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const ingredient = await Ingredient.findOne({ where: { id } });

    if (!ingredient) return res.status(404).json({ error: 'Ingredient not found.' });

    await ingredient.destroy()
    return res.json({ message: 'Ingredient deleted.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};