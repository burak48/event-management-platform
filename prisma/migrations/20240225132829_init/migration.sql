-- CreateTable
CREATE TABLE "Events" (
    "event_id" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("event_id")
);
