using Microsoft.EntityFrameworkCore.Migrations;

namespace test.Migrations
{
    public partial class updatedTableNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.RenameTable(
                name: "UsersImproved",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "UserRegistrationsImprove",
                newName: "UserRegistrations");

            migrationBuilder.RenameIndex(
                name: "IX_UserRegistrationsImprove_UserId",
                table: "UserRegistrations",
                newName: "IX_UserRegistrations_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRegistrations",
                table: "UserRegistrations",
                column: "RegrId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRegistrations_Users_UserId",
                table: "UserRegistrations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRegistrations_Users_UserId",
                table: "UserRegistrations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRegistrations",
                table: "UserRegistrations");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "UsersImproved");

            migrationBuilder.RenameTable(
                name: "UserRegistrations",
                newName: "UserRegistrationsImprove");

            migrationBuilder.RenameIndex(
                name: "IX_UserRegistrations_UserId",
                table: "UserRegistrationsImprove",
                newName: "IX_UserRegistrationsImprove_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersImproved",
                table: "UsersImproved",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRegistrationsImprove",
                table: "UserRegistrationsImprove",
                column: "RegrId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRegistrationsImprove_UsersImproved_UserId",
                table: "UserRegistrationsImprove",
                column: "UserId",
                principalTable: "UsersImproved",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
