import prisma from "../src/lib/prisma";

const TOTAL_USERS = 50_000;
const TOTAL_CAMPAIGNS = 10_000;

async function main() {
    console.log("Deletando dados antigos...");
    await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "Usuario", "Campanha" RESTART IDENTITY CASCADE;`,
    );

    console.log(`Inserindo usuários (${TOTAL_USERS})...`);
    await prisma.$executeRaw`
    INSERT INTO "Usuario" ("nome", "email", "criadoEm", "atualizadoEm")
    SELECT
      'User ' || g,
      'user' || g || '@seed.com',
      now(),
      now()
    FROM generate_series(1, ${TOTAL_USERS}) AS g;
  `;

    console.log(`Inserindo campanhas (${TOTAL_CAMPAIGNS})...`);

    await prisma.$executeRawUnsafe(`
      WITH usuario_ids AS (
        SELECT id
        FROM "Usuario"
      ), random_users AS (
        SELECT id
        FROM usuario_ids
        ORDER BY random()
        LIMIT ${TOTAL_CAMPAIGNS}
      )
      INSERT INTO "Campanha" (nome, descricao, ativo, "criadoEm", "atualizadoEm", "usuarioId")
      SELECT
          'Campanha ' || i AS nome,
          'Campanha ' || i || ' gerada automaticamente' AS descricao,
          true AS ativo,
          NOW() AS "criadoEm",
          NOW() AS "atualizadoEm",
          (ARRAY(SELECT id FROM random_users))[i % ${TOTAL_CAMPAIGNS} + 1] AS "usuarioId"
      FROM generate_series(1, ${TOTAL_CAMPAIGNS}) AS i;
    `);

    console.log(
        `Seed concluído: ${TOTAL_USERS} usuários, ${TOTAL_CAMPAIGNS} campanhas criadas.`,
    );
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
