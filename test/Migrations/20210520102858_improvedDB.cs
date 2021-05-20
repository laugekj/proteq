using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace test.Migrations
{
    public partial class improvedDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "File",
                table: "Steps");

            migrationBuilder.DropColumn(
                name: "FileType",
                table: "Steps");

            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    stepId = table.Column<int>(nullable: true),
                    FileType = table.Column<string>(nullable: true),
                    FileData = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Files_Steps_stepId",
                        column: x => x.stepId,
                        principalTable: "Steps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserSteps",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userId = table.Column<int>(nullable: true),
                    stepId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSteps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSteps_Steps_stepId",
                        column: x => x.stepId,
                        principalTable: "Steps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserSteps_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Files_stepId",
                table: "Files",
                column: "stepId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSteps_stepId",
                table: "UserSteps",
                column: "stepId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSteps_userId",
                table: "UserSteps",
                column: "userId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropTable(
                name: "UserSteps");

            migrationBuilder.AddColumn<byte[]>(
                name: "File",
                table: "Steps",
                type: "bytea",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileType",
                table: "Steps",
                type: "text",
                nullable: true);
        }
    }
}
