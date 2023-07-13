CREATE TABLE IF NOT EXISTS public.users
(
    id_user integer NOT NULL DEFAULT nextval('users_id_user_seq'::regclass),
    nameu character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    passwordu character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id_user)
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.users OWNER to jossue;
INSERT INTO users (nameu, email, passwordu) VALUES
    ('John Doe', 'john@example.com', '12345hola'),
    ('Jane Smith', 'jane@example.com', 'fdasdsa2');