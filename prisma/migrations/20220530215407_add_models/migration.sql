-- CreateTable
CREATE TABLE "Organizer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "event_id" INTEGER NOT NULL,
    "event_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "venue_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "adults_only" BOOLEAN NOT NULL,
    "organizer_id" TEXT NOT NULL,
    "attendees" INTEGER NOT NULL DEFAULT 0,
    "admitted" INTEGER NOT NULL DEFAULT 0,
    "not_admitted" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Attendee" (
    "attendee_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,
    "scanned" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_id_key" ON "Organizer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Event_event_id_key" ON "Event"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_attendee_id_key" ON "Attendee"("attendee_id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "Organizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
