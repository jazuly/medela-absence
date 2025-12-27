-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "foto" TEXT,
    "posisi" TEXT NOT NULL,
    "no_hp" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "absenses" (
    "id" UUID NOT NULL,
    "login_datetime" TIMESTAMP(3) NOT NULL,
    "logout_datetime" TIMESTAMP(3),
    "user_id" UUID NOT NULL,

    CONSTRAINT "absenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "absenses_user_id_idx" ON "absenses"("user_id");

-- AddForeignKey
ALTER TABLE "absenses" ADD CONSTRAINT "absenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
