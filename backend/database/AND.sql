--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2024-12-18 01:41:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 16407)
-- Name: device; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA device;


ALTER SCHEMA device OWNER TO postgres;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: user; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA "user";


ALTER SCHEMA "user" OWNER TO pg_database_owner;

--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA "user"; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA "user" IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16409)
-- Name: Devices; Type: TABLE; Schema: device; Owner: postgres
--

CREATE TABLE device."Devices" (
    id bigint NOT NULL,
    name character(50),
    updated_at timestamp without time zone,
    created_at timestamp without time zone
);


ALTER TABLE device."Devices" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16440)
-- Name: Events; Type: TABLE; Schema: device; Owner: postgres
--

CREATE TABLE device."Events" (
    id bigint NOT NULL,
    device_id bigint NOT NULL,
    status character(16),
    description text,
    severity smallint,
    "timestamp" timestamp without time zone
);


ALTER TABLE device."Events" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16439)
-- Name: Events_id_seq; Type: SEQUENCE; Schema: device; Owner: postgres
--

ALTER TABLE device."Events" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME device."Events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16417)
-- Name: Telemetry; Type: TABLE; Schema: device; Owner: postgres
--

CREATE TABLE device."Telemetry" (
    id bigint NOT NULL,
    device_id bigint NOT NULL,
    "timestamp" timestamp without time zone,
    latitude double precision,
    longitude double precision,
    altitude double precision,
    gdop real,
    battery_level real,
    signal_strength real
);


ALTER TABLE device."Telemetry" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16416)
-- Name: Telemetry_id_seq; Type: SEQUENCE; Schema: device; Owner: postgres
--

ALTER TABLE device."Telemetry" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME device."Telemetry_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16399)
-- Name: Users; Type: TABLE; Schema: user; Owner: postgres
--

CREATE TABLE "user"."Users" (
    id bigint NOT NULL,
    username character(32)
);


ALTER TABLE "user"."Users" OWNER TO postgres;

--
-- TOC entry 4868 (class 0 OID 16409)
-- Dependencies: 219
-- Data for Name: Devices; Type: TABLE DATA; Schema: device; Owner: postgres
--

COPY device."Devices" (id, name, updated_at, created_at) FROM stdin;
1	Test                                              	2024-12-15 20:23:54	2024-12-15 20:23:54
2	Test 2                                            	2024-12-15 10:23:54	2024-12-15 10:23:54
\.


--
-- TOC entry 4872 (class 0 OID 16440)
-- Dependencies: 223
-- Data for Name: Events; Type: TABLE DATA; Schema: device; Owner: postgres
--

COPY device."Events" (id, device_id, status, description, severity, "timestamp") FROM stdin;
1	1	battery_low     	Battery is low	3	2024-12-15 20:23:00
2	1	error           	error 3	5	2024-12-15 15:23:00
3	1	test            	Hello world	1	2024-12-15 10:23:00
\.


--
-- TOC entry 4870 (class 0 OID 16417)
-- Dependencies: 221
-- Data for Name: Telemetry; Type: TABLE DATA; Schema: device; Owner: postgres
--

COPY device."Telemetry" (id, device_id, "timestamp", latitude, longitude, altitude, gdop, battery_level, signal_strength) FROM stdin;
1	1	2024-12-15 10:23:54	57.04768	9.93255	25	2	100	-38
2	1	2024-12-15 12:23:54	57.04768	9.93005	25	2	50	-38
3	1	2024-12-15 14:23:54	57.04821	9.93005	25	2	25	-38
4	1	2024-12-15 16:23:54	57.04868	9.93176	25	2	10	-38
\.


--
-- TOC entry 4867 (class 0 OID 16399)
-- Dependencies: 218
-- Data for Name: Users; Type: TABLE DATA; Schema: user; Owner: postgres
--

COPY "user"."Users" (id, username) FROM stdin;
2	NEJ                             
1	Hej                             
\.


--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 222
-- Name: Events_id_seq; Type: SEQUENCE SET; Schema: device; Owner: postgres
--

SELECT pg_catalog.setval('device."Events_id_seq"', 3, true);


--
-- TOC entry 4885 (class 0 OID 0)
-- Dependencies: 220
-- Name: Telemetry_id_seq; Type: SEQUENCE SET; Schema: device; Owner: postgres
--

SELECT pg_catalog.setval('device."Telemetry_id_seq"', 4, true);


--
-- TOC entry 4713 (class 2606 OID 16413)
-- Name: Devices Devices_pkey; Type: CONSTRAINT; Schema: device; Owner: postgres
--

ALTER TABLE ONLY device."Devices"
    ADD CONSTRAINT "Devices_pkey" PRIMARY KEY (id);


--
-- TOC entry 4719 (class 2606 OID 16446)
-- Name: Events Events_pkey; Type: CONSTRAINT; Schema: device; Owner: postgres
--

ALTER TABLE ONLY device."Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY (id);


--
-- TOC entry 4717 (class 2606 OID 16421)
-- Name: Telemetry Telemetry_pkey; Type: CONSTRAINT; Schema: device; Owner: postgres
--

ALTER TABLE ONLY device."Telemetry"
    ADD CONSTRAINT "Telemetry_pkey" PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 16415)
-- Name: Devices Unique name; Type: CONSTRAINT; Schema: device; Owner: postgres
--

ALTER TABLE ONLY device."Devices"
    ADD CONSTRAINT "Unique name" UNIQUE (name);


--
-- TOC entry 4711 (class 2606 OID 16403)
-- Name: Users User_pkey; Type: CONSTRAINT; Schema: user; Owner: postgres
--

ALTER TABLE ONLY "user"."Users"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4720 (class 2606 OID 16422)
-- Name: Telemetry Device id key; Type: FK CONSTRAINT; Schema: device; Owner: postgres
--

ALTER TABLE ONLY device."Telemetry"
    ADD CONSTRAINT "Device id key" FOREIGN KEY (device_id) REFERENCES device."Devices"(id);


--
-- TOC entry 4721 (class 2606 OID 16447)
-- Name: Events Device id key; Type: FK CONSTRAINT; Schema: device; Owner: postgres
--

ALTER TABLE ONLY device."Events"
    ADD CONSTRAINT "Device id key" FOREIGN KEY (device_id) REFERENCES device."Devices"(id);


--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA device; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA device TO "AND-WebApp";


--
-- TOC entry 4880 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA "user"; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE ALL ON SCHEMA "user" FROM pg_database_owner;
REVOKE USAGE ON SCHEMA "user" FROM PUBLIC;
GRANT ALL ON SCHEMA "user" TO "AND-WebApp";


--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 219
-- Name: TABLE "Devices"; Type: ACL; Schema: device; Owner: postgres
--

GRANT ALL ON TABLE device."Devices" TO "AND-WebApp";


--
-- TOC entry 4882 (class 0 OID 0)
-- Dependencies: 223
-- Name: TABLE "Events"; Type: ACL; Schema: device; Owner: postgres
--

GRANT ALL ON TABLE device."Events" TO "AND-WebApp";


--
-- TOC entry 4883 (class 0 OID 0)
-- Dependencies: 221
-- Name: TABLE "Telemetry"; Type: ACL; Schema: device; Owner: postgres
--

GRANT ALL ON TABLE device."Telemetry" TO "AND-WebApp";


--
-- TOC entry 2058 (class 826 OID 16404)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO "AND-WebApp";


-- Completed on 2024-12-18 01:41:36

--
-- PostgreSQL database dump complete
--

