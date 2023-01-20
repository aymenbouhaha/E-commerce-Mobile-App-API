// Add mongoose Document for types checks
import { Document } from 'mongoose';
// Create and export an interface  for the product document
export interface Product extends Document {
  // Add the fields from your schema
  // Each field and its type
  title: string;
  description: string;
  image: string;
  price: string;
  createdAt: Date;
}
