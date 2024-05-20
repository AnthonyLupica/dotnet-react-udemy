using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Createinitialsentimentomigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Journals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Text = table.Column<string>(type: "TEXT", nullable: true),
                    EmotionPrimary = table.Column<int>(type: "INTEGER", nullable: false),
                    EmotionColor = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Journals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmotionScores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FkJournal = table.Column<Guid>(type: "TEXT", nullable: false),
                    Joy = table.Column<float>(type: "REAL", nullable: false),
                    Surprise = table.Column<float>(type: "REAL", nullable: false),
                    Disgust = table.Column<float>(type: "REAL", nullable: false),
                    Sadness = table.Column<float>(type: "REAL", nullable: false),
                    Anger = table.Column<float>(type: "REAL", nullable: false),
                    Fear = table.Column<float>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmotionScores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmotionScores_Journals_FkJournal",
                        column: x => x.FkJournal,
                        principalTable: "Journals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmotionScores_FkJournal",
                table: "EmotionScores",
                column: "FkJournal",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmotionScores");

            migrationBuilder.DropTable(
                name: "Journals");
        }
    }
}
