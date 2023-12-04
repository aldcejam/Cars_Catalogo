import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateCars1701176238045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Cars", 
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "daily_rate",
                        type: "numeric"
                    },
                    {
                        name: "available",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "license_plate",
                        type: "varchar"
                    },
                    {
                        name: "fine_amount",
                        type: "numeric"
                    },
                    {
                        name: "brand",
                        type: "varchar"
                    },
                    {
                        name: "category_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],   
            }) 
        )
        await queryRunner.createForeignKey(
            "Cars",
            new TableForeignKey({
                name: "FKCategoryCar",
                referencedTableName: "Categories",
                referencedColumnNames: ["id"],
                columnNames: ["category_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Cars")
    }

}
