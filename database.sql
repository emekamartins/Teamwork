--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10
-- Dumped by pg_dump version 10.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    article_id integer NOT NULL,
    article_author integer NOT NULL,
    article_post_id integer NOT NULL,
    article_title character varying(200) NOT NULL,
    content text NOT NULL,
    article_created_on timestamp without time zone NOT NULL,
    article_updated_on timestamp without time zone
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: articles_article_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articles_article_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_article_id_seq OWNER TO postgres;

--
-- Name: articles_article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articles_article_id_seq OWNED BY public.articles.article_id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    author integer NOT NULL,
    comment_body text NOT NULL,
    created_on timestamp without time zone NOT NULL,
    updated_on timestamp without time zone
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments_article (
    comments_article_id integer NOT NULL,
    comment_id integer NOT NULL,
    article_id integer NOT NULL
);


ALTER TABLE public.comments_article OWNER TO postgres;

--
-- Name: comments_article_comments_article_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_article_comments_article_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_article_comments_article_id_seq OWNER TO postgres;

--
-- Name: comments_article_comments_article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_article_comments_article_id_seq OWNED BY public.comments_article.comments_article_id;


--
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_comment_id_seq OWNER TO postgres;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;


--
-- Name: comments_gif; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments_gif (
    comments_gif_id integer NOT NULL,
    comment_id integer NOT NULL,
    gif_id integer NOT NULL
);


ALTER TABLE public.comments_gif OWNER TO postgres;

--
-- Name: comments_gif_comments_gif_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_gif_comments_gif_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_gif_comments_gif_id_seq OWNER TO postgres;

--
-- Name: comments_gif_comments_gif_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_gif_comments_gif_id_seq OWNED BY public.comments_gif.comments_gif_id;


--
-- Name: gifs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gifs (
    gif_id integer NOT NULL,
    author integer NOT NULL,
    post_id integer NOT NULL,
    title character varying(200) NOT NULL,
    image_url character varying(500) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    updated_on timestamp without time zone,
    public_id character varying(355) NOT NULL
);


ALTER TABLE public.gifs OWNER TO postgres;

--
-- Name: gifs_gif_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gifs_gif_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gifs_gif_id_seq OWNER TO postgres;

--
-- Name: gifs_gif_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gifs_gif_id_seq OWNED BY public.gifs.gif_id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    post_id integer NOT NULL,
    post_type character varying(355) NOT NULL,
    post_created_on timestamp without time zone NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_post_id_seq OWNER TO postgres;

--
-- Name: posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.post_id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(355) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_role_id_seq OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    team_id integer NOT NULL,
    user_id character varying(500) NOT NULL,
    role_id integer NOT NULL,
    first_name character varying(200) NOT NULL,
    last_name character varying(200) NOT NULL,
    email character varying(355) NOT NULL,
    password character varying(100) NOT NULL,
    gender character varying(100) NOT NULL,
    job_role character varying(355) NOT NULL,
    department character varying(355) NOT NULL,
    address text NOT NULL,
    remember_token character varying(500),
    created_on timestamp without time zone NOT NULL,
    updated_on timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_team_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_team_id_seq OWNER TO postgres;

--
-- Name: users_team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_team_id_seq OWNED BY public.users.team_id;


--
-- Name: articles article_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles ALTER COLUMN article_id SET DEFAULT nextval('public.articles_article_id_seq'::regclass);


--
-- Name: comments comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- Name: comments_article comments_article_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_article ALTER COLUMN comments_article_id SET DEFAULT nextval('public.comments_article_comments_article_id_seq'::regclass);


--
-- Name: comments_gif comments_gif_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_gif ALTER COLUMN comments_gif_id SET DEFAULT nextval('public.comments_gif_comments_gif_id_seq'::regclass);


--
-- Name: gifs gif_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gifs ALTER COLUMN gif_id SET DEFAULT nextval('public.gifs_gif_id_seq'::regclass);


--
-- Name: posts post_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN post_id SET DEFAULT nextval('public.posts_post_id_seq'::regclass);


