-- Table: public.Devices

-- DROP TABLE IF EXISTS public."Devices";

CREATE TABLE IF NOT EXISTS public."Devices"
(
    "d_ID" SERIAL Primary Key,
    "Name" character varying,
    "IpAddress" character varying,
    "ManagementAddress" character varying,
    "Username" character varying,
    "Password" character varying,
    "ManagementPassword" character varying,
    "CustomFields" json,
    "WaitingUsersCount" integer,
    "WaitingUsernames" json,
    "Hidden" boolean
)

TABLESPACE pg_default;
