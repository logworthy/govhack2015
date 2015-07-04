Govhack 2015: Our Local Stories
======================================================

## Intro
Our stories remind us of our heritage, and the ABC photographic archive is a treasure chest of our history.

Our Local Stories uses the ABC photographic archive to build a interactive and visual map connecting people to the history of their community.

On the site, they can

Explore/uncover media / stories they might have missed,
Find historical new stories for their current location, and
Improve the ABC data set by providing citizen-journalist content to add insight into their perspective on a news event.
Our primary data set is the ABC Historical Archive (2011 - 2014).


## Server setup (Debian-based OS)

```
> apt-get update
> apt-get install gcc git python-dev
> apt-get install -y postgresql postgresql-contrib postgresql-server-dev-9.3 
> apt-get install -y postgis postgresql-9.3-postgis-2.1
> createdb local_explorer
> sudo -u postgres psql -c "CREATE EXTENSION postgis; CREATE EXTENSION postgis_topology;" local_explorer
```

## Project setup

```
> python manage.py migrate
```
