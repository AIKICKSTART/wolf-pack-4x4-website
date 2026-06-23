import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "marketing_approvals" ADD COLUMN "source_actor" varchar;
  ALTER TABLE "marketing_approvals" ADD COLUMN "source_run_id" varchar;
  ALTER TABLE "marketing_approvals" ADD COLUMN "source_conversation_id" varchar;
  ALTER TABLE "marketing_approvals" ADD COLUMN "source_model" varchar;
  ALTER TABLE "marketing_approvals" ADD COLUMN "source_prompt_hash" varchar;
  ALTER TABLE "marketing_approvals" ADD COLUMN "source_workspace_git_sha" varchar;
  ALTER TABLE "marketing_approvals" ADD COLUMN "source_external_draft_id" varchar;
  ALTER TABLE "marketing_approvals" ADD COLUMN "source_idempotency_key" varchar;
  ALTER TABLE "_marketing_approvals_v" ADD COLUMN "version_source_actor" varchar;
  ALTER TABLE "_marketing_approvals_v" ADD COLUMN "version_source_run_id" varchar;
  ALTER TABLE "_marketing_approvals_v" ADD COLUMN "version_source_conversation_id" varchar;
  ALTER TABLE "_marketing_approvals_v" ADD COLUMN "version_source_model" varchar;
  ALTER TABLE "_marketing_approvals_v" ADD COLUMN "version_source_prompt_hash" varchar;
  ALTER TABLE "_marketing_approvals_v" ADD COLUMN "version_source_workspace_git_sha" varchar;
  ALTER TABLE "_marketing_approvals_v" ADD COLUMN "version_source_external_draft_id" varchar;
  ALTER TABLE "_marketing_approvals_v" ADD COLUMN "version_source_idempotency_key" varchar;
  CREATE UNIQUE INDEX "marketing_approvals_source_idempotency_key_idx" ON "marketing_approvals" USING btree ("source_idempotency_key");
  CREATE INDEX "_marketing_approvals_v_version_source_idempotency_key_idx" ON "_marketing_approvals_v" USING btree ("version_source_idempotency_key");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "marketing_approvals_source_idempotency_key_idx";
  DROP INDEX "_marketing_approvals_v_version_source_idempotency_key_idx";
  ALTER TABLE "_marketing_approvals_v" DROP COLUMN "version_source_idempotency_key";
  ALTER TABLE "_marketing_approvals_v" DROP COLUMN "version_source_external_draft_id";
  ALTER TABLE "_marketing_approvals_v" DROP COLUMN "version_source_workspace_git_sha";
  ALTER TABLE "_marketing_approvals_v" DROP COLUMN "version_source_prompt_hash";
  ALTER TABLE "_marketing_approvals_v" DROP COLUMN "version_source_model";
  ALTER TABLE "_marketing_approvals_v" DROP COLUMN "version_source_conversation_id";
  ALTER TABLE "_marketing_approvals_v" DROP COLUMN "version_source_run_id";
  ALTER TABLE "_marketing_approvals_v" DROP COLUMN "version_source_actor";
  ALTER TABLE "marketing_approvals" DROP COLUMN "source_idempotency_key";
  ALTER TABLE "marketing_approvals" DROP COLUMN "source_external_draft_id";
  ALTER TABLE "marketing_approvals" DROP COLUMN "source_workspace_git_sha";
  ALTER TABLE "marketing_approvals" DROP COLUMN "source_prompt_hash";
  ALTER TABLE "marketing_approvals" DROP COLUMN "source_model";
  ALTER TABLE "marketing_approvals" DROP COLUMN "source_conversation_id";
  ALTER TABLE "marketing_approvals" DROP COLUMN "source_run_id";
  ALTER TABLE "marketing_approvals" DROP COLUMN "source_actor";`)
}
