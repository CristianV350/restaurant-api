import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import fs from 'fs/promises';
import Archive from '../models/archive.model';
import Ingredient from '../models/ingredient.model'
import ErrorModel from './../models/error';

interface CategoryIngredient {
  id: number;
  name: string;
  price: number;
  quantity: number;
  measure: string;
}

interface Category {
  name: string;
  ingredients: CategoryIngredient[];
  total: number;
}

exports.exportPDF = async (req: Request, res: Response) => {
  const { type, checkpoint_id, category_id, archive_id } = req.body;

  // try {
  let categories: { [key: string]: Category } = {};
  let sum = 0;

  const items = await Ingredient.findAll({ where: { 'archive_id': archive_id } })
  console.log(items)
  return

  // if (type === 'ingredients') {
  //   for (const item of items) {
  //     const archiveName = await Archive.find('id', item.archiveId).first();
  //     for (const fi of food_ingredient) {
  //       let category = categories[fi.category.name];
  //       if (!category) {
  //         category = { name: fi.category.name, ingredients: [], total: 0 };
  //         categories[fi.category.name] = category;
  //       }
  //       let ingredient = category.ingredients.find((i) => i.name === fi.ingredient.name);
  //       if (ingredient) {
  //         ingredient.price += fi.ingredient.price;
  //         ingredient.quantity += fi.quantity;
  //       } else {
  //         category.ingredients.push({
  //           id: category.ingredients.length + 1,
  //           name: fi.ingredient.name,
  //           price: fi.ingredient.price,
  //           quantity: fi.quantity,
  //           measure: fi.ingredient.measure
  //         });
  //       }
  //       category.total += fi.ingredient.purchase_price * fi.quantity;
  //       sum += fi.ingredient.purchase_price * fi.quantity;
  //     }
  //   }

  //   const doc = new PDFDocument();
  //   const stream = doc.pipe(fs.createWriteStream('ingredients.pdf'));

  //   for (const category of Object.values(categories)) {
  //     doc.fontSize(14).text(category.name);
  //     for (const ingredient of category.ingredients) {
  //       doc.fontSize(10).text(`${ingredient.name} - ${ingredient.quantity} ${ingredient.measure} - $${ingredient.price.toFixed(2)} each - total $${(ingredient.price * ingredient.quantity).toFixed(2)}`);
  //     }
  //     doc.fontSize(12).text(`Total: $${category.total.toFixed(2)}`);
  //     doc.moveDown();
  //   }

  //   doc.fontSize(14).text(`Grand Total: $${sum.toFixed(2)}`);
  //   doc.end();

  //   res.setHeader('Content-Type', 'application/pdf');
  //   await stream.on('finish', () => {
  //     res.download('ingredients.pdf');
  //   });
  // } else if (type === 'calculation') {
  //   const menu_name = await Menu.where('id', menu_id).pluck('name').first();

  //   for (const item of items) {
  //     const food_ingredient = await FoodIngredient.where('food_id', item.food_id).with('ingredient', 'category').get();
  //     for (const fi of food_ingredient) {
  //       let category = categories[fi.category.name];
  //       if (!category) {
  //         category = { name: fi.category.name, ingredients: [], total: 0 };
  //         categories[fi.category.name] = category;
  //       } else {
  //         category.ingredients.push({
  //           id: category.ingredients.length + 1,
  //           name: fi.ingredient.name,
  //           price: fi.ingredient.price,
  //           purchase_price: fi.ingredient.purchase_price,
  //           quantity: fi.quantity,
  //           measure: fi.ingredient.measure
  //         });
  //       }
  //       category.total += fi.ingredient.price * fi.quantity;
  //       sum += fi.ingredient.price * fi.quantity;
  //     }
  //   }
  //   const doc = new PDFDocument();
  //   const stream = doc.pipe(fs.createWriteStream('calculation.pdf'));

  //   doc.fontSize(16).text(`Menu Calculation - ${menu_name}`);
  //   doc.moveDown();

  //   for (const category of Object.values(categories)) {
  //     doc.fontSize(14).text(category.name);
  //     for (const ingredient of category.ingredients) {
  //       doc.fontSize(10).text(`${ingredient.name} - ${ingredient.quantity} ${ingredient.measure} - $${ingredient.price.toFixed(2)} each - total $${(ingredient.price * ingredient.quantity).toFixed(2)}`);
  //     }
  //     doc.fontSize(12).text(`Total: $${category.total.toFixed(2)}`);
  //     doc.moveDown();
  //   }

  //   doc.fontSize(14).text(`Grand Total: $${sum.toFixed(2)}`);
  //   doc.end();

  //   res.setHeader('Content-Type', 'application/pdf');
  //   await stream.on('finish', () => {
  //     res.download('calculation.pdf');
  //   });
  // }
  // } catch (err: ErrorModel) {
  //   console.log(err);
  //   res.status(500).send(err.message);
  // }
}