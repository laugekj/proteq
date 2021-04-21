using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace test.Migrations
{
    public partial class NewMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PrimaryKey_Mail",
                table: "UserRegistrations");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "UsersImproved");

            migrationBuilder.RenameTable(
                name: "UserRegistrations",
                newName: "UserRegistrationsImprove");

            migrationBuilder.AlterColumn<string>(
                name: "Mail",
                table: "UserRegistrationsImprove",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "RegrId",
                table: "UserRegistrationsImprove",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "UserRegistrationsImprove",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersImproved",
                table: "UsersImproved",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRegistrationsImprove",
                table: "UserRegistrationsImprove",
                column: "RegrId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRegistrationsImprove_UserId",
                table: "UserRegistrationsImprove",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRegistrationsImprove_UsersImproved_UserId",
                table: "UserRegistrationsImprove",
                column: "UserId",
                principalTable: "UsersImproved",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRegistrationsImprove_UsersImproved_UserId",
                table: "UserRegistrationsImprove");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersImproved",
                table: "UsersImproved");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRegistrationsImprove",
                table: "UserRegistrationsImprove");

            migrationBuilder.DropIndex(
                name: "IX_UserRegistrationsImprove_UserId",
                table: "UserRegistrationsImprove");

            migrationBuilder.DropColumn(
                name: "RegrId",
                table: "UserRegistrationsImprove");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserRegistrationsImprove");

            migrationBuilder.RenameTable(
                name: "UsersImproved",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "UserRegistrationsImprove",
                newName: "UserRegistrations");

            migrationBuilder.AlterColumn<string>(
                name: "Mail",
                table: "UserRegistrations",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PrimaryKey_Mail",
                table: "UserRegistrations",
                column: "Mail");
        }
    }
}
