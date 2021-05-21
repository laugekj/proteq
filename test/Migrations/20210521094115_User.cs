using Microsoft.EntityFrameworkCore.Migrations;

namespace test.Migrations
{
    public partial class User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserSteps_Steps_stepId",
                table: "UserSteps");

            migrationBuilder.DropForeignKey(
                name: "FK_UserSteps_Users_userId",
                table: "UserSteps");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "UserSteps",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "stepId",
                table: "UserSteps",
                newName: "StepId");

            migrationBuilder.RenameIndex(
                name: "IX_UserSteps_userId",
                table: "UserSteps",
                newName: "IX_UserSteps_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserSteps_stepId",
                table: "UserSteps",
                newName: "IX_UserSteps_StepId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "UserSteps",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StepId",
                table: "UserSteps",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserSteps_Steps_StepId",
                table: "UserSteps",
                column: "StepId",
                principalTable: "Steps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserSteps_Users_UserId",
                table: "UserSteps",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserSteps_Steps_StepId",
                table: "UserSteps");

            migrationBuilder.DropForeignKey(
                name: "FK_UserSteps_Users_UserId",
                table: "UserSteps");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserSteps",
                newName: "userId");

            migrationBuilder.RenameColumn(
                name: "StepId",
                table: "UserSteps",
                newName: "stepId");

            migrationBuilder.RenameIndex(
                name: "IX_UserSteps_UserId",
                table: "UserSteps",
                newName: "IX_UserSteps_userId");

            migrationBuilder.RenameIndex(
                name: "IX_UserSteps_StepId",
                table: "UserSteps",
                newName: "IX_UserSteps_stepId");

            migrationBuilder.AlterColumn<int>(
                name: "userId",
                table: "UserSteps",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "stepId",
                table: "UserSteps",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_UserSteps_Steps_stepId",
                table: "UserSteps",
                column: "stepId",
                principalTable: "Steps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserSteps_Users_userId",
                table: "UserSteps",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
