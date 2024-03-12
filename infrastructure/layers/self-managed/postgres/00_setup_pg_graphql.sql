create extension pg_graphql;

create role anon;

create schema if not exists graphql;
create schema if not exists public;

grant usage on schema public to anon;
alter default privileges in schema public grant all on tables to anon;
alter default privileges in schema public grant all on functions to anon;
alter default privileges in schema public grant all on sequences to anon;

grant usage on schema graphql to anon;
grant all on function graphql.resolve to anon;

alter default privileges in schema graphql grant all on tables to anon;
alter default privileges in schema graphql grant all on functions to anon;
alter default privileges in schema graphql grant all on sequences to anon;


-- GraphQL Entrypoint
create function graphql(
    "operationName" text default null,
    query text default null,
    variables jsonb default null,
    extensions jsonb default null
)
    returns jsonb
    language sql
as
$$
select graphql.resolve(
               query := query,
               variables := coalesce(variables, '{}'),
               "operationName" := "operationName",
               extensions := extensions
       );
$$;