PGDMP      1                |            AND    17.2    17.2 !               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16388    AND    DATABASE     �   CREATE DATABASE "AND" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "AND";
                     postgres    false                       0    0    DATABASE "AND"    ACL     -   GRANT ALL ON DATABASE "AND" TO "AND-WebApp";
                        postgres    false    4878                        2615    16407    device    SCHEMA        CREATE SCHEMA device;
    DROP SCHEMA device;
                     postgres    false                       0    0    SCHEMA device    ACL     ,   GRANT ALL ON SCHEMA device TO "AND-WebApp";
                        postgres    false    5                        2615    2200    user    SCHEMA        CREATE SCHEMA "user";
    DROP SCHEMA "user";
                     pg_database_owner    false                       0    0    SCHEMA "user"    COMMENT     6   COMMENT ON SCHEMA "user" IS 'standard public schema';
                        pg_database_owner    false    6                       0    0    SCHEMA "user"    ACL     �   REVOKE ALL ON SCHEMA "user" FROM pg_database_owner;
REVOKE USAGE ON SCHEMA "user" FROM PUBLIC;
GRANT ALL ON SCHEMA "user" TO "AND-WebApp";
                        pg_database_owner    false    6            �            1259    16409    Devices    TABLE     �   CREATE TABLE device."Devices" (
    id bigint NOT NULL,
    name character(50),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
    DROP TABLE device."Devices";
       device         heap r       postgres    false    5                       0    0    TABLE "Devices"    ACL     5   GRANT ALL ON TABLE device."Devices" TO "AND-WebApp";
          device               postgres    false    219            �            1259    16440    Events    TABLE     �   CREATE TABLE device."Events" (
    id bigint NOT NULL,
    device_id bigint NOT NULL,
    "timestamp" time with time zone,
    type character(50),
    text text,
    severity smallint
);
    DROP TABLE device."Events";
       device         heap r       postgres    false    5                       0    0    TABLE "Events"    ACL     4   GRANT ALL ON TABLE device."Events" TO "AND-WebApp";
          device               postgres    false    223            �            1259    16439    Events_id_seq    SEQUENCE     �   ALTER TABLE device."Events" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME device."Events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            device               postgres    false    223    5            �            1259    16417 	   Telemetry    TABLE     $  CREATE TABLE device."Telemetry" (
    id bigint NOT NULL,
    device_id bigint NOT NULL,
    "timestamp" timestamp with time zone,
    latitude double precision,
    longitude double precision,
    altitude double precision,
    gdop real,
    battery_level real,
    signal_strength real
);
    DROP TABLE device."Telemetry";
       device         heap r       postgres    false    5                       0    0    TABLE "Telemetry"    ACL     7   GRANT ALL ON TABLE device."Telemetry" TO "AND-WebApp";
          device               postgres    false    221            �            1259    16416    Telemetry_id_seq    SEQUENCE     �   ALTER TABLE device."Telemetry" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME device."Telemetry_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            device               postgres    false    221    5            �            1259    16399    Users    TABLE     T   CREATE TABLE "user"."Users" (
    id bigint NOT NULL,
    username character(32)
);
    DROP TABLE "user"."Users";
       user         heap r       postgres    false    6                      0    16409    Devices 
   TABLE DATA           E   COPY device."Devices" (id, name, created_at, updated_at) FROM stdin;
    device               postgres    false    219   �!                 0    16440    Events 
   TABLE DATA           T   COPY device."Events" (id, device_id, "timestamp", type, text, severity) FROM stdin;
    device               postgres    false    223   �!                 0    16417 	   Telemetry 
   TABLE DATA           �   COPY device."Telemetry" (id, device_id, "timestamp", latitude, longitude, altitude, gdop, battery_level, signal_strength) FROM stdin;
    device               postgres    false    221   n"                 0    16399    Users 
   TABLE DATA           /   COPY "user"."Users" (id, username) FROM stdin;
    user               postgres    false    218   �"                  0    0    Events_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('device."Events_id_seq"', 3, true);
          device               postgres    false    222                       0    0    Telemetry_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('device."Telemetry_id_seq"', 4, true);
          device               postgres    false    220            i           2606    16413    Devices Devices_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY device."Devices"
    ADD CONSTRAINT "Devices_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY device."Devices" DROP CONSTRAINT "Devices_pkey";
       device                 postgres    false    219            o           2606    16446    Events Events_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY device."Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY device."Events" DROP CONSTRAINT "Events_pkey";
       device                 postgres    false    223            m           2606    16421    Telemetry Telemetry_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY device."Telemetry"
    ADD CONSTRAINT "Telemetry_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY device."Telemetry" DROP CONSTRAINT "Telemetry_pkey";
       device                 postgres    false    221            k           2606    16415    Devices Unique name 
   CONSTRAINT     R   ALTER TABLE ONLY device."Devices"
    ADD CONSTRAINT "Unique name" UNIQUE (name);
 A   ALTER TABLE ONLY device."Devices" DROP CONSTRAINT "Unique name";
       device                 postgres    false    219            g           2606    16403    Users User_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY "user"."Users"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 =   ALTER TABLE ONLY "user"."Users" DROP CONSTRAINT "User_pkey";
       user                 postgres    false    218            p           2606    16422    Telemetry Device id key    FK CONSTRAINT     �   ALTER TABLE ONLY device."Telemetry"
    ADD CONSTRAINT "Device id key" FOREIGN KEY (device_id) REFERENCES device."Devices"(id);
 E   ALTER TABLE ONLY device."Telemetry" DROP CONSTRAINT "Device id key";
       device               postgres    false    221    219    4713            q           2606    16447    Events Device id key    FK CONSTRAINT     }   ALTER TABLE ONLY device."Events"
    ADD CONSTRAINT "Device id key" FOREIGN KEY (device_id) REFERENCES device."Devices"(id);
 B   ALTER TABLE ONLY device."Events" DROP CONSTRAINT "Device id key";
       device               postgres    false    223    219    4713            
           826    16404    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     P   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO "AND-WebApp";
                        postgres    false               J   x�3�I-.Q 	p����*X[��h"!��� V�h�����!)X��
l�\1z\\\ � �         g   x�3�4�44�22�25�60�LJ,)I-����/W p:A�(d+ uqs�4B23��(��HӠfB�s�r�V�Z\B�Y
��99�
��E9)��\1z\\\ B�.w         b   x�u�;
�0��9E��`)v��,��9�j(m	��2��te]�f�x/j�Y�R�.<"P�\Gb��������,�A|�Q���Zt�z{�^n+)���'(            x�3��s�R��9=R��+����� ��
f     