--
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- Name: users team_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN team_id SET DEFAULT nextval('public.users_team_id_seq'::regclass);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles (article_id, article_author, article_post_id, article_title, content, article_created_on, article_updated_on) FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (comment_id, author, comment_body, created_on, updated_on) FROM stdin;
\.


--
-- Data for Name: comments_article; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments_article (comments_article_id, comment_id, article_id) FROM stdin;
\.


--
-- Data for Name: comments_gif; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments_gif (comments_gif_id, comment_id, gif_id) FROM stdin;
\.


--
-- Data for Name: gifs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gifs (gif_id, author, post_id, title, image_url, created_on, updated_on, public_id) FROM stdin;
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (post_id, post_type, post_created_on) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (role_id, role_name) FROM stdin;
1	Admin
2	Employee
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (team_id, user_id, role_id, first_name, last_name, email, password, gender, job_role, department, address, remember_token, created_on, updated_on) FROM stdin;
1	829ae738-5f5f-422f-8e59-5110e7773d45	1	EMEKA	OKWOR	emekaokwor@gmail.com	$2a$08$ZKl/GSpNAAz//2AmfQh6je/TEJ2DuhHZsUQdv/CD29RZswAe3QSGm	male	cutsomer Service	Administrative	3rd avenue festac lagos	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOjEsImlhdCI6MTU3NDA5NDE4MywiZXhwIjoxNTc0MTE1NzgzfQ.rIaykgw84QTZ4w5FPpIYIaLOLm8Ksn4HdqkalqPV-7s	2019-11-17 05:43:50.212	2019-11-18 17:23:03.228
\.


--
-- Name: articles_article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_article_id_seq', 297, true);


--
-- Name: comments_article_comments_article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_article_comments_article_id_seq', 56, true);


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 88, true);


--
-- Name: comments_gif_comments_gif_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_gif_comments_gif_id_seq', 32, true);


--
-- Name: gifs_gif_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gifs_gif_id_seq', 161, true);


--
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 463, true);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 2, true);


--
-- Name: users_team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_team_id_seq', 163, true);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (article_id);


--
-- Name: comments_article comments_article_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_article
    ADD CONSTRAINT comments_article_pkey PRIMARY KEY (comments_article_id);


--
-- Name: comments_gif comments_gif_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_gif
    ADD CONSTRAINT comments_gif_pkey PRIMARY KEY (comments_gif_id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: gifs gifs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gifs
    ADD CONSTRAINT gifs_pkey PRIMARY KEY (gif_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (team_id);


--
-- Name: users users_remember_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_remember_token_key UNIQUE (remember_token);


--
-- Name: users users_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_id_key UNIQUE (user_id);


--
-- Name: articles article_post_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT article_post_fkey FOREIGN KEY (article_post_id) REFERENCES public.posts(post_id) ON DELETE CASCADE;


--
-- Name: articles articles_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_author_fkey FOREIGN KEY (article_author) REFERENCES public.users(team_id) ON DELETE CASCADE;


--
-- Name: comments comments_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_author_fkey FOREIGN KEY (author) REFERENCES public.users(team_id) ON DELETE CASCADE;


--
-- Name: comments_gif comments_gif_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_gif
    ADD CONSTRAINT comments_gif_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(comment_id) ON DELETE CASCADE;


--
-- Name: comments_article comments_gif_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_article
    ADD CONSTRAINT comments_gif_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(comment_id) ON DELETE CASCADE;


--
-- Name: comments_gif comments_gif_gif_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_gif
    ADD CONSTRAINT comments_gif_gif_id_fkey FOREIGN KEY (gif_id) REFERENCES public.gifs(gif_id) ON DELETE CASCADE;


--
-- Name: gifs gifs_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gifs
    ADD CONSTRAINT gifs_author_fkey FOREIGN KEY (author) REFERENCES public.users(team_id) ON DELETE CASCADE;


--
-- Name: gifs gifs_post_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gifs
    ADD CONSTRAINT gifs_post_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id) ON DELETE CASCADE;


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

