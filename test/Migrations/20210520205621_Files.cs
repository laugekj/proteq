using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace test.Migrations
{
    public partial class Files : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Steps_stepId",
                table: "Files");

            migrationBuilder.RenameColumn(
                name: "stepId",
                table: "Files",
                newName: "StepId");

            migrationBuilder.RenameIndex(
                name: "IX_Files_stepId",
                table: "Files",
                newName: "IX_Files_StepId");

            migrationBuilder.AlterColumn<int>(
                name: "StepId",
                table: "Files",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Files",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Steps_StepId",
                table: "Files",
                column: "StepId",
                principalTable: "Steps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Steps_StepId",
                table: "Files");

            migrationBuilder.RenameColumn(
                name: "StepId",
                table: "Files",
                newName: "stepId");

            migrationBuilder.RenameIndex(
                name: "IX_Files_StepId",
                table: "Files",
                newName: "IX_Files_stepId");

            migrationBuilder.AlterColumn<int>(
                name: "stepId",
                table: "Files",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Files",
                type: "text",
                nullable: false,
                oldClrType: typeof(int))
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Steps_stepId",
                table: "Files",
                column: "stepId",
                principalTable: "Steps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
