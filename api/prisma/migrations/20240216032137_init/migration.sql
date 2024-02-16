-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "recipients" TEXT[],

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);
