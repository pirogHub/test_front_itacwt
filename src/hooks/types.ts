import {z} from 'zod';

const defaultData = z.object({
	id: z.number(),
	active: z.boolean(),
});

const productSchema = defaultData.merge(
	z.object({
		name: z.string(),
		options: z.object({
			size: z.string(),
			amount: z.number(),
		}),
		createdAt: z.string(),
	}),
);

const pricePlanSchema = defaultData.merge(
	z.object({
		description: z.string(),
		createdAt: z.string(),
		removedAt: z.string().optional(),
	}),
);

const pageSchema = defaultData.merge(
	z.object({
		title: z.string(),
		updatedAt: z.string(),
		publishedAt: z.string(),
	}),
);

export const AvailableDataStructSchema = z.union([
	z.object({
		type: z.literal('Products'),
		data: z.array(productSchema),
	}),
	z.object({
		type: z.literal('PricePlans'),
		data: z.array(pricePlanSchema),
	}),
	z.object({
		type: z.literal('Pages'),
		data: z.array(pageSchema),
	}),
]);
const AnyOfTypeSchema = z.union([productSchema, pricePlanSchema, pageSchema]);
export type AnyOfTypeType = z.infer<typeof AnyOfTypeSchema>;

export type AvailableDataStructType = z.infer<typeof AvailableDataStructSchema>;
