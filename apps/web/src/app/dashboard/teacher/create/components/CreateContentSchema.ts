import * as z from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const CreateContentSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
  video_url: z.string().optional(),
  category: z.string({
    required_error: 'Category is required',
  }),
  type: z.string({
    required_error: 'Type is required',
  }),
  thumbnail_url: z
    .any()
    .refine(
      (files) => !files || files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (files) => !files || ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
});
