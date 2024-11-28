import { Model, FilterQuery } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IPagination } from './types';

export class BaseRepository<T extends { [key: string]: any }> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async find(query: FilterQuery<T>, paginationOption?: IPagination): Promise<T[]> {
    if (paginationOption && (paginationOption.page || paginationOption.pageSize)) {
      const { page = 1, pageSize = 10, sortBy } = paginationOption;
      const skip = (page - 1) * Number(pageSize);
      const limit = Number(pageSize);

      return this.model
        .find(query)
        .sort({ [sortBy]: 1 })
        .skip(skip)
        .limit(limit);
    }

    if (paginationOption && paginationOption.sortBy) {
      return this.model.find(query).sort({ [paginationOption.sortBy]: 1 });
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
