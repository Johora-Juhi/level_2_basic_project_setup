import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: this?.query?.searchTerm, $options: "i" },
            }) as FilterQuery<T>
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludedTerm = ["searchTerm", "limit", "sort", "page", "fields"];
    excludedTerm.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort: string = (this?.query?.sort as string) || "-id";
    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  paginate() {
    const limit: number = this?.query?.limit ? Number(this?.query.limit) : 1;
    const skip: number = this?.query?.page
      ? (Number(this?.query.page) - 1) * limit
      : 0;

    this.modelQuery = this.modelQuery.skip(skip);

    return this;
  }

  fields() {
    const fields: string = this?.query.fields
      ? (this?.query.fields as string).split(",").join(" ")
      : "-__v";

    this.modelQuery = this.modelQuery
      .select(fields)
      .populate("user")
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      });

    return this;
  }
}

export default QueryBuilder;
