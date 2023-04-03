import { Request, Response } from 'express';
import { pool } from '../../../../../database/database';

export const homeController = {
	getProducts: async (req: Request, res: Response) => {
		try {
			const products = await pool.query(`SELECT * FROM sp_products`);
			const productsWithImages = await Promise.all(
				products.map(async (item: any) => {
					const images = await pool.query(
						`SELECT files.uuid,files.file_name,files.collection_name,files.dir,files.compress,files.size FROM sp_products JOIN sp_products_images ON sp_products.uuid_product = sp_products_images.id_producto JOIN files ON sp_products_images.id_image = files.uuid WHERE sp_products.uuid_product = ?;`,
						[item.uuid_product]
					);
					return { ...item, images };
				})
			);
			res.status(200).json({ type: true, status: 200, data: productsWithImages });
		} catch (error) {
			res.status(500).json({ type: false, status: 500, error: error });
		}
	},
};
