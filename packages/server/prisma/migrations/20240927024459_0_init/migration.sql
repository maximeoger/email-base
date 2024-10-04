-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "next_auth";

-- CreateTable
CREATE TABLE "next_auth"."accounts" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" BIGINT,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,
    "userId" UUID,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "next_auth"."sessions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "expires" TIMESTAMPTZ(6) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" UUID,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "next_auth"."users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMPTZ(6),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "next_auth"."verification_tokens" (
    "identifier" TEXT,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "public"."collection" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."collection_email" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collection_id" BIGINT NOT NULL,
    "email_id" BIGINT NOT NULL,

    CONSTRAINT "collection_email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."email" (
    "id" BIGSERIAL NOT NULL,
    "uid" BIGINT NOT NULL,
    "subject" TEXT,
    "recipients" TEXT[],
    "date" TIMESTAMP(6),
    "received_date" TIMESTAMP(6),
    "size" BIGINT,
    "body" TEXT,
    "body_html" TEXT,
    "created_at" TIMESTAMP(6),
    "sender_id" BIGINT NOT NULL,
    "screenshot_id" BIGINT,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."email_screenshot" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "base_64" TEXT NOT NULL,
    "email_id" BIGINT NOT NULL,

    CONSTRAINT "email_screenshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sender" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "logo" TEXT,

    CONSTRAINT "sender_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "provider_unique" ON "next_auth"."accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessiontoken_unique" ON "next_auth"."sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "email_unique" ON "next_auth"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "token_identifier_unique" ON "next_auth"."verification_tokens"("token", "identifier");

-- CreateIndex
CREATE UNIQUE INDEX "email_id_key" ON "public"."email"("id");

-- CreateIndex
CREATE UNIQUE INDEX "email_uid_key" ON "public"."email"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "email_screenshot_email_id_key" ON "public"."email_screenshot"("email_id");

-- CreateIndex
CREATE UNIQUE INDEX "sender_address_key" ON "public"."sender"("address");

-- AddForeignKey
ALTER TABLE "next_auth"."accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "next_auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "next_auth"."sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "next_auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."collection" ADD CONSTRAINT "collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "next_auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."collection_email" ADD CONSTRAINT "collection_email_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."collection_email" ADD CONSTRAINT "collection_email_email_id_fkey" FOREIGN KEY ("email_id") REFERENCES "public"."email"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."email" ADD CONSTRAINT "email_screenshot_id_fkey" FOREIGN KEY ("screenshot_id") REFERENCES "public"."email_screenshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."email" ADD CONSTRAINT "email_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."sender"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."email_screenshot" ADD CONSTRAINT "email_screenshot_email_id_fkey" FOREIGN KEY ("email_id") REFERENCES "public"."email"("id") ON DELETE CASCADE ON UPDATE CASCADE;
