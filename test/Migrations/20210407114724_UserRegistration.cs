using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace test.Migrations
{
    public partial class UserRegistration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRegistrations",
                table: "UserRegistrations");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserRegistrations");

            migrationBuilder.AlterColumn<string>(
                name: "Mail",
                table: "UserRegistrations",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PrimaryKey_Mail",
                table: "UserRegistrations",
                column: "Mail");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PrimaryKey_Mail",
                table: "UserRegistrations");

            migrationBuilder.AlterColumn<string>(
                name: "Mail",
                table: "UserRegistrations",
                type: "text",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UserRegistrations",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRegistrations",
                table: "UserRegistrations",
                column: "Id");
        }
    }
}
