import * as fs from 'fs'

class MyMigrationSource {
	getMigrations(): string[] {
		return fs.readdirSync(process.cwd() + '/src/db/migrations')
	}

	getMigrationName(migration: string): string {
		return migration.slice(0, -3)
	}

	getMigration(migrationName: string): any {
		return require(`../db/migrations/${migrationName}`)
	}
}

export const migrationSource = new MyMigrationSource()
