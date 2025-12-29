CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- CreateIndex
CREATE INDEX "campanha_nome_trgm_idx" ON "Campanha" USING GIN ("nome" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "campanha_descricao_trgm_idx" ON "Campanha" USING GIN ("descricao" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "usuario_nome_trgm_idx" ON "Usuario" USING GIN ("nome" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "usuario_email_trgm_idx" ON "Usuario" USING GIN ("email" gin_trgm_ops);
