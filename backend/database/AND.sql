PGDMP  $    ;                |            AND    17.2    17.2 	    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16388    AND    DATABASE     �   CREATE DATABASE "AND" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "AND";
                     postgres    false            �           0    0    DATABASE "AND"    ACL     -   GRANT ALL ON DATABASE "AND" TO "AND-WebApp";
                        postgres    false    4848            �            1259    16399    User    TABLE     S   CREATE TABLE public."User" (
    id bigint NOT NULL,
    username character(32)
);
    DROP TABLE public."User";
       public         heap r       postgres    false            �          0    16399    User 
   TABLE DATA           .   COPY public."User" (id, username) FROM stdin;
    public               postgres    false    217   �       X           2606    16403    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public                 postgres    false    217            �           826    16404    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     P   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO "AND-WebApp";
                        postgres    false            �   !   x�3�I-.1R��9�/ã �&F��� �n�     