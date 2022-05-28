import { Knex } from 'knex'
import { AuthUser } from '../../@types/auth-user'
import { User } from '../../db/models/user.model'

type ColumnName<T> = Knex.ResolveTableType<T, 'base'>

export abstract class BaseService<
	T,
	I extends Knex.DbColumn<Knex.ResolveTableType<T, 'base'>[keyof Knex.ResolveTableType<T, 'base'>]>
> {
	protected abstract table: Knex.QueryBuilder<T>
	protected transaction: Knex.Transaction

	constructor(private idName: keyof ColumnName<T>) {}

	async findById(id: I): Promise<T> {
		const result = await this.table.where(this.idName, id)
		if (Array.isArray(result)) return result.shift()
		return result
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	create(data: Omit<T, keyof ColumnName<T>>, user?: AuthUser<User>): Promise<number[] | T> | Promise<T> {
		if (this.transaction) {
			return this.table.transacting(this.transaction).insert(data as never) as Promise<number[]>
		}
		return this.table.insert(data as never) as Promise<number[]>
	}

	update(data: Omit<T, keyof ColumnName<T>>, id: I): Promise<number> | Promise<T> {
		if (this.transaction) {
			return this.table
				.transacting(this.transaction)
				.update(data as never)
				.where(this.idName, id) as never
		}
		return this.table.update(data as never).where(this.idName, id) as never
	}

	withTransaction(transaction: Knex.Transaction): void {
		this.transaction = transaction
	}

	findAll(): Promise<Array<T>> {
		return this.table.select()
	}

	delete(id: I): Knex.QueryBuilder<T, number> {
		return this.table.where(this.idName, id).delete()
	}

	protected deleteWhere(whereClause: Partial<T>): Promise<number> {
		if (this.transaction) {
			return this.table
				.transacting(this.transaction)
				.where({ ...whereClause })
				.delete()
		}
		return this.table.where({ ...whereClause }).delete()
	}
}
