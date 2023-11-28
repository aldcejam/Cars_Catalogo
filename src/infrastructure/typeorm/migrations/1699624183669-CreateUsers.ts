import { MigrationInterface, QueryRunner, Table } from "typeorm"


export class CreateUsers1699624183669 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Users",
                columns: [
                    {
                        name: "id",
                        type: "uuid", 
                    },
                    {
                        name: "name",
                        type: "varchar",
                    }, 
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "driver_license",
                        type: "varchar",
                    },
                    {
                        name: "isAdmin",
                        type: "boolean",
                        default: false, 
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "avatar",
                        type: "varchar",
                        isNullable: true,
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Users")
    }

}

 
