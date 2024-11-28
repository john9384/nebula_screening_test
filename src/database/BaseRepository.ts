import { Model, FilterQuery } from 'mongoose';
import { Filter, ObjectId } from 'mongodb';
import { IPagination } from './types';

export class BaseRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async find(query: FilterQuery<T>, paginationOption?: IPagination): Promise<Array<T>> {
    if (paginationOption && (paginationOption.page || paginationOption.pageSize)) {
      const { page = 1, pageSize = 10, sortBy } = paginationOption;
      const skip = (page - 1) * Number(pageSize);
      const limit = Number(pageSize);

      return  this.model
        .find(this._serializeQuery(query))
        .sort({ [sortBy]: 1 })
        .skip(skip)
        .limit(limit)
       
    }

    if (paginationOption && paginationOption.sortBy) {
      return  this.model.find(this._serializeQuery(query)).sort({ [paginationOption.sortBy]: 1 })
    }

    return  this.model.find(this._serializeQuery(query))
  }

  async findOne(query: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(this._serializeQuery(query));
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(query: FilterQuery<T>, data: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(this._serializeQuery(query), data, { new: true });
  }

  async delete(query: FilterQuery<T>): Promise<T | null> {
    return this.model.findOneAndDelete(this._serializeQuery(query));
  }

  private _serializeQuery(query: FilterQuery<T>) {
    const payload = { ...query }; 
  
    if (query.id) {
      const _id = new ObjectId(query.id);
      payload._id = _id;
      delete payload.id;
    }
  
    return payload;
  }
}
