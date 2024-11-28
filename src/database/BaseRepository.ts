import { Model, Document, FilterQuery } from 'mongoose';
import { ObjectId } from 'mongodb';

interface IPagination {
  skip: number;
  limit: number;
  sortBy: string | number | symbol | any;
}
export class BaseRepository<T extends { [key: string]: any }> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async find(query: FilterQuery<T>, paginationOption?: IPagination): Promise<T[]> {
    if (paginationOption) {
      const { skip = 0, limit = 10, sortBy = 'createdAt' } = paginationOption;
      return this.model
        .find(query)
        .sort({ [sortBy]: 1 })
        .skip(skip)
        .limit(limit);
    }

    return this.model.find(query);
  }

  async findOne(query: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(query);
  }

  async create(data: Partial<T>): Promise<T> {
    const newItem = new this.model(data);
    return newItem.save();
  }

  async update(query: FilterQuery<T>, data: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(query, data, { new: true });
  }

  async delete(query: FilterQuery<T>): Promise<T | null> {
    return this.model.findOneAndDelete(query);
  }
}
