CREATE TABLE "bookings" (
	"BookingID" serial PRIMARY KEY NOT NULL,
	"UserID" integer NOT NULL,
	"DesignID" integer,
	"BookingDate" date NOT NULL,
	"ServiceDate" date NOT NULL,
	"Status" varchar(20) DEFAULT 'Pending'
);
--> statement-breakpoint
CREATE TABLE "designs" (
	"DesignID" serial PRIMARY KEY NOT NULL,
	"Title" varchar(100) NOT NULL,
	"Category" varchar(50) NOT NULL,
	"ImageUrl" text NOT NULL,
	"Description" text
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"PaymentID" serial PRIMARY KEY NOT NULL,
	"BookingID" integer NOT NULL,
	"PaymentDate" date NOT NULL,
	"Amount" numeric(10, 2) NOT NULL,
	"PaymentMethod" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "support_tickets" (
	"TicketID" serial PRIMARY KEY NOT NULL,
	"UserID" integer NOT NULL,
	"Subject" varchar(100) NOT NULL,
	"Description" text NOT NULL,
	"Status" varchar(20) DEFAULT 'Open',
	"CreatedDate" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"UserID" serial PRIMARY KEY NOT NULL,
	"FirstName" varchar(50) NOT NULL,
	"LastName" varchar(50) NOT NULL,
	"Email" varchar(100) NOT NULL,
	"PhoneNumber" varchar(20),
	"Address" varchar(255),
	"Role" varchar(20) DEFAULT 'customer',
	CONSTRAINT "users_Email_unique" UNIQUE("Email")
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_UserID_users_UserID_fk" FOREIGN KEY ("UserID") REFERENCES "public"."users"("UserID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_DesignID_designs_DesignID_fk" FOREIGN KEY ("DesignID") REFERENCES "public"."designs"("DesignID") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_BookingID_bookings_BookingID_fk" FOREIGN KEY ("BookingID") REFERENCES "public"."bookings"("BookingID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_UserID_users_UserID_fk" FOREIGN KEY ("UserID") REFERENCES "public"."users"("UserID") ON DELETE cascade ON UPDATE no action;