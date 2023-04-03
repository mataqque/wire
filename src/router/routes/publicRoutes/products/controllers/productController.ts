import { Request, Response } from 'express';
import { pool } from '../../../../../database/database';

export const productController = {
	getProduct: async (req: Request, res: Response) => {
		const { categoria, subcategoria, nombre } = req.params;
		try {
			const category = req.params.categoria;
			const subcategory = req.params.subcategoria;
			const name_product = req.params.nombre;
			let data = await pool.query('SELECT * FROM sp_products WHERE name_product = ?', [name_product]);

			if (data.length === 0) {
				res.status(404).json({ type: false, status: 404, error: 'Producto no encontrado' });
			} else {
				let images = await pool.query(
					`SELECT files.uuid,files.file_name,files.collection_name,files.dir,files.compress,files.size,orden FROM sp_products JOIN sp_products_images ON sp_products.uuid_product = sp_products_images.id_producto JOIN files ON sp_products_images.id_image = files.uuid WHERE sp_products.uuid_product = ? ORDER BY orden;`,
					[data[0].uuid_product]
				);
				data[0].images = images;
				res.status(200).json({ type: true, status: 200, data: data });
			}
		} catch (error) {
			res.status(500).json({ type: false, status: 500, error: error });
		}
	},
};
